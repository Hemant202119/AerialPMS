webpackJsonp(["user.modules"],{

/***/ "./src/app/_screens/users/add-user/add-user.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.pick-one > .ui-picklist-buttons{\r\n    display:none !important;\r\n}\r\n\r\n.ui-picklist.ui-picklist-responsive .ui-picklist-buttons {\r\n    width: 10%;\r\n    display:none !important;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/_screens/users/add-user/add-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12\">\n            <div class=\"card no-margin\">\n                <h1>{{userAddStatusName}}</h1>\n                <form novalidate #f=\"ngForm\" (ngSubmit)=\"addUser()\">\n                    <div class=\"ui-g form-group\">\n                        <div class=\"ui-g-12 ui-md-6\">\n\n                        </div>\n                        <div class=\"ui-g-12 ui-md-6\">\n                            <div class=\"ui-g-12 ui-md-4\"></div>\n                            <div class=\"ui-g-12 ui-md-4\">\n                                <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/users\"> </button>\n                            </div>\n                            <div class=\"ui-g-12 ui-md-4\">\n                                <button type=\"submit\" pButton label=\"Save\" icon=\"fa fa-check\" [disabled]=\"editFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)\"></button>\n                            </div>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-12\">\n                            <p-accordion [multiple]=\"true\">\n\n                                <p-accordionTab header=\"User Information\" [selected]=\"true\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"user-name\">User Name*</label>\n                                            <input id=\"user-name\" type=\"text\" size=\"20\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.loginName\" #loginName=\"ngModel\"\n                                                [readonly]=\"editFlag\" name=\"loginName\" maxlength=\"50\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"title\">Title</label>\n                                            <input id=\"title\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.title\" #title=\"ngModel\" [readonly]=\"editFlag\"\n                                                name=\"title\" maxlength=\"10\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"first-name\">First Name*</label>\n                                            <input id=\"first-name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.firstName\" #firstName=\"ngModel\"\n                                                [readonly]=\"editFlag\" name=\"firstName\" maxlength=\"50\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"middle-name\">Middle Name</label>\n                                            <input id=\"middle-name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.middleName\" #middleName=\"ngModel\"\n                                                name=\"middleName\" maxlength=\"50\">\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"last-name\">Last Name</label>\n                                            <input id=\"last-name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.lastName\" #lastName=\"ngModel\"\n                                                [readonly]=\"editFlag\" name=\"lastName\" maxlength=\"50\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"Birth-Date\">Birth Date</label>\n                                            <p-calendar id=\"Birth-Date\" placeholder=\"Date\" [dateFormat]=\"dateFormat\" readonlyInput=\"true\" [(ngModel)]=\"userBean.birthDate\"\n                                                #birthDate=\"ngModel\" name=\"birthDate\" [showIcon]=\"true\"></p-calendar>\n\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"gender\">Gender</label>\n                                            <p-dropdown [options]=\"genderType\" [(ngModel)]=\"userBean.gender\" name=\"gender\" [autoWidth]=\"false\" #gender=\"ngModel\" placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"user-type\">User Type*</label>\n                                            <p-dropdown [options]=\"userTypeStatus\" [(ngModel)]=\"userBean.userType\" name=\"user-type\" [autoWidth]=\"false\" #usertype=\"ngModel\"\n                                                placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"user-status\">User Status*</label>\n                                            <p-dropdown [options]=\"userStatusNames\" [(ngModel)]=\"userBean.userStatus\" name=\"user-status\" [autoWidth]=\"false\" #userStatus=\"ngModel\"\n                                                placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"CustomValue1\">Custom Value1</label>\n                                            <input id=\"CustomeValue1\" type=\"text\" size=\"20\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.customValue1\" #customValue1=\"ngModel\"\n                                             name=\"customValue1\" maxlength=\"50\">\n\n                                        </div>\n                                       \n                                    </div>\n                                    <!-- </div> -->\n                                </p-accordionTab>\n                            </p-accordion>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-12\">\n                            <p-accordion [multiple]=\"true\">\n\n                                <p-accordionTab header=\"Contact Information\" [selected]=\"true\">\n                                    <!-- <div class=\"ui-g-12 ui-md-4\">\n                           <button type=\"button\" pButton  label=\"Delete\" icon=\"fa fa-trash\" ></button>\n                       </div> -->\n                                    <!-- <div class=\"ui-g-12 ui-md-8\"> {{selectAcount}}-->\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-6\">\n                                            <label for=\"address-1\">Address 1</label>\n                                            <input id=\"address-1\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.address1\" maxlength=\"100\"\n                                                name=\"address1\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-6\">\n                                            <label for=\"address-2\">Address 2</label>\n                                            <input id=\"address-2\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.address2\" maxlength=\"100\"\n                                                name=\"address2\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"city\">City</label>\n                                            <input id=\"city\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.city\" maxlength=\"50\" name=\"city\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"state\">State</label>\n                                            <input id=\"state\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.state\" maxlength=\"50\" name=\"state\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"other-State\">Other State</label>\n                                            <input id=\"other-State\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.otherState\" maxlength=\"50\"\n                                                name=\"otherState\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"zip-Code\">Zip Code</label>\n                                            <input id=\"zip-Code\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.ZIPCode\" maxlength=\"50\" name=\"ZIPCode\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"country\">Country</label>\n                                            <input id=\"country\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.country\" maxlength=\"50\" name=\"country\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"home-Phone\">Home Phone</label>\n                                            <input id=\"home-Phone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.homePhone\" maxlength=\"20\"\n                                                name=\"homePhone\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"mobile-Phone\">Mobile Phone</label>\n                                            <input id=\"mobile-Phone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.mobilePhone\" maxlength=\"20\"\n                                                name=\"mobilePhone\">\n                                        </div>\n\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"work-Phone\">Work Phone</label>\n                                            <input id=\"work-Phone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.workPhone\" maxlength=\"20\"\n                                                name=\"workPhone\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"fax\">Fax</label>\n                                            <input id=\"fax\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.faxPhone\" maxlength=\"20\" name=\"faxPhone\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"email\">Email Address*</label>\n                                            <input id=\"email\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"userBean.emailAddress\" maxlength=\"100\"\n                                                name=\"email\">\n                                        </div>\n                                    </div>\n                                    <!-- </div> -->\n                                </p-accordionTab>\n                            </p-accordion>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-12\">\n                            <p-accordion [multiple]=\"true\">\n\n                                <p-accordionTab header=\"Other Information\" [selected]=\"true\">\n                                    <div class=\"ui-g-12 ui-md-4\">\n                                        <div class=\"ui-md-4\">\n                                            <button type=\"button\" pButton label=\"Account-Site-Role\" icon=\"fa fa-plus\" (click)=\"showDialogToAdd()\"></button>\n                                        </div>\n\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <p-dialog header=\"Account-Role-Site\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" [width]=\"1300\">\n                                                <div class=\"ui-g\">\n                                                    <div class=\"ui-g-12 ui-md-12\">\n                                                        <div class=\"ui-g-12 ui-md-7\">\n                                                            <div class=\"ui-g-12 ui-md-4\">\n                                                                <p-listbox [options]=\"accounList\" [(ngModel)]=\"accounts\" name=\"acountsList\" #acountsList=\"ngModel\" optionLabel=\"accountName\"\n                                                                    [style]=\"{'width':'100%'}\" [listStyle]=\"{'max-height':'250px','min-height':'160px'}\"\n                                                                    (onChange)=\"onItemClick($event) \" (onChange)=\"callApifoSites($event)\">\n                                                                    <p-header>\n                                                                        Accounts\n                                                                    </p-header>\n\n                                                                </p-listbox>\n                                                            </div>\n                                                            <div class=\"ui-g-12 ui-md-4\">\n                                                                <p-listbox [options]=\"siteList\" [(ngModel)]=\"sites\" name=\"sitesList\" #sitesList=\"ngModel\" optionLabel=\"siteName\" [style]=\"{'width':'100%'}\"\n                                                                    [listStyle]=\"{'max-height':'250px','min-height':'160px'}\"\n                                                                    (onChange)=\"onItemClick($event)\">\n                                                                    <p-header>\n                                                                        Sites\n                                                                    </p-header>\n                                                                </p-listbox>\n                                                            </div>\n                                                            <div class=\"ui-g-12 ui-md-4\">\n                                                                <p-listbox [options]=\"roleList\" [(ngModel)]=\"roles\" name=\"rolesList\" #rolesList=\"ngModel\" optionLabel=\"roleName\" [style]=\"{'width':'100%'}\"\n                                                                    [listStyle]=\"{'max-height':'250px','min-height':'160px'}\"\n                                                                    (onChange)=\"onItemClick($event)\">\n                                                                    <p-header>\n                                                                        Roles\n                                                                    </p-header>\n\n                                                                </p-listbox>\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-2\">\n                                                            <div class=\"ui-g-12 ui-md-12 center-align\">\n                                                                <button type=\"button\" pButton style=\"margin-top:50px\" icon=\"fa fa-angle-double-right\" (click)=\"onaddUserClick()\"></button>\n                                                            </div>\n                                                            <div class=\"ui-g-12 ui-md-12 center-align\">\n                                                                <button type=\"button\" pButton icon=\"fa fa-angle-double-left\" (click)=\"onRemoveUserClick()\"></button>\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-3\">\n                                                            <div class=\"ui-g-12 ui-md-12 center-align\">\n                                                                <p-listbox [options]=\"finalList\" name=\"mainList\" optionLabel=\"code\" [style]=\"{'width':'100%'}\" [listStyle]=\"{'max-height':'250px','min-height':'160px'}\"\n                                                                    (onChange)=\"onMainItemClick($event)\">\n                                                                    <p-header>\n                                                                        Final Rights\n                                                                    </p-header>\n                                                                </p-listbox>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-6\">\n                                                            <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" (click)=\"closeDialog()\"></button>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-6\">\n                                                            <button type=\"button\" pButton label=\"Ok\" icon=\"fa fa-check\" (click)=\"addUserRights()\"></button>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </p-dialog>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <!-- \n                                            <p-checkbox binary=\"true\" (change)=\"stateChanged()\"></p-checkbox>\n\n                                            {{checked}} -->\n                                            <label for=\"password-generation\">Password Generation</label>\n                                            <p-dropdown id=\"password-generation\" [options]=\"resetpassword \" [(ngModel)]=\"userBean.manuale\" name=\"resetpasswords\" [autoWidth]=\"false\"\n                                                (onChange)=\"passwordGenerationType($event)\" #resetpasswords=\"ngModel\" placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"password\">New Password*</label>\n                                            <input id=\"password\" type=\"password\" size=\"20\" [(ngModel)]=\"userBean.password\" name=\"password\" #password=\"ngModel\" [disabled]=\"userBean.manuale=='Auto'\"\n                                                pInputText autocomplete=\"off\" maxlength=\"100\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"confirm-password\">Confirm Password*</label>\n                                            <input id=\"confirm-password\" type=\"password\" size=\"20\" [disabled]=\"userBean.manuale=='Auto'\" [(ngModel)]=\"userBean.confirmPassword\"\n                                                name=\"confirmPassword\" #confirmPassword=\"ngModel\" pInputText autocomplete=\"off\"\n                                                maxlength=\"100\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <div class=\"ui-g\" style=\"width:250px;margin-top:15px\">\n                                                <div class=\"ui-g-12\">\n                                                    <p-checkbox name=\"group2\" label=\"Email Credential\" binary=\"userBean.emailCredentials\" [(ngModel)]=\"userBean.emailCredentials\" [disabled]=\"userBean.emailCredentialsFlag\" ></p-checkbox>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"account-name\">Account Name*</label>\n                                            <p-dropdown [options]=\"defaultAccount\" [(ngModel)]=\"userBean.accountID\" optionLabel=\"accountName\" name=\"account-name\" [autoWidth]=\"false\"\n                                                #Accountname=\"ngModel\" placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"site-name\">Site Name*</label>\n                                            <p-dropdown [options]=\"defaultSite\" [(ngModel)]=\"userBean.defaultSiteID\" name=\"site-name\" [autoWidth]=\"false\" #Sitename=\"ngModel\"\n                                                placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"role-name\">Role Name*</label>\n                                            <p-dropdown [options]=\"defaultRole\" [(ngModel)]=\"userBean.defaultRoleID\" name=\"role-name\" [autoWidth]=\"false\" #Rolename=\"ngModel\"\n                                                placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"theme\">Theme*</label>\n                                            <p-dropdown [options]=\" \" [(ngModel)]=\"userBean.defaultTheme\" name=\"defaultTheme\" [autoWidth]=\"false\" #defaultTheme=\"ngModel\"\n                                                placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                    </div>\n\n                                </p-accordionTab>\n                            </p-accordion>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"custom-overlay-all\" *ngIf=\"showPageSpinner\">\n    <div class=\"sendingEmail-all\"></div>\n</div>\n<div class=\"msg\">\n    <p-growl [(value)]=\"msgs\"></p-growl>\n</div>"

/***/ }),

/***/ "./src/app/_screens/users/add-user/add-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__("./src/app/_screens/users/users.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guards_role_rights_guard__ = __webpack_require__("./src/app/_guards/role-rights.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_date_format__ = __webpack_require__("./src/app/_core/date-format.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_primeng_components_common_messageservice__ = __webpack_require__("./node_modules/primeng/components/common/messageservice.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_primeng_components_common_messageservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_primeng_components_common_messageservice__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddUserComponent = (function () {
    function AddUserComponent(roleRightsGuard, httpRestClient, breadCrumbService, router, route, dateFormatPipe) {
        var _this = this;
        this.roleRightsGuard = roleRightsGuard;
        this.httpRestClient = httpRestClient;
        this.breadCrumbService = breadCrumbService;
        this.router = router;
        this.route = route;
        this.dateFormatPipe = dateFormatPipe;
        this.tempListToCheckFinalListValues = [];
        this.listvalues = [];
        this.finalList = [];
        this.finalListvalues = [];
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_8__models_data_model__["e" /* PayloadBean */]();
        this.msgs = [];
        this.sourceCars = [];
        this.targetCars = [];
        this.userBean = new __WEBPACK_IMPORTED_MODULE_1__users__["a" /* UserBean */]();
        this.resetFlag = true;
        this.checked = true;
        this.accounList = [];
        this.siteList = [];
        this.roleList = [];
        this.roleRightsGuard.hasAllRoles(__WEBPACK_IMPORTED_MODULE_3__app_config__["e" /* routeConfig */].userMenu);
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
        this.route.params.subscribe(function (params) { _this.params = params; });
        if (this.params['id'] != null || this.params['id'] != undefined) {
            var plaintext = __WEBPACK_IMPORTED_MODULE_9_crypto_js__["AES"].decrypt(this.params['id'].toString(), __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* appConfig */].privateKey);
            var decrypted = plaintext.toString(__WEBPACK_IMPORTED_MODULE_9_crypto_js__["enc"].Utf8);
            if (decrypted == '' || decrypted == null || decrypted == undefined) {
                this.router.navigate(['/users']);
            }
            else {
                this.showPageSpinner = true;
                this.userAddStatusName = 'Edit User';
                this.httpRestClient.getData("edit-user/" + decrypted + "")
                    .subscribe(function (response) {
                    _this.userBean = response;
                    _this.userBean.manuale = _this.resetpassword[1].value;
                    if (_this.userBean.birthDate != undefined && _this.userBean.birthDate != null) {
                        _this.userBean.birthDate = new Date(_this.userBean.birthDate);
                    }
                    _this.userBean.confirmPassword = _this.userBean.password;
                    _this.editFlag = true;
                    _this.httpRestClient.getData("edit-account-user/" + decrypted + "")
                        .subscribe(function (response) {
                        var tempArray = [];
                        tempArray = response;
                        for (var count = 0; count < tempArray.length; count++) {
                            var tempStringArray = [];
                            tempStringArray.push({ accountID: tempArray[count].accountID, accountName: tempArray[count].accountName });
                            tempStringArray.push({ siteID: tempArray[count].siteID, siteName: tempArray[count].siteName });
                            tempStringArray.push({ roleID: tempArray[count].roleID, roleName: tempArray[count].roleName });
                            _this.finalListvalues.push(tempStringArray);
                        }
                        var userRightsName;
                        _this.finalList = [];
                        for (var count = 0; count < _this.finalListvalues.length; count++) {
                            userRightsName = '';
                            userRightsName += _this.finalListvalues[count][0].accountName;
                            userRightsName = userRightsName + "-" + _this.finalListvalues[count][1].siteName;
                            userRightsName = userRightsName + "-" + _this.finalListvalues[count][2].roleName;
                            _this.finalList.push({ name: userRightsName, code: userRightsName });
                        }
                        _this.validateDropdownValues();
                        //  this.setDropDownValues();
                    });
                    _this.breadCrumbService.setItems([
                        { label: 'Asministrator' },
                        { label: 'User' },
                        { label: _this.userAddStatusName },
                    ]);
                    _this.showPageSpinner = false;
                });
            }
        }
    }
    AddUserComponent.prototype.setDropDownValues = function () {
        this.userBean.accountID = [];
        for (var count = 0; count < this.defaultAccount.length; count++) {
            if (this.userBean.accountID.accountID == this.defaultAccount[count].accountID) {
                this.userBean.accountID = this.defaultAccount[count];
                break;
            }
        }
    };
    AddUserComponent.prototype.callApifoSites = function (event) {
        var _this = this;
        this.httpRestClient.getData("fetch-site-details/" + event.value.accountID).subscribe(function (response) {
            _this.siteList = response;
        });
    };
    AddUserComponent.prototype.onItemClick = function (event) {
        this.listvalues = [];
        this.listvalues.push(this.accounts);
        this.listvalues.push(this.sites);
        this.listvalues.push(this.roles);
    };
    AddUserComponent.prototype.passwordGenerationType = function (event) {
        if (event.value == "Auto") {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var passwordText = "";
            for (var i = 0; i < 6; i++) {
                passwordText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            this.userBean.password = passwordText;
            this.userBean.confirmPassword = passwordText;
            this.userBean.emailCredentials = true;
            this.userBean.emailCredentialsFlag = true;
        }
        else {
            this.userBean.emailCredentials = false;
            this.userBean.emailCredentialsFlag = false;
            this.userBean.password = "";
            this.userBean.confirmPassword = "";
        }
    };
    AddUserComponent.prototype.onMainItemClick = function (event) {
        this.removeObject = event.value;
    };
    AddUserComponent.prototype.onRemoveUserClick = function () {
        var userRightsName;
        this.msgs = [];
        if (this.removeObject == undefined) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "please select an item to remove!" });
            return;
        }
        var index = this.finalList.indexOf(this.removeObject);
        if (index !== -1) {
            this.finalList.splice(index, 1);
        }
        this.finalList = null;
        this.finalList = [];
        for (var i = 0; i < this.finalListvalues.length;) {
            userRightsName = '';
            userRightsName += this.finalListvalues[i][0].accountName;
            userRightsName = userRightsName + "-" + this.finalListvalues[i][1].siteName;
            userRightsName = userRightsName + "-" + this.finalListvalues[i][2].roleName;
            if (userRightsName == this.removeObject.code) {
                this.finalListvalues.splice(i, 1);
            }
            else {
                this.finalList.push({ id: this.finalListvalues[i][0].accountID, name: userRightsName, code: userRightsName });
                i++;
            }
        }
    };
    AddUserComponent.prototype.onaddUserClick = function () {
        this.finalList = [];
        var userRightsName;
        var itemExistFlag = false;
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
        for (var i = 0; i < this.finalListvalues.length; i++) {
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
        for (var i = 0; i < this.finalListvalues.length; i++) {
            userRightsName = '';
            userRightsName += this.finalListvalues[i][0].accountName;
            userRightsName = userRightsName + "-" + this.finalListvalues[i][1].siteName;
            userRightsName = userRightsName + "-" + this.finalListvalues[i][2].roleName;
            this.finalList.push({ name: userRightsName, code: userRightsName });
        }
    };
    AddUserComponent.prototype.addUserRights = function () {
        this.userBean.accountID = null;
        this.userBean.defaultRoleID = null;
        this.userBean.defaultSiteID = null;
        this.tempListToCheckFinalListValues = [];
        this.validateDropdownValues();
    };
    AddUserComponent.prototype.validateDropdownValues = function () {
        this.defaultAccount = [];
        this.defaultRole = [];
        this.defaultSite = [];
        for (var i = 0; i < this.finalListvalues.length; i++) {
            var accountExistFlag = false;
            var siteExistFlag = false;
            var roleExistFlag = false;
            if (this.defaultAccount.length == 0) {
                this.defaultAccount.push(this.finalListvalues[i][0]);
            }
            if (this.defaultSite.length == 0) {
                this.defaultSite.push({ label: this.finalListvalues[i][1].siteName, value: this.finalListvalues[i][1].siteID });
            }
            if (this.defaultRole.length == 0) {
                this.defaultRole.push({ label: this.finalListvalues[i][2].roleName, value: this.finalListvalues[i][2].roleID });
            }
            for (var count = 0; count < this.defaultAccount.length; count++) {
                if (this.finalListvalues[i][0].accountID == this.defaultAccount[count].accountID) {
                    accountExistFlag = true;
                    break;
                }
            }
            if (!accountExistFlag) {
                this.defaultAccount.push(this.finalListvalues[i][0]);
            }
            for (var count = 0; count < this.defaultSite.length; count++) {
                if (this.finalListvalues[i][1].siteID == this.defaultSite[count].value) {
                    siteExistFlag = true;
                    break;
                }
            }
            if (!siteExistFlag) {
                this.defaultSite.push({ label: this.finalListvalues[i][1].siteName, value: this.finalListvalues[i][1].siteID });
            }
            for (var count = 0; count < this.defaultRole.length; count++) {
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
    };
    AddUserComponent.prototype.validateEmail = function (email) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };
    AddUserComponent.prototype.addUser = function () {
        var _this = this;
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
                    this.httpRestClient.postData("add-user/", this.userBean).subscribe(function (response) {
                        _this.baseResponse = response;
                        if (_this.baseResponse['code'] == 'ADDED') {
                            sessionStorage.setItem("successMessage", "AddedSuccess");
                            _this.router.navigate(['./users']);
                        }
                        else if (_this.baseResponse['code'] == 'ADDED_EMAIL') {
                            sessionStorage.setItem("successMessage", "AddedEmailSuccess");
                            _this.router.navigate(['./users']);
                        }
                        else {
                            _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                        }
                    });
                }
                else {
                    this.userBean.lastModifiedBy = this.currentuser.userID;
                    this.httpRestClient.postData("update-user/", this.userBean).subscribe(function (response) {
                        _this.baseResponse = response;
                        if (_this.baseResponse['code'] == 'UPDATED') {
                            sessionStorage.setItem("successMessage", "UpdateSuccess");
                            _this.router.navigate(['./users']);
                        }
                        else if (_this.baseResponse['code'] == 'UPDATED_EMAIL') {
                            sessionStorage.setItem("successMessage", "UpdateEmailSuccess");
                            _this.router.navigate(['./users']);
                        }
                        else {
                            _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                        }
                    });
                }
            }
        }
    };
    AddUserComponent.prototype.ngOnInit = function () {
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
        this.userStatusValueID = [
            { label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }
        ];
        this.genderstatus = [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ];
        this.resetpassword = [
            { label: 'Auto', value: 'Auto' },
            { label: 'Manual', value: 'Manual' }
        ];
        this.userTypeValueID = [
            { label: 'System', value: 'System' }, { label: 'Manual', value: 'Manual' }
        ];
        this.userBean.manuale = this.resetpassword[1].value;
    };
    AddUserComponent.prototype.showDialogToAdd = function () {
        this.displayDialog = true;
        this.callUserApis();
        this.finalList = [];
        this.tempListToCheckFinalListValues = [];
        for (var i = 0; i < this.finalListvalues.length; i++) {
            var userRightsName = '';
            var tempArray = [];
            tempArray.push(this.finalListvalues[i][0]);
            tempArray.push(this.finalListvalues[i][1]);
            tempArray.push(this.finalListvalues[i][2]);
            this.tempListToCheckFinalListValues.push(tempArray);
            userRightsName += this.finalListvalues[i][0].accountName;
            userRightsName = userRightsName + "-" + this.finalListvalues[i][1].siteName;
            userRightsName = userRightsName + "-" + this.finalListvalues[i][2].roleName;
            this.finalList.push({ name: userRightsName, code: userRightsName });
        }
    };
    AddUserComponent.prototype.ondisable = function () {
        this.resetFlag = false;
    };
    AddUserComponent.prototype.closeDialog = function () {
        this.displayDialog = false;
        this.accounts = null;
        this.roles = null;
        this.sites = null;
        this.siteList = [];
        this.finalListvalues = [];
        for (var count = 0; count < this.tempListToCheckFinalListValues.length; count++) {
            var tempArray = [];
            tempArray.push(this.tempListToCheckFinalListValues[count][0]);
            tempArray.push(this.tempListToCheckFinalListValues[count][1]);
            tempArray.push(this.tempListToCheckFinalListValues[count][2]);
            this.finalListvalues.push(tempArray);
        }
    };
    AddUserComponent.prototype.callUserApis = function () {
        var _this = this;
        this.httpRestClient.getData("fetch-account-details").subscribe(function (response) {
            _this.accounList = response;
        });
        this.httpRestClient.getData("fetch-role-details").subscribe(function (response) {
            _this.roleList = response;
        });
    };
    AddUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-user',
            template: __webpack_require__("./src/app/_screens/users/add-user/add-user.component.html"),
            styles: [__webpack_require__("./src/app/_screens/users/add-user/add-user.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_10_primeng_components_common_messageservice__["MessageService"], __WEBPACK_IMPORTED_MODULE_6__core_date_format__["a" /* DateFormatPipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__guards_role_rights_guard__["a" /* RoleRightsGuard */],
            __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__["a" /* HttpRestClient */],
            __WEBPACK_IMPORTED_MODULE_7__breadcrumb_service__["a" /* BreadcrumbService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_6__core_date_format__["a" /* DateFormatPipe */]])
    ], AddUserComponent);
    return AddUserComponent;
}());



/***/ }),

/***/ "./src/app/_screens/users/manage-users/manage-users.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/_screens/users/manage-users/manage-users.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n  <div class=\"ui-g\">\n      <div class=\"ui-g-12\">\n          <div class=\"card no-margin\">\n                <h1>Manage Users</h1>\n                <div class=\"ui-g form-group\">\n                  <div class=\"ui-g-12 ui-md-6\">\n                      <div class=\"ui-g-12 ui-md-4\">\n                          <button type=\"button\" pButton  label=\"Delete\" icon=\"fa-edit\" (click)=\"confirm()\" [disabled]=\"!roleRightsGuard.roleRights.deleteAccess\"></button>\n                          <!--  -->\n                      </div>\n                      <div class=\"ui-g-12 ui-md-8\">\n                        <p-dropdown id=\"dropdown\" [options]=\"status\"     (onChange)=\"searchUsers($event)\" \n                                    [autoWidth]=\"false\"></p-dropdown>\n                </div>                 \n                  </div> \n                  <div class=\"ui-g-12 ui-md-6\">\n                    <div class=\"ui-g-12 ui-md-8\">\n                            <div class=\"ui-inputgroup\">\n                                <button pButton type=\"button\" label=\"Search\"></button>\n                                <input type=\"text\"  (input)=\"dt.filterGlobal($event.target.value, 'contains')\" placeholder=\"Keyword\" pInputText>\n                            </div> \n                    </div>\n                    <div class=\"ui-g-12 ui-md-4\">\n                            <button type=\"button\" pButton  label=\"Add User\" icon=\"fa fa-plus\" (click)=\"addUser()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\" ></button>\n                    </div>\n                  </div>\n                </div>  \n          </div>  \n          <div class=\"card card-w-title\">\n              <p-table #dt [value]=\"userList\"  [columns]=\"cols\" [(selection)]=\"selectedUser\" [paginator]=\"true\" [rows]=\"10\" \n                    [rowsPerPageOptions]=\"[10,20,30]\" [responsive]=\"true\">\n\n                    <ng-template pTemplate=\"header\" let-columns>\n                          <tr>\n                                  <th style=\"width: 3.25em\">\n                                         \n                                      </th>\n                              <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\"  >\n                                  {{col.header}}\n                                  <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                              </th>\n                          </tr>\n                      </ng-template>\n                      <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                          <tr [pSelectableRow]=\"rowData\">\n                                  <td>\n                                        <p-tableRadioButton [value]=\"rowData\"></p-tableRadioButton>\n                                  </td>   \n                              <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\"> \n                                <span *ngIf=\"idx == 0\">\n                                      <button type=\"button\" title=\"Edit User\" (click)=\"editUser(rowData[col.id])\" [disabled]=\"!roleRightsGuard.roleRights.viewAccess\" icon=\"fa fa-edit\" pButton></button>&nbsp;&nbsp;{{rowData[col.field]}}\n                                    \n                                  </span>\n                                  <span *ngIf=\"idx != 0\">\n                                    {{rowData[col.field]}}  \n                            </span>\n\n                              </td>\n                          </tr>\n                      </ng-template>\n                      <ng-template pTemplate=\"emptymessage\" let-columns>\n                        <tr>\n                            <td [attr.colspan]=\"columns.length\">\n                                No records found\n                            </td> <td></td>\n                        </tr>\n                    </ng-template>\n              </p-table>\n          </div>\n</div>   \n</div>\n</div>\n<div class=\"custom-overlay-all\" *ngIf=\"showPageSpinner\">\n    <div class=\"sendingEmail-all\"></div>\n</div>\n<div class=\"msg\">\n    <p-growl [(value)]=\"msgs\" label=\"Multiple\"></p-growl>\n  </div>\n\n  <p-confirmDialog header=\"Confirmation\" icon=\"fa fa-info\" width=\"425\"></p-confirmDialog>\n  "

/***/ }),

/***/ "./src/app/_screens/users/manage-users/manage-users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageUsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_api__ = __webpack_require__("./node_modules/primeng/api.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guards_role_rights_guard__ = __webpack_require__("./src/app/_guards/role-rights.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ManageUsersComponent = (function () {
    function ManageUsersComponent(httpRestClient, router, route, roleRightsGuard, breadcrumbService, confirmationService) {
        var _this = this;
        this.httpRestClient = httpRestClient;
        this.router = router;
        this.route = route;
        this.roleRightsGuard = roleRightsGuard;
        this.breadcrumbService = breadcrumbService;
        this.confirmationService = confirmationService;
        this.msgs = [];
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["c" /* CurrentUser */]();
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["e" /* PayloadBean */]();
        this.roleRightsGuard.hasAllRoles(__WEBPACK_IMPORTED_MODULE_6__app_config__["e" /* routeConfig */].userMenu);
        if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].AddSuccess });
            sessionStorage.setItem("successMessage", "");
        }
        if (sessionStorage.getItem("successMessage") == 'AddedEmailSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].AddSuccess });
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].emailSuccess });
            sessionStorage.setItem("successMessage", "");
        }
        if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].updateSuccess });
            sessionStorage.setItem("successMessage", "");
        }
        if (sessionStorage.getItem("successMessage") == 'UpdateEmailSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].updateSuccess });
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].emailSuccess });
            sessionStorage.setItem("successMessage", "");
        }
        this.breadcrumbService.setItems([
            { label: 'Asministrator' },
            { label: 'Manage Users' },
        ]);
        this.payloadBean.searchParameter = 'Active';
        this.payloadBean.signatureKey = __WEBPACK_IMPORTED_MODULE_6__app_config__["b" /* appConfig */].privateKey;
        this.showPageSpinner = true;
        this.httpRestClient.postData("fetch-users", this.payloadBean).subscribe(function (response) {
            _this.showPageSpinner = false;
            _this.userList = response;
        });
    }
    ManageUsersComponent.prototype.ngOnInit = function () {
        this.status = [
            { label: __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].activeName, value: __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].activeName },
            { label: __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].inactiveName, value: __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].inactiveName },
            { label: __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].allName, value: __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].allName }
        ];
        this.cols = [
            { field: 'loginName', header: 'User Name', class: "table-role-name", id: 'userID' },
            { field: 'firstName', header: 'First Name', class: "table-parameter-name", },
            { field: 'lastName', header: 'Last Name', class: "table-parameter-name", },
            { field: 'emailAddress', header: 'Email Address', class: "table-parameter-name", },
            { field: 'userStatus', header: 'User Status', class: "table-parameter-name center-align", }
        ];
    };
    ManageUsersComponent.prototype.searchUsers = function (event) {
        var _this = this;
        this.payloadBean.searchParameter = event.value;
        this.httpRestClient.postData("fetch-users-on-criteria", this.payloadBean).subscribe(function (response) {
            _this.userList = response;
        });
    };
    ManageUsersComponent.prototype.editUser = function (userID) {
        if (this.roleRightsGuard.roleRights.viewAccess) {
            var ciphertext = __WEBPACK_IMPORTED_MODULE_7_crypto_js__["AES"].encrypt(userID.toString(), __WEBPACK_IMPORTED_MODULE_6__app_config__["b" /* appConfig */].privateKey);
            this.router.navigate(['users/edit-user/', ciphertext.toString()]);
        }
    };
    ManageUsersComponent.prototype.addUser = function () {
        if (this.roleRightsGuard.roleRights.insertAccess) {
            this.router.navigate(['/users/add-user']);
        }
    };
    ManageUsersComponent.prototype.confirm = function () {
        var _this = this;
        if (this.roleRightsGuard.roleRights.deleteAccess) {
            this.msgs = [];
            if (this.selectedUser == null || this.selectedUser == undefined) {
                this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].deleteWarning });
            }
            else if (this.selectedUser.length != 0) {
                this.confirmationService.confirm({
                    message: 'Do you want to delete this record?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: function () {
                        _this.deleteUser();
                    },
                    reject: function () {
                        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
                    }
                });
            }
            else {
                this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].deleteWarning });
            }
        }
    };
    ManageUsersComponent.prototype.deleteUser = function () {
        var _this = this;
        this.deleteRecords = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["d" /* DeleteRecords */]();
        this.deleteRecords.id = this.selectedUser.userID;
        this.deleteRecords.modifiedBy = this.currentuser.userID;
        this.deleteRecords.transactionCount = this.selectedUser.transactionCount;
        this.httpRestClient.deleteData("delete-user", this.deleteRecords).subscribe(function (response) {
            _this.baseResponse = response;
            if (_this.baseResponse['code'] == 'DELETED') {
                _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].deleteSuccess });
                var index = _this.userList.indexOf(_this.selectedUser);
                if (index !== -1) {
                    _this.userList.splice(index, 1);
                }
                _this.selectedUser = null;
            }
            else {
                _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
            }
        });
    };
    ManageUsersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-manage-users',
            template: __webpack_require__("./src/app/_screens/users/manage-users/manage-users.component.html"),
            styles: [__webpack_require__("./src/app/_screens/users/manage-users/manage-users.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_http_rest_client_service__["a" /* HttpRestClient */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"],
            __WEBPACK_IMPORTED_MODULE_8__guards_role_rights_guard__["a" /* RoleRightsGuard */],
            __WEBPACK_IMPORTED_MODULE_5__breadcrumb_service__["a" /* BreadcrumbService */],
            __WEBPACK_IMPORTED_MODULE_1_primeng_api__["ConfirmationService"]])
    ], ManageUsersComponent);
    return ManageUsersComponent;
}());



/***/ }),

/***/ "./src/app/_screens/users/users.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserBean; });
/* unused harmony export UserEntityTO */
var UserBean = (function () {
    function UserBean() {
    }
    return UserBean;
}());

var UserEntityTO = (function () {
    function UserEntityTO() {
    }
    return UserEntityTO;
}());



/***/ }),

/***/ "./src/app/modules/user.modules.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__screens_users_manage_users_manage_users_component__ = __webpack_require__("./src/app/_screens/users/manage-users/manage-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__screens_users_add_user_add_user_component__ = __webpack_require__("./src/app/_screens/users/add-user/add-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__routing_user_routing__ = __webpack_require__("./src/app/routing/user.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













































































var UserModule = (function () {
    function UserModule() {
        console.log('User Module loaded.');
    }
    UserModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__routing_user_routing__["a" /* UserRoutingModule */],
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
                __WEBPACK_IMPORTED_MODULE_10__screens_users_manage_users_manage_users_component__["a" /* ManageUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_11__screens_users_add_user_add_user_component__["a" /* AddUserComponent */]
            ],
            providers: []
        }),
        __metadata("design:paramtypes", [])
    ], UserModule);
    return UserModule;
}());



/***/ }),

/***/ "./src/app/routing/user.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screens_users_manage_users_manage_users_component__ = __webpack_require__("./src/app/_screens/users/manage-users/manage-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screens_users_add_user_add_user_component__ = __webpack_require__("./src/app/_screens/users/add-user/add-user.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var userRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__screens_users_manage_users_manage_users_component__["a" /* ManageUsersComponent */] },
    { path: 'add-user', component: __WEBPACK_IMPORTED_MODULE_3__screens_users_add_user_add_user_component__["a" /* AddUserComponent */] },
    { path: 'edit-user/:id', component: __WEBPACK_IMPORTED_MODULE_3__screens_users_add_user_add_user_component__["a" /* AddUserComponent */] },
];
var UserRoutingModule = (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(userRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());



/***/ })

});
//# sourceMappingURL=user.modules.chunk.js.map