import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { routeConfig, appConfig, Constants, messageConfig } from '../../../app.config';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ConfirmationService } from 'primeng/api';
import { PayloadBean, CurrentUser, DeleteRecords } from '../../../_models/data.model';
import { DateFormatPipe } from '../../../_core/date-format';
import { MessageService } from 'primeng/components/common/messageservice';
import { ItemsInformationBean } from '../items';

@Component({
  selector: 'app-receive-items',
  templateUrl: './manage-receive-items.component.html',
  styleUrls: ['./manage-receive-items.component.css'],
  providers: [MessageService, DateFormatPipe]
})
export class ManageReceiveItemsComponent implements OnInit {
  showPageSpinner:boolean
  status: any[];
  cols: any[];
  receivedItemsList: any[];
  assetItemsAutoLookupList: any[]=[];
  deleteRecords: DeleteRecords;
  payLoadBean: PayloadBean = new PayloadBean();
  currentuser: CurrentUser = new CurrentUser();
  itemsInformationBean: ItemsInformationBean = new ItemsInformationBean();
  msgs:any[]=[];
  selectedReceiveItems:any;
  baseResponse: any;
  dateformat:any;
  filteredSingleItem:any;
  resetFlag:boolean=true;
  constructor(private httpRestClient: HttpRestClient,
    private router: Router,
    private route: ActivatedRoute,
    public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,private dateFormatPipe: DateFormatPipe) {


      this.roleRightsGuard.hasAllRoles(routeConfig.recieveItemMenu);
        //For Success Message Bussiness Logic
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));   
    if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
      this.msgs = [];
      this.msgs.push({ severity:'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
      this.msgs = [];
      this.msgs.push({ severity:'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Receive Items' }
    ]);
   
    this.payLoadBean.signatureKey = appConfig.privateKey;
    this.payLoadBean.searchParameter = "Active";
 
     this.httpRestClient.postData("search_asset_items", this.payLoadBean).subscribe(response => {
      this.assetItemsAutoLookupList = response;   
      if(this.assetItemsAutoLookupList.length!=0){
        this.itemsInformationBean.assetItemId=this.assetItemsAutoLookupList[0];
      }
     
    
    });
this.payLoadBean.searchParameter="All";
  }

  ngOnInit() {
    this.dateformat = Constants.DATE_FMT_TS;
    this.cols = [
      { field: 'itemName', header: 'Item Name', id: "stockItemId" },
      { field: 'itemCode', header: 'Item Code' },
      { field: 'mrnSRN', header: 'MRN/SRN No.' },
      { field: 'receivedDate', header: 'Received Date', class: "center-align" },
      { field: 'itemType', header: 'Item Type', class: "center-align" },
      { field: 'transactionType', header: 'Transaction Type', class: "center-align" },
    ];


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
  addReceive() {

    if (this.roleRightsGuard.roleRights.insertAccess) {
    this.router.navigate(['receive-items/add-receive-items']);
  }
}
  SearchReceivedItems() {
    this.clearGridList();
    if(this.itemsInformationBean.assetItemId==null){
      this.msgs=[];
       this.msgs.push({severity:'error',summary:'Error Message',detail:'Item is Mandatory!'});      
    return;
    }
    
    this.showPageSpinner = true;
    this.payLoadBean.id=this.itemsInformationBean.assetItemId.assetItemID;
    this.payLoadBean.signatureKey = appConfig.privateKey;  
      this.httpRestClient.postData("received-items-list", this.payLoadBean).subscribe(
      respose => {
        console.log(respose);
        this.receivedItemsList = respose;
        this.resetFlag=false;
        this.showPageSpinner=false;
      });

  }
  clearItem(){
    this.itemsInformationBean.assetItemId=null;
  }
  clearGridList(){   
    this.receivedItemsList=[];    
  }
  editReceive(receivedItemId) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
      var ciphertext = CryptoJS.AES.encrypt(receivedItemId.toString(), appConfig.privateKey);
      this.router.navigate(['receive-items/edit-receive-items', ciphertext.toString()]);
  }
  }

  confirm(){
    console.log(this.selectedReceiveItems.stockItemId);
   if (this.roleRightsGuard.roleRights.deleteAccess) {
      this.msgs = [];
      if (this.selectedReceiveItems == null || this.selectedReceiveItems == undefined) {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      } else if (this.selectedReceiveItems.length != 0) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteReceiveItems();
          },
          reject: () => {
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
          }
        });
      } else {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      }
    }
  }
  deleteReceiveItems(){
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedReceiveItems.stockItemId;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedReceiveItems.transactionCount;
    this.httpRestClient.deleteData("delete-receive-item", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.receivedItemsList.indexOf(this.selectedReceiveItems);
          if (index !== -1) {
            this.receivedItemsList.splice(index, 1);
          }
         
        } else {        
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      });
  }
  reset(){
    this.clearGridList();
    this.resetFlag=true;
  }
  
}
