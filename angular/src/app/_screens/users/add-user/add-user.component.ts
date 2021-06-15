
import { Component, OnInit } from '@angular/core';
import { UserBean } from '../users';
import { Message } from 'primeng/components/common/message';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { appConfig, messageConfig, appStatusConfig, routeConfig, Constants } from '../../../app.config';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from '../../../_core/date-format';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { PayloadBean } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [MessageService, DateFormatPipe]

})
export class AddUserComponent implements OnInit {
  baseResponse: any;
  showPageSpinner: boolean;
  params: any;
  tempListToCheckFinalListValues: any[] = [];
  listvalues: any[] = [];
  finalList: any[] = [];
  accounts: any;
  roles: any;
  sites: any;
  removeObject: any;
  finalListvalues: any[] = [];
  payloadBean: PayloadBean = new PayloadBean();
  userTypeValueID: any[];
  userStatusValueID: any[];
  genderstatus: any[];
  resetpassword: any[];
  msgs: Message[] = [];
  sourceCars: any[] = [];
  targetCars: any[] = [];
  dateFormat: any;
  editFlag: boolean;
  userBean: UserBean = new UserBean();
  displayDialog: boolean;
  resetFlag: boolean = true;
  checked: boolean = true;
  passwordNew: any
  defaultAccount: any[];
  defaultRole: any[];
  defaultSite: any[];
  userAddStatusName: string;
  genderType: any[];
  userTypeStatus: any[];
  userStatusNames: any[];
  currentuser: any;
  accounList: any[] = [];
  siteList: any[] = [];
  roleList: any[] = [];
  selectAcount: any;

  constructor(public roleRightsGuard: RoleRightsGuard,
    private httpRestClient: HttpRestClient,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute, private dateFormatPipe: DateFormatPipe) {

    this.roleRightsGuard.hasAllRoles(routeConfig.userMenu);

    this.selectAcount = 'aaa';
    this.userAddStatusName = "Add User";
    this.breadCrumbService.setItems([
      { label: 'Asministrator' },
      { label: 'User' },
      { label: this.userAddStatusName }
    ]);

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));

    this.sourceCars.push({ label: 'Test1', value: 'Test1' });
    this.sourceCars.push({ label: 'Test2', value: 'Test2' });

    this.route.params.subscribe(params => { this.params = params; });
    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/users']);
      } else {
        this.showPageSpinner = true;
        this.userAddStatusName = 'Edit User';
        this.httpRestClient.getData("edit-user/" + decrypted + "")
          .subscribe(response => {
            this.userBean = response;
            this.userBean.manuale = this.resetpassword[1].value;
            if (this.userBean.birthDate != undefined && this.userBean.birthDate != null) {
              this.userBean.birthDate = new Date(this.userBean.birthDate);
            }
            this.userBean.confirmPassword = this.userBean.password;
            this.editFlag = true;
            this.httpRestClient.getData("edit-account-user/" + decrypted + "")
              .subscribe(response => {
                let tempArray: any[] = [];
                tempArray = response;

                for (let count = 0; count < tempArray.length; count++) {
                  let tempStringArray: any[] = [];
                  tempStringArray.push({ accountID: tempArray[count].accountID, accountName: tempArray[count].accountName });
                  tempStringArray.push({ siteID: tempArray[count].siteID, siteName: tempArray[count].siteName });
                  tempStringArray.push({ roleID: tempArray[count].roleID, roleName: tempArray[count].roleName });
                  this.finalListvalues.push(tempStringArray);
                }
                let userRightsName: string;
                this.finalList = [];
                for (let count = 0; count < this.finalListvalues.length; count++) {
                  userRightsName = '';
                  userRightsName += this.finalListvalues[count][0].accountName;
                  userRightsName = userRightsName + "-" + this.finalListvalues[count][1].siteName;
                  userRightsName = userRightsName + "-" + this.finalListvalues[count][2].roleName;
                  this.finalList.push({ name: userRightsName, code: userRightsName });
                }
                this.validateDropdownValues();
                //  this.setDropDownValues();
              });
            this.breadCrumbService.setItems([
              { label: 'Asministrator' },
              { label: 'User' },
              { label: this.userAddStatusName },
            ]);
            this.showPageSpinner = false;
          });
      }
    }
  }
  setDropDownValues() {
    this.userBean.accountID = [];
    for (let count = 0; count < this.defaultAccount.length; count++) {
      if (this.userBean.accountID.accountID == this.defaultAccount[count].accountID) {
        this.userBean.accountID = this.defaultAccount[count];
        break;
      }
    }
  }
  callApifoSites(event) {
    this.httpRestClient.getData("fetch-site-details/" + event.value.accountID).subscribe(
      response => {
        this.siteList = response;
      }
    );
  }
  onItemClick(event) {
    this.listvalues = [];
    this.listvalues.push(this.accounts);
    this.listvalues.push(this.sites);
    this.listvalues.push(this.roles);

  }
  passwordGenerationType(event) {
    if (event.value == "Auto") {
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let passwordText = "";
      for (let i = 0; i < 6; i++) {
        passwordText += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      this.userBean.password = passwordText;
      this.userBean.confirmPassword = passwordText;
      this.userBean.emailCredentials=true;
      this.userBean.emailCredentialsFlag=true;
    }
    else {
      this.userBean.emailCredentials=false;
      this.userBean.emailCredentialsFlag=false;
      this.userBean.password = "";
      this.userBean.confirmPassword = ""
    }
  }
  onMainItemClick(event) {
    this.removeObject = event.value;
  }
  onRemoveUserClick() {
    let userRightsName: string;
    this.msgs = [];
    if (this.removeObject == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select an item to remove!" });
      return;
    }
    const index = this.finalList.indexOf(this.removeObject);

    if (index !== -1) {
      this.finalList.splice(index, 1);
    }
    this.finalList = null;
    this.finalList = [];

    for (let i = 0; i < this.finalListvalues.length;) {
      userRightsName = '';
      userRightsName += this.finalListvalues[i][0].accountName;
      userRightsName = userRightsName + "-" + this.finalListvalues[i][1].siteName;
      userRightsName = userRightsName + "-" + this.finalListvalues[i][2].roleName;
      if (userRightsName == this.removeObject.code) {
        this.finalListvalues.splice(i, 1);

      } else {
        this.finalList.push({ id: this.finalListvalues[i][0].accountID, name: userRightsName, code: userRightsName });

        i++;
      }

    }

  }
  onaddUserClick() {
    this.finalList = [];
    let userRightsName: string;
    let itemExistFlag: boolean = false;
    this.msgs = [];
    if (this.accounts == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select an item from Accounts!" });
      return;
    }

    else if (this.sites == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select an item from Sites!" });
      return;
    }

    else if (this.roles == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select an item from Roles!" });
      return;
    }

    for (let i = 0; i < this.finalListvalues.length; i++) {
      if (this.finalListvalues[i][0].accountName == this.listvalues[0].accountName && this.finalListvalues[i][1].siteName == this.listvalues[1].siteName && this.finalListvalues[i][2].roleName == this.listvalues[2].roleName) {
        itemExistFlag = true;
        break;
      }

    }
    if (itemExistFlag) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "selected Item already exist!" });
    }
    else {
      this.finalListvalues.push(this.listvalues);

    }
    for (let i = 0; i < this.finalListvalues.length; i++) {
      userRightsName = '';
      userRightsName += this.finalListvalues[i][0].accountName;
      userRightsName = userRightsName + "-" + this.finalListvalues[i][1].siteName;
      userRightsName = userRightsName + "-" + this.finalListvalues[i][2].roleName;
      this.finalList.push({ name: userRightsName, code: userRightsName });
    }
  }
  addUserRights() {
    this.userBean.accountID = null;
    this.userBean.defaultRoleID = null;
    this.userBean.defaultSiteID = null;
    this.tempListToCheckFinalListValues = [];
    this.validateDropdownValues();
  }

  validateDropdownValues() {
    this.defaultAccount = [];
    this.defaultRole = [];
    this.defaultSite = [];

    for (let i = 0; i < this.finalListvalues.length; i++) {
      let accountExistFlag = false;
      let siteExistFlag = false;
      let roleExistFlag = false;
      if (this.defaultAccount.length == 0) {
        this.defaultAccount.push(this.finalListvalues[i][0]);
      }
      if (this.defaultSite.length == 0) {
        this.defaultSite.push({ label: this.finalListvalues[i][1].siteName, value: this.finalListvalues[i][1].siteID });
      }
      if (this.defaultRole.length == 0) {
        this.defaultRole.push({ label: this.finalListvalues[i][2].roleName, value: this.finalListvalues[i][2].roleID });
      }
      for (let count = 0; count < this.defaultAccount.length; count++) {
        if (this.finalListvalues[i][0].accountID == this.defaultAccount[count].accountID) {
          accountExistFlag = true;
          break;
        }
      }
      if (!accountExistFlag) {
        this.defaultAccount.push(this.finalListvalues[i][0]);
      }
      for (let count = 0; count < this.defaultSite.length; count++) {
        if (this.finalListvalues[i][1].siteID == this.defaultSite[count].value) {
          siteExistFlag = true;
          break;
        }
      }
      if (!siteExistFlag) {
        this.defaultSite.push({ label: this.finalListvalues[i][1].siteName, value: this.finalListvalues[i][1].siteID });
      }
      for (let count = 0; count < this.defaultRole.length; count++) {
        if (this.finalListvalues[i][2].roleID == this.defaultRole[count].value) {
          roleExistFlag = true;
          break;
        }
      }
      if (!roleExistFlag) {
        this.defaultRole.push({ label: this.finalListvalues[i][2].roleName, value: this.finalListvalues[i][2].roleID });
      }
    }

    this.displayDialog = false;
  }
  validateEmail(email): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }
  addUser() {
    if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
      if (this.userBean.loginName == undefined || this.userBean.loginName.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Name can't be blank!" });
      }
      else if (this.userBean.firstName == undefined || this.userBean.firstName.trim() == '') {

        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "First Name can't be blank!" });
      }
      else if (this.userBean.userType == undefined || this.userBean.userType == null) {

        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Type can't be blank!" });
      }
      else if (this.userBean.userStatus == undefined || this.userBean.userStatus == null) {

        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Status Value can't be blank!" });
      }
      else if (this.userBean.emailAddress == undefined || this.userBean.emailAddress.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Address can't be blank!" });
      }
      else if (!this.validateEmail(this.userBean.emailAddress.trim())) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address!" });
      }
      else if (this.finalListvalues.length == 0) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select atleast one Account-Role-Site!" });
      }
      else if (this.userBean.password == undefined || this.userBean.password.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Password can't be blank!" });
      }
      else if (this.userBean.password == undefined || this.userBean.password.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Password can't be blank!" });
      }
      else if (this.userBean.confirmPassword == undefined || this.userBean.confirmPassword.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Confirm password can't be blank!" });
      }
      else if (this.userBean.password.trim() != this.userBean.confirmPassword.trim()) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Password and Confirm password should be same!" });
      }
      else if (this.userBean.accountID == undefined || this.userBean.accountID == null || this.userBean.accountID.length == 0) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select atleast one Account Name!" });
      }
      else if (this.userBean.defaultSiteID == undefined || this.userBean.defaultSiteID == null || this.userBean.defaultSiteID.length == 0) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select atleast one Site Name!" });
      }
      else if (this.userBean.defaultRoleID == undefined || this.userBean.defaultRoleID == null || this.userBean.defaultRoleID.length == 0) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select atleast one Role Name!" });
      }
      else {
        this.userBean.loginFlag = 1;
        this.userBean.loginFailedTries = 0;
        this.userBean.passwordResetFlag = 1;
        this.userBean.userRoleList = this.finalListvalues;
        this.showPageSpinner = true;
        if (!this.editFlag) {
          this.userBean.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-user/", this.userBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                sessionStorage.setItem("successMessage", "AddedSuccess");
                this.router.navigate(['./users']);
              }else  if (this.baseResponse['code'] == 'ADDED_EMAIL') {
                sessionStorage.setItem("successMessage", "AddedEmailSuccess");
                this.router.navigate(['./users']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            });
        } else {
          this.userBean.lastModifiedBy = this.currentuser.userID;

          this.httpRestClient.postData("update-user/", this.userBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['./users']);
              }else if (this.baseResponse['code'] == 'UPDATED_EMAIL') {
                sessionStorage.setItem("successMessage", "UpdateEmailSuccess");
                this.router.navigate(['./users']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });

              }
            });
        }
      }
    }
  }
  ngOnInit() {
    this.dateFormat = Constants.DATE_FMT_TS;
    this.genderType = [
      { label: appStatusConfig.genderMale, value: appStatusConfig.genderMale },
      { label: appStatusConfig.genderFemale, value: appStatusConfig.genderFemale },
    ]
    this.userTypeStatus = [
      { label: appStatusConfig.userTypeSystem, value: appStatusConfig.userTypeSystem },
      { label: appStatusConfig.UserTypeNonSystem, value: appStatusConfig.UserTypeNonSystem }
    ]
    this.userStatusNames = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName }

    ]
    this.userStatusValueID = [
      { label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }
    ]
    this.genderstatus = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }

    ]
    this.resetpassword = [
      { label: 'Auto', value: 'Auto' },
      { label: 'Manual', value: 'Manual' }
    ]
    this.userTypeValueID = [
      { label: 'System', value: 'System' }, { label: 'Manual', value: 'Manual' }
    ]
    this.userBean.manuale = this.resetpassword[1].value;
  }

  showDialogToAdd() {
    this.displayDialog = true;
    this.callUserApis();
    this.finalList = [];
    this.tempListToCheckFinalListValues = [];

    for (let i = 0; i < this.finalListvalues.length; i++) {
      let userRightsName = '';
      let tempArray: any[] = [];
      tempArray.push(this.finalListvalues[i][0]);
      tempArray.push(this.finalListvalues[i][1]);
      tempArray.push(this.finalListvalues[i][2]);
      this.tempListToCheckFinalListValues.push(tempArray);
      userRightsName += this.finalListvalues[i][0].accountName;
      userRightsName = userRightsName + "-" + this.finalListvalues[i][1].siteName;
      userRightsName = userRightsName + "-" + this.finalListvalues[i][2].roleName;
      this.finalList.push({ name: userRightsName, code: userRightsName });
    }

  }
  ondisable() {
    this.resetFlag = false;
  }
  closeDialog() {
    this.displayDialog = false;
    this.accounts = null;
    this.roles = null;
    this.sites = null;
    this.siteList = [];
    this.finalListvalues = [];
    for (let count = 0; count < this.tempListToCheckFinalListValues.length; count++) {
      let tempArray: any[] = [];

      tempArray.push(this.tempListToCheckFinalListValues[count][0]);
      tempArray.push(this.tempListToCheckFinalListValues[count][1]);
      tempArray.push(this.tempListToCheckFinalListValues[count][2]);
      this.finalListvalues.push(tempArray);
    }

  }
  callUserApis() {
    this.httpRestClient.getData("fetch-account-details").subscribe(
      response => {
        this.accounList = response;
      }
    );
    this.httpRestClient.getData("fetch-role-details").subscribe(
      response => {
        this.roleList = response;
      }
    );

  }

}

