import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ReportBean, ReportTo } from '../reports';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { DatePipe } from '@angular/common';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { routeConfig, Constants } from '../../../app.config';
import { DateFormatPipe } from '../../../_core/date-format';
import { CurrentUser } from '../../../_models/data.model';

@Component({
  selector: 'app-site-status-report',
  templateUrl: './site-status-report.component.html',
  styleUrls: ['./site-status-report.component.css'],
  providers:[DatePipe,DateFormatPipe]
})
export class SiteStatusReportComponent implements OnInit {
  showPageSpinner:boolean=false;
  reportTo: ReportTo[] = [];
  cols: any[] = [];
  msgs: Message[] = [];
  dateFormat: any;
  circleNameList:any[]=[];
  customerNameList:any[]=[];
  projectSiteTypeList:any[]=[];
  currentuser: CurrentUser = new CurrentUser();
  remarks:any;
  reportBean: ReportBean = new ReportBean();

  showSpinner:boolean;
  constructor(private httpRestClient: HttpRestClient,private dateFormater: DatePipe,public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService) {        
    this.roleRightsGuard.hasAllRoles(routeConfig.siteStatusReport);

    this.breadcrumbService.setItems([
      { label: 'Reports' },
      { label: 'Site Status Report' }
    ]);
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.reportBean.userID=this.currentuser.userID;
    this.showPageSpinner=true;
    this.httpRestClient.postData("circle-name",this.reportBean).subscribe(response=>{
      this.circleNameList=response;            
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
      { field: 'siteID', header: 'Site ID' , class: 'last-row center-align'},
      { field: 'siteType', header: 'Project Category' , class: 'last-row center-align'},
      { field: 'allocationDate', header: 'Allocation date', class: 'last-row center-align' },
      { field: 'statusDate', header: 'Status Date', class: 'last-row center-align' },
      { field: 'projectStatus', header: 'Status', class: 'last-row center-align' },
      { field: 'customerPOAmount', header: 'Customer PO Amount', class: 'last-row center-align' },
      { field: 'supplierBoqTotal', header: 'Supplier Total Budget', class: 'last-row center-align' },
      { field: 'supplierPOAmount', header: 'Supplier PO Amount' , class: 'last-row center-align' },
      { field: 'supplierFRAmount', header: 'Supplier Funds released', class: 'last-row center-align'  },
      { field: 'contractorPOAmount', header: 'Contractor PO Amount' , class: 'last-row center-align' },
      { field: 'contractorFRAmount', header: 'Contractor Funds released', class: 'last-row center-align'  },
      { field: 'totalPOAmount', header: 'Total PO Amount', class: 'last-row center-align' },
      { field: 'totalFRAmount', header: 'Total Funds released', class: 'last-row center-align' }
   
    ];
  
  
  }

  getReports() { 
    this.msgs = [];
    if (this.reportBean.allocationDate == undefined && this.reportBean.circle==undefined && 
        this.reportBean.contact==undefined && this.reportBean.completionDate==undefined && this.reportBean.siteType==undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select atlease one Circle and Customer." });
    }  else if(this.reportBean.circle==undefined || this.reportBean.contact==undefined){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select atlease one Circle and Customer." });
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
      this.httpRestClient.postData("site-status-report-onBasis-search-criteria", this.reportBean)
        .subscribe(response => {
          this.reportTo = response;
          if(this.reportTo.length==0){
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Record(s) not found." });
           
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
