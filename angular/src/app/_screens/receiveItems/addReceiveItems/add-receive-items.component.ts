import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/api';
import { ItemsInformationBean, ItemEntityTO, AutoLookUpList, } from '../items';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { PayloadBean, CurrentUser } from '../../../_models/data.model';
import { appConfig, Constants, routeConfig } from '../../../app.config';
import { DateFormatPipe } from '../../../_core/date-format';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-receive-items',
  templateUrl: './add-receive-items.component.html',
  styleUrls: ['./add-receive-items.component.css'],
  providers: [MessageService, DateFormatPipe]
})
export class AddReceiveItemsComponent implements OnInit {
 
  tr: any[];
  blockedKeys=/[1-9]/;
  transactionTypeList: any[];
  rentalFrequencyList: any[];
  msgs: Message[] = [];
  editFlag: boolean = true;
  showPageSpinner:boolean;
  formHeader="Add Recieve Items";
  purchasedInformationFlag: boolean;
  rentInformationFlag: boolean;
  itemsInformationBean: ItemsInformationBean = new ItemsInformationBean();
  payLoadBean: PayloadBean = new PayloadBean();
  currentuser: CurrentUser = new CurrentUser();
  transactionType: boolean = false;
  assetItemsAutoLookupList: any[]=[];
  itemsListTo:ItemEntityTO[];
  filteredSingleItem:any;
  filteredProjectItem:any;
  filteredContactItem:any;
  dateformat:any;
  params: any;
  autoLookUpProjectList: any[]=[];
  autoLookUpContactList: any[]=[];
  baseResponse: any;
  constructor(private breadcrumbService: BreadcrumbService,
    public roleRightsGuard: RoleRightsGuard, private httpRestClient: HttpRestClient,private router: Router,private route:ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Recieve Items',routerLink: ['/receive-items'] },
      { label: 'Add Recieve Items' }
    ]);
    this.roleRightsGuard.hasAllRoles(routeConfig.recieveItemMenu);
    
    this.route.params.subscribe(params => { this.params = params; });
    this.editFlag = false;
    this.payLoadBean.searchParameter = "Active";
    this.payLoadBean.signatureKey = appConfig.privateKey;
    this.itemsInformationBean.receivedDate=new Date();
    this.httpRestClient.postData("project_autoLookUp", this.payLoadBean).subscribe(response => {
     this.autoLookUpProjectList=response;
    });
    this.httpRestClient.postData("contacts_autoLookUp", this.payLoadBean).subscribe(response => {
     this.autoLookUpContactList=response;
    });
    this.httpRestClient.postData("search_asset_items", this.payLoadBean).subscribe(response => {
      this.assetItemsAutoLookupList = response;   
     // this.itemsInformationBean.stockItemStatus="InStock";
    });
    
     this.itemsInformationBean.itemQuantityUsed=0;
     this.itemsInformationBean.itemQuantityWasted=0;
   

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
    this.transactionTypeList = [
      { label: "MRN", value: "MRN" },
      { label: "SRN", value: "SRN" }
    ];
    this.rentalFrequencyList = [
      { label: "Monthly", value: "Monthly" },
      { label: "Quarterly", value: "Quarterly" },
      { label: "Yearly", value: "Yearly" }
    ];
  }

  ngAfterViewInit() {            
    const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('item-name');
    focusField.focus();
}


  // changeTransactionType(event) {
  //   if (event.value == "Purchased") {
  //     this.purchasedInformationFlag = true;
  //     this.rentInformationFlag = false;

  //     // this.itemsInformationBean.purchasedDate=new Date();
  //     // this.itemsInformationBean.guarantyEndDate=new Date();
  //     // this.itemsInformationBean.warrantyEndDate=new Date();
  //     this.itemsInformationBean.rentalAmount=undefined;
  //     this.itemsInformationBean.rentalFrequency=undefined;
  //     this.itemsInformationBean.rentalSecurity=undefined;
  //     this.itemsInformationBean.rentStartDate=undefined;
  //     this.itemsInformationBean.rentEndDate=undefined;
  //     this.itemsInformationBean.rentRemarks=undefined;
  //   } else if (event.value == "Rented") {
  //     this.purchasedInformationFlag = false;
  //     this.rentInformationFlag = true;
  //     this.itemsInformationBean.purchasedDate=undefined;
  //     this.itemsInformationBean.purchasePrice=undefined;
  //     this.itemsInformationBean.invoiceNumber=undefined;      
  //     this.itemsInformationBean.guarantyEndDate=undefined;
  //     this.itemsInformationBean.warrantyEndDate=undefined;
  //     this.itemsInformationBean.purchasedRemarks=undefined;  
  //     // this.itemsInformationBean.rentStartDate=new Date();
  //     // this.itemsInformationBean.rentEndDate=new Date();
        
  //   }
  //}

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


  dataOfParticularitems(event){     
    this.callAPIforParticularItem(event.assetItemID);
    
  }
  callAPIforParticularItem(assetItemID){
    this.showPageSpinner=true;
    this.payLoadBean.id=assetItemID;
    this.payLoadBean.signatureKey = appConfig.privateKey;
    this.httpRestClient.postData("search-items-data-onCriteria", this.payLoadBean).subscribe(response => {
      this.itemsListTo = response;            
  if(this.itemsListTo.length>0){
      this.itemsInformationBean.itemCode=this.itemsListTo[0].itemCode;
      this.itemsInformationBean.itemType=this.itemsListTo[0].itemType;
      this.itemsInformationBean.itemStatus=this.itemsListTo[0].itemStatus;
      this.itemsInformationBean.itemDescription=this.itemsListTo[0].itemDescription;
      this.itemsInformationBean.categoryName=this.itemsListTo[0].categoryName;
      this.itemsInformationBean.subCategoryName=this.itemsListTo[0].subCategoryName;
      this.itemsInformationBean.itemUnit=this.itemsListTo[0].itemUnit;
      if(this.itemsListTo[0].currentProjectItemStock!=undefined && this.itemsListTo[0].currentProjectItemStock!=null){
        this.itemsInformationBean.currentProjectItemStock=this.itemsListTo[0].currentProjectItemStock;
      }
      else{
        this.itemsInformationBean.currentProjectItemStock=0;
      }
     
  }   
  this.showPageSpinner=false; 
    });
  }

  calculateBalance(event){
    this.itemsInformationBean.itemQuantityBalance= this.itemsInformationBean.itemQuantityReceived-this.itemsInformationBean.itemQuantityUsed;
  }
  
  onBlurUsedQuantity(){
    if(this.itemsInformationBean.itemQuantityUsed.length==0){
      this.itemsInformationBean.itemQuantityUsed=0;
    }
  }

  // onBlurReceiveQuantity(){
  //   if(this.itemsInformationBean.itemQuantityReceived.length==0){
  //     this.itemsInformationBean.itemQuantityReceived=0;
  //   }
  // }  

  clearItems(){
    this.itemsInformationBean.assetItemId=undefined;
    this.itemsInformationBean.categoryName=undefined;
    this.itemsInformationBean.subCategoryName=undefined;
    this.itemsInformationBean.itemType=undefined;
    this.itemsInformationBean.itemDescription=undefined;
    this.itemsInformationBean.itemUnit=undefined;
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
    else if(this.itemsInformationBean.itemQuantityReceived==undefined || this.itemsInformationBean.itemQuantityReceived.length==0){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Project Receive Quantity Can't Be Blank " });
    }
    else if(this.itemsInformationBean.itemQuantityUsed>this.itemsInformationBean.itemQuantityReceived){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Used Quantity Can't Be Greater Than Receive Quanity" });
    }
    else if (this.itemsInformationBean.transactionType == undefined || this.itemsInformationBean.transactionType.trim() == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Transaction Type Can't Be Blank." });
    }
    else if(this.itemsInformationBean.transactionNumber==undefined || this.itemsInformationBean.transactionNumber.trim()==''){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "MRN/SRN No. Can't Be Blank." });
    }
    
    
    // else if ((this.itemsInformationBean.purchasedDate!=undefined && this.itemsInformationBean.guarantyEndDate!=undefined)&&(this.itemsInformationBean.purchasedDate>this.itemsInformationBean.guarantyEndDate)) {
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Purchase Date can't be greater than Guaranty End Date!" });
    // }
    // else if ((this.itemsInformationBean.purchasedDate!=undefined && this.itemsInformationBean.warrantyEndDate!=undefined)&&(this.itemsInformationBean.purchasedDate>this.itemsInformationBean.warrantyEndDate)) {
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Purchase Date can't be greater than Warranty End Date!" });
    // }   
    // else if ((this.itemsInformationBean.rentStartDate!=undefined && this.itemsInformationBean.rentEndDate!=undefined)&&(this.itemsInformationBean.rentStartDate>this.itemsInformationBean.rentEndDate)) {
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Rent Start Date can't be greater than Rent End Date!" });
    // } 
    
    else{     
if(!this.editFlag){
  this.showPageSpinner=true;  
      this.itemsInformationBean.createdBy=this.currentuser.userID;
      
      this.httpRestClient.postData("add-received-items",this.itemsInformationBean).subscribe(response=>{
        this.baseResponse = response;
        this.showPageSpinner=false;  
        if (this.baseResponse['code'] == 'ADDED') {
            sessionStorage.setItem("successMessage", "AddedSuccess");
            this.router.navigate(['/receive-items']);
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
        });
    }
    else{     
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
  }
//   checkItemSerialNumber(numberOfitems,itemsSerialNumber):boolean{
//   let serialNumberArray=[];
//   this.msgs=[];
//     serialNumberArray=itemsSerialNumber.toString().split(",");
//    if(numberOfitems<serialNumberArray.length){
//     this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item SR No. can't be greater than "+numberOfitems});
//     return true;
//    }
//    else if(numberOfitems>serialNumberArray.length){
//     this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item SR No. can't be less than "+numberOfitems});
//     return true;
//    }
//    else{
//    for(let count=0;count<serialNumberArray.length;count++){
//      if(serialNumberArray[count].trim()==''){
//       this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item SR No. can't be empty."});
//        return true;
//      }
//     }
//    }
//    return false;
// }
dateTimeCheck(){
  if(this.itemsInformationBean.receivedDate!=undefined)
  this.itemsInformationBean.receivedDate=new Date(this.itemsInformationBean.receivedDate);
  // if(this.itemsInformationBean.rentEndDate!=undefined)
  // this.itemsInformationBean.rentEndDate=new Date(this.itemsInformationBean.rentEndDate);
  // if(this.itemsInformationBean.rentStartDate!=undefined)
  // this.itemsInformationBean.rentStartDate=new Date(this.itemsInformationBean.rentStartDate);
  // if(this.itemsInformationBean.purchasedDate!=undefined)
  // this.itemsInformationBean.purchasedDate=new Date(this.itemsInformationBean.purchasedDate);
  // if(this.itemsInformationBean.guarantyEndDate!=undefined)
  // this.itemsInformationBean.guarantyEndDate=new Date(this.itemsInformationBean.guarantyEndDate);
  // if(this.itemsInformationBean.warrantyEndDate!=undefined)
  // this.itemsInformationBean.warrantyEndDate=new Date(this.itemsInformationBean.warrantyEndDate);
}
editReceivedItems(receivedItemId) {
  this.showPageSpinner=true; 
  this.payLoadBean.id = receivedItemId;
  this.editFlag = true;
  this.formHeader="Edit Recieve Items";
  this.payLoadBean.signatureKey=appConfig.privateKey;
  
  this.httpRestClient.postData("edit-received-item", this.payLoadBean)
    .subscribe(response => {           
    this.itemsInformationBean = response;     
    console.log(this.itemsInformationBean);
    this.callAPIforParticularItem(this.itemsInformationBean.assetItemId.assetItemID);
  // this.itemsInformationBean.itemQuantity="1";
   this.dateTimeCheck();
    
      // if(this.itemsInformationBean.transactionType=="Rented"){
      //   this.rentInformationFlag = true;
      // }
      // else if (this.itemsInformationBean.transactionType == "Purchased") {
      //   this.purchasedInformationFlag = true;
      // }
      //this.breadLabel = 'Edit Vendor';
      this.breadcrumbService.setItems([
        { label: 'Operations' },
        { label: 'Vendors', routerLink: ['/vendors'] },
        { label: "Edit Received-Items" }
      ]);   
      this.showPageSpinner=false;     
    });
}
}


