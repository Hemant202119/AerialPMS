import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ReportBean, ReportTo, MISReportTO } from '../reports';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { routeConfig, Constants } from '../../../app.config';
import { DateFormatPipe } from '../../../_core/date-format';
import { DatePipe } from '@angular/common';
import { CurrentUser } from '../../../_models/data.model';


@Component({
  selector: 'app-mis-status-report',
  templateUrl: './mis-status-report.component.html',
  styleUrls: ['./mis-status-report.component.css'],

})
export class MisStatusReportComponent implements OnInit {
  showPageSpinner: boolean = false;
  reportTo: ReportTo[] = [];
  misReportTO: MISReportTO[] = [];
  cols: any[] = [];
  currentuser: CurrentUser = new CurrentUser();
  msgs: Message[] = [];
  dateFormat: any;
  circleNameList: any[] = [];
  customerNameList: any[] = [];
  projectSiteTypeList: any[] = [];

  remarks: any;
  reportBean: ReportBean = new ReportBean();

  showSpinner: boolean;
  forAllData: any;


  constructor(private httpRestClient: HttpRestClient, public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService) {
    this.roleRightsGuard.hasAllRoles(routeConfig.siteStatusReport);
    //this.user = JSON.parse(sessionStorage.getItem("credentials"));
    // this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.breadcrumbService.setItems([
      { label: 'Reports' },
      { label: 'MIS Status Report' }
    ]);
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.forAllData = {

      circleName: "All"
    }

  }

  ngOnInit() {
    this.showPageSpinner = true;
    this.reportBean.userID = this.currentuser.userID;
    this.httpRestClient.postData("circle-name", this.reportBean).subscribe(response => {

      this.circleNameList = response;
      this.circleNameList.push(this.forAllData);
    });

    this.httpRestClient.getData("category-autolookup").subscribe(
      response => {
        this.projectSiteTypeList = response;
        this.showPageSpinner = false;
      });

    this.dateFormat = Constants.DATE_FMT_TS;
    this.cols = [
      { field: 'circleName', header: 'Circle', class: 'last-row center-align' },
      { field: 'customerName', header: 'Customer', class: 'last-row center-align' },
      { field: 'siteName', header: 'Site Name', class: 'last-row center-align' },
      { field: 'siteID', header: 'Site ID', class: 'last-row center-align' },
      { field: 'siteType', header: 'Project Category', class: 'last-row center-align' },
      { field: 'allocationDate', header: 'Allocation date', class: 'last-row center-align' },
      { field: 'statusDate', header: 'Status Date', class: 'last-row center-align' },
      { field: 'projectStatus', header: 'Last Updated Site Status', class: 'last-row center-align' },
      { field: 'customerPOTotal', header: 'Customer PO Total', class: 'last-row center-align' },
      { field: 'customerInvoiceAmount', header: 'Customer Invoice Amount', class: 'last-row center-align' },
      { field: 'supplierBudgetTotal', header: 'Supplier Budget Total', class: 'last-row center-align' },
      { field: 'supplierPOTotal', header: 'Supplier PO Total ', class: 'last-row center-align' },
      { field: 'supplierPendingBudgetUtilisation', header: 'Supplier Pending Budget utilisation', class: 'last-row center-align' },
      { field: 'contractorPOTotal', header: 'Contractor  PO Total', class: 'last-row center-align' },
      { field: 'poTotal', header: 'PO Total', class: 'last-row center-align' },
      { field: 'fundRequestedTotal', header: 'Funds Requested Total', class: 'last-row center-align' },
      { field: 'fundReleasedTotal', header: 'Funds released Total', class: 'last-row center-align' },
      { field: 'fundNotReleased', header: 'Funds requested but not released total', class: 'last-row center-align' },
      { field: 'fundReleasedInvoicePending', header: 'Funds released, Invoice pending', class: 'last-row center-align' },
      { field: 'invoiceBasicAmount', header: 'Invoice Basic Amount', class: 'last-row center-align' },
      { field: 'invoiceGSTAmount', header: 'Invoice GST Amount', class: 'last-row center-align' },
      // { field: 'invoiceReceivedPaymentPendingAmount', header: 'Invoices Received but Payment Pending', class: 'last-row center-align' },         
    ];
    // this.httpRestClient.postData("mis-status-report",this.reportBean).subscribe(response=>{
    //   this.misReportTO=response;
    //   
    // });

  }

  getReports() {
    this.msgs = [];

    if ((this.reportBean.circle != undefined && this.reportBean.circle.circleName != 'All') && this.reportBean.allocationDate == undefined && this.reportBean.circle == undefined &&
      this.reportBean.contact == undefined && this.reportBean.completionDate == undefined && this.reportBean.siteType == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select atlease  one Circle and Customer." });
    }
    else if ((this.reportBean.circle != undefined && this.reportBean.circle.circleName != 'All') && (this.reportBean.circle == undefined || this.reportBean.contact == undefined)) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select atlease one Circle and Customer." });
    }
    else {
      this.showPageSpinner = true;
      if (this.reportBean.circle != undefined) {
        this.reportBean.circleID = this.reportBean.circle.circleID;
      }
      if (this.reportBean.contact != undefined) {
        this.reportBean.contactID = this.reportBean.contact.contactID;
      }
      if (this.reportBean.siteType != undefined) {
        this.reportBean.siteTypeID = this.reportBean.siteType.categoryID;
      }
      if (this.reportBean.circle != undefined && this.reportBean.circle.circleName == 'All') {
          this.reportBean.contactID=undefined
      }
      this.httpRestClient.postData("mis-status-report-onBasis-search-criteria", this.reportBean)
        .subscribe(response => {
          this.misReportTO = response;
          if (this.misReportTO.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Record(s) not found." });

          }
          this.showPageSpinner = false;
        });
    }
  }
  resetAll() {
    //this.showPageSpinner=true;
    this.reportBean.circle = undefined;
    this.reportBean.contact = undefined;
    this.reportBean.siteType = undefined;
    this.reportBean.allocationDate = undefined;
    this.reportBean.completionDate = undefined;
    this.reportBean.circleID = undefined;
    this.reportBean.contactID = undefined;
    this.reportBean.siteTypeID = undefined;
    this.customerNameList = undefined;
    this.misReportTO = [];
    // this.httpRestClient.postData("mis-status-report",this.reportBean).subscribe(response=>{
    //   this.misReportTO=response;
    //   this.showPageSpinner=false;    
    // });
  }
  onCircleClick(event) {
    this.reportBean.userID = this.currentuser.userID;
    this.reportBean.circleID = event.value.circleID;
    this.httpRestClient.postData("customer-name", this.reportBean).subscribe(response => {
      this.customerNameList = response;
    });
  }
}
