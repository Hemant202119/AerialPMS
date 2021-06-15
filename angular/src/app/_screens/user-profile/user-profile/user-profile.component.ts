import { Component, OnInit } from '@angular/core';
import { UserProfile, UserProfileTO } from '../user-profile';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { appConfig, appStatusConfig, messageConfig, Constants } from '../../../app.config';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Session } from 'protractor';
import { User, CurrentUser, PayloadBean, AccountUsers } from '../../../_models/data.model';
import { DateFormatPipe } from '../../../_core/date-format';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DateFormatPipe]
})
export class UserProfileComponent implements OnInit {
  changePasswordflag: boolean = false;
  genderType: any[];
  showPageSpinner:boolean;
  userTypeStatus: any[];
  userStatusNames: any[];
  userProfile: UserProfile = new UserProfile();
  // userprofileTO: UserProfileTO= new UserProfileTO();
  defaultAccount: any[]=[];
  defaultRole: any[]=[];
  defaultSite: any[]=[];
  user: User = new User();
  currentuser: CurrentUser = new CurrentUser();
  accountUsers: AccountUsers = new AccountUsers();
  payloadBean: PayloadBean;
  baseResponse: any;
  msgs: Message[] = [];
  dateFormat: any;
  constructor(private httpRestClient: HttpRestClient, private breadCrumbService: BreadcrumbService,
    private dateFormatPipe: DateFormatPipe, private router: Router) {
    this.breadCrumbService.setItems([
      { label: 'User Profile' },
    ])
    //For User Information
    this.showPageSpinner=true;
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.accountUsers = JSON.parse(sessionStorage.getItem("accountUser"));
    this.payloadBean = new PayloadBean();
    this.payloadBean.accountId = this.accountUsers.accountID;
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.payloadBean.id = this.accountUsers.userID;   
        //For Distinct Account name Records
        this.httpRestClient.postData("fetch-default-account", this.payloadBean).subscribe(
          response => {
            this.defaultAccount = response;
            //For Distinct Role name Records
            this.httpRestClient.postData("fetch-default-role", this.payloadBean).subscribe(
              response => {
                response.forEach(element => {
                  this.defaultRole.push({label:element.roleName,value:element.roleID});
                });
                //For Default Site Name Records
                this.httpRestClient.postData("fetch-default-site", this.payloadBean).subscribe(
                  response => {
                    response.forEach(element => {
                      this.defaultSite.push({label:element.siteName,value:element.siteID});
                    });
                    this.httpRestClient.postData("fetch-user-profile-information", this.payloadBean).subscribe(
                      response => {
                        this.userProfile = response;
                        if(this.userProfile.birthDate!=undefined && this.userProfile.birthDate!=null){
                        this.userProfile.birthDate = new Date(this.userProfile.birthDate);                        
                      }
                      this.showPageSpinner=false;
                      });
                  });
              });
              
          }
        );
     
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
  }
  addUserProfile() {
  this.msgs=[];
  if(this.userProfile.loginName==undefined || this.userProfile.loginName==null || this.userProfile.loginName.trim()==''){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Name can't be blank." });
  }else if(this.userProfile.firstName==undefined || this.userProfile.firstName==null || this.userProfile.firstName.trim()==''){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "First Name can't be blank." });
  }else if(this.userProfile.lastName==undefined || this.userProfile.lastName==null || this.userProfile.lastName.trim()==''){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Last Name can't be blank." });
  }else if(this.userProfile.userType==undefined || this.userProfile.userType==null ){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Tpye can't be blank." });
  }else if(this.userProfile.userStatus==undefined || this.userProfile.userStatus==null ){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Status can't be blank." });
  }else if(this.userProfile.emailAddress==undefined || this.userProfile.emailAddress==null || this.userProfile.emailAddress.trim()=='' ){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Address can't be blank." });
  }else if(!this.validateEmail(this.userProfile.emailAddress)){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Invalid email Address." });   
  }else if(this.userProfile.securityQuestion==undefined || this.userProfile.securityQuestion==null || this.userProfile.securityQuestion.trim()=='' ){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Security Question can't be blank." });
  }else if(this.userProfile.securityAnswer==undefined || this.userProfile.securityAnswer==null || this.userProfile.securityAnswer.trim()=='' ){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Security Answer can't be blank." });
  }else if(this.userProfile.accountID==undefined || this.userProfile.accountID==null){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Default Account can't be blank." });
  }else if(this.userProfile.defaultRoleID==undefined || this.userProfile.defaultRoleID==null){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Default Role can't be blank." });
  }else if(this.userProfile.defaultSiteID==undefined || this.userProfile.defaultSiteID==null){
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Default Account can't be blank." });  
   }else if(this.userProfile.changePasswordflag){
     if(this.userProfile.currentPassword==undefined || this.userProfile.currentPassword==null || this.userProfile.currentPassword.trim()=='' ){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Current Password can't be blank." });
     }else if(this.userProfile.newPassword==undefined || this.userProfile.newPassword==null || this.userProfile.newPassword.trim()=='' ){
       this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Password can't be blank." });
     }else if(this.userProfile.confirmNewPassword==undefined || this.userProfile.confirmNewPassword==null || this.userProfile.confirmNewPassword.trim()=='' ){
       this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Comfirm Password can't be blank." });
     }else if(this.userProfile.currentPassword!=this.userProfile.password){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Incorrect Current password." });
     }else if(this.userProfile.newPassword!=this.userProfile.confirmNewPassword){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Password does not match Comfirm Password." });
     }else{
      this.userProfile.password= this.userProfile.confirmNewPassword;
      this.userProfile.lastModifiedBy = this.accountUsers.userID;
      this.httpRestClient.putData("update-user-profile", this.userProfile).subscribe(
        response => {
          this.baseResponse = response;
          if (this.baseResponse['code'] == 'UPDATED') {
              sessionStorage.clear();
              sessionStorage.setItem("successMessage", "UpdateSuccess");
            this.router.navigate(['/login']);
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
        }
      )
     }
    }
  else{
    this.userProfile.lastModifiedBy = this.accountUsers.userID;
          this.httpRestClient.putData("update-user-profile", this.userProfile).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.clear();
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/login']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
  
  }
    
  }

  validateEmail(email): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }
  onClear() {
    this.userProfile.currentPassword = '';
    this.userProfile.newPassword = '';
    this.userProfile.confirmNewPassword = '';
  }
}
