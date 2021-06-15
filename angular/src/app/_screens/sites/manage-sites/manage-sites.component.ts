import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, SelectItem } from 'primeng/api';
import { CurrentUser, DeleteRecords, PayloadBean } from '../../../_models/data.model';
import { Statuses } from '../../../_models/applicationparameter';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { messageConfig, appConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { SiteEntityTO } from '../sites';
import * as CryptoJS from 'crypto-js';
import { ParameterService } from '../../parameters/parameter-service';
import { SiteService } from '../site-service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  selector: 'app-manage-sites',
  templateUrl: './manage-sites.component.html',
  styleUrls: ['./manage-sites.component.css'],
  providers: [SiteService]
})
export class ManageSitesComponent implements OnInit {

  //Required Fields for every screen.
  showPageSpinner:boolean;
  msgs: Message[] = [];
  currentuser: CurrentUser = new CurrentUser();
  payloadBean: PayloadBean = new PayloadBean();
  deleteRecords: DeleteRecords;
  baseResponse: any;
  status: SelectItem[];
  cols: any[];

  //Fields for this Screen
  siteList: SiteEntityTO[];
  selectedSite: any;
   message:string;
  constructor(
    private httpRestClient: HttpRestClient,
    private router: Router,
    private route: ActivatedRoute,
    public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.siteMenu);

    this.breadcrumbService.setItems([
      { label: 'Administration' },
      { label: 'Sites' }
    ]);

    //For Success Message Bussiness Logic
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
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

    //API Call 
    this.showPageSpinner=true;
    this.payloadBean = new PayloadBean();
    this.payloadBean.accountId = this.currentuser.accountID;
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.httpRestClient.postData("fetch-sites", this.payloadBean).subscribe(
      response => {
        this.siteList = response;
        this.showPageSpinner=false;
      }
    );

  }
  ngOnInit() {

    this.status = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName },
      { label: appStatusConfig.allName, value: appStatusConfig.allName }
    ];

    this.cols = [
      { field: 'siteName', header: 'Site Name', class: "table-site-name", id: 'siteID' },
      { field: 'siteCode', header: 'Site Code', class: "table-site-code" },
      { field: 'siteTypeValue', header: 'Site Type', class: "table-site-type" },
      { field: 'siteStatus', header: 'Status', class: "table-status-type" },
      { field: 'city', header: 'City', class: "table-city" },
      { field: 'state', header: 'State', class: "table-state" }
    ];

  }

  searchSites(event) {
    this.showPageSpinner=true;
    this.payloadBean.searchParameter = event.value;
    this.httpRestClient.postData("fetch-sites-on-criteria", this.payloadBean).subscribe(
      response => {
        this.siteList = response;
        this.showPageSpinner=false;
      }
    )
  }

  
  editSite(siteID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
    var ciphertext = CryptoJS.AES.encrypt(siteID.toString(), appConfig.privateKey);
    this.router.navigate(['/sites/edit-site', ciphertext.toString()]);
    }
  }

  addSite() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
      this.router.navigate(['/sites/add-site']);
    }
    // }else{
    //   this.msgs.push({severity:'error', summary:'Error Message', detail:"You are not authorize!"}); 
    // }
  }
  deleteSite() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedSite.siteID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedSite.transactionCount;
    this.httpRestClient.deleteData("delete-site", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.siteList.indexOf(this.selectedSite);
          if (index !== -1) {
            this.siteList.splice(index, 1);
          }
          this.selectedSite = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }


  confirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      this.msgs = [];
      if (this.selectedSite == null || this.selectedSite == undefined) {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      } else if (this.selectedSite.length != 0) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteSite();
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
}
