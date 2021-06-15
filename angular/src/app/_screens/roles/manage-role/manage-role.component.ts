import { Component, OnInit } from '@angular/core';

import { BreadcrumbService } from '../../../breadcrumb.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Circle, DeleteRecords } from '../roles';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { User, CurrentUser, PayloadBean, DeleteRecords } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { appConfig, messageConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { roleEntityTO } from '../role';
import { RoleService } from '../role-service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css'],
  providers: [RoleService]
})
export class ManageRoleComponent implements OnInit {

  //Required Fields for every screen.
  showPageSpinner:boolean;
  msgs: Message[] = [];
  currentuser: CurrentUser = new CurrentUser();
  payloadBean: PayloadBean = new PayloadBean();
  deleteRecords: DeleteRecords;
  baseResponse: any;
  status: any[];
  //selectedRole:any;
  cols: any[];

  //Fields for this Screen
  roleList: roleEntityTO[];

  selectedRole: any;

  constructor(
    private httpRestClient: HttpRestClient,
    private router: Router,
    private route: ActivatedRoute,
    public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.roleMenu);

    this.breadcrumbService.setItems([
      { label: 'Administration' },
      { label: 'Roles' }
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

    this.httpRestClient.postData("fetch-roles", this.payloadBean).subscribe(
      response => {this.roleList = response; this.showPageSpinner=false;} );


  }

  ngOnInit() {


    this.status = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName },
      { label: appStatusConfig.allName, value: appStatusConfig.allName }
    ];

    this.cols = [
      { field: 'roleName', header: 'Role Name', class: "table-role-name", id: 'roleID' },
      { field: 'roleDesc', header: 'Role Description', class: "table-role-name", },
      { field: 'roleStatus', header: 'Role Status', class: "table-role-name center-align", }
    ];


  }

  //add Role
  addRole() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
      this.router.navigate(['/roles/add-role']);
    }
  }

  searchRoles(event) {
    this.showPageSpinner=true;
    this.payloadBean.searchParameter = event.value;
    this.httpRestClient.postData("fetch-roles-on-criteria", this.payloadBean).subscribe(
      response => {
        this.roleList = response;
        this.showPageSpinner=false;
      }
    )
  }
  //Confrim
  confirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      this.msgs = [];
      if (this.selectedRole == null || this.selectedRole == undefined) {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      } else if (this.selectedRole.length != 0) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteParameters();
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
  //Edit Role
  editRole(roleID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
      var ciphertext = CryptoJS.AES.encrypt(roleID.toString(), appConfig.privateKey);
      this.router.navigate(['/roles/edit-role', ciphertext.toString()]);
    }
  }


  deleteParameters() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedRole.roleID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedRole.transactionCount;
    this.httpRestClient.deleteData("delete-role", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.roleList.indexOf(this.selectedRole);
          if (index !== -1) {
            this.roleList.splice(index, 1);
          }
          this.selectedRole = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }

}
