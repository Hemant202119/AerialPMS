import { Component, OnInit } from '@angular/core';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Message } from 'primeng/components/common/message';
import { ConfirmationService } from 'primeng/api';
import { messageConfig, appConfig, routeConfig } from '../../../app.config';
import * as CryptoJS from 'crypto-js';
import { PayloadBean, CurrentUser } from '../../../_models/data.model';
import { ManageUseItemsTO, ReceivedItemsList } from '../useItems';

@Component({
  selector: 'app-manage-use-items',
  templateUrl: './manage-use-items.component.html',
  styleUrls: ['./manage-use-items.component.css']
})
export class ManageUseItemsComponent implements OnInit {
  msgs:any[];
  cols: any[];
  showPageSpinner:boolean;
  selectedEmployee: any;
  selectedVendor: any;
  displayDialog: boolean;
 
  payloadBean: PayloadBean = new PayloadBean();
  currentuser: CurrentUser = new CurrentUser();
  filteredProjectItem:any;
  autoLookUpProjectList: any[]=[];
  filteredSingleItem:any;
  assetItemsAutoLookupList:any[]=[];
  receivedItemsList:ReceivedItemsList[]=[];
  manageUseItemsTO:ManageUseItemsTO= new ManageUseItemsTO();
  constructor(
    private httpRestClient: HttpRestClient,
    public roleRightsGuard: RoleRightsGuard,
    private router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
      this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
      this.roleRightsGuard.hasAllRoles(routeConfig.useItemsMenu);
    this.payloadBean.id = this.currentuser.userID;
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Use Items' },
    ]);
    this.httpRestClient.postData("project_autoLookUp", this.payloadBean).subscribe(response => {
      this.autoLookUpProjectList=response;
     });
     this.payloadBean.searchParameter='Active';
     this.httpRestClient.postData("search_asset_items", this.payloadBean).subscribe(response => {
      this.assetItemsAutoLookupList = response; 
    });
   
    if(sessionStorage.getItem("successMessage")=='AddedSuccess'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");

    }
    if(sessionStorage.getItem("successMessage")=='UpdateSuccess'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");

    }
  }
  ngOnInit() {
  
    this.cols = [
      { field: 'projectName', header: 'Project Name ', class: "table-employee-Code",id:"stockItemId" },
      { field: 'businessName', header: 'Supplier Name', class: "table-company-code" },
      { field: 'itemName', header: 'Item Name  ', class: "table-display-name" },
      { field: 'transactionType', header: 'Transaction Type', class: "table-company-address" },
      { field: 'receivedDate', header: 'Received Date', class: "table-status-dsdsd" },
      { field: 'itemQuantityReceived', header: 'Item Quantity Received', class: "table-display-name" },
      { field: 'itemQuantityUsed', header: 'Item Quantity Used', class: "table-status-type" },
      { field: 'itemQuantityWasted', header: 'Item Quantity Wasted', class: "table-status-type" },
      { field: 'itemQuantityBalance', header: 'Item Quantity Balance', class: "table-status-type" }
    ];

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

  searchIssuedItems(){
    
    if(this.manageUseItemsTO.project==undefined || this.manageUseItemsTO.project==null){
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Project Name Can't Be Blank" });
    }
    else{
    this.showPageSpinner = true;
    this.manageUseItemsTO.signatureKey = appConfig.privateKey;  
      this.httpRestClient.postData("received-items-useList", this.manageUseItemsTO).subscribe(
      respose => {
        this.receivedItemsList = respose;
        this.showPageSpinner=false;
      });
    }}

    editUseItems(stockItemId){
      if (this.roleRightsGuard.roleRights.viewAccess) {
      var ciphertext = CryptoJS.AES.encrypt(stockItemId.toString(), appConfig.privateKey);
      this.router.navigate(['manage-use-items/edit-use-items', ciphertext.toString()]);
    }
  }
  
  
}