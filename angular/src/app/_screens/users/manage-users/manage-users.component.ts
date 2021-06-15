import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, SelectItem } from 'primeng/api';
import { CurrentUser, DeleteRecords, PayloadBean } from '../../../_models/data.model';
import { Statuses } from '../../../_models/applicationparameter';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { messageConfig, appConfig, appStatusConfig, routeConfig } from '../../../app.config';
import * as CryptoJS from 'crypto-js';
import { UserEntityTO } from '../users';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  msgs: Message[] = [];
  showPageSpinner: boolean;
  selectedUser: any;
  deleteRecords: DeleteRecords;
  currentuser: CurrentUser = new CurrentUser();
  payloadBean: PayloadBean = new PayloadBean();

  baseResponse: any;
  userList: UserEntityTO[];
  cols: any[];

  status: SelectItem[];
  constructor(private httpRestClient: HttpRestClient,
    private router: Router,
    private route: ActivatedRoute,
    public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.userMenu);
    
    if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    if (sessionStorage.getItem("successMessage") == 'AddedEmailSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.emailSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    if (sessionStorage.getItem("successMessage") == 'UpdateEmailSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.emailSuccess });
      sessionStorage.setItem("successMessage", "");
    }

    this.breadcrumbService.setItems([
      { label: 'Asministrator' },
      { label: 'Manage Users' },
    ])
    this.payloadBean.searchParameter = 'Active';
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.showPageSpinner = true;
    this.httpRestClient.postData("fetch-users", this.payloadBean).subscribe(
      response => {
        this.showPageSpinner = false;
        this.userList = response;
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
      { field: 'loginName', header: 'User Name', class: "table-role-name", id: 'userID' },
      { field: 'firstName', header: 'First Name', class: "table-parameter-name", },
      { field: 'lastName', header: 'Last Name', class: "table-parameter-name", },
      { field: 'emailAddress', header: 'Email Address', class: "table-parameter-name", },
      { field: 'userStatus', header: 'User Status', class: "table-parameter-name center-align", }
    ];
  }
  searchUsers(event) {
    this.payloadBean.searchParameter = event.value;
    this.httpRestClient.postData("fetch-users-on-criteria", this.payloadBean).subscribe(
      response => {
        this.userList = response;
      }
    )
  }
  editUser(userID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
      var ciphertext = CryptoJS.AES.encrypt(userID.toString(), appConfig.privateKey);
      this.router.navigate(['users/edit-user/', ciphertext.toString()]);
    }
  }

  addUser() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
      this.router.navigate(['/users/add-user']);
    }
  }
  
  confirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      this.msgs = [];
      if (this.selectedUser == null || this.selectedUser == undefined) {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      } else if (this.selectedUser.length != 0) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteUser();
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

  deleteUser() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedUser.userID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedUser.transactionCount;
    this.httpRestClient.deleteData("delete-user", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.userList.indexOf(this.selectedUser);
          if (index !== -1) {
            this.userList.splice(index, 1);
          }
          this.selectedUser = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }

}
