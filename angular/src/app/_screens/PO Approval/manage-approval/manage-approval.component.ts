
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Router } from '@angular/router';

import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { User, CurrentUser } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { appConfig, messageConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { DeleteRecords, CircleEntityTO } from '../../../_screens/circles/circles';
import { ParameterListBean, ParameterListEntityTO } from '../../../_screens/parameters/parameters';
import { Project } from '../../../_screens/projects/project';
import { POApprovalTo} from '../POApproval';
import { DateFormatPipe } from '../../../_core/date-format';
import { MessageService } from 'primeng/components/common/messageservice';
import { ProjectService } from '../../../_screens/projects/project-services';
import {  Constants } from '../../../app.config';
@Component({
  selector: 'app-manage-approval',
  templateUrl: './manage-approval.component.html',
  styleUrls: ['./manage-approval.component.css'],
  styles: [`
  .ui-dialog-content.ui-widget-content {height: 450px !important;overflow-y: scroll;}
  `],
  providers: [MessageService, ProjectService, DateFormatPipe]
})
export class ManageApprovalComponent implements OnInit {
  showPageSpinner:boolean;
  circleSearch: CircleEntityTO[];
  cols: any[];
  approvedCols:any;
  user: User = new User();
  status: any[];
  status2:any[];
  msgs: Message[] = [];
  selectedCircle: any;
  deleteRecords: DeleteRecords;
  baseResponse: any;
  dateFormat: any;
  currentuser: CurrentUser = new CurrentUser();
  projectStatusList:ParameterListEntityTO[]=[];
  projectSearch: Project[];
  poApprovalTo:POApprovalTo[];
  poApprovalItem:POApprovalTo[]=[];  
  selectedPOApproval:any[]=[];
  poApproval: POApprovalTo = new POApprovalTo();
  poStatusValue:String;
  displayPOStatusDialog : boolean=false;
  poTypeValue:String;
  poStatusDialogHeader :string;
  poEditApprovalFlag:boolean;
  hideContractor:boolean;
  editOnApprovalDisable=false;
  constructor(private httpRestClient: HttpRestClient,
    private router: Router, public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService, private confirmationService: ConfirmationService, private dateFormatPipe: DateFormatPipe) {

    this.roleRightsGuard.hasAllRoles(routeConfig.circleMenu);

    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.breadcrumbService.setItems([
      { label: 'Aerial' },
      { label: 'PO Approvals', routerLink: ['/approval'] }
    ]);
    if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    this.httpRestClient.getData("parameter-list-drop-down/PO_STATUS") .subscribe(
      response => {       
         this.projectStatusList=response;              
         this.poStatusValue=this.projectStatusList[0].parameterListValue;
         this.poTypeValue=appStatusConfig.allName;
                  this.getApprovalData();
      }
     );   
     
  }

  ngOnInit() {
    this.dateFormat = Constants.DATE_FMT_TS;
    // this.status = [
    
    //   { label: "Pending", value: appStatusConfig.inactiveName },
    //   { label: "Approval", value: appStatusConfig.allName },
    //   { label: "Rejected", value: appStatusConfig.allName },
    //   { label: "All", value: appStatusConfig.activeName },
    // ];
    this.status2 = [
      { label: appStatusConfig.allName, value: appStatusConfig.allName },
      { label: appStatusConfig.contractor, value: appStatusConfig.contractor },
      { label: appStatusConfig.supplier, value: appStatusConfig.supplier },
      
     
    ];

    this.cols = [
      { field: 'contactType', header: 'PO Type', id: 'poID' },
      { field: 'businessName', header: 'Name' },
      { field: 'circleName', header: 'Circle'},
      // { field: 'contactType', header: 'Supplier/Contractor' },
      { field: 'activity', header: 'PO Actitvity' },
      { field: 'poDate', header: 'PO Date', class:"center-align" },
      { field: 'poAmount', header: 'PO Amount',class:"center-align" },
      { field: 'poApprovalStatus', header: 'PO Status',class:"center-align" },
      { field: 'userName', header: 'User Name',class:"center-align"},
     
    ];
    // this.approvedCols = [
    //   { field: 'itemName', header: 'Item Name', id: 'poItemID' },
    //   { field: 'itemQty', header: 'Requested Qty' },
    //   { field: 'sum_approvedQty', header: 'Approved Qty'},
    //   { field: 'sum_itemQty', header: 'Ordered Qty' },      
    //   { field: 'approvedQty', header: 'BOQ Qty'},
    // ];
    this.approvedCols = [
      { field: 'itemName', header: 'Item Name', id: 'poItemID' },
      { field: 'sum_itemQty', header: 'BOQ Qty', class:"center-align" },
      { field: 'sum_approvedQty', header: 'Ordered Qty' , class:"center-align" },    
      { field: 'itemQty', header: 'Requested Qty' , class:"center-align"  },     
      { field: 'approvedQty', header: 'Approved Qty' , class:"center-align" },
    ];
  }
  //   this.httpRestClient.getData("search-circle").subscribe(
  //     response => {
  //       this.circleSearch = response;
  //     });
  // }
  /*loadProject(event){
    this.httpRestClient.getData("project/"+event.value.parameterListCode+"") .subscribe(
      response => {  
         this.projectSearch=response;      
     }
    )
  }*/
  closeDialog(){
    this.displayPOStatusDialog=false;
    this.getApprovalData();
  }
  editPOStatus(rowData){
     if(rowData.contactType=='Contractor'){
      this.hideContractor=true;
     }else if(rowData.contactType=='Supplier'){
      this.hideContractor=false;
     }
     this.showPageSpinner=true;
    this.httpRestClient.getData("search-for-edit-Approval-po/"+ rowData.poID).subscribe(
      response => {        
        this.poApproval = response;           
        this.poApproval.poDate=new Date(this.poApproval.poDate);
        this.poApproval.startDate=new Date(this.poApproval.startDate);
        this.httpRestClient.getData("search-po-items/"+ rowData.poID).subscribe(
          response => {                  this.poApprovalItem = response;            });   
        this.showPageSpinner=false;
      }); 
 
    
if(this.poApproval.poApprovalStatus=="Approved"){
    this.poEditApprovalFlag=true;
}
    this.poStatusDialogHeader="PO Approval"
    this.displayPOStatusDialog=true;
  }
  changePoStatus(event) {
    this.user = JSON.parse(sessionStorage.getItem("credentials"));   
   this.poStatusValue=event.value.parameterListValue;
   this.showPageSpinner=true;
   if(this.poStatusValue=="Approved"){
    this.editOnApprovalDisable=true;
   }
   else{
    this.editOnApprovalDisable=false;
   }
   this.getApprovalData();

  }
  changePoType(event) {
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
     this.poTypeValue=event.value;
     this.getApprovalData();
  }
  
  // setradio(value){
  //   this.poStatusValue=value;
   
  //     this.msgs = [];
  //     if ((this.poStatusValue == undefined ||this.poStatusValue == "rejected")) {
  //       this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Notes can't be blank!" });
  //   }
  // }

getApprovalData(){
  this.httpRestClient.getData("search-po-approval/"+ this.poStatusValue + "/"+ this.poTypeValue).subscribe(
    response => {        
      this.poApprovalTo = response;
      this.showPageSpinner=false;
    });   
}


// save button working in po Approval
addPOApprovals(){
  this.msgs = []; 
  if(this. poApproval.poStatus == undefined ){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select One option!" });
  }
  else if ((this. poApproval.poStatus == "Rejected") && (this.poApproval.notes==undefined || this.poApproval.notes.trim()=='') ) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Notes cannot be blank!" });
    }  
     else {
    for(let i=0;i<this.poApprovalItem.length;i++){      
      if(this.poApprovalItem[i].approvedQty >this.poApprovalItem[i].itemQty){
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail:"Boq Qty of "+this.poApprovalItem[i].itemName +" can't be greater than Requested Qty" });
      return;
      }     
    }    
     this.poApproval.purchaseOrderItemList = this.poApprovalItem;
 
    this.httpRestClient.putData("update-approval", this.poApproval).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'UPDATED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
          this.displayPOStatusDialog = false;
          this.getApprovalData();
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
    });
   
}
}
}


