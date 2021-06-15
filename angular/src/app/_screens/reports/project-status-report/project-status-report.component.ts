import { Component, OnInit } from '@angular/core';
import { ReportTo, ReportBean } from '../reports';

import { CurrentUser } from '../../../_models/data.model';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { DatePipe } from '@angular/common';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { routeConfig, Constants } from '../../../app.config';
import { Message } from 'primeng/api';
import { DateFormatPipe } from '../../../_core/date-format';

@Component({
  selector: 'app-project-status-report',
  templateUrl: './project-status-report.component.html',
  styleUrls: ['./project-status-report.component.css'],
  providers:[DatePipe,DateFormatPipe]
})
export class ProjectStatusReportComponent implements OnInit {
  showPageSpinner:boolean=false;
  reportTo: any[] = [];
  cols: any[] = [];
  errormsgs: Message[] = [];
  dateFormat: any;
  circleNameList:any[]=[];
  customerNameList:any[]=[];
  projectSiteTypeList:any[]=[];
  currentuser: CurrentUser = new CurrentUser();
  remarks:any;
  reportBean: ReportBean = new ReportBean();
  exportFileName="MIS_PO_Wise_Report";
  showSpinner:boolean;
  forAllData: any;

  constructor(private httpRestClient: HttpRestClient,private dateFormater: DatePipe,public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService) {        
    this.roleRightsGuard.hasAllRoles(routeConfig.projectStatusReport);


    this.breadcrumbService.setItems([
      { label: 'Reports' },
      { label: 'MIS PO Wise Report' }
    ]);
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.forAllData = {

      circleName: "All"
    }

  }

  ngOnInit() {
    this.reportBean.userID=this.currentuser.userID;
    this.showPageSpinner=true;
    this.httpRestClient.postData("circle-name",this.reportBean).subscribe(response=>{
      this.circleNameList=response;    
      this.circleNameList.push(this.forAllData);        
    });    
    this.httpRestClient.getData("category-autolookup").subscribe(
      response => {
        this.projectSiteTypeList = response; 
       this.showPageSpinner=false;
      });
     
    this.dateFormat = Constants.DATE_FMT_TS;
    this.cols = [      
      { field: 'circleName', header: 'Circle', class: 'last-row center-align' },
      { field: 'customerName', header: 'Customer', class: 'last-row center-align' },
      { field: 'siteName', header: 'Site Name' , class: 'last-row center-align'},
      { field: 'siteID', header: 'Site ID' , class: 'last-row center-align'},
      { field: 'projectCategory', header: 'Project Category' , class: 'last-row center-align'},
      { field: 'allocationDate', header: 'Allocation date', class: 'last-row center-align' },
      { field: 'statusDate', header: 'Status Date', class: 'last-row center-align' },
      { field: 'projectStatus', header: 'Project Status', class: 'last-row center-align' },
      // { field: 'customerPOAmount', header: 'Customer PO Amount', class: 'last-row center-align' },
      // { field: 'customerInvoiceAmount', header: 'Customer Invoice Amount', class: 'last-row center-align' },
      { field: 'suplConame', header: 'Supplier/Contractor', class: 'last-row center-align' },
     { field: 'name', header: 'Supplier/Contractor Name', class: 'last-row center-align' },
      { field: 'activityName', header: 'Activity Name', class: 'last-row center-align' },
      { field: 'poNumber', header: 'PO No.', class: 'last-row center-align' },
      { field: 'poDate', header: 'PO Date', class: 'last-row center-align' },
      { field: 'poAmount', header: 'PO Amount' , class: 'last-row center-align' },
      { field: 'frAmount', header: 'Funds Request', class: 'last-row center-align'  },
      { field: 'paymentAmount', header: 'Funds Released', class: 'last-row center-align'  },
      { field: 'invoiceAmount', header: 'Invoice Amount', class: 'last-row center-align'  },   
    ];
  
  
  
  }

  getReports() { 
      this.errormsgs = [];
    if ((this.reportBean.circle != undefined && this.reportBean.circle.circleName != 'All') &&
    this.reportBean.allocationDate == undefined && this.reportBean.circle==undefined && 
        this.reportBean.contact==undefined && this.reportBean.completionDate==undefined && this.reportBean.siteType==undefined) {
       this.errormsgs.push({ severity: 'error', summary: 'Error Message', detail: "please select atlease one Circle and Customer." });
    }  else if((this.reportBean.circle != undefined && this.reportBean.circle.circleName != 'All') &&(
    this.reportBean.circle==undefined || this.reportBean.contact==undefined)){
      this.errormsgs.push({ severity: 'error', summary: 'Error Message', detail: "please select atlease one Circle and Customer." });
    } else {   
      this.showPageSpinner=true;    
       if(this.reportBean.circle!=undefined){
         this.reportBean.circleID=this.reportBean.circle.circleID;
       }
       if(this.reportBean.contact!=undefined){
         this.reportBean.contactID=this.reportBean.contact.contactID;         
       }
       if(this.reportBean.siteType!=undefined){
         this.reportBean.siteTypeID=this.reportBean.siteType.categoryID;
       }      
       if (this.reportBean.circle != undefined && this.reportBean.circle.circleName == 'All') {
        this.reportBean.contactID=undefined
    }
      this.httpRestClient.postData("project-status-report-onBasis-search-criteria", this.reportBean)
        .subscribe(response => {
          this.reportTo = response;          
          if(this.reportTo.length==0){
            this.errormsgs.push({ severity: 'error', summary: 'Error Message', detail: "Record(s) not found." });
           
          } 
          this.showPageSpinner=false;
        });
    }
  }
  resetAll(){
    // this.showPageSpinner=true;
    this.reportBean.circle=undefined;
    this.reportBean.contact=undefined;
    this.reportBean.siteType=undefined;
    this.reportBean.allocationDate=undefined;
    this.reportBean.completionDate=undefined;
    this.reportBean.circleID=undefined;
    this.reportBean.contactID=undefined;
    this.reportBean.siteTypeID=undefined;
    this.customerNameList=undefined;
    this.reportTo=[];
    // this.httpRestClient.postData("site-status-report",this.reportBean).subscribe(response=>{
    //   this.reportTo=response;    
    //   this.showPageSpinner=false;
    // });
  }
  onCircleClick(event){
    this.reportBean.userID=this.currentuser.userID;
    this.reportBean.circleID=event.value.circleID;
    this.httpRestClient.postData("customer-name",this.reportBean).subscribe(response=>{
      this.customerNameList=response;   
    });
  }
}
