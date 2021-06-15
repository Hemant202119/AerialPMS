import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/api';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { PayloadBean, CurrentUser } from '../../../_models/data.model';
import { appConfig, Constants, routeConfig } from '../../../app.config';
import { DateFormatPipe } from '../../../_core/date-format';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ItemsInformationBean, InsertUpdateUseItemBean } from '../useItems';

@Component({
  selector: 'app-edit-use-items',
  templateUrl: './edit-use-items.component.html',
  styleUrls: ['./edit-use-items.component.css'],
  providers: [MessageService, DateFormatPipe]
})
export class EditUseItemsComponent implements OnInit {

 
  msgs: Message[] = [];
  editFlag: boolean = true;
  showPageSpinner:boolean;
  formHeader="Use Items";
  saveFlag:boolean=false;
  itemsInformationBean: ItemsInformationBean = new ItemsInformationBean();
  insertUpdateUseItemBean: InsertUpdateUseItemBean = new InsertUpdateUseItemBean();
  payLoadBean: PayloadBean = new PayloadBean();
  currentuser: CurrentUser = new CurrentUser();
  transactionType: boolean = false;
  assetItemsAutoLookupList: any[]=[];
  usageTypeList:any[]=[];
  filteredSingleItem:any;
  filteredProjectItem:any;
  filteredContactItem:any;
  dateformat:any;
  params: any;
  autoLookUpProjectList: any[]=[];
  autoLookUpContactList: any[]=[];
  baseResponse: any;
  projectFlag:boolean=true;
  businessFlag:boolean=true;
  defaultProject:any;
  defaultSupplier:any;
  currentUser:any;
  constructor(private breadcrumbService: BreadcrumbService,
    public roleRightsGuard: RoleRightsGuard, private httpRestClient: HttpRestClient
    ,private router: Router,private route:ActivatedRoute, private dateFormatPipe: DateFormatPipe) {
    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Use Items',routerLink: ['/receive-items'] },
      { label: 'Add Use Items' }
    ]);
  

    this.roleRightsGuard.hasAllRoles(routeConfig.useItemsMenu);
    
    this.route.params.subscribe(params => { this.params = params; });
    this.editFlag = false;
    this.payLoadBean.searchParameter = "Active";
    this.payLoadBean.signatureKey = appConfig.privateKey;
    
    this.httpRestClient.postData("project_autoLookUp", this.payLoadBean).subscribe(response => {
     this.autoLookUpProjectList=response;
    
    });
    this.httpRestClient.postData("contacts_autoLookUp", this.payLoadBean).subscribe(response => {
     this.autoLookUpContactList=response;
    });

      if (this.params['id'] != null || this.params['id'] != undefined) {
        var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
        var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
        if (decrypted == '' || decrypted == null || decrypted == undefined) {
          this.router.navigate(['/receive-items']);
        } else {
          this.payLoadBean.signatureKey=appConfig.privateKey;  
        
         this.editReceivedItems(decrypted);
        }
      }
  }

  ngOnInit() {

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.dateformat = Constants.DATE_FMT_TS;
   
    this.usageTypeList = [
      { label: "Used", value: "Used" },
      { label: "Transferred To Other Project", value: "Transferred To Other Project" },
      { label: "Transferred To Other Vendor", value: "Transferred To Other Vendor" },
      { label: "Returned", value: "Returned" }
    ];
  }

  ngAfterViewInit() {            
    const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('item-name');
    focusField.focus();
}

  filterProjectSingleItem(event) {
    let query = event.query;
    this.filteredProjectItem = this.filterProjectData(query, this.autoLookUpProjectList);
  }
  filterProjectData(searchParameter,itemList:any[]):any[]{
    let filtered: any[] = [];
    for (let count = 0; count < itemList.length; count++) {
      let record = itemList[count];
      if (record.projectName.toLowerCase().indexOf(searchParameter.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }

 
  filterContactsSingleItem(event) {
    let query = event.query;
    this.filteredContactItem = this.filterContactsData(query, this.autoLookUpContactList);
  }
  filterContactsData(searchParameter,itemList:any[]):any[]{
    let filtered: any[] = [];
    for (let count = 0; count < itemList.length; count++) {
      let record = itemList[count];
      if (record.businessName.toLowerCase().indexOf(searchParameter.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }

  filterSingleItem(event) {
    let query = event.query;
    this.filteredSingleItem = this.filterData(query, this.assetItemsAutoLookupList);
  }
  filterData(searchParameter,itemList:any[]):any[]{
    let filtered: any[] = [];
    for (let count = 0; count < itemList.length; count++) {
      let record = itemList[count];
      if (record.itemName.toLowerCase().indexOf(searchParameter.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }

  onBlurUsedQuantity(){
    if(this.itemsInformationBean.itemQuantityUsed.toString.length==0){
      this.itemsInformationBean.itemQuantityUsed=0;
    }
  }


  ItemsInformation() {
    this.msgs = [];
    
    if (this.itemsInformationBean.project == undefined || this.itemsInformationBean.project == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Project Name Can't Be Blank" });
    }
    else if (this.itemsInformationBean.contact == undefined || this.itemsInformationBean.contact == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Supplier Name Can't Be Blank" });
    }
    else if(this.itemsInformationBean.assetItemId==undefined){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item Name Can't Be Blank." });
    }
    else if(this.itemsInformationBean.itemQuantityReceived==undefined || this.itemsInformationBean.itemQuantityReceived.toString().length==0){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Project Receive Quantity Can't Be Blank " });
    }
    else if(this.itemsInformationBean.itemQuantityUsed>this.itemsInformationBean.itemQuantityReceived){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Used Quantity Can't Be Greater Than Receive Quanity" });
    }
  
   
    
    else{     
  //   if(!this.editFlag){
  // this.showPageSpinner=true;  
  //     this.itemsInformationBean.createdBy=this.currentuser.userID;
      
  //     this.httpRestClient.postData("add-received-items",this.itemsInformationBean).subscribe(response=>{
  //       this.baseResponse = response;
  //       this.showPageSpinner=false;  
  //       if (this.baseResponse['code'] == 'ADDED') {
  //           sessionStorage.setItem("successMessage", "AddedSuccess");
  //           this.router.navigate(['/receive-items']);
  //         } else {
  //           this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
  //         }
  //       });
  //   }
    // else{     
      this.showPageSpinner=true;         
      this.itemsInformationBean.lastModifiedBy = this.currentuser.userID;
      this.httpRestClient.putData("update-received-items", this.itemsInformationBean).subscribe(
        response => {
          this.baseResponse = response;
          this.showPageSpinner=false;           
          if (this.baseResponse['code'] == 'UPDATED') {
            sessionStorage.setItem("successMessage", "UpdateSuccess");
            this.router.navigate(['/receive-items']);
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
        });
    }
  }
  // }

  enableDisabledFields(event){
    if(this.itemsInformationBean.usageType=='Transferred To Other Project'){
      this.projectFlag=false;
    }
    else if(this.itemsInformationBean.usageType=='Returned'){
      this.businessFlag=false;
    }
  }

  calculateWastedPercentage(){
    this.itemsInformationBean.wastedPercentage=Math.round((this.itemsInformationBean.itemQuantityWasted/this.itemsInformationBean.itemQuantityUsed)*100);
  }

  SaveUpdate(){
    
    this.msgs = [];
    
    if (this.itemsInformationBean.project == undefined || this.itemsInformationBean.project == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Project Name Can't Be Blank" });
    }
    else if (this.itemsInformationBean.contact == undefined || this.itemsInformationBean.contact == null){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Supplier Name Can't Be Blank" });
    }
    else if (this.itemsInformationBean.usageType == undefined || this.itemsInformationBean.usageType == null){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Usage Type Can't Be Blank" });
    }
    else if (this.itemsInformationBean.usageType == 'Transferred To Other Project' && (this.itemsInformationBean.projectName == this.itemsInformationBean.project.projectName)){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Select Different Project Or Change Usage Type" });
    }
    else if (this.itemsInformationBean.usageType == 'Returned' && (this.itemsInformationBean.businessName == this.itemsInformationBean.contact.businessName)){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Select Different Supplier Or Change Usage Type" });
    }
    else if (this.itemsInformationBean.itemQuantityUsed == undefined || this.itemsInformationBean.itemQuantityUsed == null ||
     this.itemsInformationBean.itemQuantityUsed.toString().length==0){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Quantity Used Can't Be Blank" });
    }
    else if (this.itemsInformationBean.itemQuantityUsed>this.itemsInformationBean.quantityBalance){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Quantity Used Can't Be Greater Than Quantity Balance" });
    }
    else if (this.itemsInformationBean.itemQuantityWasted == undefined || this.itemsInformationBean.itemQuantityWasted == null || 
      this.itemsInformationBean.itemQuantityWasted.toString().length==0){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Quantity Wasted Can't Be Blank" });
    }
    else if (Number(this.itemsInformationBean.itemQuantityWasted)>Number(this.itemsInformationBean.itemQuantityUsed)){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Quantity Wasted Can't Be Greater Than Quantity Used" });
    }
    else if (this.itemsInformationBean.itemQuantityWasted>this.itemsInformationBean.quantityBalance){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Quantity Wasted Can't Be Greater Than Quantity Balance" });
    }
    else if ((Number(this.itemsInformationBean.itemQuantityWasted)+Number(this.itemsInformationBean.itemQuantityUsed))>(Number(this.itemsInformationBean.quantityBalance))){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Total Of Quantity Used And Quantity Wasted Can't Be Greater Than Quantity Balance" });
    }
    else if (this.itemsInformationBean.usageType=='Transferred To Other Vendor' && (this.itemsInformationBean.notes == undefined || this.itemsInformationBean.notes == null)){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Notes Can't Be Blank" });
    }
    else{
     // this.itemsInformationBean.itemQuantityBalance=this.itemsInformationBean.quantityReceived-this.itemsInformationBean.itemQuantityUsed-this.itemsInformationBean.itemQuantityWasted;
      this.insertUpdateUseItemBean.contact=this.itemsInformationBean.contact;
      this.insertUpdateUseItemBean.project=this.itemsInformationBean.project;
      this.insertUpdateUseItemBean.signatureKey=appConfig.privateKey;
      this.insertUpdateUseItemBean.itemQuantityUsed=Number(this.itemsInformationBean.itemQuantityUsed)+Number(this.itemsInformationBean.quantityUsed);
      this.insertUpdateUseItemBean.itemQuantityWasted=Number(this.itemsInformationBean.itemQuantityWasted)+Number(this.itemsInformationBean.quantityWasted);
      this.insertUpdateUseItemBean.itemQuantityBalance=Number(this.itemsInformationBean.quantityReceived)-Number(this.insertUpdateUseItemBean.itemQuantityUsed)-Number(this.insertUpdateUseItemBean.itemQuantityWasted);
      this.insertUpdateUseItemBean.usageType=this.itemsInformationBean.usageType;
      this.insertUpdateUseItemBean.usedDate=this.itemsInformationBean.usedDate;
      this.insertUpdateUseItemBean.notes=this.itemsInformationBean.notes;
      this.insertUpdateUseItemBean.stockItemidpk=Number(this.itemsInformationBean.stockItemId);
      this.insertUpdateUseItemBean.transactionCount=this.itemsInformationBean.transactionCount;
      this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      let stock ={stockItemId:this.itemsInformationBean.stockItemId}
      this.insertUpdateUseItemBean.stockItemId=stock;
      this.insertUpdateUseItemBean.lastModifiedBy=this.currentUser.userID;
      this.insertUpdateUseItemBean.createdBy=this.currentUser.userID;
      console.log( this.insertUpdateUseItemBean);
      this.httpRestClient.postData("insertUpdate-useItem", this.insertUpdateUseItemBean)
    .subscribe(response => {           
      this.baseResponse = response;
      this.showPageSpinner=false;           
      if (this.baseResponse['code'] == 'UPDATED') {
        sessionStorage.setItem("successMessage", "UpdateSuccess");
        this.router.navigate(['/manage-use-items']);
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
      }
    });     
    }
    
  }

editReceivedItems(stockItemId) {
  this.showPageSpinner=true; 
  this.payLoadBean.id = stockItemId;
  this.editFlag = true;
  this.payLoadBean.signatureKey=appConfig.privateKey;
  
  this.httpRestClient.postData("fetch-useItem", this.payLoadBean)
    .subscribe(response => {           
    this.itemsInformationBean = response; 
    if(this.itemsInformationBean.quantityBalance==0){
      this.saveFlag=true;
    }    
    console.log(this.itemsInformationBean);
    this.defaultProject = {projectID:this.itemsInformationBean.projectID,projectName:this.itemsInformationBean.projectName};
    this.itemsInformationBean.project=this.defaultProject;

    this.defaultSupplier = {contactID:this.itemsInformationBean.contactID,businessName:this.itemsInformationBean.businessName};
    this.itemsInformationBean.contact=this.defaultSupplier;
  

    this.itemsInformationBean.usedDate =new Date();
      this.showPageSpinner=false;     
    });
}
}


