webpackJsonp(["userprofile.modules"],{

/***/ "./src/app/_screens/user-profile/user-profile.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfile; });
/* unused harmony export UserProfileTO */
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());

var UserProfileTO = (function () {
    function UserProfileTO() {
    }
    return UserProfileTO;
}());



/***/ }),

/***/ "./src/app/_screens/user-profile/user-profile/user-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/_screens/user-profile/user-profile/user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n  <div class=\"ui-g\">\n      <div class=\"ui-g-12\">\n          <div class=\"card no-margin\">\n                  <form novalidate #f=\"ngForm\" (ngSubmit)=\"addUserProfile()\">   \n                 <div class=\"ui-g form-group\">  \n                      <div class=\"ui-g-12 ui-md-6\">\n                      <h1>User Profile</h1> \n                      </div>\n                      <div class=\"ui-g-12 ui-md-6\">\n                        <div class=\"ui-g-12 ui-md-4\"></div>\n                          <div class=\"ui-g-12 ui-md-4\">\n                                <button type=\"button\" pButton  label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/dashboard\" ></button>      \n                            </div>\n                            <div class=\"ui-g-12 ui-md-4\">\n                                  <button type=\"submit\" pButton  label=\"Save\" icon=\"fa fa-check\" ></button>             \n                            </div> \n                  </div>\n                     \n                      <p-accordion [multiple]=\"true\">                       \n                        <div class=\"ui-g-12\">\n                          <p-accordionTab header=\"User Information\"  [selected]=\"true\">\n                            <div class=\"ui-g-12 ui-md-12\">\n                            \n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"loginName\">User Name*</label>   \n                                    <input id=\"loginName\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.loginName\" \n                                   #loginName=\"ngModel\" name=\"loginName\" maxlength=\"20\">   \n                              </div>\n                          \n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"title\">Title</label>   \n                                    <input id=\"title\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.title\"\n                                    maxlength=\"10\" name=\"title\"  #title=\"ngModel\">  \n                                </div>\n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"first-Name\">First Name*</label>   \n                                    <input id=\"first-Name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.firstName\" \n                                    maxlength=\"50\"  name=\"firstName\"  #firstName=\"ngModel\">   \n                              </div>\n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"middal-Name\">Middle Name</label>   \n                                    <input id=\"middal-Name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.middleName\"\n                                    maxlength=\"50\" name=\"middleName\" #middleName=\"ngModel\">  \n                                  </div> \n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"last-Name\">Last Name*</label>   \n                                    <input id=\"last-Name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.lastName\"\n                                    maxlength=\"50\" name=\"lastName\" #lastName=\"ngModel\">  \n                                  </div> \n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"birth-Date\">Birth Date</label>  \n                                 <p-calendar id=\"birth-Date\"  [dateFormat]=\"dateFormat\" autocomplete=\"off\"\n                                             [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1980:2015\" readonlyInput=\"true\" placeholder=\"Date\" [(ngModel)]=\"userProfile.birthDate\" \n                                             name=\"birthDate\" #birthDate=\"ngModel\"  [showIcon]=\"true\"\n                                ></p-calendar> \n                                  </div>\n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"gender\">Gender</label> \n                                      <p-dropdown id=\"gender\" [options]=\"genderType\" [(ngModel)]=\"userProfile.gender\" name=\"gender\" #gender=\"ngModel\" \n                                      [autoWidth]=\"false\" placeholder=\"Select an option\"> </p-dropdown> \n                                    </div> \n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"user-Type\">User Type*</label>   \n                                \n                                      <p-dropdown id=\"user-Type\" [options]=\"userTypeStatus\" [(ngModel)]=\"userProfile.userType\" name=\"userType\" #userType=\"ngModel\"\n                                      [autoWidth]=\"false\" placeholder=\"Select an option\" > </p-dropdown>  \n                                        \n                              </div>\n                                  <div class=\"ui-g-12 ui-md-3\">\n                                      <label  for=\"user-Status\">User Status*</label> \n                                      <p-dropdown id=\"user-Status\" [options]=\"userStatusNames\" [(ngModel)]=\"userProfile.userStatus\" name=\"userStatus\" #userStatus=\"ngModel\" [autoWidth]=\"false\" placeholder=\"Select an option\"> </p-dropdown>  \n     \n                              </div>\n                         </div>\n                      </p-accordionTab>\n                      </div>\n                      <div class=\"ui-g-12\">   \n              <p-accordionTab header=\"Contact Information\"  [selected]=\"true\">\n                    \n                          <div class=\"ui-g-12 ui-md-12\">\n                              <div class=\"ui-g-12 ui-md-6\">\n                                  <label  for=\"address-1\">Address 1</label> \n                                <input id=\"address-1\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.address1\"\n                                maxlength=\"100\" #address1=\"ngModel\" name=\"address1\">       \n                          </div>\n                              <div class=\"ui-g-12 ui-md-6\">\n                                  <label  for=\"address-2\">Address 2</label> \n                                <input id=\"address-2\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\"  [(ngModel)]=\"userProfile.address2\"\n                                maxlength=\"100\" #address2=\"ngModel\" name=\"address2\">  \n                              </div>   \n                              <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"city\">City</label> \n                                <input id=\"city\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.city\"\n                                maxlength=\"50\" #city=\"ngModel\" name=\"city\">  \n                          </div>\n                              <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"state\">State</label> \n                                <input id=\"state\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.state\"\n                                maxlength=\"50\" #state=\"ngModel\" name=\"state\">  \n                          </div>\n                              <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"other-State\">Other State</label>   \n                                <input id=\"other-State\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.otherState\"\n                                maxlength=\"50\" #otherState=\"ngModel\" name=\"otherState\">     \n                          </div>\n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"zip-Code\">Zip Code</label>   \n                                <input id=\"zip-Code\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.ZIPCode\"\n                                maxlength=\"50\" #ZIPCode=\"ngModel\" name=\"ZIPCode\">  \n                          </div>\n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"country\">Country</label>   \n                                <input id=\"country\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.country\"\n                                maxlength=\"50\" #country=\"ngModel\" name=\"country\">   \n                          </div>\n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"home-Phone\">Home Phone</label>   \n                                <input id=\"home-Phone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.homePhone\"\n                                maxlength=\"20\" #homePhone=\"ngModel\" name=\"homePhone\">  \n                          </div>\n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"mobile-Phone\">Mobile Phone</label>  \n                                <input id=\"mobile-Phone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.mobilePhone\"\n                                maxlength=\"20\" #mobilePhone=\"ngModel\" name=\"mobilePhone\">  \n                          </div>\n                         \n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"work-Phone\">Work Phone</label>   \n                                <input id=\"work-Phone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.workPhone\"\n                                maxlength=\"20\"  #workPhone=\"ngModel\" name=\"workPhone\">   \n                          </div>\n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"fax\">Fax</label> \n                                <input id=\"fax\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.faxPhone\"\n                                maxlength=\"20\"  #faxPhone=\"ngModel\" name=\"faxPhone\">    \n                          </div>\n                          <div class=\"ui-g-12 ui-md-3\">\n                                  <label  for=\"email\">Email Address*</label>   \n                                <input id=\"email\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.emailAddress\"\n                                maxlength=\"100\" #email=\"ngModel\"  name=\"email\">     \n                          </div>\n                          </div>\n                  </p-accordionTab>\n                  </div>\n                  <div class=\"ui-g-12\">   \n              <p-accordionTab header=\"Credentials Information\"  [selected]=\"true\">\n               <div class=\"ui-g-12 ui-md-12\">\n            <div class=\"ui-g-12 ui-md-12\">\n                <p-checkbox name=\"changePassword\" label=\"Check if you want to change your password\" binary=\"userProfile.changePasswordflag\" [(ngModel)]=\"userProfile.changePasswordflag\"\n                    (click)=\"onClear()\"></p-checkbox>\n                 </div> <br>\n                 <div class=\"ui-g-12 ui-md-3\">\n                        <label  for=\"current-Password\">Current Password*</label>   \n                      <input id=\"current-Password\" type=\"password\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.currentPassword\"\n                      name=\"currentPassword\" #currentPassword=\"ngModel\" [disabled]=\"!userProfile.changePasswordflag\">     \n                </div>\n                <div class=\"ui-g-12 ui-md-3\">\n                        <label  for=\"new-Password\">New Password*</label>   \n                      <input id=\"new-Password\" type=\"password\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.newPassword\"\n                      name=\"newPassword\" #newPassword=\"ngModel\" [disabled]=\"!userProfile.changePasswordflag\">     \n                </div>\n                <div class=\"ui-g-12 ui-md-3\">\n                        <label  for=\"confirm-new-Password\">Confirm New Password*</label>   \n                      <input id=\"confirm-new-Password\" type=\"password\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.confirmNewPassword\"\n                      name=\"confirmNewPassword\" #confirmNewPassword=\"ngModel\" [disabled]=\"!userProfile.changePasswordflag\">     \n                </div>\n              </div>\n              </p-accordionTab>   \n              </div>    \n              <div class=\"ui-g-12\">   \n                    <p-accordionTab header=\"Security Information\"  [selected]=\"true\">\n                     <div class=\"ui-g-12 ui-md-12\">\n                            <div class=\"ui-g-12 ui-md-12\">\n                                    <label  for=\"security-Question\">Security Question*</label>   \n                                  <input id=\"security-Question\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.securityQuestion\"\n                                  maxlength=\"500\"  #securityQuestion=\"ngModel\" name=\"securityQuestion\">     \n                            </div> \n                            <div class=\"ui-g-12 ui-md-12\">\n                                    <label  for=\"security-Answer\">Security Answer*</label>   \n                                  <input id=\"security-Answer\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userProfile.securityAnswer\"\n                                  maxlength=\"500\"  #securityAnswer=\"ngModel\" name=\"securityAnswer\">     \n                            </div> \n                        </div>\n                        </p-accordionTab>\n                        </div>\n                        <div class=\"ui-g-12\">   \n                        <p-accordionTab header=\"Change Default Settings\"  [selected]=\"true\">\n                           <div class=\"ui-g-12 ui-md-12\">\n                            <div class=\"ui-g-12 ui-md-3\">\n                             <label  for=\"default-Account\">Default Account*</label> \n                               <p-dropdown id=\"default-Account\" [options]=\"defaultAccount\"  [autoWidth]=\"false\" \n                                      [(ngModel)]=\"userProfile.accountID\" #middleName=\"ngModel\" name=\"accountID\"  #accountID=\"ngModel\"\n                                      optionLabel=\"accountName\"  placeholder=\"Select an option\"> \n                              </p-dropdown> \n                                </div>\n                           <div class=\"ui-g-12 ui-md-3\">\n                            <label  for=\"default-Group\">Default Role*</label> \n                             <p-dropdown id=\"default-Group\" [options]=\"defaultRole\" [autoWidth]=\"false\"  [(ngModel)]=\"userProfile.defaultRoleID\" \n                                         name=\"defaultRoleID\" #defaultRoleID=\"ngModel\"   placeholder=\"Select an option\" > </p-dropdown> \n                             </div> \n                              <div class=\"ui-g-12 ui-md-3\">\n                             <label  for=\"default-Site\">Default Site*</label> \n                             <p-dropdown id=\"default-Site\" [options]=\"defaultSite\" [(ngModel)]=\"userProfile.defaultSiteID\" [autoWidth]=\"false\"\n                             name=\"defaultSiteID\" #defaultSiteID=\"ngModel\" placeholder=\"Select an option\" > \n                            </p-dropdown> \n                                 </div>\n                                 <div class=\"ui-g-12 ui-md-3\">\n                               <label  for=\"Theme\">Default Theme*</label> \n                               <!-- <p-autoComplete [(ngModel)]=\"userProfile.theme\" [suggestions]=\"brand\" (completeMethod)=\"sample()\"\n                               [size]=\"30\"   [minLength]=\"1\" placeholder=\"Hint: type any letter\" dropdown=\"true\" \n                               #theme=\"ngModel\"  name=\"theme\"  field=\"theme\" [forceSelection]=\"true\">                                  \n                           </p-autoComplete>  -->\n                                  <p-dropdown id=\"Theme\" [options]=\"\" [(ngModel)]=\"userProfile.defaultTheme\" #middleName=\"ngModel\" [autoWidth]=\"false\"\n                                 name=\"theme\" #theme=\"ngModel\" placeholder=\"Select an option\"> </p-dropdown> \n                                  </div>      \n                               </div>\n                              </p-accordionTab>\n                               </div>\n              </p-accordion>\n          </div>\n         </form>\n             </div>\n      </div> \n  </div>\n</div>\n<div class=\"custom-overlay-all\" *ngIf=\"showPageSpinner\">\n  <div class=\"sendingEmail-all\"></div>\n</div>\n<div class=\"msg\">\n  <p-growl [(value)]=\"msgs\"></p-growl>\n</div>"

/***/ }),

/***/ "./src/app/_screens/user-profile/user-profile/user-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_profile__ = __webpack_require__("./src/app/_screens/user-profile/user-profile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_date_format__ = __webpack_require__("./src/app/_core/date-format.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserProfileComponent = (function () {
    function UserProfileComponent(httpRestClient, breadCrumbService, dateFormatPipe, router) {
        var _this = this;
        this.httpRestClient = httpRestClient;
        this.breadCrumbService = breadCrumbService;
        this.dateFormatPipe = dateFormatPipe;
        this.router = router;
        this.changePasswordflag = false;
        this.userProfile = new __WEBPACK_IMPORTED_MODULE_1__user_profile__["a" /* UserProfile */]();
        // userprofileTO: UserProfileTO= new UserProfileTO();
        this.defaultAccount = [];
        this.defaultRole = [];
        this.defaultSite = [];
        this.user = new __WEBPACK_IMPORTED_MODULE_5__models_data_model__["g" /* User */]();
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_5__models_data_model__["c" /* CurrentUser */]();
        this.accountUsers = new __WEBPACK_IMPORTED_MODULE_5__models_data_model__["a" /* AccountUsers */]();
        this.msgs = [];
        this.breadCrumbService.setItems([
            { label: 'User Profile' },
        ]);
        //For User Information
        this.showPageSpinner = true;
        this.user = JSON.parse(sessionStorage.getItem("credentials"));
        this.accountUsers = JSON.parse(sessionStorage.getItem("accountUser"));
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_5__models_data_model__["e" /* PayloadBean */]();
        this.payloadBean.accountId = this.accountUsers.accountID;
        this.payloadBean.signatureKey = __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* appConfig */].privateKey;
        this.payloadBean.id = this.accountUsers.userID;
        //For Distinct Account name Records
        this.httpRestClient.postData("fetch-default-account", this.payloadBean).subscribe(function (response) {
            _this.defaultAccount = response;
            //For Distinct Role name Records
            _this.httpRestClient.postData("fetch-default-role", _this.payloadBean).subscribe(function (response) {
                response.forEach(function (element) {
                    _this.defaultRole.push({ label: element.roleName, value: element.roleID });
                });
                //For Default Site Name Records
                _this.httpRestClient.postData("fetch-default-site", _this.payloadBean).subscribe(function (response) {
                    response.forEach(function (element) {
                        _this.defaultSite.push({ label: element.siteName, value: element.siteID });
                    });
                    _this.httpRestClient.postData("fetch-user-profile-information", _this.payloadBean).subscribe(function (response) {
                        _this.userProfile = response;
                        if (_this.userProfile.birthDate != undefined && _this.userProfile.birthDate != null) {
                            _this.userProfile.birthDate = new Date(_this.userProfile.birthDate);
                        }
                        _this.showPageSpinner = false;
                    });
                });
            });
        });
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.dateFormat = __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* Constants */].DATE_FMT_TS;
        this.genderType = [
            { label: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].genderMale, value: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].genderMale },
            { label: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].genderFemale, value: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].genderFemale },
        ];
        this.userTypeStatus = [
            { label: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].userTypeSystem, value: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].userTypeSystem },
            { label: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].UserTypeNonSystem, value: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].UserTypeNonSystem }
        ];
        this.userStatusNames = [
            { label: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].activeName, value: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].activeName },
            { label: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].inactiveName, value: __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* appStatusConfig */].inactiveName }
        ];
    };
    UserProfileComponent.prototype.addUserProfile = function () {
        var _this = this;
        this.msgs = [];
        if (this.userProfile.loginName == undefined || this.userProfile.loginName == null || this.userProfile.loginName.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Name can't be blank." });
        }
        else if (this.userProfile.firstName == undefined || this.userProfile.firstName == null || this.userProfile.firstName.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "First Name can't be blank." });
        }
        else if (this.userProfile.lastName == undefined || this.userProfile.lastName == null || this.userProfile.lastName.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Last Name can't be blank." });
        }
        else if (this.userProfile.userType == undefined || this.userProfile.userType == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Tpye can't be blank." });
        }
        else if (this.userProfile.userStatus == undefined || this.userProfile.userStatus == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "User Status can't be blank." });
        }
        else if (this.userProfile.emailAddress == undefined || this.userProfile.emailAddress == null || this.userProfile.emailAddress.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Address can't be blank." });
        }
        else if (!this.validateEmail(this.userProfile.emailAddress)) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Invalid email Address." });
        }
        else if (this.userProfile.securityQuestion == undefined || this.userProfile.securityQuestion == null || this.userProfile.securityQuestion.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Security Question can't be blank." });
        }
        else if (this.userProfile.securityAnswer == undefined || this.userProfile.securityAnswer == null || this.userProfile.securityAnswer.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Security Answer can't be blank." });
        }
        else if (this.userProfile.accountID == undefined || this.userProfile.accountID == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Default Account can't be blank." });
        }
        else if (this.userProfile.defaultRoleID == undefined || this.userProfile.defaultRoleID == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Default Role can't be blank." });
        }
        else if (this.userProfile.defaultSiteID == undefined || this.userProfile.defaultSiteID == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Default Account can't be blank." });
        }
        else if (this.userProfile.changePasswordflag) {
            if (this.userProfile.currentPassword == undefined || this.userProfile.currentPassword == null || this.userProfile.currentPassword.trim() == '') {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Current Password can't be blank." });
            }
            else if (this.userProfile.newPassword == undefined || this.userProfile.newPassword == null || this.userProfile.newPassword.trim() == '') {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Password can't be blank." });
            }
            else if (this.userProfile.confirmNewPassword == undefined || this.userProfile.confirmNewPassword == null || this.userProfile.confirmNewPassword.trim() == '') {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Comfirm Password can't be blank." });
            }
            else if (this.userProfile.currentPassword != this.userProfile.password) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Incorrect Current password." });
            }
            else if (this.userProfile.newPassword != this.userProfile.confirmNewPassword) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Password does not match Comfirm Password." });
            }
            else {
                this.userProfile.password = this.userProfile.confirmNewPassword;
                this.userProfile.lastModifiedBy = this.accountUsers.userID;
                this.httpRestClient.putData("update-user-profile", this.userProfile).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        sessionStorage.clear();
                        sessionStorage.setItem("successMessage", "UpdateSuccess");
                        _this.router.navigate(['/login']);
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                });
            }
        }
        else {
            this.userProfile.lastModifiedBy = this.accountUsers.userID;
            this.httpRestClient.putData("update-user-profile", this.userProfile).subscribe(function (response) {
                _this.baseResponse = response;
                if (_this.baseResponse['code'] == 'UPDATED') {
                    sessionStorage.clear();
                    sessionStorage.setItem("successMessage", "UpdateSuccess");
                    _this.router.navigate(['/login']);
                }
                else {
                    _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                }
            });
        }
    };
    UserProfileComponent.prototype.validateEmail = function (email) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };
    UserProfileComponent.prototype.onClear = function () {
        this.userProfile.currentPassword = '';
        this.userProfile.newPassword = '';
        this.userProfile.confirmNewPassword = '';
    };
    UserProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-profile',
            template: __webpack_require__("./src/app/_screens/user-profile/user-profile/user-profile.component.html"),
            styles: [__webpack_require__("./src/app/_screens/user-profile/user-profile/user-profile.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_6__core_date_format__["a" /* DateFormatPipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__["a" /* HttpRestClient */], __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__["a" /* BreadcrumbService */],
            __WEBPACK_IMPORTED_MODULE_6__core_date_format__["a" /* DateFormatPipe */], __WEBPACK_IMPORTED_MODULE_7__angular_router__["Router"]])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ }),

/***/ "./src/app/modules/userprofile.modules.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileModule", function() { return UserProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel__ = __webpack_require__("./node_modules/primeng/scrollpanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_table__ = __webpack_require__("./node_modules/primeng/table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter__ = __webpack_require__("./node_modules/primeng/keyfilter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner__ = __webpack_require__("./node_modules/primeng/progressspinner.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__screens_user_profile_user_profile_user_profile_component__ = __webpack_require__("./src/app/_screens/user-profile/user-profile/user-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routing_userprofile_routing__ = __webpack_require__("./src/app/routing/userprofile.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












































































var UserProfileModule = (function () {
    function UserProfileModule() {
    }
    UserProfileModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_11__routing_userprofile_routing__["a" /* UserProfileRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["AccordionModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["BreadcrumbModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CarouselModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CheckboxModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ChipsModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CodeHighlighterModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ConfirmDialogModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ColorPickerModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SharedModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ContextMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataGridModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataListModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataScrollerModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DragDropModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["EditorModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["FieldsetModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GalleriaModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GMapModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputMaskModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputSwitchModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextareaModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["LightboxModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ListboxModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MegaMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MenubarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MultiSelectModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OrderListModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OrganizationChartModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OverlayPanelModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PaginatorModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PanelModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PanelMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PasswordModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PickListModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ProgressBarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["RadioButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["RatingModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ScheduleModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel__["ScrollPanelModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SelectButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SlideMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SliderModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SpinnerModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SplitButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["StepsModule"],
                __WEBPACK_IMPORTED_MODULE_7_primeng_table__["TableModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabViewModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TerminalModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TieredMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ToggleButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ToolbarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TooltipModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TreeModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TreeTableModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter__["KeyFilterModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner__["ProgressSpinnerModule"],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__screens_user_profile_user_profile_user_profile_component__["a" /* UserProfileComponent */]
            ],
            providers: []
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileModule);
    return UserProfileModule;
}());



/***/ }),

/***/ "./src/app/routing/userprofile.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screens_user_profile_user_profile_user_profile_component__ = __webpack_require__("./src/app/_screens/user-profile/user-profile/user-profile.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserProfileRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__screens_user_profile_user_profile_user_profile_component__["a" /* UserProfileComponent */] },
];
var UserProfileRoutingModule = (function () {
    function UserProfileRoutingModule() {
    }
    UserProfileRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(UserProfileRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], UserProfileRoutingModule);
    return UserProfileRoutingModule;
}());



/***/ })

});
//# sourceMappingURL=userprofile.modules.chunk.js.map