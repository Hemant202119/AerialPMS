import { Component, OnInit } from '@angular/core';
import { Password } from 'primeng/primeng';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { User, PayloadBean, CurrentUser, AccountUsers } from "../_models/data.model";
import { Router } from '@angular/router';
import { HttpRestClient } from '../_services/http-rest-client.service';
import { AppComponent } from '../app.component';
import * as CryptoJS from 'crypto-js';
import { appConfig, messageConfig, appStatusConfig } from '../app.config';
import { AppHome } from '../app.home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, AppHome]
})
export class LoginComponent implements OnInit {
  versionNumber: string;
  user: User = new User();
  returnUrl: string;
  msgs: Message[] = [];
  currentuser: CurrentUser = new CurrentUser();
  payloadBean: PayloadBean = new PayloadBean();
  accountUsers: AccountUsers[];
  dropDownTheme: boolean = true;
  checked: boolean = false;
  themeClass: String = "blue-light";
  items: any[] = [];
  baseResponse: any;
  constructor(public app: AppHome, private router: Router, private httpRestClient: HttpRestClient) {
    this.versionNumber = appStatusConfig.projectVersion;
    if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");
      sessionStorage.clear();
    }
  }
  ngOnInit() {
    this.items = [
      { label: 'Blue', value: 'blue-light' },
      { label: 'Green', value: 'green-light' },
      { label: 'Cyan', value: 'cyan-light' },
      { label: 'Purple', value: 'purple-light' },
      { label: 'Indigo', value: 'indigo-light' },
      { label: 'Yellow', value: 'yellow-light' },
      { label: 'Orange', value: 'orange-light' },
      { label: 'Pink', value: 'pink-light' },
    ];
  }
  changeTheme(event) {
    console.log(event);
    this.dropDownTheme = false;
    this.app.changeTheme(event.value);
    this.themeClass = event.value;
  }
  login() {
    this.msgs = [];
    if ((this.user.username == '' || this.user.username == undefined)) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "UserName can't be blank!" });
    }
    else if (this.user.password == '' || this.user.password == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Password can't be blank!" });
    }
    else {
      this.httpRestClient.getLoginData('login', this.user)
        .subscribe(
          response => {
            if (response['loginName']) {
              sessionStorage.setItem('currentUser', JSON.stringify(response));
              var username = CryptoJS.AES.encrypt(this.user.username.toString(), appConfig.privateKey);
              var password = CryptoJS.AES.encrypt(this.user.password.toString(), appConfig.privateKey);
              sessionStorage.setItem('username', username.toString());
              sessionStorage.setItem('password', password.toString());

              this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
              this.payloadBean = new PayloadBean();
              this.payloadBean.signatureKey = appConfig.privateKey;
              this.payloadBean.id = this.currentuser.userID;

              if (this.dropDownTheme&& this.currentuser.defaultTheme != undefined && this.currentuser.defaultTheme != null && this.currentuser.defaultTheme.trim() != '')
              this.app.changeTheme(this.currentuser.defaultTheme);

              this.httpRestClient.postData('fetch-accounts', this.payloadBean)
                .subscribe(
                  response => {

                    this.accountUsers = response;
                   if(this.accountUsers[0].customValue1!=undefined){
                    sessionStorage.setItem("tabData",this.accountUsers[0].customValue1);
                   }
                    else{
                  this.accountUsers[0].customValue1='n,n,n,n';
                  sessionStorage.setItem("tabData",this.accountUsers[0].customValue1);
                 }
                    if (this.accountUsers.length == 1) {


                      if (this.checked) {
                        // this.showPageSpinner = true;
                        // this.customerBean.lastModifiedBy = this.currentuser.userID;
                        this.payloadBean.searchParameter = this.themeClass;
                        this.httpRestClient.postData("update-user-default-theme", this.payloadBean).subscribe(
                          response => {
                            this.baseResponse = response;
                          });
                      }
                      if (this.accountUsers.length == 1) {
                        sessionStorage.setItem('accountUser', JSON.stringify(this.accountUsers[0]));
                        this.router.navigate(['/dashboard']);
                      } else {
                        console.log("============" + this.accountUsers.length);
                      }
                    }
                  });


            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: response['message'] });
              this.user = new User();
            }
          },
          error => {
            this.msgs.push({ severity: 'error', summary: '', detail: 'Wrong Credentials' });
            this.user = new User();
          }
        );

    }
  }
}

