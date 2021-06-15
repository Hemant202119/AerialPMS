import { Component, OnInit } from '@angular/core';
import { Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/api';
import { CurrentUser, PayloadBean } from '../../../_models/data.model';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { appConfig, appStatusConfig, routeConfig } from '../../../app.config';
import * as CryptoJS from 'crypto-js';
import { SiteService } from '../site-service';
import { SiteBean } from '../sites';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
  providers: [SiteService]
})
export class AddSiteComponent implements OnInit {

  //For Global
  showPageSpinner:boolean;
  msgs: Message[] = [];
  addbreaditems: MenuItem[]
  currentuser: CurrentUser = new CurrentUser();
  baseResponse: any;
  params: any;
  breadLabel: any;
  payloadBean: PayloadBean = new PayloadBean();

  //For Site
  siteStatusList: SelectItem[];
  siteTypeList: any[];
  siteBean: SiteBean = new SiteBean();
  editFlag: boolean;

  constructor(private httpRestClient: HttpRestClient,
    private router: Router, private route: ActivatedRoute,
    private siteService: SiteService,
    public roleRightsGuard: RoleRightsGuard,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.siteMenu);

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.payloadBean = new PayloadBean();
    this.payloadBean.accountId = this.currentuser.accountID;
    this.payloadBean.signatureKey = appConfig.privateKey;

    // this.httpRestClient.getData("drop-down-values/GEN_STATUS") 
    //                    .subscribe(response => {this.siteStatusList=response;}); 

    this.httpRestClient.getData("parameter-list-drop-down/ADMIN_SITE_TYPE")
      .subscribe(response => { this.siteTypeList = response; });
    this.siteBean.siteStatus = appStatusConfig.activeName;
    this.route.params.subscribe(params => { this.params = params; });

    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/sites']);
      } else {
        this.showPageSpinner=true;
        this.siteService.setter(decrypted);
        this.editSite();
      }
    }
    this.breadcrumbService.setItems([
      { label: 'Administration' },
      { label: 'Sites', routerLink: ['/sites'] },
      { label: this.breadLabel }
    ]);

  }

  ngOnInit() {
    this.siteStatusList = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName }
    ];
  }


  //For Site  
  validateEmail(email): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }
  addSite() {
    if (this.editFlag==true?(this.roleRightsGuard.roleRights.updateAccess):(this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
      if (this.siteBean.siteName == undefined || this.siteBean.siteName.trim() == '' ) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Name can't be blank." });
      } else if (this.siteBean.siteCode == undefined || this.siteBean.siteCode.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Code can't be blank." });
      } else if (this.siteBean.siteTypeListID == undefined || this.siteBean.siteTypeListID == null) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Type can't be blank." });
      } else if ( this.siteBean.siteStatus == undefined || this.siteBean.siteStatus.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Status can't be blank." });
      } else if ( this.siteBean.emailID == undefined|| this.siteBean.emailID.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Address can't be blank." });
      }else if (!this.validateEmail(this.siteBean.emailID.trim())) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Enter valid Email Address." });
      }else {
        if (!this.editFlag) {
          this.siteBean.accountID = this.currentuser.accountID;
          this.siteBean.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-site", this.siteBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                sessionStorage.setItem("successMessage", "AddedSuccess");
                this.router.navigate(['/sites']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        } else {
          this.siteBean.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-site", this.siteBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/sites']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        }
      }
    }
  }

  editSite() {
    this.payloadBean.id = this.siteService.getter();
    this.httpRestClient.postData("edit-site", this.payloadBean)
      .subscribe(response => {
      this.siteBean = response;
        this.editFlag = true;
        this.breadLabel = 'Edit Site';
        this.breadcrumbService.setItems([
          { label: 'Administration' },
          { label: 'Sites', routerLink: ['/sites'] },
          { label: this.breadLabel }
        ]);
        this.showPageSpinner=false;
      })
  }

}
