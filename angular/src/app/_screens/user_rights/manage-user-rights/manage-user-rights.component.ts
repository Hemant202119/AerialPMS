import { Component, OnInit } from '@angular/core';
import { UserRightsTO } from '../user_rights';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { User, CurrentUser, PayloadBean, UserEntityTO } from '../../../_models/data.model';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { appConfig, messageConfig, appStatusConfig } from '../../../app.config';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { DeleteRecords } from '../../contacts/contacts';

@Component({
  selector: 'app-manage-user-rights',
  templateUrl: './manage-user-rights.component.html',
  styleUrls: ['./manage-user-rights.component.css']
})
export class ManageUserRightsComponent implements OnInit {
  userRightsList: UserRightsTO[];
  showPageSpinner:boolean;
  userList: UserEntityTO[];
  // userrightsTO: UserRightsTO = new UserRightsTO();
  user: User = new User();
  currentuser: CurrentUser = new CurrentUser();
  cols: any[];
  payloadBean: PayloadBean;
  msgs: Message[] = [];
  selectedUserRight:any;
  deleterecords: DeleteRecords = new DeleteRecords();
  baseResponse: any;

  constructor(private breadcrumbService: BreadcrumbService, private router: Router, private httpRestClient: HttpRestClient,
  private confirmationService: ConfirmationService,private roleRightsGuard:RoleRightsGuard) {
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    this.breadcrumbService.setItems([
      { label: 'Manage' },
      { label: 'User Rights' }
    ]);
    this.showPageSpinner=true;
    this.payloadBean = new PayloadBean();
    this.payloadBean.accountId = this.currentuser.accountID;
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.httpRestClient.getData("users-list").subscribe(
      response => {
        this.userList = response;
        if (this.userList != null) {
          this.payloadBean.searchParameter = this.userList[0].loginName;
          this.httpRestClient.postData("search-users-on-criteria", this.payloadBean).subscribe(
            response => {
              this.userRightsList = response;
            });
        }
        this.showPageSpinner=false;
      });
  }

  ngOnInit() {
    this.cols = [
      { field: 'loginName', header: 'User Name', class: "table-user", id:'userRightsID'},
      { field: 'businessName', header: 'Customer Name', class: "table-contact" },
      { field: 'circleName', header: 'Circle Name', class: "table-circle" }
    ];
  }

  addEditRights() {
    this.router.navigate(['/user-rights/add-edit-user-rights']);
  }

  searchUserrights(event) {
    this.showPageSpinner=true;
    this.payloadBean.searchParameter = event.value.loginName;
    this.httpRestClient.postData("search-users-on-criteria", this.payloadBean).subscribe(
      response => {
        this.userRightsList = response;
        this.showPageSpinner=false;
      });
  }
  Confirm(){
      if (this.selectedUserRight == null || this.selectedUserRight == undefined) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning })
      }
      else {
        this.confirmationService.confirm({
          message: 'Would you like to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteUserRight();
          },
          reject: () => {
          }
        });
      }
    }
  
  deleteUserRight(){
//this.deleterecords.id= this.selectedUserRight.userRightsID;
//this.deleterecords.modifiedBy= this.currentuser.userID;
this.httpRestClient.deleteData("delete-user-right", this.selectedUserRight).subscribe(
  response => {
    this.baseResponse = response;
    if (this.baseResponse['code'] == 'DELETED') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
      const index = this.userRightsList.indexOf(this.selectedUserRight);
      if (index !== -1) {
        this.userRightsList.splice(index, 1);
      }
    }
    else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
    }

  });
  }
}
