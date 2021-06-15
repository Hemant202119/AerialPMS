import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { User, CurrentUser, UserEntityTO, PayloadBean } from '../../../_models/data.model';
import { UserRightsTO } from '../user_rights';
import { Contacts } from '../../contacts/contacts';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { appConfig, messageConfig } from '../../../app.config';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-add-user-right',
  templateUrl: './add-user-right.component.html',
  styleUrls: ['./add-user-right.component.css']
})
export class AddUserRightComponent implements OnInit {
  user: User = new User();
  showPageSpinner:boolean;
  currentuser: CurrentUser = new CurrentUser();
  userList: UserEntityTO[];
  cols: any[];
  payloadBean: PayloadBean;
  userRightsList: UserRightsTO[];
  selectedUserRight: UserRightsTO[] = [];
  userDropdownFlag: boolean;
  baseResponse: any;
  msgs: Message[];
  constructor(private breadcrumbService: BreadcrumbService, private httpRestClient: HttpRestClient, private router: Router) {
    this.payloadBean = new PayloadBean();
    this.payloadBean.accountId = this.currentuser.accountID;
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.userDropdownFlag = false;

    //API CAll For users Dropdown
    this.httpRestClient.getData("users-dropdown").subscribe(
      response => {
        this.userList = response;

      });
    this.breadcrumbService.setItems([
      { label: 'Manage' },
      { label: 'User Rights', routerLink: ['/user-rights'] },
      { label: 'Add-Edit User Rights' }
    ]);
  }
  saveUserRights() {
    this.msgs = [];
    if (this.selectedUserRight == null || this.selectedUserRight == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    }
    else if (this.selectedUserRight.length != 0) {
      this.selectedUserRight.forEach(element => {
        element.userID = this.payloadBean.id;
      });
      this.showPageSpinner=true;
      this.httpRestClient.postData("save-user-rights", this.selectedUserRight).subscribe(response => {
        this.baseResponse = response;
        if (this.baseResponse) {
          if (this.baseResponse['code'] == 'ADDED') {
            sessionStorage.setItem("successMessage", "AddedSuccess");
            this.router.navigate(['/user-rights']);
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
        }
        this.showPageSpinner= false;
      });
    }
    else {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    }
  }
  searchUserName(event) {
    this.showPageSpinner=true;
    this.payloadBean.id = event.value.userID;
    this.payloadBean.searchParameter = event.value.loginName;

    this.httpRestClient.postData("user-rights-on-basis-of-users", this.payloadBean).subscribe(
      response => {
        this.userRightsList = response;

        if (this.userRightsList.length !== 0) {
          this.httpRestClient.postData("selected-user-rights-on-basis-of-users", this.payloadBean).subscribe(
            response => {
              this.selectedUserRight = response;
              this.userDropdownFlag = true;
            });
        }
        this.showPageSpinner=false;
      });
  }
  ngOnInit() {
    this.cols = [
      { field: 'businessName', header: 'Customer Name', class: "table-contact" },
      { field: 'circleName', header: 'Circle Name', class: "table-circle" },
    ];
  }

}
