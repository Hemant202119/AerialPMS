webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/modules/accessdenied.modules": [
		"./src/app/modules/accessdenied.modules.ts",
		"accessdenied.modules"
	],
	"app/modules/circle.modules": [
		"./src/app/modules/circle.modules.ts",
		"circle.modules"
	],
	"app/modules/contact.modules": [
		"./src/app/modules/contact.modules.ts",
		"common",
		"contact.modules"
	],
	"app/modules/manageItems.modules": [
		"./src/app/modules/manageItems.modules.ts",
		"common",
		"manageItems.modules"
	],
	"app/modules/misPoWiseReport.modules": [
		"./src/app/modules/misPoWiseReport.modules.ts",
		"common",
		"misPoWiseReport.modules"
	],
	"app/modules/misReport.modules": [
		"./src/app/modules/misReport.modules.ts",
		"common",
		"misReport.modules"
	],
	"app/modules/parameter.modules": [
		"./src/app/modules/parameter.modules.ts",
		"common",
		"parameter.modules"
	],
	"app/modules/poApproval.modules": [
		"./src/app/modules/poApproval.modules.ts",
		"common",
		"poApproval.modules"
	],
	"app/modules/receiveItems.modules": [
		"./src/app/modules/receiveItems.modules.ts",
		"common",
		"receiveItems.modules"
	],
	"app/modules/role.modules": [
		"./src/app/modules/role.modules.ts",
		"role.modules"
	],
	"app/modules/site.modules": [
		"./src/app/modules/site.modules.ts",
		"common",
		"site.modules"
	],
	"app/modules/siteStatusReport.modules": [
		"./src/app/modules/siteStatusReport.modules.ts",
		"common",
		"siteStatusReport.modules"
	],
	"app/modules/useItems.modules": [
		"./src/app/modules/useItems.modules.ts",
		"common",
		"useItems.modules"
	],
	"app/modules/user.modules": [
		"./src/app/modules/user.modules.ts",
		"common",
		"user.modules"
	],
	"app/modules/userprofile.modules": [
		"./src/app/modules/userprofile.modules.ts",
		"common",
		"userprofile.modules"
	],
	"app/modules/userright.modules": [
		"./src/app/modules/userright.modules.ts",
		"common",
		"userright.modules"
	],
	"app/modules/viewProject.modules": [
		"./src/app/modules/viewProject.modules.ts",
		"common",
		"viewProject.modules"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/_guards/login.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginGuard = (function () {
    function LoginGuard(router) {
        this.router = router;
    }
    LoginGuard.prototype.canActivate = function (next, state) {
        if (sessionStorage.getItem("currentUser") == null) {
            this.router.navigate(['/login']);
            return true;
        }
        else {
            return true;
        }
    };
    LoginGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], LoginGuard);
    return LoginGuard;
}());



/***/ }),

/***/ "./src/app/_guards/nologin.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NologinGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NologinGuard = (function () {
    function NologinGuard(router) {
        this.router = router;
    }
    NologinGuard.prototype.canActivate = function (next, state) {
        if (sessionStorage.getItem("currentUser") == null) {
            return true;
        }
        else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    };
    NologinGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], NologinGuard);
    return NologinGuard;
}());



/***/ }),

/***/ "./src/app/_guards/role-rights.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleRightsGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RoleRightsGuard = (function () {
    function RoleRightsGuard(router, http, httpRestClient) {
        this.router = router;
        this.http = http;
        this.httpRestClient = httpRestClient;
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["c" /* CurrentUser */]();
        this.accountUsers = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["a" /* AccountUsers */]();
        this.roleRights = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["f" /* RoleRights */]();
    }
    RoleRightsGuard.prototype.hasAllRoles = function (menuName) {
        var _this = this;
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["c" /* CurrentUser */]();
        this.accountUsers = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["a" /* AccountUsers */]();
        this.roleRights = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["f" /* RoleRights */]();
        this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.accountUsers = JSON.parse(sessionStorage.getItem("accountUser"));
        this.roleRights.roleID = this.accountUsers.roleID;
        this.roleRights.accountId = this.accountUsers.accountID;
        //ADD here +++++++++++++
        this.roleRights.menuName = menuName;
        this.httpRestClient.postData('role-rights', this.roleRights)
            .subscribe(function (response) {
            if (response != null && response != undefined) {
                _this.roleRights = response;
                console.log(_this.roleRights.insertAccess);
                console.log(_this.roleRights.updateAccess);
                console.log(_this.roleRights.deleteAccess);
                console.log(_this.roleRights.viewAccess);
            }
            else {
                _this.router.navigate(['/access-denied']);
            }
        });
    };
    RoleRightsGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__["a" /* HttpRestClient */]])
    ], RoleRightsGuard);
    return RoleRightsGuard;
}());



/***/ }),

/***/ "./src/app/_login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".login-body{\r\n    height: 100vh;\r\n}"

/***/ }),

/***/ "./src/app/_login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"login-body\">\n  <div class=\"body-container\">\n      <div class=\"ui-g\">\n          <div class=\"ui-g-12 ui-lg-6 left-side\">\n          </div>\n          <div class=\"ui-g-12 ui-lg-6 right-side\">\n              <div class=\"login-wrapper\">                \n                  <div class=\"login-container\">\n                      <div class=\"logo-right-container\">\n                          <img src=\"../assets/layout/images/Aerial/logo-2.png\" alt=\"apollo-layout\" class=\"logo\" />\n                          <h2>Project Management System</h2>\n                          <span>Version {{versionNumber}}</span>\n                      </div>\n                      <span class=\"title\">Login</span>\n                    <form name=\"form\" novalidate #f=\"ngForm\" (ngSubmit)=\"login()\">\n                      <div class=\"ui-g ui-fluid\">\n                        <div class=\"ui-g-12\">\n                          <input type=\"text\" autocomplete=\"off\" [(ngModel)]=\"user.username\"  #userName=\"ngModel\"\n                                 name=\"userName\" maxlength=\"20\" ng-required=\"true\"  placeholder=\"Username\"  class=\"ui-inputtext ui-widget\"/>\n                        </div>\n                        <div class=\"ui-g-12\">\n                          <input type=\"password\" autocomplete=\"off\" [(ngModel)]=\"user.password\"  #userPass=\"ngModel\"\n                                 name=\"password\" maxlength=\"20\" required  placeholder=\"Password\" class=\"ui-inputtext ui-widget\" feedback=\"false\"/>\n                        </div>\n\n                        <div class=\"ui-g-6\" style=\"text-align: left;\">\n                            <p-dropdown id=\"dropdown\" [options]=\"items\" [autoWidth]=\"false\" (onChange)=\"changeTheme($event)\">\n                            </p-dropdown>\n                        </div>\n                        <div class=\"ui-g-6\">\n                          <button type=\"submit\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">\n                            <span class=\"ui-button-text ui-c\">\n                              <img src=\"../assets/layout/images/check.svg\" alt=\"login\" style=\"height: 13px;width: 16px;float: left;margin-top: 3px\">\n                              Login\n                            </span>\n                          </button>\n                        </div>\n                        <div class=\"ui-g-6 ui-md-6 \" style=\"margin: 0px -2px;\" >\n                            <p-checkbox [(ngModel)]=\"checked\" name=\"checked\" binary=\"true\" label=\"Set as Default Theme\"></p-checkbox>\n                        </div>\n                        <div class=\"ui-g-6 ui-md-6 \" >\n                           \n                        </div>\n                        <!-- <div class=\"ui-g-6 password-container\">\n                            <a >Forgot Password?</a>\n                        </div> -->\n                        <div class=\"ediosLogo ui-sm-12 ui-md-6 ui-lg-6\">\n                            <img src=\"../assets/layout/images/edois_logo.png\" alt=\"apollo-layout\" class=\"logo\" />\n                        </div>\n                        <div class=\"copyRight ui-sm-12 ui-md-6 ui-lg-6\">                          \n                                <div class=\"\">Copyright © 2021 Edios Global. All Rights Reserved.</div>                       \n                        </div>\n                      </div>\n                      </form>\n                  </div>\n                  \n                    <div>\n                        <p-growl [value]=\"msgs\" ></p-growl>\n                     </div>\n                      \n              </div>\n          </div>\n      </div>\n    \n  </div>\n</div>\n\n<!-- <div class=\"card no-margin\">\n\n</div> -->\n\n\n\n"

/***/ }),

/***/ "./src/app/_login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_components_common_messageservice__ = __webpack_require__("./node_modules/primeng/components/common/messageservice.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_components_common_messageservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_components_common_messageservice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_home_component__ = __webpack_require__("./src/app/app.home.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = (function () {
    function LoginComponent(app, router, httpRestClient) {
        this.app = app;
        this.router = router;
        this.httpRestClient = httpRestClient;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["g" /* User */]();
        this.msgs = [];
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["c" /* CurrentUser */]();
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["e" /* PayloadBean */]();
        this.dropDownTheme = true;
        this.checked = false;
        this.themeClass = "blue-light";
        this.items = [];
        this.versionNumber = __WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* appStatusConfig */].projectVersion;
        if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_6__app_config__["d" /* messageConfig */].updateSuccess });
            sessionStorage.setItem("successMessage", "");
            sessionStorage.clear();
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
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
    };
    LoginComponent.prototype.changeTheme = function (event) {
        console.log(event);
        this.dropDownTheme = false;
        this.app.changeTheme(event.value);
        this.themeClass = event.value;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.msgs = [];
        if ((this.user.username == '' || this.user.username == undefined)) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "UserName can't be blank!" });
        }
        else if (this.user.password == '' || this.user.password == undefined) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Password can't be blank!" });
        }
        else {
            this.httpRestClient.getLoginData('login', this.user)
                .subscribe(function (response) {
                if (response['loginName']) {
                    sessionStorage.setItem('currentUser', JSON.stringify(response));
                    var username = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["AES"].encrypt(_this.user.username.toString(), __WEBPACK_IMPORTED_MODULE_6__app_config__["b" /* appConfig */].privateKey);
                    var password = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["AES"].encrypt(_this.user.password.toString(), __WEBPACK_IMPORTED_MODULE_6__app_config__["b" /* appConfig */].privateKey);
                    sessionStorage.setItem('username', username.toString());
                    sessionStorage.setItem('password', password.toString());
                    _this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
                    _this.payloadBean = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["e" /* PayloadBean */]();
                    _this.payloadBean.signatureKey = __WEBPACK_IMPORTED_MODULE_6__app_config__["b" /* appConfig */].privateKey;
                    _this.payloadBean.id = _this.currentuser.userID;
                    if (_this.dropDownTheme && _this.currentuser.defaultTheme != undefined && _this.currentuser.defaultTheme != null && _this.currentuser.defaultTheme.trim() != '')
                        _this.app.changeTheme(_this.currentuser.defaultTheme);
                    _this.httpRestClient.postData('fetch-accounts', _this.payloadBean)
                        .subscribe(function (response) {
                        _this.accountUsers = response;
                        if (_this.accountUsers[0].customValue1 != undefined) {
                            sessionStorage.setItem("tabData", _this.accountUsers[0].customValue1);
                        }
                        else {
                            _this.accountUsers[0].customValue1 = 'n,n,n,n';
                            sessionStorage.setItem("tabData", _this.accountUsers[0].customValue1);
                        }
                        if (_this.accountUsers.length == 1) {
                            if (_this.checked) {
                                // this.showPageSpinner = true;
                                // this.customerBean.lastModifiedBy = this.currentuser.userID;
                                _this.payloadBean.searchParameter = _this.themeClass;
                                _this.httpRestClient.postData("update-user-default-theme", _this.payloadBean).subscribe(function (response) {
                                    _this.baseResponse = response;
                                });
                            }
                            if (_this.accountUsers.length == 1) {
                                sessionStorage.setItem('accountUser', JSON.stringify(_this.accountUsers[0]));
                                _this.router.navigate(['/dashboard']);
                            }
                            else {
                                console.log("============" + _this.accountUsers.length);
                            }
                        }
                    });
                }
                else {
                    _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: response['message'] });
                    _this.user = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["g" /* User */]();
                }
            }, function (error) {
                _this.msgs.push({ severity: 'error', summary: '', detail: 'Wrong Credentials' });
                _this.user = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["g" /* User */]();
            });
        }
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/_login/login.component.html"),
            styles: [__webpack_require__("./src/app/_login/login.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_1_primeng_components_common_messageservice__["MessageService"], __WEBPACK_IMPORTED_MODULE_7__app_home_component__["a" /* AppHome */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__app_home_component__["a" /* AppHome */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__["a" /* HttpRestClient */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/_models/data.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CurrentUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return RoleRights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PayloadBean; });
/* unused harmony export DrawingTypeEnityTO */
/* unused harmony export ExecutionModelsEntityTO */
/* unused harmony export ProjectCategories */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Contacts; });
/* unused harmony export AutoLookup */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DeleteRecords; });
/* unused harmony export parameterListDropDown */
/* unused harmony export UserEntityTO */
var User = (function () {
    function User() {
    }
    return User;
}());

var CurrentUser = (function () {
    function CurrentUser() {
    }
    return CurrentUser;
}());

var AccountUsers = (function () {
    function AccountUsers() {
    }
    return AccountUsers;
}());

var RoleRights = (function () {
    function RoleRights() {
    }
    return RoleRights;
}());

var PayloadBean = (function () {
    function PayloadBean() {
    }
    return PayloadBean;
}());

var DrawingTypeEnityTO = (function () {
    function DrawingTypeEnityTO() {
    }
    return DrawingTypeEnityTO;
}());

var ExecutionModelsEntityTO = (function () {
    function ExecutionModelsEntityTO() {
    }
    return ExecutionModelsEntityTO;
}());

var ProjectCategories = (function () {
    function ProjectCategories() {
    }
    return ProjectCategories;
}());

var Contacts = (function () {
    function Contacts() {
    }
    return Contacts;
}());

var AutoLookup = (function () {
    function AutoLookup() {
    }
    return AutoLookup;
}());

var DeleteRecords = (function () {
    function DeleteRecords() {
    }
    return DeleteRecords;
}());

var parameterListDropDown = (function () {
    function parameterListDropDown() {
    }
    return parameterListDropDown;
}());

var UserEntityTO = (function () {
    function UserEntityTO() {
    }
    return UserEntityTO;
}());



/***/ }),

/***/ "./src/app/_screens/dashboard/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/_screens/dashboard/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g dashboard\">  \n  <img src=\"../assets/aerialDashBoard.png\" alt=\"dashboard\"  />\n \n</div>\n\n"

/***/ }),

/***/ "./src/app/_screens/dashboard/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/_screens/dashboard/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/_screens/dashboard/dashboard/dashboard.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/_screens/sites/site-service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SiteService = (function () {
    function SiteService(http, httpRestClient) {
        this.http = http;
        this.httpRestClient = httpRestClient;
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["c" /* CurrentUser */]();
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["e" /* PayloadBean */]();
        this.accountUsers = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["a" /* AccountUsers */]();
        this.roleRights = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["f" /* RoleRights */]();
        this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.accountUsers = JSON.parse(sessionStorage.getItem("accountUser"));
    }
    SiteService.prototype.canActivate = function (next, state) {
        var _this = this;
        console.log("++++++++++++++++++++++++++++++++++" + next + "-------------" + state);
        this.roleRights.roleID = this.accountUsers.roleID;
        this.roleRights.menuName = "SITES";
        this.httpRestClient.postData('role-rights', this.roleRights)
            .subscribe(function (response) {
            console.log("______" + response);
            _this.roleRights = response;
            console.log("______" + _this.roleRights.viewAccess);
            console.log("______" + _this.roleRights.insertAccess);
            console.log("______" + _this.roleRights.deleteAccess);
            console.log("______" + _this.roleRights.updateAccess);
        });
        return true;
    };
    SiteService.prototype.setter = function (id) {
        this.id = id;
    };
    SiteService.prototype.getter = function () {
        return this.id;
    };
    SiteService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__services_http_rest_client_service__["a" /* HttpRestClient */]])
    ], SiteService);
    return SiteService;
}());



/***/ }),

/***/ "./src/app/_services/http-rest-client.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpRestClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HttpRestClient = (function () {
    function HttpRestClient(http) {
        this.http = http;
        this.authenticated = false;
        this.credentials = new __WEBPACK_IMPORTED_MODULE_4__models_data_model__["g" /* User */]();
        this.url = "users";
        this.apiEndpoint = __WEBPACK_IMPORTED_MODULE_2__app_config__["b" /* appConfig */].API_END_POINT;
    }
    HttpRestClient.prototype.createBasicAuthorizationHeader = function (credentials) {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */](credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : { 'Content-Type': 'application/json' });
    };
    HttpRestClient.prototype.getApiUrl = function (route) {
        return this.apiEndpoint + "" + route;
    };
    HttpRestClient.prototype.getCredentials = function () {
        this.credentials.username = __WEBPACK_IMPORTED_MODULE_3_crypto_js__["AES"].decrypt(sessionStorage.getItem("username"), __WEBPACK_IMPORTED_MODULE_2__app_config__["b" /* appConfig */].privateKey).toString(__WEBPACK_IMPORTED_MODULE_3_crypto_js__["enc"].Utf8);
        this.credentials.password = __WEBPACK_IMPORTED_MODULE_3_crypto_js__["AES"].decrypt(sessionStorage.getItem("password"), __WEBPACK_IMPORTED_MODULE_2__app_config__["b" /* appConfig */].privateKey).toString(__WEBPACK_IMPORTED_MODULE_3_crypto_js__["enc"].Utf8);
        return this.credentials;
    };
    HttpRestClient.prototype.getLoginData = function (url, credentials) {
        var authHeaders = this.createBasicAuthorizationHeader(credentials);
        return this.http.get(this.getApiUrl(url), { headers: authHeaders });
    };
    HttpRestClient.prototype.getData = function (url) {
        this.getCredentials();
        var authHeaders = this.createBasicAuthorizationHeader(this.credentials);
        return this.http.get(this.getApiUrl(url), { headers: authHeaders });
    };
    HttpRestClient.prototype.postData = function (url, data) {
        this.getCredentials();
        var authHeaders = this.createBasicAuthorizationHeader(this.credentials);
        return this.http.post(this.getApiUrl(url), data, { headers: authHeaders });
    };
    HttpRestClient.prototype.putData = function (url, data) {
        this.getCredentials();
        var authHeaders = this.createBasicAuthorizationHeader(this.credentials);
        return this.http.put(this.getApiUrl(url), data, { headers: authHeaders });
    };
    HttpRestClient.prototype.deleteData = function (url, data) {
        this.getCredentials();
        var authHeaders = this.createBasicAuthorizationHeader(this.credentials);
        return this.http.post(this.getApiUrl(url), data, { headers: authHeaders });
    };
    HttpRestClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], HttpRestClient);
    return HttpRestClient;
}());



/***/ }),

/***/ "./src/app/app.breadcrumb.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-breadcrumb\">\n    <ul>\n        <li>\n            <a routerLink=\"/dashboard\">\n                <i class=\"fa fa-home\"></i>\n            </a>\n        </li>\n        <li>/</li>\n        <ng-template ngFor let-item let-last=\"last\" [ngForOf]=\"items\">\n            <li>\n                <a [routerLink]=\"item.routerLink\" *ngIf=\"item.routerLink\">{{item.label}}</a>\n                <ng-container *ngIf=\"!item.routerLink\">{{item.label}}</ng-container>\n            </li>\n            <li *ngIf=\"!last\">/</li>\n        </ng-template>\n    </ul>\n\n    <div class=\"layout-breadcrumb-options\">\n        <!-- <a routerLink=\"/\" title=\"Backup\">\n          <i class=\"fa fa-cloud-upload\"></i>\n        </a>\n        <a routerLink=\"/\" title=\"Bookmark\">\n          <i class=\"fa fa-bookmark\"></i>\n        </a> -->\n        <a routerLink=\"\" (click)=\"logout()\" title=\"Logout\">\n          <i class=\"fa fa-sign-out\"></i>\n        </a>\n    </div>\n</div>\n<!-- <p-progressSpinner  *ngIf=\"true\" class=\"progress-bar\" [style]=\"{width: '50px', height: '50px'}\" strokeWidth=\"8\" fill=\"#EEEEEE\" animationDuration=\".5s\" ></p-progressSpinner>  -->\n"

/***/ }),

/***/ "./src/app/app.breadcrumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppBreadcrumbComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppBreadcrumbComponent = (function () {
    function AppBreadcrumbComponent(breadcrumbService, router) {
        var _this = this;
        this.breadcrumbService = breadcrumbService;
        this.router = router;
        this.subscription = breadcrumbService.itemsHandler.subscribe(function (response) {
            _this.items = response;
        });
    }
    AppBreadcrumbComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    AppBreadcrumbComponent.prototype.logout = function () {
        // remove user from local storage to log user out
        sessionStorage.clear();
        this.router.navigate(['/login']);
    };
    AppBreadcrumbComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-breadcrumb',
            template: __webpack_require__("./src/app/app.breadcrumb.component.html"),
            styles: ['@keyframes ui-progress-spinner-color { 100%, 0% { stroke: #d62d20; }40% {stroke: #0057e7;}66% {stroke: #008744;} 80%,90% {stroke: #ffa700; }}']
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], AppBreadcrumbComponent);
    return AppBreadcrumbComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return appConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return messageConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return appStatusConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return routeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var appConfig = {
    // API_END_POINT: 'http://192.168.5.232:8080/ediosCDF/api/',
    //  API_END_POINT: 'http://192.168.5.51:8081/ediosCDF/api/',
    //  API_END_POINT: 'http://192.168.5.112:58080/ediosCDF/api/',
    // API_END_POINT: 'http://192.168.5.81:58080/Aerial/api/',
    //API_END_POINT: 'http://103.27.232.18:58080/AerialTest/api/',
    API_END_POINT: 'http://103.27.232.18:58081/AerialProduction/api/',
    ALL_STATUS_LABEL: 'All',
    privateKey: "PfngA5S5H5"
};
var messageConfig = {
    deleteWarning: 'Please select atleast one record.',
    deleteSuccess: 'Record deleted successfully.',
    AddSuccess: 'Record added successfully.',
    updateSuccess: 'Record updated successfully.',
    emailSuccess: "Email Sent successfully.",
    emailFailed: "Email Sending Failed."
};
var appStatusConfig = {
    //For Project Version Number
    projectVersion: '2.3',
    //For Status
    activeId: '1',
    activeName: 'Active',
    activeCode: 'ACTIVE',
    inactiveId: '0',
    inactiveName: 'Inactive',
    inactiveCode: 'INACTIVE',
    allId: '2',
    allName: 'All',
    allCode: 'All',
    //For Parameter Type
    userParameter: 'User Parameter',
    systemParameter: 'System Parameter',
    //For Parameter Data Type
    binary: 'Binary',
    date: 'Date',
    double: 'Double',
    list: 'List',
    number: 'Number',
    string: 'String',
    time: 'Time',
    //For PO Approval 
    contractor: 'Contractor',
    supplier: 'Supplier',
    //For User Profile
    genderMale: 'Male',
    genderFemale: 'Female',
    userTypeSystem: 'System',
    UserTypeNonSystem: 'Non System',
};
var routeConfig = {
    //url : Menu Name (Hard Coded)
    siteMenu: 'SITES',
    parameterMenu: 'APP_PARAMETERS',
    circleMenu: 'CIRCLES',
    contactMenu: 'CONTACTS',
    roleMenu: "ROLES",
    userMenu: "USERS",
    addProjectMenu: "ADD_PROJECT",
    viewProjectMenu: "VIEW_PROJECT",
    siteStatusReport: "SITE_STATUS_REPORT",
    projectStatusReport: "PROJECT_STATUS_REPORT",
    assetMenu: "MANAGE_ASSETS",
    recieveItemMenu: 'RECEIVE_ITEMS',
    useItemsMenu: 'USE_ITEMS'
};
var Constants = (function () {
    function Constants() {
    }
    //for interpolation tag
    Constants.DATE_FMT = 'dd-MMM-yyyy';
    Constants.DATE_TIME_FMT = Constants.DATE_FMT + " hh:mm a";
    //for ts file
    Constants.DATE_FMT_TS = 'dd-M-yy';
    Constants.DATE_TIME_FMT_TS = Constants.DATE_FMT_TS + " hh:mm a";
    return Constants;
}());



/***/ }),

/***/ "./src/app/app.footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppFooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppFooterComponent = (function () {
    function AppFooterComponent() {
    }
    AppFooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: "\n    <div class=\"layout-footer upper-footer topbar\">\n        <div class=\"clearfix\">\n          \n          <span class=\"footer-text-right\">\n              <ul>\n                  <li><a href=\"#\">Contact Us</a></li>\n                  <li><a href=\"#\">Privacy</a></li>\n                  <li><a href=\"#\">About Us</a></li>\n              </ul>    \n          </span>\n        </div>\n      </div>\n      <div class=\"atBottom topbar\">\n        <div class=\"clearfix profile\">\n        <div class=\"ui-g\">\n          <div class=\"ui-g-12 ui-sm-4 ui-md-4\">\n            <span class=\"footer-Logo\"><img class=\"logo\" alt=\"apollo-layout\" src=\"assets/layout/images/company_logo.png\" /></span>\n          </div>\n          <div class=\"ui-g-12 ui-sm-4 ui-md-4\">  \n            <span class=\"footer-text-center username\">Edios Software Solutions</span>\n          </div>\n          <div class=\"ui-g-12 ui-sm-4 ui-md-4\">  \n            <span class=\"footer-text-right username\">\u00A9 edios 2018 All Rights Reserved</span>\n          </div>  \n        </div>\n      </div>\n    "
        })
    ], AppFooterComponent);
    return AppFooterComponent;
}());



/***/ }),

/***/ "./src/app/app.home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-wrapper\" (click)=\"onLayoutClick()\"\r\n     [ngClass]=\"{'layout-horizontal': isHorizontal(),\r\n                 'layout-overlay': isOverlay(),\r\n                 'layout-static': isStatic(),\r\n                 'layout-slim':isSlim(),\r\n                 'layout-static-inactive': staticMenuDesktopInactive,\r\n                 'layout-mobile-active': staticMenuMobileActive,\r\n                 'layout-overlay-active':overlayMenuActive}\">\r\n\r\n    <app-topbar></app-topbar>\r\n    <div class=\"layout-menu-container\" (click)=\"onMenuClick($event)\">\r\n        <p-scrollPanel #layoutMenuScroller [style]=\"{height: '100%'}\">\r\n            <div class=\"layout-menu-content\">\r\n                <div class=\"layout-menu-title\">MENU</div>\r\n                <app-menu [reset]=\"resetMenu\"></app-menu>\r\n                <div class=\"layout-menu-footer\">\r\n                    <div class=\"layout-menu-footer-title\">TASKS</div>\r\n\r\n                    <div class=\"layout-menu-footer-content\">\r\n                        <p-progressBar [value]=\"50\" [showValue]=\"false\"></p-progressBar>\r\n                        Today\r\n\r\n                        <p-progressBar [value]=\"80\" [showValue]=\"false\"></p-progressBar>\r\n                        Overall\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </p-scrollPanel>\r\n    </div>\r\n\r\n    <div class=\"layout-content\">\r\n\r\n        <app-breadcrumb></app-breadcrumb>\r\n\r\n        <div class=\"layout-content-container\">\r\n          <router-outlet></router-outlet>\r\n        </div>\r\n\r\n        <app-footer></app-footer>\r\n        <div class=\"layout-mask\" *ngIf=\"staticMenuMobileActive\"></div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppHome; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppHome = (function () {
    function AppHome() {
        this.darkTheme = false;
        //Default Menu Mode
        this.menuMode = 'horizontal';
    }
    AppHome.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { _this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    };
    AppHome.prototype.onLayoutClick = function () {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }
        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }
            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }
            this.menuHoverActive = false;
        }
        this.topbarItemClick = false;
        this.menuClick = false;
    };
    AppHome.prototype.onMenuButtonClick = function (event) {
        this.menuClick = true;
        this.topbarMenuActive = false;
        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        }
        else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }
        event.preventDefault();
    };
    AppHome.prototype.onMenuClick = function ($event) {
        var _this = this;
        this.menuClick = true;
        this.resetMenu = false;
        if (!this.isHorizontal()) {
            setTimeout(function () { _this.layoutMenuScrollerViewChild.moveBar(); }, 500);
        }
    };
    AppHome.prototype.onTopbarMenuButtonClick = function (event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        this.hideOverlayMenu();
        event.preventDefault();
    };
    AppHome.prototype.onTopbarItemClick = function (event, item) {
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        }
        else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    };
    AppHome.prototype.isHorizontal = function () {
        return this.menuMode === 'horizontal';
    };
    AppHome.prototype.isSlim = function () {
        return this.menuMode === 'slim';
    };
    AppHome.prototype.isOverlay = function () {
        return this.menuMode === 'overlay';
    };
    AppHome.prototype.isStatic = function () {
        return this.menuMode === 'static';
    };
    AppHome.prototype.isMobile = function () {
        return window.innerWidth < 1025;
    };
    AppHome.prototype.isDesktop = function () {
        return window.innerWidth > 1024;
    };
    AppHome.prototype.isTablet = function () {
        var width = window.innerWidth;
        return width <= 1024 && width > 640;
    };
    AppHome.prototype.hideOverlayMenu = function () {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    };
    AppHome.prototype.changeTheme = function (theme) {
        var themeLink = document.getElementById('theme-css');
        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        var layoutLink = document.getElementById('layout-css');
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
        if (theme.indexOf('dark') !== -1) {
            this.darkTheme = true;
        }
        else {
            this.darkTheme = false;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('layoutMenuScroller'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["ScrollPanel"])
    ], AppHome.prototype, "layoutMenuScrollerViewChild", void 0);
    AppHome = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.home.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], AppHome);
    return AppHome;
}());



/***/ }),

/***/ "./src/app/app.menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenuComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppSubMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_home_component__ = __webpack_require__("./src/app/app.home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__("./src/app/app.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppMenuComponent = (function () {
    function AppMenuComponent(app, httpRestClient) {
        this.app = app;
        this.httpRestClient = httpRestClient;
        this.model = new Array();
        this.menuItems = new Array();
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["c" /* CurrentUser */]();
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["e" /* PayloadBean */]();
        this.accountUsers = new __WEBPACK_IMPORTED_MODULE_2__models_data_model__["a" /* AccountUsers */]();
        this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.accountUsers = JSON.parse(sessionStorage.getItem("accountUser"));
    }
    AppMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.payloadBean.accountId = this.accountUsers.accountID;
        this.payloadBean.signatureKey = __WEBPACK_IMPORTED_MODULE_5__app_config__["b" /* appConfig */].privateKey;
        this.payloadBean.id = this.accountUsers.roleID;
        this.httpRestClient.postData('menus', this.payloadBean)
            .subscribe(function (response) {
            _this.menuItems = response;
            _this.model = [
                { label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/dashboard'] },
                { label: 'Personalize', icon: 'fa fa-cogs',
                    items: [
                        { label: "Menu", icon: 'fa fa-fw fa-bars',
                            items: [
                                { label: 'Horizontal', icon: 'fa fa-fw fa-arrows-h', command: function (event) { return _this.app.menuMode = 'horizontal'; } },
                                { label: 'Overlay', icon: 'fa fa-fw fa-arrows-v', command: function (event) { return _this.app.menuMode = 'overlay'; } },
                                { label: 'Static', icon: 'fa fa-fw fa-bars', command: function (event) { return _this.app.menuMode = 'static'; } },
                                { label: 'Slim', icon: 'fa fa-fw fa-window-restore', command: function (event) { return _this.app.menuMode = 'slim'; } }
                            ]
                        },
                        { label: 'Themes', icon: 'fa fa-fw fa-circle-o',
                            items: [
                                { label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('blue-light'); }
                                },
                                { label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('green-light'); }
                                },
                                { label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('cyan-light'); }
                                },
                                { label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('purple-light'); }
                                },
                                { label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('indigo-light'); }
                                },
                                { label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('yellow-light'); }
                                },
                                { label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('orange-light'); }
                                },
                                { label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                                    command: function (event) { _this.app.changeTheme('pink-light'); }
                                }
                            ]
                        }
                    ]
                }
            ];
            var count;
            for (count = 0; count < _this.menuItems.length; count++) {
                _this.model.push(_this.menuItems[count]);
            }
        });
        // this.model = [
        //     { label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/'] },
        //     {
        //         label: 'Menu', icon: 'fa fa-fw fa-bars',
        //         items: [
        //             { label: 'Horizontal', icon: 'fa fa-fw fa-arrows-h', command: event => this.app.menuMode = 'horizontal' },
        //             { label: 'Overlay', icon: 'fa fa-fw fa-arrows-v', command: event => this.app.menuMode = 'overlay' },
        //             { label: 'Static', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'static' },
        //             { label: 'Slim', icon: 'fa fa-fw fa-window-restore', command: event => this.app.menuMode = 'slim' }
        //         ]
        //     }];
        //     {
        //         label: 'Dark', icon: 'fa fa-fw fa-circle', badge: '8',
        //         items: [
        //             {
        //                 label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('blue-dark'); }
        //             },
        //             {
        //                 label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('green-dark'); }
        //             },
        //             {
        //                 label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('cyan-dark'); }
        //             },
        //             {
        //                 label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('purple-dark'); }
        //             },
        //             {
        //                 label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('indigo-dark'); }
        //             },
        //             {
        //                 label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('yellow-dark'); }
        //             },
        //             {
        //                 label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('orange-dark'); }
        //             },
        //             {
        //                 label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('pink-dark'); }
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Light', icon: 'fa fa-fw fa-circle-o', badge: '8',
        //         items: [
        //             {
        //                 label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('blue-light'); }
        //             },
        //             {
        //                 label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('green-light'); }
        //             },
        //             {
        //                 label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('cyan-light'); }
        //             },
        //             {
        //                 label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('purple-light'); }
        //             },
        //             {
        //                 label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('indigo-light'); }
        //             },
        //             {
        //                 label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('yellow-light'); }
        //             },
        //             {
        //                 label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('orange-light'); }
        //             },
        //             {
        //                 label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
        //                 command: (event) => { this.app.changeTheme('pink-light'); }
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Components', icon: 'fa fa-fw fa-sitemap',
        //         items: [
        //             { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample'] },
        //             { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms'] },
        //             { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data'] },
        //             { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels'] },
        //             { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays'] },
        //             { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus'] },
        //             { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages'] },
        //             { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts'] },
        //             { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file'] },
        //             { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc'] }
        //         ]
        //     },
        //     {
        //         label: 'Pages', icon: 'fa fa-fw fa-life-saver',
        //         items: [
        //             { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty'] },
        //             { label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html', target: '_blank' },
        //             { label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank' },
        //             { label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank' },
        //             { label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank' },
        //             {
        //                 label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
        //                 url: 'assets/pages/access.html', target: '_blank'
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Hierarchy', icon: 'fa fa-fw fa-gg',
        //         items: [
        //             {
        //                 label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
        //                 items: [
        //                     {
        //                         label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
        //                         items: [
        //                             { label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in' },
        //                             { label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in' },
        //                             { label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in' },
        //                         ]
        //                     },
        //                     {
        //                         label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
        //                         items: [
        //                             { label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in' },
        //                             { label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in' }
        //                         ]
        //                     },
        //                 ]
        //             },
        //             {
        //                 label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
        //                 items: [
        //                     {
        //                         label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
        //                         items: [
        //                             { label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in' },
        //                             { label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in' },
        //                             { label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in' },
        //                         ]
        //                     },
        //                     {
        //                         label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
        //                         items: [
        //                             { label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in' },
        //                             { label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in' }
        //                         ]
        //                     },
        //                 ]
        //             }
        //         ]
        //     },
        //     { label: 'Docs', icon: 'fa fa-fw fa-book', routerLink: ['/documentation'] }
        // ];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AppMenuComponent.prototype, "reset", void 0);
    AppMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-menu',
            template: "\n        <ul app-submenu [item]=\"model\" root=\"true\" class=\"layout-menu\" [reset]=\"reset\" visible=\"true\"></ul>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__app_home_component__["a" /* AppHome */], __WEBPACK_IMPORTED_MODULE_3__services_http_rest_client_service__["a" /* HttpRestClient */]])
    ], AppMenuComponent);
    return AppMenuComponent;
}());

var AppSubMenuComponent = (function () {
    function AppSubMenuComponent(app) {
        this.app = app;
    }
    AppSubMenuComponent.prototype.itemClick = function (event, item, index) {
        var _this = this;
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }
        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;
        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }
        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(function () {
                _this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }
        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            }
            else {
                this.app.resetMenu = false;
            }
            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    };
    AppSubMenuComponent.prototype.onMouseEnter = function (index) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    };
    AppSubMenuComponent.prototype.isActive = function (index) {
        return this.activeIndex === index;
    };
    Object.defineProperty(AppSubMenuComponent.prototype, "reset", {
        get: function () {
            return this._reset;
        },
        set: function (val) {
            this._reset = val;
            if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
                this.activeIndex = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppSubMenuComponent.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AppSubMenuComponent.prototype, "root", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AppSubMenuComponent.prototype, "visible", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AppSubMenuComponent.prototype, "reset", null);
    AppSubMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            /* tslint:disable:component-selector */
            selector: '[app-submenu]',
            /* tslint:enable:component-selector */
            template: "\n        <ng-template ngFor let-child let-i=\"index\" [ngForOf]=\"(root ? item : item.items)\">\n            <li [ngClass]=\"{'active-menuitem': isActive(i)}\" [class]=\"child.badgeStyleClass\" *ngIf=\"child.visible === false ? false : true\">\n                <a [href]=\"child.url||'#'\" (click)=\"itemClick($event,child,i)\" (mouseenter)=\"onMouseEnter(i)\"\n                   *ngIf=\"!child.routerLink\" [ngClass]=\"child.styleClass\"\n                   [attr.tabindex]=\"!visible ? '-1' : null\" [attr.target]=\"child.target\">\n                    <i [ngClass]=\"child.icon\"></i>\n                    <span>{{child.label}}</span>\n                    <i class=\"fa fa-fw fa-angle-down layout-menuitem-toggler\" *ngIf=\"child.items\"></i>\n                    <span class=\"menuitem-badge\" *ngIf=\"child.badge\">{{child.badge}}</span>\n                </a>\n\n                <a (click)=\"itemClick($event,child,i)\" (mouseenter)=\"onMouseEnter(i)\" *ngIf=\"child.routerLink\"\n                    [routerLink]=\"child.routerLink\" routerLinkActive=\"active-menuitem-routerlink\"\n                    [routerLinkActiveOptions]=\"{exact: true}\" [attr.tabindex]=\"!visible ? '-1' : null\" [attr.target]=\"child.target\">\n                    <i [ngClass]=\"child.icon\"></i>\n                    <span>{{child.label}}</span>\n                    <i class=\"fa fa-fw fa-angle-down\" *ngIf=\"child.items\"></i>\n                    <span class=\"menuitem-badge\" *ngIf=\"child.badge\">{{child.badge}}</span>\n                </a>\n                <div class=\"layout-menu-tooltip\">\n                  <div class=\"layout-menu-tooltip-arrow\"></div>\n                  <div class=\"layout-menu-tooltip-text\">{{child.label}}</div>\n                </div>\n                <ul app-submenu [item]=\"child\" *ngIf=\"child.items\" [visible]=\"isActive(i)\" [reset]=\"reset\"\n                    [@children]=\"(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?\n                    'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'\"></ul>\n            </li>\n        </ng-template>\n    ",
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('children', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["state"])('hiddenAnimated', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        height: '0px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["state"])('visibleAnimated', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        height: '*'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["state"])('visible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        height: '*',
                        'z-index': 100
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["state"])('hidden', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        height: '0px',
                        'z-index': '*'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])('visibleAnimated => hiddenAnimated', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])('hiddenAnimated => visibleAnimated', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__app_home_component__["a" /* AppHome */]])
    ], AppSubMenuComponent);
    return AppSubMenuComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routes__ = __webpack_require__("./src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_scrollpanel__ = __webpack_require__("./node_modules/primeng/scrollpanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_scrollpanel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_primeng_scrollpanel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_primeng_table__ = __webpack_require__("./node_modules/primeng/table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_primeng_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_primeng_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_keyfilter__ = __webpack_require__("./node_modules/primeng/keyfilter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_keyfilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_primeng_keyfilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_primeng_progressspinner__ = __webpack_require__("./node_modules/primeng/progressspinner.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_primeng_progressspinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_primeng_progressspinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_home_component__ = __webpack_require__("./src/app/app.home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_menu_component__ = __webpack_require__("./src/app/app.menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_topbar_component__ = __webpack_require__("./src/app/app.topbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_footer_component__ = __webpack_require__("./src/app/app.footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_breadcrumb_component__ = __webpack_require__("./src/app/app.breadcrumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__login_login_component__ = __webpack_require__("./src/app/_login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__demo_view_dashboarddemo_component__ = __webpack_require__("./src/app/demo/view/dashboarddemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__demo_view_sampledemo_component__ = __webpack_require__("./src/app/demo/view/sampledemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__demo_view_formsdemo_component__ = __webpack_require__("./src/app/demo/view/formsdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__demo_view_datademo_component__ = __webpack_require__("./src/app/demo/view/datademo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__demo_view_panelsdemo_component__ = __webpack_require__("./src/app/demo/view/panelsdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__demo_view_overlaysdemo_component__ = __webpack_require__("./src/app/demo/view/overlaysdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__demo_view_menusdemo_component__ = __webpack_require__("./src/app/demo/view/menusdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__demo_view_messagesdemo_component__ = __webpack_require__("./src/app/demo/view/messagesdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__demo_view_chartsdemo_component__ = __webpack_require__("./src/app/demo/view/chartsdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__demo_view_filedemo_component__ = __webpack_require__("./src/app/demo/view/filedemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__demo_view_miscdemo_component__ = __webpack_require__("./src/app/demo/view/miscdemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__demo_view_emptydemo_component__ = __webpack_require__("./src/app/demo/view/emptydemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__demo_view_documentation_component__ = __webpack_require__("./src/app/demo/view/documentation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__demo_service_carservice__ = __webpack_require__("./src/app/demo/service/carservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__demo_service_countryservice__ = __webpack_require__("./src/app/demo/service/countryservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__demo_service_eventservice__ = __webpack_require__("./src/app/demo/service/eventservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__demo_service_nodeservice__ = __webpack_require__("./src/app/demo/service/nodeservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__guards_login_guard__ = __webpack_require__("./src/app/_guards/login.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__guards_nologin_guard__ = __webpack_require__("./src/app/_guards/nologin.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__screens_sites_site_service__ = __webpack_require__("./src/app/_screens/sites/site-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__guards_role_rights_guard__ = __webpack_require__("./src/app/_guards/role-rights.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__screens_dashboard_dashboard_dashboard_component__ = __webpack_require__("./src/app/_screens/dashboard/dashboard/dashboard.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































































































/** Services */






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_6__app_routes__["a" /* AppRoutes */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["AccordionModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["BreadcrumbModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ButtonModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["CarouselModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["CheckboxModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ChipsModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["CodeHighlighterModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ConfirmDialogModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ColorPickerModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["SharedModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ContextMenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DataGridModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DataListModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DataScrollerModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DragDropModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["EditorModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["FieldsetModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["GalleriaModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["GMapModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["InputMaskModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["InputSwitchModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["InputTextModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["InputTextareaModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["LightboxModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ListboxModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["MegaMenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["MenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["MenubarModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["MultiSelectModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["OrderListModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["OrganizationChartModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["OverlayPanelModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["PaginatorModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["PanelModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["PanelMenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["PasswordModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["PickListModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ProgressBarModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["RadioButtonModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["RatingModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ScheduleModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_scrollpanel__["ScrollPanelModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["SelectButtonModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["SlideMenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["SliderModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["SpinnerModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["SplitButtonModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["StepsModule"],
                __WEBPACK_IMPORTED_MODULE_10_primeng_table__["TableModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TabMenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TabViewModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TerminalModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TieredMenuModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ToggleButtonModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ToolbarModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TooltipModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TreeModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["TreeTableModule"],
                __WEBPACK_IMPORTED_MODULE_11_primeng_keyfilter__["KeyFilterModule"],
                __WEBPACK_IMPORTED_MODULE_12_primeng_progressspinner__["ProgressSpinnerModule"],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_15__app_menu_component__["a" /* AppMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_15__app_menu_component__["b" /* AppSubMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_16__app_topbar_component__["a" /* AppTopBarComponent */],
                __WEBPACK_IMPORTED_MODULE_17__app_footer_component__["a" /* AppFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_20__demo_view_dashboarddemo_component__["a" /* DashboardDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_18__app_breadcrumb_component__["a" /* AppBreadcrumbComponent */],
                __WEBPACK_IMPORTED_MODULE_14__app_home_component__["a" /* AppHome */],
                __WEBPACK_IMPORTED_MODULE_21__demo_view_sampledemo_component__["a" /* SampleDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_22__demo_view_formsdemo_component__["a" /* FormsDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_23__demo_view_datademo_component__["a" /* DataDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_24__demo_view_panelsdemo_component__["a" /* PanelsDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_25__demo_view_overlaysdemo_component__["a" /* OverlaysDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_26__demo_view_menusdemo_component__["a" /* MenusDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_27__demo_view_messagesdemo_component__["a" /* MessagesDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_28__demo_view_chartsdemo_component__["a" /* ChartsDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_29__demo_view_filedemo_component__["a" /* FileDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_30__demo_view_miscdemo_component__["a" /* MiscDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_31__demo_view_emptydemo_component__["a" /* EmptyDemoComponent */],
                __WEBPACK_IMPORTED_MODULE_19__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_32__demo_view_documentation_component__["a" /* DocumentationComponent */],
                __WEBPACK_IMPORTED_MODULE_43__screens_dashboard_dashboard_dashboard_component__["a" /* DashboardComponent */],
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_5__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_5__angular_common__["HashLocationStrategy"] }, __WEBPACK_IMPORTED_MODULE_8_primeng_primeng__["ConfirmationService"], __WEBPACK_IMPORTED_MODULE_41__screens_sites_site_service__["a" /* SiteService */], __WEBPACK_IMPORTED_MODULE_42__guards_role_rights_guard__["a" /* RoleRightsGuard */],
                __WEBPACK_IMPORTED_MODULE_33__demo_service_carservice__["a" /* CarService */], __WEBPACK_IMPORTED_MODULE_34__demo_service_countryservice__["a" /* CountryService */], __WEBPACK_IMPORTED_MODULE_35__demo_service_eventservice__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_36__demo_service_nodeservice__["a" /* NodeService */], __WEBPACK_IMPORTED_MODULE_37__breadcrumb_service__["a" /* BreadcrumbService */], __WEBPACK_IMPORTED_MODULE_38__guards_login_guard__["a" /* LoginGuard */], __WEBPACK_IMPORTED_MODULE_39__guards_nologin_guard__["a" /* NologinGuard */], __WEBPACK_IMPORTED_MODULE_40__services_http_rest_client_service__["a" /* HttpRestClient */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]],
            exports: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_component__ = __webpack_require__("./src/app/_login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guards_login_guard__ = __webpack_require__("./src/app/_guards/login.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guards_nologin_guard__ = __webpack_require__("./src/app/_guards/nologin.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_home_component__ = __webpack_require__("./src/app/app.home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__screens_dashboard_dashboard_dashboard_component__ = __webpack_require__("./src/app/_screens/dashboard/dashboard/dashboard.component.ts");






var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_4__app_home_component__["a" /* AppHome */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__guards_login_guard__["a" /* LoginGuard */]],
        children: [
            { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_5__screens_dashboard_dashboard_dashboard_component__["a" /* DashboardComponent */] },
            { path: 'sites', loadChildren: 'app/modules/site.modules#SiteModule' },
            { path: 'roles', loadChildren: 'app/modules/role.modules#RoleModule' },
            { path: 'users', loadChildren: 'app/modules/user.modules#UserModule' },
            { path: 'parameters', loadChildren: 'app/modules/parameter.modules#ParameterModule' },
            // { path: 'dashboard',loadChildren: 'app/modules/dasboard.modules#DashboardModule'  },
            { path: 'user-profile', loadChildren: 'app/modules/userprofile.modules#UserProfileModule' },
            { path: 'access-denied', loadChildren: 'app/modules/accessdenied.modules#AccessDeniedModule' },
            //    { path: 'sites', component: ManageSitesComponent },
            //    { path: 'sites/add-site', component: AddSiteComponent },
            //    { path: 'sites/edit-site/:id', component: AddSiteComponent },
            //     { path: 'roles', component: ManageRoleComponent },
            //     { path: 'roles/add-role', component: AddRoleComponent },
            //     { path: 'roles/edit-role/:id', component: AddRoleComponent },
            //     { path: 'users', component: ManageUsersComponent },
            //     { path: 'users/add-user', component: AddUserComponent },
            //     { path: 'users/edit-user/:id', component: AddUserComponent },
            //     { path: 'parameters', component: ManageParameters },
            //     { path: 'parameters/add-parameter', component: AddParameter },
            //     { path: 'parameters/edit-parameter/:id', component: AddParameter },
            //     { path: 'user-profile', component: UserProfileComponent },projectModule
            { path: 'projects', loadChildren: 'app/modules/viewProject.modules#PoApprovalModule' },
            // { path: 'projects', component: ManageProjectsComponent },
            // { path: 'projects/add-project', component: AddProjectComponent },
            // { path: 'projects/edit-project/:id', component: AddProjectComponent },
            { path: 'circles', loadChildren: 'app/modules/circle.modules#CircleModule' },
            // { path: 'circles/add-circle', component: AddCircleComponent },
            // { path: 'circles/edit-circle/:id', component: AddCircleComponent },
            { path: 'contacts', loadChildren: 'app/modules/contact.modules#ContactModule' },
            // { path: 'contacts/add-contact', component: AddContactComponent },
            // { path: 'contacts/edit-contact/:id', component: AddContactComponent },
            { path: 'user-rights', loadChildren: 'app/modules/userright.modules#UserRightModule' },
            { path: 'site-status-report', loadChildren: 'app/modules/siteStatusReport.modules#SiteStatusReportModule' },
            { path: 'mis-status-report', loadChildren: 'app/modules/misReport.modules#misReportModule' },
            //  { path: 'mis-status-report',loadChildren: 'app/modules/misPoWiseReport.modules#MisPoWiseReport'},
            { path: 'supplier-contractor-report', loadChildren: 'app/modules/misPoWiseReport.modules#MisPoWiseReport' },
            { path: 'approval', loadChildren: 'app/modules/poApproval.modules#PoApprovalModule' },
            //    { path: 'access-denied', component: AccessDeniedComponent },
            { path: 'manage-assets', loadChildren: 'app/modules/manageItems.modules#ManageItemsReport' },
            // { path: 'add-assets', component: AddAssetComponent },
            // { path: 'edit-assets/:id', component: AddAssetComponent },
            { path: 'receive-items', loadChildren: 'app/modules/receiveItems.modules#receiveItemModule' },
            // { path: 'receive-items/add-receive-items', component: AddReceiveItemsComponent },
            // { path: 'receive-items/edit-receive-items/:id', component: AddReceiveItemsComponent },
            { path: 'manage-use-items', loadChildren: 'app/modules/useItems.modules#UseItemsModule' },
        ]
    },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__guards_nologin_guard__["a" /* NologinGuard */]] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var AppRoutes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forRoot(routes);


/***/ }),

/***/ "./src/app/app.topbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"topbar clearfix\">\n\n    <img class=\"logo\" alt=\"apollo-layout\" src=\"assets/layout/images/apollo_logo.png\" />\n\n    <a id=\"menu-button\" href=\"#\" (click)=\"app.onMenuButtonClick($event)\">\n        <i class=\"fa fa-align-left\"></i>\n    </a>\n\n    <a href=\"#\" class=\"profile\" (click)=\"app.onTopbarMenuButtonClick($event)\">\n        <span class=\"username\">{{currentUser['loginName']}}</span>\n        <img src=\"assets/layout/images/avatar/avatar.png\" alt=\"apollo-layout\" />\n        <i class=\"fa fa-angle-down\"></i>\n    </a>\n\n    <!-- <span class=\"topbar-search\">\n        <input type=\"text\" pInputText placeholder=\"Search\"/>\n        <span class=\"fa fa-search\"></span>\n    </span> -->\n\n    <!-- <span class=\"topbar-search\" *ngIf=\"switchTheme\">\n        <p-menubar [model]=\"lightThemeMenu\"></p-menubar>\n    </span> \n     <span class=\"topbar-search\" *ngIf=\"!switchTheme\">\n        <p-menubar [model]=\"darkThemeMenu\"></p-menubar>\n    </span>  -->\n  \n\n    <span class=\"topbar-themeswitcher\">\n        <p-inputSwitch [(ngModel)]=\"app.darkTheme\" (onChange)=\"themeChange($event)\"></p-inputSwitch>\n    </span>\n\n    <ul class=\"topbar-menu fadeInDown\" [ngClass]=\"{'topbar-menu-visible': app.topbarMenuActive}\">\n        <li >\n            <a (click)=\"accountSetting()\" [routerLink]=\"\">\n                <i class=\"topbar-icon fa fa-fw fa-user\"></i>\n                <span class=\"topbar-item-name\">Profile</span>\n            </a>\n            <!-- <ul>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                        <i class=\"fa fa-fw fa-user\"></i>\n                        <span>Profile</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                        <i class=\"fa fa-fw fa-user-secret\"></i>\n                        <span>Privacy</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                        <i class=\"fa fa-fw fa-cog\"></i>\n                        <span>Settings</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a (click)=\"logout()\" [routerLink]=\"\" >\n                      <i class=\"fa fa-fw fa-sign-out\"></i>\n                      <span>Logout</span>\n                    </a>\n                </li>\n            </ul> -->\n        </li>\n       \n                <li role=\"menuitem\">\n                        <a (click)=\"logout()\" [routerLink]=\"\" >\n                          <i class=\"fa fa-fw fa-sign-out\"></i>\n                          <span>Logout</span>\n                        </a>\n                    </li>\n\n\n        <!-- <li #settings [ngClass]=\"{'menuitem-active':app.activeTopbarItem === settings}\" (click)=\"app.onTopbarItemClick($event, settings)\">\n            <a href=\"#\">\n                <i class=\"topbar-icon fa fa-fw fa-cog\"></i>\n                <span class=\"topbar-item-name\">Settings</span>\n            </a>\n            <ul>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-paint-brush\"></i>\n                      <span>Change Theme</span>\n                      <span class=\"topbar-badge\">1</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-star-o\"></i>\n                      <span>Favorites</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                        <i class=\"fa fa-fw fa-lock\"></i>\n                        <span>Lock Screen</span>\n                        <span class=\"topbar-badge\">3</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-picture-o\"></i>\n                      <span>Wallpaper</span>\n                    </a>\n                </li>\n          </ul>\n        </li>\n        <li #messages [ngClass]=\"{'menuitem-active':app.activeTopbarItem === messages}\" (click)=\"app.onTopbarItemClick($event, messages)\">\n            <a href=\"#\">\n                <i class=\"topbar-icon fa fa-fw fa-envelope-o\"></i>\n                <span class=\"topbar-item-name\">Messages</span>\n                <span class=\"topbar-badge\">5</span>\n            </a>\n            <ul>\n                <li role=\"menuitem\">\n                  <a href=\"#\" class=\"topbar-message\">\n                    <img src=\"assets/layout/images/avatar/avatar1.png\" alt=\"avatar1\" style=\"width: 35px;\"/>\n                    <span>Give me a call</span>\n                  </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\" class=\"topbar-message\">\n                      <img src=\"assets/layout/images/avatar/avatar2.png\" alt=\"avatar2\" style=\"width: 35px;\"/>\n                      <span>Reports attached</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\" class=\"topbar-message\">\n                      <img src=\"assets/layout/images/avatar/avatar3.png\" alt=\"avatar3\" style=\"width: 35px;\"/>\n                      <span>About your invoice</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\" class=\"topbar-message\">\n                      <img src=\"assets/layout/images/avatar/avatar2.png\" alt=\"avatar2\" style=\"width: 35px;\"/>\n                      <span>Meeting today</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\" class=\"topbar-message\">\n                      <img src=\"assets/layout/images/avatar/avatar4.png\" alt=\"avatar4\" style=\"width: 35px;\"/>\n                      <span>Out of office</span>\n                    </a>\n                </li>\n            </ul>\n        </li>\n        <li #notifications [ngClass]=\"{'menuitem-active':app.activeTopbarItem === notifications}\" (click)=\"app.onTopbarItemClick($event, notifications)\">\n            <a href=\"#\">\n                <i class=\"topbar-icon fa fa-fw fa-bell-o\"></i>\n                <span class=\"topbar-item-name\">Notifications</span>\n                <span class=\"topbar-badge\">2</span>\n            </a>\n            <ul>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-tasks\"></i>\n                      <span>Pending tasks</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-calendar-check-o\"></i>\n                      <span>Meeting today</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-download\"></i>\n                      <span>Download</span>\n                    </a>\n                </li>\n                <li role=\"menuitem\">\n                    <a href=\"#\">\n                      <i class=\"fa fa-fw fa-plane\"></i>\n                      <span>Book flight</span>\n                    </a>\n                </li>\n            </ul>\n        </li> -->\n    </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/app.topbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTopBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_home_component__ = __webpack_require__("./src/app/app.home.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppTopBarComponent = (function () {
    function AppTopBarComponent(app, router) {
        var _this = this;
        this.app = app;
        this.router = router;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__models_data_model__["g" /* User */]();
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.switchTheme = true;
        this.darkThemeMenu = [
            {
                label: 'Dark', icon: 'fa fa-fw fa-circle', badge: '8',
                items: [
                    {
                        label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('blue-dark'); }
                    },
                    {
                        label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('green-dark'); }
                    },
                    {
                        label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('cyan-dark'); }
                    },
                    {
                        label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('purple-dark'); }
                    },
                    {
                        label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('indigo-dark'); }
                    },
                    {
                        label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('yellow-dark'); }
                    },
                    {
                        label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('orange-dark'); }
                    },
                    {
                        label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('pink-dark'); }
                    }
                ]
            }
        ];
        this.lightThemeMenu = [
            {
                label: 'Light', icon: 'fa fa-fw fa-circle-o', badge: '8',
                items: [
                    {
                        label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('blue-light'); }
                    },
                    {
                        label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('green-light'); }
                    },
                    {
                        label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('cyan-light'); }
                    },
                    {
                        label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('purple-light'); }
                    },
                    {
                        label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('indigo-light'); }
                    },
                    {
                        label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('yellow-light'); }
                    },
                    {
                        label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('orange-light'); }
                    },
                    {
                        label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                        command: function (event) { _this.app.changeTheme('pink-light'); }
                    }
                ]
            }
        ];
    }
    AppTopBarComponent.prototype.themeChange = function (e) {
        var themeLink = document.getElementById('theme-css');
        var href = themeLink.href;
        var themeFile = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
        var themeTokens = themeFile.split('-');
        var themeName = themeTokens[1];
        var themeMode = themeTokens[2];
        var newThemeMode = (themeMode === 'dark') ? 'light' : 'dark';
        this.switchTheme = (themeMode === 'dark') ? true : false;
        this.app.changeTheme(themeName + '-' + newThemeMode);
    };
    AppTopBarComponent.prototype.accountSetting = function () {
        this.router.navigate(['/user-profile']);
    };
    AppTopBarComponent.prototype.logout = function () {
        // remove user from local storage to log user out
        sessionStorage.clear();
        this.router.navigate(['/login']);
    };
    AppTopBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-topbar',
            template: __webpack_require__("./src/app/app.topbar.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_home_component__["a" /* AppHome */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], AppTopBarComponent);
    return AppTopBarComponent;
}());



/***/ }),

/***/ "./src/app/breadcrumb.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BreadcrumbService = (function () {
    function BreadcrumbService() {
        this.itemsSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.itemsHandler = this.itemsSource.asObservable();
    }
    BreadcrumbService.prototype.setItems = function (items) {
        this.itemsSource.next(items);
    };
    BreadcrumbService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], BreadcrumbService);
    return BreadcrumbService;
}());



/***/ }),

/***/ "./src/app/demo/service/carservice.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarService = (function () {
    function CarService(http) {
        this.http = http;
    }
    CarService.prototype.getCarsSmall = function () {
        return this.http.get('assets/demo/data/cars-small.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    CarService.prototype.getCarsMedium = function () {
        return this.http.get('assets/demo/data/cars-medium.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    CarService.prototype.getCarsLarge = function () {
        return this.http.get('assets/demo/data/cars-large.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    CarService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], CarService);
    return CarService;
}());



/***/ }),

/***/ "./src/app/demo/service/countryservice.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CountryService = (function () {
    function CountryService(http) {
        this.http = http;
    }
    CountryService.prototype.getCountries = function () {
        return this.http.get('assets/demo/data/countries.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    CountryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], CountryService);
    return CountryService;
}());



/***/ }),

/***/ "./src/app/demo/service/eventservice.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventService = (function () {
    function EventService(http) {
        this.http = http;
    }
    EventService.prototype.getEvents = function () {
        return this.http.get('assets/demo/data/scheduleevents.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    EventService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], EventService);
    return EventService;
}());



/***/ }),

/***/ "./src/app/demo/service/nodeservice.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NodeService = (function () {
    function NodeService(http) {
        this.http = http;
    }
    NodeService.prototype.getFiles = function () {
        return this.http.get('assets/demo/data/files.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    NodeService.prototype.getFilesystem = function () {
        return this.http.get('assets/demo/data/filesystem.json')
            .toPromise()
            .then(function (res) { return res.data; })
            .then(function (data) { return data; });
    };
    NodeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], NodeService);
    return NodeService;
}());



/***/ }),

/***/ "./src/app/demo/view/chartsdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div class=\"ui-g-12 ui-lg-6\">\n        <div class=\"card no-margin\">\n            <h1 class=\"centerText\">Linear Chart</h1>\n            <p-chart type=\"line\" [data]=\"lineData\"></p-chart>\n        </div>\n\n        <div class=\"card\">\n            <h1 class=\"centerText\">Pie Chart</h1>\n            <p-chart type=\"pie\" [data]=\"pieData\"></p-chart>\n        </div>\n\n        <div class=\"card\">\n            <h1 class=\"centerText\">Polar Area Chart</h1>\n            <p-chart type=\"polarArea\" [data]=\"polarData\"></p-chart>\n        </div>\n    </div>\n    <div class=\"ui-g-12 ui-lg-6\">\n        <div class=\"card no-margin\">\n            <h1 class=\"centerText\">Bar Chart</h1>\n            <p-chart type=\"bar\" [data]=\"barData\"></p-chart>\n        </div>\n\n        <div class=\"card\">\n            <h1 class=\"centerText\">Doughnut Chart</h1>\n            <p-chart type=\"doughnut\" [data]=\"pieData\"></p-chart>\n        </div>\n\n        <div class=\"card\">\n            <h1 class=\"centerText\">Radar Chart</h1>\n            <p-chart type=\"radar\" [data]=\"radarData\"></p-chart>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/chartsdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChartsDemoComponent = (function () {
    function ChartsDemoComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Charts', routerLink: ['/charts'] }
        ]);
    }
    ChartsDemoComponent.prototype.ngOnInit = function () {
        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#3984b8'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#3eb839'
                }
            ]
        };
        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#59c429',
                    borderColor: '#3984b8',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#6ec5ff',
                    borderColor: '#f6ac2b',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#3eb839',
                        '#f6ac2b',
                        '#3984b8'
                    ]
                }
            ]
        };
        this.polarData = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        '#3984b8',
                        '#f6ac2b',
                        '#7e8dcd',
                        '#e175a0',
                        '#3eb839'
                    ],
                    label: 'My dataset'
                }],
            labels: [
                'Red',
                'Green',
                'Yellow',
                'Grey',
                'Blue'
            ]
        };
        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
    };
    ChartsDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/chartsdemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], ChartsDemoComponent);
    return ChartsDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g dashboard\">\n    <!-- <div class=\"ui-g-12 ui-md-3\">\n        <div class=\"overview-box overview-box-1\">\n            <h1>SALES</h1>\n            <div class=\"overview-value\">$25,620</div>\n            <div class=\"overview-ratio\">\n                <div class=\"overview-direction\">\n                  <i class=\"fa fa-arrow-up\" ></i>\n                </div>\n                <div class=\"overview-ratio-value\">\n                  51%\n                </div>\n            </div>\n            <img src=\"assets/layout/images/dashboard/graph-blue.svg\" alt=\"apollo-layout\"/>\n        </div>\n    </div>\n    <div class=\"ui-g-12 ui-md-3\">\n        <div class=\"overview-box overview-box-2\">\n            <h1>VIEWS</h1>\n            <div class=\"overview-value\">9521</div>\n            <div class=\"overview-ratio\">\n                <div class=\"overview-direction\">\n                  <i class=\"fa fa-arrow-up\" ></i>\n                </div>\n                <div class=\"overview-ratio-value\">\n                  36%\n                </div>\n            </div>\n            <img src=\"assets/layout/images/dashboard/graph-green.svg\" alt=\"apollo-layout\"/>\n        </div>\n    </div>\n    <div class=\"ui-g-12 ui-md-3\">\n        <div class=\"overview-box overview-box-3\">\n            <h1>USERS</h1>\n            <div class=\"overview-value\">452</div>\n            <div class=\"overview-ratio\">\n                <div class=\"overview-direction\">\n                  <i class=\"fa fa-arrow-up\"></i>\n                </div>\n                <div class=\"overview-ratio-value\">\n                  19%\n                </div>\n            </div>\n            <img src=\"assets/layout/images/dashboard/graph-yellow.svg\" alt=\"apollo-layout\"/>\n        </div>\n    </div>\n    <div class=\"ui-g-12 ui-md-3\">\n        <div class=\"overview-box overview-box-4\">\n            <h1>SOCIAL</h1>\n            <div class=\"overview-value\">65922</div>\n            <div class=\"overview-ratio\">\n                <div class=\"overview-direction\">\n                  <i class=\"fa fa-arrow-up\" ></i>\n                </div>\n                <div class=\"overview-ratio-value\">\n                  25%\n                </div>\n            </div>\n            <img src=\"assets/layout/images/dashboard/graph-red.svg\" alt=\"apollo-layout\"/>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <p-panel header=\"Status\" class=\"circle-panel\">\n            <div class=\"ui-g\">\n                <div class=\"ui-g-12 ui-lg-3 ui-md-6\">\n                    <div class=\"status-title\" style=\"color:#6ebc3b\">Users</div>\n                    <div class=\"circle1\">\n                      <i class=\"fa fa-user\"></i>\n                      <span>95</span>\n                    </div>\n                </div>\n                <div class=\"ui-g-12 ui-lg-3 ui-md-6\">\n                    <div class=\"status-title\" style=\"color:#f6a821\">Mobile</div>\n                    <div class=\"circle2\">\n                      <i class=\"fa fa-mobile\"></i>\n                      <span>95</span>\n                    </div>\n                </div>\n                <div class=\"ui-g-12 ui-lg-3 ui-md-6\">\n                    <div class=\"status-title\" style=\"color:#039ade\">Pageviews</div>\n                    <div class=\"circle3\">\n                      <i class=\"fa fa-eye\"></i>\n                      <span>95</span>\n                    </div>\n                </div>\n                <div class=\"ui-g-12 ui-lg-3 ui-md-6\">\n                    <div class=\"status-title\" style=\"color:#d66351\">Sales</div>\n                    <div class=\"circle4\">\n                      <i class=\"fa fa-dollar\"></i>\n                      <span>95</span>\n                    </div>\n                </div>\n            </div>\n        </p-panel>\n    </div>\n\n\n    <div class=\"ui-g-12 ui-md-6 ui-lg-4 task-list\">\n        <p-panel header=\"TASKS\" [style]=\"{minHeight: '360px'}\">\n            <ul>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Sales Reports</span>\n                    <i class=\"fa fa-briefcase\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Pay Invoices</span>\n                    <i class=\"fa fa-credit-card\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Dinner with Tony</span>\n                    <i class=\"fa fa-cutlery\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Client Meeting</span>\n                    <i class=\"fa fa-user\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">New Theme</span>\n                    <i class=\"fa fa-paint-brush\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Flight Ticket</span>\n                    <i class=\"fa fa-fighter-jet\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Generate Charts</span>\n                    <i class=\"fa fa-area-chart\"></i>\n                </li>\n                <li>\n                    <p-checkbox binary=\"true\"></p-checkbox>\n                    <span class=\"task-name\">Call Client</span>\n                    <i class=\"fa fa-phone\"></i>\n                </li>\n            </ul>\n        </p-panel>\n    </div>\n\n    <div class=\"ui-g-12 ui-md-6 ui-lg-4 ui-fluid contact-form\">\n        <p-panel header=\"CONTACT US\" [style]=\"{minHeight: '360px'}\">\n            <div class=\"ui-g\">\n                <div class=\"ui-g-12\">\n                    <p-dropdown [options]=\"cities\" [autoWidth]=\"false\" [(ngModel)]=\"selectedCity\"></p-dropdown>\n                </div>\n                <div class=\"ui-g-12\">\n                    <input type=\"text\" pInputText placeholder=\"Name\" >\n                </div>\n                <div class=\"ui-g-12\">\n                    <input type=\"text\" pInputText placeholder=\"Email\">\n                </div>\n                <div class=\"ui-g-12\">\n                    <input type=\"text\" pInputText placeholder=\"Location\">\n                </div>\n                <div class=\"ui-g-12\">\n                    <textarea type=\"text\" pInputTextarea placeholder=\"Message\"></textarea>\n                </div>\n                <div class=\"ui-g-12\">\n                    <button type=\"button\" label=\"Send\" icon=\"fa-paper-plane-o\" pButton></button>\n                </div>\n            </div>\n        </p-panel>\n    </div>\n    <div class=\"ui-g-12 ui-lg-4 contacts\">\n        <p-panel header=\"CONTACTS\" [style]=\"{minHeight: '360px'}\">\n            <ul>\n                <li class=\"clearfix\">\n                    <img src=\"assets/layout/images/avatar/avatar.png\" library=\"verona-layout\" width=\"45\"/>\n                    <div class=\"contact-info\">\n                        <span class=\"name\">Samantha Owens (me)</span>\n                        <span class=\"location\">jane@pf-verona.com</span>\n                    </div>\n                    <div class=\"contact-actions\">\n                        <button type=\"button\" pButton icon=\"fa-microphone\"></button>\n                        <button type=\"button\" pButton icon=\"fa-phone\" class=\"green-btn\"></button>\n                    </div>\n                </li>\n                <li class=\"clearfix\">\n                    <img src=\"assets/layout/images/avatar/avatar1.png\" library=\"verona-layout\" width=\"45\"/>\n                    <div class=\"contact-info\">\n                        <span class=\"name\">Joshua Williams</span>\n                        <span class=\"location\">joshua@pf-verona.com</span>\n                    </div>\n                    <div class=\"contact-actions\">\n                      <button type=\"button\" pButton icon=\"fa-microphone\"></button>\n                      <button type=\"button\" pButton icon=\"fa-phone\" class=\"green-btn\"></button>\n                    </div>\n                </li>\n                <li class=\"clearfix\">\n                    <img src=\"assets/layout/images/avatar/avatar2.png\" library=\"verona-layout\" width=\"45\"/>\n                    <div class=\"contact-info\">\n                        <span class=\"name\">Emily Clark</span>\n                        <span class=\"location\">emily@pf-verona.com</span>\n                    </div>\n                    <div class=\"contact-actions\">\n                      <button type=\"button\" pButton icon=\"fa-microphone\"></button>\n                      <button type=\"button\" pButton icon=\"fa-phone\" class=\"green-btn\"></button>\n                    </div>\n                </li>\n                <li class=\"clearfix\">\n                    <img src=\"assets/layout/images/avatar/avatar3.png\" library=\"verona-layout\" width=\"45\"/>\n                    <div class=\"contact-info\">\n                        <span class=\"name\">Tim Johnson</span>\n                        <span class=\"location\">tim@pf-verona.com</span>\n                    </div>\n                    <div class=\"contact-actions\">\n                      <button type=\"button\" pButton icon=\"fa-microphone\"></button>\n                      <button type=\"button\" pButton icon=\"fa-phone\" class=\"green-btn\"></button>\n                    </div>\n                </li>\n                <li class=\"clearfix\">\n                    <img src=\"assets/layout/images/avatar/avatar4.png\" library=\"verona-layout\" width=\"45\"/>\n                    <div class=\"contact-info\">\n                        <span class=\"name\">David Stark</span>\n                        <span class=\"location\">kelly@pf-verona.com</span>\n                    </div>\n                    <div class=\"contact-actions\">\n                      <button type=\"button\" pButton icon=\"fa-microphone\"></button>\n                      <button type=\"button\" pButton icon=\"fa-phone\" class=\"green-btn\"></button>\n                    </div>\n                </li>\n            </ul>\n        </p-panel>\n    </div>\n\n    <div class=\"ui-g-12 ui-lg-8 chat\">\n        <p-panel header=\"Chat\">\n            <ul>\n                <li class=\"clearfix message-from\">\n                    <img src=\"assets/layout/images/avatar/avatar2.png\">\n                    <span>Retro occupy organic, stumptown shabby chic pour-over roof party DIY normcore.</span>\n                </li>\n                <li class=\"clearfix message-own\">\n                    <img src=\"assets/layout/images/avatar/avatar.png\">\n                    <span>Actually artisan organic occupy, Wes Anderson ugh whatever pour-over gastropub selvage.</span>\n                </li>\n                <li class=\"clearfix message-from\">\n                    <img src=\"assets/layout/images/avatar/avatar2.png\">\n                    <span>Chillwave craft beer tote bag stumptown quinoa hashtag.</span>\n                </li>\n                <li class=\"clearfix message-own\">\n                    <img src=\"assets/layout/images/avatar/avatar.png\">\n                    <span>Dreamcatcher locavore iPhone chillwave, occupy trust fund slow-carb distillery art party narwhal.</span>\n                </li>\n                <li class=\"clearfix message-own\">\n                    <span>Sed ut perspiciatis unde omnis iste natus.</span>\n                </li>\n                <li class=\"clearfix message-from\">\n                    <img src=\"assets/layout/images/avatar/avatar2.png\">\n                    <span>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.</span>\n                </li>\n                <li class=\"clearfix message-own\">\n                    <img src=\"assets/layout/images/avatar/avatar.png\">\n                    <span>At vero eos et accusamus.</span>\n                </li>\n            </ul>\n            <div class=\"new-message\">\n                <div class=\"message-attachment\">\n                    <i class=\"fa fa-paperclip\"></i>\n                </div>\n                <div class=\"message-input\">\n                    <input type=\"text\" placeholder=\"Write a message\" />\n                </div>\n            </div>\n        </p-panel>\n\n        <div class=\"sales-panel\">\n            <div class=\"card\">\n                <p-table [columns]=\"cols\" [value]=\"cars\" selectionMode=\"single\" dataKey=\"vin\" [(selection)]=\"selectedCar\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"10\">\n                    <ng-template pTemplate=\"caption\">\n                        Recent Sales\n                    </ng-template>\n                    <ng-template pTemplate=\"header\" let-columns>\n                        <tr>\n                            <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                              {{col.header}}\n                              <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                            </th>\n                        </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                        <tr [pSelectableRow]=\"rowData\">\n                            <td *ngFor=\"let col of columns\">\n                              {{rowData[col.field]}}\n                            </td>\n                        </tr>\n                    </ng-template>\n                </p-table>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-lg-4\">\n        <div class=\"card timeline ui-fluid\">\n            <div class=\"ui-g\">\n                <div class=\"ui-g-3\">\n                    <span class=\"event-time\">just now</span>\n                    <i class=\"fa fa-map-signs\" style=\"color:#147df0\"></i>\n                </div>\n                <div class=\"ui-g-9\">\n                    <span class=\"event-owner\" style=\"color:#147df0\">Katherine May</span>\n                    <span class=\"event-text\">Lorem ipsun dolor amet</span>\n                    <div class=\"event-content\">\n                        <img src=\"assets/layout/images/dashboard/bridge.png\" library=\"verona-layout\" width=\"100\"/>\n                    </div>\n                </div>\n\n                <div class=\"ui-g-3\">\n                    <span class=\"event-time\">12h ago</span>\n                    <i class=\"fa fa-star\" style=\"color:#ed3c76\"></i>\n                </div>\n                <div class=\"ui-g-9\">\n                    <span class=\"event-owner\" style=\"color:#ed3c76\">Brandon Santos</span>\n                    <span class=\"event-text\">Ab nobis, magnam sunt eum. Laudantium, repudiandae, similique!.</span>\n                </div>\n\n                <div class=\"ui-g-3\">\n                    <span class=\"event-time\">15h ago</span>\n                    <i class=\"fa fa-comment\" style=\"color:#3e9018\"></i>\n                </div>\n                <div class=\"ui-g-9\">\n                    <span class=\"event-owner\" style=\"color:#2EB872\">Stephan Ward</span>\n                    <span class=\"event-text\">Omnis veniam quibusdam ratione est repellat qui nam quisquam ab mollitia dolores ullam voluptates, similique, dignissimos.</span>\n                </div>\n\n                <div class=\"ui-g-3\">\n                    <span class=\"event-time\">2d ago</span>\n                    <i class=\"fa fa-map\" style=\"color:#ffb200\"></i>\n                </div>\n                <div class=\"ui-g-9\">\n                    <span class=\"event-owner\" style=\"color:#ffb200\">Jason Smith</span>\n                    <span class=\"event-text\">Laudantium, repudiandae, similique!</span>\n                    <div class=\"event-content\">\n                        <img src=\"assets/layout/images/dashboard/map.png\">\n                    </div>\n                </div>\n\n                <div class=\"ui-g-3\">\n                    <span class=\"event-time\">1w ago</span>\n                    <i class=\"fa fa-heart\" style=\"color:#633ea5\"></i>\n                </div>\n                <div class=\"ui-g-9\">\n                    <span class=\"event-owner\">Kevin Cox</span>\n                    <span class=\"event-text\">Quibusdam ratione est repellat qui nam quisquam veniam quibusdam ratione.</span>\n                </div>\n\n                <div class=\"ui-g-3\">\n                    <span class=\"event-time\">2w ago</span>\n                    <i class=\"fa fa-history\" style=\"color:#599597\"></i>\n                </div>\n                <div class=\"ui-g-9\">\n                    <span class=\"event-owner\" style=\"color:#599597\">Walter White</span>\n                    <span class=\"event-text\">I am the one who knocks!</span>\n                </div>\n                <div class=\"ui-g-12\">\n                    <button pButton type=\"button\" icon=\"fa-refresh\" label=\"Refresh\"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-md-6\">\n        <p-panel header=\"Core 1 Data\">\n          <p-chart type=\"line\" [data]=\"chartData\"></p-chart>\n        </p-panel>\n    </div>\n    <div class=\"ui-g-12 ui-md-6\">\n        <p-panel header=\"Disk Spaces\" styleClass=\"disk-spaces\">\n            <span>4.2 TB Used</span>\n            <p-progressBar [value]=\"75\"></p-progressBar>\n\n            <span>2.9 TB Used</span>\n            <p-progressBar [value]=\"45\"></p-progressBar>\n\n            <span>5.9 TB Used</span>\n            <p-progressBar [value]=\"85\"></p-progressBar>\n        </p-panel>\n    </div>\n\n    <div class=\"ui-g-12 ui-lg-4\">\n        <div class=\"user-card card\">\n            <div class=\"user-card-header\">\n              <p-menu #menu popup=\"popup\" [model]=\"items\" appendTo=\"body\"></p-menu>\n              <button pButton type=\"button\" icon=\"fa-plus\" class=\"secondary-btn\" (click)=\"menu.toggle($event)\"></button>\n            </div>\n            <div class=\"user-card-content\">\n                <img src=\"assets/layout/images/avatar/avatar.png\" alt=\"apollo-layout\" />\n\n                <div class=\"user-card-name\">\n                  <span>Sarah Miller</span>\n                </div>\n\n                <div class=\"user-detail\">\n                  <ul>\n                    <li class=\"clearfix\">\n                      <i class=\"fa fa-tasks fa-fw\"></i>\n                      <span class=\"project-title\">Tasks</span>\n                      <span class=\"project-detail\">3 open</span>\n                      <div class=\"project-progressbar\">\n                        <div class=\"project-progressbar-value\" style=\"width: 50%\"></div>\n                      </div>\n                    </li>\n                    <li class=\"clearfix\">\n                      <i class=\"fa fa-usd fa-fw\"></i>\n                      <span class=\"project-title\">Revenue</span>\n                      <span class=\"project-detail\">+20%</span>\n                      <div class=\"project-progressbar\">\n                        <div class=\"project-progressbar-value\" style=\"width: 20%\"></div>\n                      </div>\n                    </li>\n                    <li class=\"clearfix\">\n                      <i class=\"fa fa-credit-card fa-fw\"></i>\n                      <span class=\"project-title\">Payments</span>\n                      <span class=\"project-detail\">24 new</span>\n                      <div class=\"project-progressbar\">\n                        <div class=\"project-progressbar-value\" style=\"width: 65%\"></div>\n                      </div>\n                    </li>\n                    <li class=\"clearfix\">\n                      <i class=\"fa fa-users fa-fw\"></i>\n                      <span class=\"project-title\">Clients</span>\n                      <span class=\"project-detail\">+80%</span>\n                      <div class=\"project-progressbar\">\n                        <div class=\"project-progressbar-value\" style=\"width: 80%\"></div>\n                      </div>\n                    </li>\n                    <li class=\"clearfix\">\n                      <i class=\"fa fa-users fa-fw\"></i>\n                      <span class=\"project-title\">Turnover</span>\n                      <span class=\"project-detail\">+40%</span>\n                      <div class=\"project-progressbar\">\n                        <div class=\"project-progressbar-value\" style=\"width: 40%\"></div>\n                      </div>\n                    </li>\n                  </ul>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"card map\">\n          <h1>Map</h1>\n          <img src=\"assets/layout/images/dashboard/location.jpg\" alt=\"apollo-layout\" />\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-md-8\">\n        <p-panel header=\"Scheduled Maintenances\" [style]=\"{'height':'100%'}\">\n          <p-schedule [events]=\"events\" defaultDate=\"2016-01-12\"></p-schedule>\n        </p-panel>\n    </div> -->\n    <img src=\"../assets/aerialDashBoard.jpg\" alt=\"dashboard\"  />\n     <!-- <h1 class=\"heading-center\" >DASHBOARD COMING SOON.</h1> -->\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/dashboarddemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_carservice__ = __webpack_require__("./src/app/demo/service/carservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_eventservice__ = __webpack_require__("./src/app/demo/service/eventservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardDemoComponent = (function () {
    function DashboardDemoComponent(carService, eventService, breadcrumbService) {
        this.carService = carService;
        this.eventService = eventService;
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: ' ', routerLink: [''] }
        ]);
    }
    DashboardDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars = cars; });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.eventService.getEvents().then(function (events) { _this.events = events; });
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.chartData = {
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [, 2, 1, 3, 6, 8],
                    fill: false,
                    borderColor: '#4caf50'
                },
                {
                    label: 'Second Dataset',
                    data: [, 6, 3, 2, 7, 9],
                    fill: false,
                    borderColor: '#39a3f4'
                }
            ]
        };
        this.items = [
            { label: 'Save', icon: 'fa fa-check' },
            { label: 'Update', icon: 'fa fa-refresh' },
            { label: 'Delete', icon: 'fa fa-trash' }
        ];
    };
    DashboardDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/dashboard.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_carservice__["a" /* CarService */], __WEBPACK_IMPORTED_MODULE_2__service_eventservice__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_3__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], DashboardDemoComponent);
    return DashboardDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/datademo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n        <div class=\"card no-margin\">\n            <h1>DataTable</h1>\n            <p-table [columns]=\"cols\" [value]=\"cars1\" selectionMode=\"single\" dataKey=\"vin\" [(selection)]=\"selectedCar\"\n                     [paginator]=\"true\" [rows]=\"10\" [responsive]=\"true\" paginatorPosition=\"both\" [responsive]=\"true\">\n                <ng-template pTemplate=\"caption\">\n                  Single with Row Click\n                </ng-template>\n                <ng-template pTemplate=\"header\" let-columns>\n                    <tr>\n                      <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                        {{col.header}}\n                        <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                      </th>\n                    </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                    <tr [pSelectableRow]=\"rowData\">\n                      <td *ngFor=\"let col of columns\">\n                        {{rowData[col.field]}}\n                      </td>\n                    </tr>\n                </ng-template>\n            </p-table>\n        </div>\n    </div>\n    <div class=\"ui-g-12\">\n        <!-- Left Side -->\n        <div class=\"card\">\n            <h1>DataGrid</h1>\n            <p-dataGrid [value]=\"cars2\" [paginator]=\"true\" [rows]=\"6\" paginatorPosition=\"both\" [rowsPerPageOptions]=\"[3,6,9,12,16]\">\n                <p-header>\n                    Grid of Cars\n                </p-header>\n                <ng-template let-car pTemplate=\"item\">\n                    <div class=\"ui-g-12 ui-md-4\">\n                        <p-panel [header]=\"car.brand\" [style]=\"{'text-align':'center'}\">\n                            <div style=\"padding: 1em\">\n                                <div class=\"car-detail\">{{car.color}} - {{car.year}}</div>\n                                <br>\n                                <img src=\"assets/demo/images/car/{{car.brand}}.png\" width=\"100px\">\n                            </div>\n                        </p-panel>\n                    </div>\n                </ng-template>\n            </p-dataGrid>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-md-8\">\n        <div class=\"card\">\n            <h1>PickList</h1>\n            <p-pickList [source]=\"sourceCars\" [target]=\"targetCars\" filterBy=\"brand\" filterPlaceholder=\"Search by Brand\" sourceHeader=\"Available\" targetHeader=\"Selected\" [responsive]=\"true\"\n                [sourceStyle]=\"{'height':'250px'}\" [targetStyle]=\"{'height':'250px'}\">\n                <ng-template let-car pTemplate=\"item\">\n                    <div class=\"ui-helper-clearfix\">\n                        <img src=\"assets/demo/images/car/{{car.brand}}.png\" style=\"display:inline-block;margin:2px 0 2px 2px; width: 50px\"/>\n                        <div style=\"font-size:16px;float:right;margin:15px 5px 0 0\">{{car.brand}}</div>\n                    </div>\n                </ng-template>\n            </p-pickList>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-md-4\">\n        <div class=\"card\">\n            <h1>OrderList</h1>\n            <p-orderList [value]=\"orderListCars\" [listStyle]=\"{'height':'250px'}\" [responsive]=\"true\" header=\"OrderList\" filterBy=\"brand\" filterPlaceholder=\"Search by Brand\">\n                <ng-template let-car pTemplate=\"item\">\n                    <div class=\"ui-helper-clearfix\">\n                        <img src=\"assets/demo/images/car/{{car.brand}}.png\" style=\"display:inline-block;margin:2px 0 2px 2px; width: 50px\" />\n                        <div style=\"font-size:16px;float:right;margin:15px 5px 0 0\">{{car.brand}}</div>\n                    </div>\n                </ng-template>\n            </p-orderList>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>DataList</h1>\n            <p-dataList [value]=\"cars3\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"cars-datalist\" paginatorPosition=\"both\">\n                <p-header>\n                    List of Cars\n                </p-header>\n                <ng-template let-car pTemplate=\"item\">\n                    <div style=\"border-bottom: 1px solid #eaeaea\" class=\"clearfix car-item\">\n                        <img src=\"assets/demo/images/car/{{car.brand}}.png\" width=\"48\" style=\"display:inline-block;margin:24px;vertical-align:middle\"/>\n                        <div class=\"car-details\" style=\"display:inline-block;vertical-align:middle\">\n                            <p>{{car.brand}}</p>\n                            <p style=\"color:#757575\">{{car.year}} - {{car.color}}</p>\n                        </div>\n                        <button type=\"button\" pButton icon=\"fa-search\" style=\"margin:28px 24px 0 0;float:right\"></button>\n                    </div>\n                </ng-template>\n            </p-dataList>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Tree</h1>\n            <p-tree [value]=\"files1\" selectionMode=\"single\" [(selection)]=\"selectedNode1\"></p-tree>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\" style=\"overflow:auto\">\n            <h1>Organization Chart</h1>\n            <p-organizationChart [value]=\"data\" selectionMode=\"single\" [(selection)]=\"selectedNode\"></p-organizationChart>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>TreeTable</h1>\n            <p-treeTable [value]=\"files2\" selectionMode=\"checkbox\" [(selection)]=\"selectedNode2\">\n                <p-header>Basic</p-header>\n                <p-column field=\"name\" header=\"Name\"></p-column>\n                <p-column field=\"size\" header=\"Size\"></p-column>\n                <p-column field=\"type\" header=\"Type\"></p-column>\n            </p-treeTable>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Carousel</h1>\n            <p-carousel headerText=\"Cars\" [value]=\"carouselCars\">\n                <ng-template let-car pTemplate=\"item\">\n                    <div class=\"ui-g\" style=\"text-align:center\">\n                        <div class=\"ui-g-12\" style=\"padding:2em\">\n                            <img src=\"assets/demo/images/car/{{car.brand}}.png\">\n                        </div>\n                        <div class=\"ui-g-6\" style=\"text-align:right\">Vin: </div>\n                        <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.vin}}</div>\n\n                        <div class=\"ui-g-6\">Year: </div>\n                        <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.year}}</div>\n\n                        <div class=\"ui-g-6\">Brand: </div>\n                        <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.brand}}</div>\n\n                        <div class=\"ui-g-6\">Color: </div>\n                        <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.color}}</div>\n                    </div>\n                </ng-template>\n            </p-carousel>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Schedule</h1>\n            <p-schedule [events]=\"events\" defaultDate=\"2016-01-12\" [header]=\"scheduleHeader\"></p-schedule>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/datademo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_carservice__ = __webpack_require__("./src/app/demo/service/carservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_nodeservice__ = __webpack_require__("./src/app/demo/service/nodeservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_eventservice__ = __webpack_require__("./src/app/demo/service/eventservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DataDemoComponent = (function () {
    function DataDemoComponent(carService, eventService, nodeService, breadcrumbService) {
        this.carService = carService;
        this.eventService = eventService;
        this.nodeService = nodeService;
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Data', routerLink: ['/data'] }
        ]);
    }
    DataDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars1 = cars; });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.carService.getCarsMedium().then(function (cars) { return _this.cars2 = cars; });
        this.carService.getCarsMedium().then(function (cars) { return _this.cars3 = cars; });
        this.carService.getCarsMedium().then(function (cars) { return _this.sourceCars = cars; });
        this.targetCars = [];
        this.carService.getCarsSmall().then(function (cars) { return _this.orderListCars = cars; });
        this.nodeService.getFiles().then(function (files) { return _this.files1 = files; });
        this.nodeService.getFilesystem().then(function (files) { return _this.files2 = files; });
        this.eventService.getEvents().then(function (events) { _this.events = events; });
        this.carouselCars = [
            { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
            { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
            { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
            { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
            { vin: 'gf45wg5', year: 2011, brand: 'Volkswagen', color: 'Red' },
            { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
            { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
            { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
            { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
        ];
        this.scheduleHeader = { left: 'prev,next today', center: 'title', right: 'month,agendaWeek,agendaDay' };
        this.data = [{
                label: 'F.C Barcelona',
                expanded: true,
                children: [
                    {
                        label: 'F.C Barcelona',
                        expanded: true,
                        children: [
                            {
                                label: 'Chelsea FC'
                            },
                            {
                                label: 'F.C. Barcelona'
                            }
                        ]
                    },
                    {
                        label: 'Real Madrid',
                        expanded: true,
                        children: [
                            {
                                label: 'Bayern Munich'
                            },
                            {
                                label: 'Real Madrid'
                            }
                        ]
                    }
                ]
            }];
    };
    DataDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/datademo.component.html"),
            styles: ["\n        .cars-datalist ul {\n            margin: 0;\n            padding: 0;\n        }\n\n        @media (max-width:640px) {\n            .cars-datalist .text-column {\n                text-align: center;\n            }\n        }\n    "],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_carservice__["a" /* CarService */], __WEBPACK_IMPORTED_MODULE_3__service_eventservice__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_2__service_nodeservice__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_4__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], DataDemoComponent);
    return DataDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/documentation.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n        <div class=\"card docs no-margin\">\n\n            <h1>Current Version</h1>\n            <p>Angular 5.2.0 and PrimeNG 5.2.0</p>\n\n            <h1>Getting Started</h1>\n            <p>Apollo is a true native application template for Angular and is distributed as a CLI project. If you don't have CLI installed already run the following commands to set it up. In case\n            you have an application that do not use CLI, skip the <a href=\"#noncli\">Integration with an Existing Non CLI Application</a> part.\n            Apollo is distributed with PrimeNG 5.2.x and Angular 5.2.x based on Angular CLI 1.6.x.</p>\n<pre>\nnpm install -g @angular/cli\n</pre>\n\n            <p>Once CLI is ready in your system, extract the contents of the Apollo zip file distribution, cd to the directory,\n            install the libraries from npm and then execute \"ng serve\" to run the application in your local environment at http://localhost:4200/.</p>\n<pre>\ncd apollo\nnpm install\nng serve\n</pre>\n\n            <p>That's it, you may now start with the development of your application.</p>\n\n            <h1>Important CLI Commands</h1>\n            <p>Following commands are derived from CLI.</p>\n<pre>\nRun 'ng serve' for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.\n\nRun 'ng generate component component-name' to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.\n\nRun 'ng build' to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.\n\nRun 'ng test' to execute the unit tests via [Karma](https://karma-runner.github.io).\n\nRun 'ng e2e' to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).\n\nRun 'ng help' for more options.\n</pre>\n\n            <h1>Structure</h1>\n            <p>Apollo consists of 3 main parts; the application layout, layout resources and theme resources for PrimeNG components. <i>app.component.html</i> inside app folder is the html template for the base layout,\n                required resources for the layout are placed inside the <i>src/assets/layout</i> folder and similarly theme resources are inside <i>src/assets/theme</i> folder.\n            </p>\n\n            <h1>Template</h1>\n            <p>Main layout is the html view of the app.component.ts, it is divided into a couple of sections such as topbar, menu and footer. Here is the code for\n                the main template. The component class app.component.ts implements the logic such as opening menus, managing layout modes and so on.\n            </p>\n<pre>\n&lt;div class=\"layout-wrapper\" (click)=\"onLayoutClick()\"\n    [ngClass]=\"&#123;'layout-horizontal': isHorizontal(),\n                'layout-overlay': isOverlay(),\n                'layout-static': isStatic(),\n                'layout-slim':isSlim(),\n                'layout-static-inactive': staticMenuDesktopInactive,\n                'layout-mobile-active': staticMenuMobileActive,\n                'layout-overlay-active':overlayMenuActive&#125;\"&gt;\n\n    &lt;app-topbar&gt;&lt;/app-topbar&gt;\n    &lt;div class=\"layout-menu-container\" (click)=\"onMenuClick($event)\"&gt;\n        &lt;p-scrollPanel #layoutMenuScroller [style]=\"&#123;height: '100%'&#125;\"&gt;\n            &lt;div class=\"layout-menu-content\"&gt;\n                &lt;div class=\"layout-menu-title\"&gt;MENU&lt;/div&gt;\n                &lt;app-menu [reset]=\"resetMenu\"&gt;&lt;/app-menu&gt;\n                &lt;div class=\"layout-menu-footer\"&gt;\n                    &lt;div class=\"layout-menu-footer-title\"&gt;TASKS&lt;/div&gt;\n\n                    &lt;div class=\"layout-menu-footer-content\"&gt;\n                        &lt;p-progressBar [value]=\"50\" [showValue]=\"false\"&gt;&lt;/p-progressBar&gt;\n                        Today\n\n                        &lt;p-progressBar [value]=\"80\" [showValue]=\"false\"&gt;&lt;/p-progressBar&gt;\n                        Overall\n                    &lt;/div&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n        &lt;/p-scrollPanel&gt;\n    &lt;/div&gt;\n\n    &lt;div class=\"layout-content\"&gt;\n        &lt;app-breadcrumb&gt;&lt;/app-breadcrumb&gt;\n\n        &lt;div class=\"layout-content-container\"&gt;\n            &lt;router-outlet&gt;&lt;/router-outlet&gt;\n        &lt;/div&gt;\n\n        &lt;app-footer&gt;&lt;/app-footer&gt;\n        &lt;div class=\"layout-mask\" *ngIf=\"staticMenuMobileActive\"&gt;&lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</pre>\n\n            <h1>Menu</h1>\n            <p>Menu is a separate component defined in app.menu.component.ts file based on PrimeNG MenuModel API. In order to define the menuitems,\n            navigate to this file and define your own model as a nested structure. Here is the menu component from the sample application. The helper\n            app-submenu component is also available in the same file.</p>\n<pre>\nimport &#123;Component, Input, OnInit&#125; from '@angular/core';\nimport &#123;trigger, state, style, transition, animate&#125; from '@angular/animations';\nimport &#123;MenuItem&#125; from 'primeng/primeng';\nimport &#123;AppComponent&#125; from './app.component';\n\n@Component(&#123;\n    selector: 'app-menu',\n    template: `\n        &lt;ul app-submenu [item]=\"model\" root=\"true\" class=\"layout-menu\" [reset]=\"reset\" visible=\"true\"&gt;&lt;/ul&gt;\n    `\n&#125;)\nexport class AppMenuComponent implements OnInit &#123;\n\n    @Input() reset: boolean;\n\n    model: any[];\n\n    constructor(public app: AppComponent) &#123;&#125;\n\n    ngOnInit() &#123;\n        this.model = [\n            &#123;label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/']&#125;,\n            &#123;\n                label: 'Menu', icon: 'fa fa-fw fa-bars',\n                items: [\n                    &#123;label: 'Horizontal', icon: 'fa fa-fw fa-arrows-v', command: event =&gt; this.app.menuMode = 'horizontal'&#125;,\n                    &#123;label: 'Overlay', icon: 'fa fa-fw fa-arrows-h', command: event =&gt; this.app.menuMode = 'overlay'&#125;,\n                    &#123;label: 'Static', icon: 'fa fa-fw fa-bars', command: event =&gt; this.app.menuMode = 'static'&#125;,\n                    &#123;label: 'Slim', icon: 'fa fa-fw fa-window-restore', command: event =&gt; this.app.menuMode = 'slim'&#125;\n                ]\n            &#125;,\n            &#123;\n                label: 'Dark', icon: 'fa fa-fw fa-circle', badge: '8',\n                items: [\n                    &#123;label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('blue-dark'); &#125;&#125;,\n                    &#123;label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('green-dark'); &#125;&#125;,\n                    &#123;label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('cyan-dark'); &#125;&#125;,\n                    &#123;label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('purple-dark'); &#125;&#125;,\n                    &#123;label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('indigo-dark'); &#125;&#125;,\n                    &#123;label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('yellow-dark'); &#125;&#125;,\n                    &#123;label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('orange-dark'); &#125;&#125;,\n                    &#123;label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('pink-dark'); &#125;&#125;\n                ]\n            &#125;,\n            &#123;\n                label: 'Light', icon: 'fa fa-fw fa-circle-o', badge: '8',\n                items: [\n                    &#123;label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('blue-light'); &#125;&#125;,\n                    &#123;label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('green-light'); &#125;&#125;,\n                    &#123;label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('cyan-light'); &#125;&#125;,\n                    &#123;label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('purple-light'); &#125;&#125;,\n                    &#123;label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('indigo-light'); &#125;&#125;,\n                    &#123;label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('yellow-light'); &#125;&#125;,\n                    &#123;label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('orange-light'); &#125;&#125;,\n                    &#123;label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',\n                        command: (event) =&gt; &#123;this.app.changeTheme('pink-light'); &#125;&#125;\n                ]\n            &#125;,\n            &#123;\n                label: 'Components', icon: 'fa fa-fw fa-sitemap',\n                items: [\n                    &#123;label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample']&#125;,\n                    &#123;label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms']&#125;,\n                    &#123;label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data']&#125;,\n                    &#123;label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels']&#125;,\n                    &#123;label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays']&#125;,\n                    &#123;label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus']&#125;,\n                    &#123;label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages']&#125;,\n                    &#123;label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts']&#125;,\n                    &#123;label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file']&#125;,\n                    &#123;label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc']&#125;\n                ]\n            &#125;,\n            &#123;\n                label: 'Pages', icon: 'fa fa-fw fa-life-saver',\n                items: [\n                    &#123;label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty']&#125;,\n                    &#123;label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html', target: '_blank'&#125;,\n                    &#123;label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank'&#125;,\n                    &#123;label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank'&#125;,\n                    &#123;label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank'&#125;,\n                    &#123;label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',\n                        url: 'assets/pages/access.html', target: '_blank'&#125;\n                ]\n            &#125;,\n            &#123;\n                label: 'Hierarchy', icon: 'fa fa-fw fa-gg',\n                items: [\n                    &#123;\n                        label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',\n                        items: [\n                            &#123;\n                                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',\n                                items: [\n                                    &#123;label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                    &#123;label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                    &#123;label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                ]\n                            &#125;,\n                            &#123;\n                                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',\n                                items: [\n                                    &#123;label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                    &#123;label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'&#125;\n                                ]\n                            &#125;,\n                        ]\n                    &#125;,\n                    &#123;\n                        label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',\n                        items: [\n                            &#123;\n                                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',\n                                items: [\n                                    &#123;label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                    &#123;label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                    &#123;label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                ]\n                            &#125;,\n                            &#123;\n                                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',\n                                items: [\n                                    &#123;label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'&#125;,\n                                    &#123;label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'&#125;\n                                ]\n                            &#125;,\n                        ]\n                    &#125;\n                ]\n            &#125;,\n            &#123;label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation']&#125;\n        ];\n    &#125;\n&#125;\n</pre>\n\n\n            <h1>Integration with an Existing CLI Project</h1>\n            <p>To setup Apollo in an existing project, copy the <i>src/assets</i> folder to your projects folder with the same name\n                and replace the contents of app.component.ts, app.component.html with their counterparts in Apollo under <i>src/app</i> folder.</p>\n\n          <p>Install PrimeNG</p>\n<pre>\nnpm install primeng@latest --save\n</pre>\n\n          <p>Add PrimeNG CSS at styles section in angular-cli.json.</p>\n\n<pre>\n\"styles\": [\n    \"../node_modules/primeng/resources/primeng.min.css\",        //required: PrimeNG components\n    \"styles.scss\"                                               //your styles and overrides\n],\n</pre>\n\n            <p>Last part is adding theme and layout css files, in the CLI app they are defined using link tags in index.html so the demo can switch them on\n            the fly by changing the path however if this is not a requirement, you may also add them to the styles configuration so they go inside the bundle.</p>\n\n            <h1 id=\"noncli\">Integration with an Existing Non-CLI Project</h1>\n            <p>For an existing project that do not use CLI, setup steps are more or less similar. Start with installing the dependencies listed above in package.json</p>\n            <p>Copy the <i>src/assets</i> folder to your application and include the resources listed above with a module bundler like webpack or using link-script tags.</p>\n            <p>Finally copy the contents of app.component.html to your application's main component template such as <i>app/application.html</i> along\n            with the sub components which are app.menu.component.ts, app.breadcrumb.component.ts, app.app.topbar.component.ts and app.footer.component.ts.</p>\n\n            <h1>Theme</h1>\n            <p>Apollo provides 16 PrimeNG themes out of the box, setup of a theme is simple by including the css of theme to your bundle that are located inside resources/theme folder.</p>\n\n            <ul>\n                <li>theme-blue-dark</li>\n                <li>theme-blue-light</li>\n                <li>theme-cyan-dark</li>\n                <li>theme-cyan-light</li>\n                <li>theme-green-dark</li>\n                <li>theme-green-light</li>\n                <li>theme-indigo-dark</li>\n                <li>theme-indigo-light</li>\n                <li>theme-orange-dark</li>\n                <li>theme-orange-light</li>\n                <li>theme-pink-dark</li>\n                <li>theme-pink-light</li>\n                <li>theme-purple-dark</li>\n                <li>theme-purple-light</li>\n                <li>theme-yellow-dark</li>\n                <li>theme-yellow-light</li>\n            </ul>\n\n            <p>A custom theme can be developed by the following steps.</p>\n            <ul>\n                <li>Choose a custom theme name such as theme-myown.</li>\n                <li>Create a file named theme-myown.scss under <i>assets/theme folder</i>.</li>\n                <li>Define the variables listed below and import the <i>/sass/theme/_theme.scss</i> file.</li>\n                <li>Build the scss to generate css</li>\n                <li>Include the generated theme.css to your page.</li>\n            </ul>\n\n            <p>Here are the variables required to create a theme.</p>\n\n<pre>\n$primaryColor:#39a3f4;\n$primaryTextColor:#ffffff;\n\n@import '../sass/theme/_theme_light.scss';\n</pre>\n\n            <p>If you are creating a dark theme, import the _theme_dark.scss instead;</p>\n<pre>\n$primaryColor:#39a3f4;\n$primaryTextColor:#ffffff;\n\n@import '../sass/theme/_theme_light.scss';\n</pre>\n\n            <p> An example sass command to compile the css would be;</p>\n\n<pre>\nsass src/assets/theme/theme-myown.scss src/assets/theme/theme-myown.css\n</pre>\n\n            <p>Watch mode is handy to avoid compiling everytime when a change is made, instead use the following command\n            so that sass generates the file whenever you make a customization. This builds all css files whenever a change is made to any scss file.</p>\n<pre>\nsass -w src/assets/ --sourcemap=none\n</pre>\n\n            <p>Same can also be applied to layout itself;</p>\n            <ul>\n                <li>Choose a layout name such as layout-myown.</li>\n                <li>Create an empty file named layout-myown.scss inside <i>assets/layout/css</i> folder.</li>\n                <li>Define the variables listed below and import the <i>/sass/layout/_layout.scss</i> file.</li>\n                <li>Build the scss to generate css</li>\n                <li>Serve the css by importing it using a link tag or a bundler.</li>\n            </ul>\n\n            <p>Here are the variables required to create a layout.</p>\n\n<pre>\n$primaryColor:#39a3f4;\n$primaryTextColor:#ffffff;\n$menuBgColor:#243447;\n$menuitemTextColor:#9fadb7;\n$submenuActiveBgColor:#151f2a;\n$menuItemHoverTextColor:#39a3f4;\n$menuItemActiveTextColor:#39a3f4;\n\n$bodyBgColor:#141d26;\n$textColor:#d8d8d8;\n$textSecondaryColor:#acacac;\n$placeholderColor:#6c6c6c;\n$dividerColor:#121213;\n\n@import '../../sass/layout/_layout.scss';\n</pre>\n\n            <h1>Common SASS Variables</h1>\n            <p>In case you'd like to customize the shared variables, the _variables.scss files are where the options are defined for layout and theme.</p>\n\n<h3>sass/variables/_commons.scss</h3>\n<pre>\n$fontFamily:\"Source Sans Pro\",Arial,sans-serif;\n$fontSize:14px;\n$borderRadius:2px;\n$transitionDuration:.3s;\n\n/* Predefined Colors */\n$blue:#39a3f4;\n$green:#6ebc3b;\n$purple:#7E57C2;\n$cyan:#26C6DA;\n$pink:#EC407A;\n$indigo:#5C6BC0;\n$orange:#f6a821;\n$yellow:#ffc800;\n$red:#EF5350;\n</pre>\n\n<h3>sass/variables/_theme_light.scss</h3>\n<pre>\n@import '../variables';\n\n$textColor:#424242;\n$textSecondaryColor:#7a7a7a;\n$dividerColor:#dddddd;\n\n/* Header */\n$headerPadding:.429em .857em;\n$headerBgColor:#f5f5f5;\n$headerBorderColor:#d8d8d8;\n$headerTextColor:#424242;\n$headerHoverBgColor:#dcdcdc;\n$headerHoverTextColor:#424242;\n$headerIconColor:#424242;\n$headerIconHoverColor:$primaryColor;\n\n/* Contents */\n$contentPadding:.429em .857em;\n$contentBorderColor:#d8d8d8;\n$contentBgColor:#ffffff;\n\n/* Forms */\n$inputBgColor:#ffffff;\n$inputPadding:.429em;\n$inputBorderColor:#cccccc;\n$inputHoverBorderColor:$primaryColor;\n$inputGroupAddonBgColor:#f5f5f5;\n\n/* Buttons */\n$toggleButtonBgColor:#b6b7c2;\n\n/* List Items */\n$listItemPadding:.429em .857em;\n\n/* Messages */\n$infoMessageBgColor:#60b5f6;\n$infoMessageTextColor:#ffffff;\n$warnMessageBgColor:#FFC800;\n$warnMessageTextColor:#141d26;\n$errorMessageBgColor:#EF5350;\n$errorMessageTextColor:#ffffff;\n$successMessageBgColor:#79ab58;\n$successMessageTextColor:#ffffff;\n\n/* Data */\n$datatableCellBorderColor:#d8d8d8;\n$datableEvenRowBgColor:#f9f9f9;\n\n/* TabView */\n$tabHeaderPadding:.571em .857em;\n\n@import './_theme.scss';\n</pre>\n\n<h3>sass/variables/_theme_dark.scss</h3>\n<pre>\n@import '../variables';\n\n$textColor:#d8d8d8;\n$textSecondaryColor:#acacac;\n$dividerColor:#121213;\n\n/* Header */\n$headerPadding:.429em .857em;\n$headerBgColor:#1b3548;\n$headerBorderColor:#121213;\n$headerTextColor:#9fadb7;\n$headerHoverBgColor:#485d6c;\n$headerHoverTextColor:#ffffff;\n$headerIconColor:#9fadb7;\n$headerIconHoverColor:#ffffff;\n\n/* Contents */\n$contentPadding:.429em .857em;\n$contentBorderColor:#121213;\n$contentBgColor:#1c2937;\n\n/* Forms */\n$inputBgColor:#141e27;\n$inputPadding:.429em;\n$inputBorderColor:#121213;\n$inputHoverBorderColor:$primaryColor;\n$inputGroupAddonBgColor:#1b3548;\n\n/* Buttons */\n$toggleButtonBgColor:#323e4b;\n\n/* List Items */\n$listItemPadding:.429em .857em;\n\n/* Messages */\n$infoMessageBgColor:#60b5f6;\n$infoMessageTextColor:#ffffff;\n$warnMessageBgColor:#FFC800;\n$warnMessageTextColor:#141d26;\n$errorMessageBgColor:#EF5350;\n$errorMessageTextColor:#ffffff;\n$successMessageBgColor:#79ab58;\n$successMessageTextColor:#ffffff;\n\n/* Data */\n$datatableCellBorderColor:#121213;\n$datableEvenRowBgColor:#15222F;\n\n/* TabView */\n$tabHeaderPadding:.571em .857em;\n\n@import './_theme.scss';\n</pre>\n\n            <h1>Menu Modes</h1>\n            <p>Menu has 4 modes, static, overlay, slim and horizontal. Layout container element in app.component.html is used to define which mode to use by adding specific classes. List\n            below indicates the style classes for each mode. In addition menu</p>\n            <ul>\n                <li>Static: \"layout-wrapper layout-static\"</li>\n                <li>Overlay: \"layout-wrapper layout-overlay\"</li>\n                <li>Popup: \"layout-wrapper layout-popup\"</li>\n                <li>Horizontal: \"layout-wrapper layout-horizontal\"</li>\n            </ul>\n\n            <p>For example to create a horizontal menu, the div element should be in following form;</p>\n<pre>\n&lt;div class=\"layout-wrapper layout-horizontal\"&gt;\n</pre>\n\n            <h1>Breadcrumb</h1>\n            <p>Apollo has an optional built-in breadcrumb section right below the topbar.\n                The items are dynamically generated using a BreadcrumbService where each main page that goes into the router-outlet should provide a collection of MenuItem instances.\n                Here is an example component that updates the breadcrumb.</p>\n<pre>\nimport &#123;Component&#125; from '@angular/core';\nimport &#123;BreadcrumbService&#125; from '../../breadcrumb.service';\n\n@Component(&#123;\n    templateUrl: './emptydemo.component.html'\n&#125;)\nexport class ControlPanelComponent &#123;\n\n    constructor(private breadcrumbService: BreadcrumbService) &#123;\n        this.breadcrumbService.setItems([\n            &#123;label: 'Admin'&#125;,\n            &#123;label: 'Control Panel', routerLink: ['/controlpanel']&#125;\n        ]);\n    &#125;\n\n&#125;\n</pre>\n\n            <p>It is also possible to leave the choice to the user by keeping the preference at a component and using an ngClass expression so that user can switch between modes. Sample\n            application has an example implementation of such use case. Refer to app.component.ts for an example.</p>\n\n            <h1>Grid CSS</h1>\n            <p>Apollo uses PrimeNG Grid CSS (ui-g-*) throughout the demos, although any Grid library can be used with it. Apollo itself does not depend on Grid CSS.</p>\n\n            <h1>Customizing Styles</h1>\n            <p>It is suggested to write your customizations in styles.scss file or another file instead of adding them to the\n                scss files under sass folders to avoid maintenance issues after an update.</p>\n\n            <h1>Migration Guide</h1>\n            <p>For seamless updates and easier maintenance, we suggest keeping your CSS customizations in a separate sass file such as styles.scss as defined in .angular-cli.json so that your changes are not overriden with an update.</p>\n\n            <h4>1.0.0 to 5.2.0</h4>\n            <p>Adds support for PrimeNG 5.2.0 (e.g. TurboTable), replaces nanoscroller with PrimeNG ScrollPanel and reimplements ripple effect to run outside of NgZone for better performance.</p>\n            <ul>\n              <li>Remove nanoscroller as it is replaced by ScrollPanel component of PrimeNG.</li>\n              <li>Update app.component.ts and app.component.html.</li>\n              <li>Update app.menu.component.ts.</li>\n              <li>Update layout css files.</li>\n              <li>Update theme css files.</li>\n            </ul>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/documentation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DocumentationComponent = (function () {
    function DocumentationComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: 'Documentation', routerLink: ['/documentation'] }
        ]);
    }
    DocumentationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/documentation.component.html"),
            styles: ["\n        .docs pre {\n            font-family: monospace;\n            background-color: #dee4e9;\n            color: #424242;\n            padding: 1em;\n            font-size: 14px;\n            border-radius: 3px;\n            overflow: auto;\n            font-weight: bold;\n        }"
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], DocumentationComponent);
    return DocumentationComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/emptydemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Empty Page</h1>\n            <p>Use this page to start from scratch and place your custom content.</p>\n            <button type=\"button\" pButton label=\"Home\" style=\"display:inline-block;margin-top:5px\"></button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/emptydemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmptyDemoComponent = (function () {
    function EmptyDemoComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Empty', routerLink: ['/empty'] }
        ]);
    }
    EmptyDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/emptydemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], EmptyDemoComponent);
    return EmptyDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/filedemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12\">\n            <div class=\"card no-margin\">\n                <h1>Upload</h1>\n                <p-growl [value]=\"msgs\"></p-growl>\n\n                <p-fileUpload name=\"demo[]\" url=\"./upload.php\" (onUpload)=\"onUpload($event)\"\n                        multiple=\"multiple\" accept=\"image/*\" maxFileSize=\"1000000\">\n                    <ng-template pTemplate=\"content\">\n                        <ul *ngIf=\"uploadedFiles.length\">\n                            <li *ngFor=\"let file of uploadedFiles\">{{file.name}} - {{file.size}} bytes</li>\n                        </ul>\n                    </ng-template>\n                </p-fileUpload>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/filedemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileDemoComponent = (function () {
    function FileDemoComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.uploadedFiles = [];
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'File', routerLink: ['/file'] }
        ]);
    }
    FileDemoComponent.prototype.onUpload = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Upload Completed' });
    };
    FileDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/filedemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], FileDemoComponent);
    return FileDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/formsdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div class=\"ui-g-12 ui-lg-6\">\n        <!-- Left Side -->\n        <div class=\"card no-margin\">\n            <h1>InputText</h1>\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12 ui-md-4\">\n                    <input type=\"text\" placeholder=\"Name\" pInputText>\n                </div>\n                <div class=\"ui-g-12 ui-md-4\">\n                    <input type=\"text\" placeholder=\"Email\" pInputText>\n                </div>\n                <div class=\"ui-g-12 ui-md-4\">\n                    <input type=\"text\" placeholder=\"Phone\" pInputText>\n                </div>\n                <div class=\"ui-g-12 ui-md-4\">\n                    <input type=\"text\" pInputText placeholder=\"Disabled\" disabled=\"disabled\">\n                </div>\n                <div class=\"ui-g-12 ui-md-4\">\n                    <span class=\"md-inputfield\">\n                        <input type=\"text\" pInputText placeholder=\"Address\">\n                    </span>\n                </div>\n                <div class=\"ui-g-12 ui-md-4\">\n                    <input type=\"text\" placeholder=\"Id\" pInputText>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"card \">\n            <h1>TextArea</h1>\n            <textarea [rows]=\"3\" [cols]=\"30\" pInputTextarea placeholder=\"Your Message\" autoResize=\"autoResize\"></textarea>\n        </div>\n\n        <div class=\"card \">\n            <h1>AutoComplete</h1>\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12\">\n                    <label for=\"acSimple\">Simple</label>\n                </div>\n                <div class=\"ui-g-12\" style=\"margin-bottom:10px\">\n                    <p-autoComplete id=\"acSimple\" [(ngModel)]=\"country\" [suggestions]=\"filteredCountries\" (completeMethod)=\"filterCountry($event)\" field=\"name\" [size]=\"30\"\n                        placeholder=\"Countries\" [minLength]=\"1\" dropdown=\"cagatay\"></p-autoComplete>\n                </div>\n\n                <div class=\"ui-g-12\">\n                    <label for=\"acAdvanced\">Advanced</label>\n                </div>\n                <div class=\"ui-g-12\">\n                    <p-autoComplete id=\"acAdvanced\" [(ngModel)]=\"selectedBrands\" [suggestions]=\"filteredBrands\" (completeMethod)=\"filterBrands($event)\" [size]=\"30\"\n                        [minLength]=\"1\" placeholder=\"Hint: type 'v' or 'f'\" [dropdown]=\"true\" (onDropdownClick)=\"handleACDropdownClick()\" multiple=\"true\">\n                        <ng-template let-brand pTemplate=\"item\">\n                            <div class=\"ui-helper-clearfix\">\n                                <img src=\"assets/demo/images/car/{{brand}}.gif\" style=\"width:32px;display:inline-block;margin:5px 0 2px 5px\"/>\n                                <div style=\"font-size:18px;float:right;margin:10px 10px 0 0\">{{brand}}</div>\n                            </div>\n                        </ng-template>\n                    </p-autoComplete>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"card \">\n            <h1>MultiSelect</h1>\n            <p-multiSelect [options]=\"carOptions\" [(ngModel)]=\"selectedMultiSelectCars\"></p-multiSelect>\n        </div>\n\n        <div class=\"card \">\n            <h1>Calendar</h1>\n            <p-calendar [inline]=\"true\"></p-calendar>\n\n            <div class=\"ui-g form-group-m\" style=\"margin-top:20px\">\n                <div class=\"ui-g-12\">\n                    <p-calendar id=\"popup\" placeholder=\"Popup\"></p-calendar>\n                </div>\n                <div class=\"ui-g-12\">\n                    <p-calendar id=\"datetime\" dateFormat=\"mm/dd/yy\" showTime=\"true\" placeholder=\"DateTime\"></p-calendar>\n                </div>\n                <div class=\"ui-g-12\">\n                    <p-calendar id=\"time\" showTime=\"true\" [timeOnly]=\"true\" placeholder=\"Time\"></p-calendar>\n                </div>\n                <div class=\"ui-g-12\">\n                    <p-calendar id=\"showIcon\" [showIcon]=\"true\" placeholder=\"Button\"></p-calendar>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"card \">\n            <h1>Chips</h1>\n            <p-chips></p-chips>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-lg-6\">\n        <!-- Right Side -->\n        <div class=\"card no-margin\">\n            <h1>Checkboxes</h1>\n            <div class=\"ui-g\">\n                <div class=\"ui-g-12 ui-md-4\"><p-checkbox name=\"cg\" value=\"Ultima\" label=\"Ultima\" [(ngModel)]=\"checkboxValues\"></p-checkbox></div>\n                <div class=\"ui-g-12 ui-md-4\"><p-checkbox name=\"cg\" value=\"Icarus\" label=\"Icarus\" [(ngModel)]=\"checkboxValues\"></p-checkbox></div>\n                <div class=\"ui-g-12 ui-md-4\"><p-checkbox name=\"cg\" value=\"Omega\" label=\"Omega\" [(ngModel)]=\"checkboxValues\"></p-checkbox></div>\n            </div>\n        </div>\n\n        <div class=\"card \">\n            <h1>RadioButtons</h1>\n            <div class=\"ui-g\">\n                <div class=\"ui-g-12 ui-md-4\"><p-radioButton name=\"rg\" value=\"Ultima\" label=\"Ultima\" [(ngModel)]=\"radioValue\"></p-radioButton></div>\n                <div class=\"ui-g-12 ui-md-4\"><p-radioButton name=\"rg\" value=\"Icarus\" label=\"Icarus\" [(ngModel)]=\"radioValue\"></p-radioButton></div>\n                <div class=\"ui-g-12 ui-md-4\"><p-radioButton name=\"rg\" value=\"Omega\" label=\"Omega\" [(ngModel)]=\"radioValue\"></p-radioButton></div>\n            </div>\n        </div>\n\n        <div class=\"card \">\n            <h1>InputSwitch</h1>\n            <p-inputSwitch [(ngModel)]=\"switchChecked\"></p-inputSwitch>\n        </div>\n\n        <div class=\"card \">\n            <h1>Dropdown</h1>\n            <p-dropdown [options]=\"cities\" [(ngModel)]=\"selectedCity1\" [autoWidth]=\"false\"></p-dropdown>\n        </div>\n\n        <div class=\"card \">\n            <h1>Password</h1>\n            <input pPassword type=\"password\"/>\n        </div>\n\n        <div class=\"card \">\n            <h1>Spinner</h1>\n            <p-spinner></p-spinner>\n        </div>\n\n        <div class=\"card \">\n            <h1>Slider</h1>\n            <p-slider [(ngModel)]=\"rangeValues\" [range]=\"true\"></p-slider>\n        </div>\n\n        <div class=\"card \">\n            <h1>Listbox</h1>\n            <p-listbox [options]=\"citiesListbox\" [(ngModel)]=\"selectedCity2\" filter=\"true\"></p-listbox>\n        </div>\n\n        <div class=\"card \">\n            <h1>Rating</h1>\n            <p-rating [(ngModel)]=\"ratingValue\" ></p-rating>\n        </div>\n\n        <div class=\"card \">\n            <h1>ColorPicker</h1>\n            <p-colorPicker [(ngModel)]=\"color\" inline=\"true\"></p-colorPicker>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card \">\n            <h1>Input Groups</h1>\n\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12 ui-md-6\">\n                    <div class=\"ui-inputgroup\">\n                        <span class=\"ui-inputgroup-addon\"><i class=\"fa fa-user\"></i></span>\n                        <input type=\"text\" placeholder=\"Username\" pInputText>\n                    </div>\n                </div>\n\n                <div class=\"ui-g-12 ui-md-6\">\n                    <div class=\"ui-inputgroup\">\n                        <span class=\"ui-inputgroup-addon\"><i class=\"fa fa-credit-card\"></i></span>\n                        <span class=\"ui-inputgroup-addon\"><i class=\"fa fa-cc-visa\"></i></span>\n                        <input type=\"text\" placeholder=\"Price\" pInputText>\n                        <span class=\"ui-inputgroup-addon\">$</span>\n                        <span class=\"ui-inputgroup-addon\">.00</span>\n                    </div>\n                </div>\n\n                <div class=\"ui-g-12 ui-md-6\">\n                    <div class=\"ui-inputgroup\">\n                        <button pButton type=\"button\" label=\"Search\"></button>\n                        <input type=\"text\" placeholder=\"Keyboard\" pInputText>\n                    </div>\n                </div>\n\n                <div class=\"ui-g-12 ui-md-6\">\n                    <div class=\"ui-inputgroup\">\n                        <span class=\"ui-inputgroup-addon\"><p-checkbox></p-checkbox></span>\n                        <input type=\"text\" pInputText placeholder=\"Confirm\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card \">\n            <h1>Editor</h1>\n            <p-editor [style]=\"{'height':'320px'}\"></p-editor>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-g-nopad\">\n        <div class=\"ui-g-12 ui-lg-6\" style=\"padding-top:0\">\n            <div class=\"card \">\n                <h1>Buttons</h1>\n\n                <div class=\"ui-g\">\n                    <div class=\"ui-g-12\">ToggleButton</div>\n                    <div class=\"ui-g-12\">\n                        <p-toggleButton [(ngModel)]=\"toggleButtonChecked\"></p-toggleButton>\n                    </div>\n\n                    <div class=\"ui-g-12\">SelectButton</div>\n                    <div class=\"ui-g-12\">\n                        <p-selectButton [options]=\"types\" [(ngModel)]=\"selectedType\"></p-selectButton>\n                    </div>\n\n                    <div class=\"ui-g-12\">Button</div>\n                    <div class=\"ui-g-12\">\n                        <button type=\"button\" label=\"Bookmark\" pButton icon=\"fa-star\"></button>\n                    </div>\n\n                    <div class=\"ui-g-12\">Left Icon</div>\n                    <div class=\"ui-g-12\">\n                        <button type=\"button\" label=\"Clear\" pButton icon=\"fa-star\"></button>\n                    </div>\n\n                    <div class=\"ui-g-12\">Right Icon</div>\n                    <div class=\"ui-g-12\">\n                        <button type=\"button\" label=\"Clear\" pButton icon=\"fa-star\" iconPos=\"right\"></button>\n                    </div>\n\n                    <div class=\"ui-g-12\">Icon Only</div>\n                    <div class=\"ui-g-12\">\n                        <button type=\"button\" icon=\"fa-star\" pButton></button>\n                    </div>\n\n                    <div class=\"ui-g-12\">Link</div>\n                    <div class=\"ui-g-12\"><a href=\"http://www.primefaces.org\" target=\"_blank\">Homepage</a></div>\n\n                    <div class=\"ui-g-12\">SplitButton</div>\n                    <div class=\"ui-g-12 ui-g-nopad\">\n                        <div class=\"ui-g\">\n                            <div class=\"ui-g-12 ui-md-4\">\n                                <p-splitButton label=\"Save\" icon=\"ui-icon-save\" [model]=\"splitButtonItems\"></p-splitButton>\n                            </div>\n                            <div class=\"ui-g-12 ui-md-4\">\n                                <p-splitButton label=\"Save\" icon=\"ui-icon-save\" [model]=\"splitButtonItems\" styleClass=\"green-btn\"></p-splitButton>\n                            </div>\n                            <div class=\"ui-g-12 ui-md-4\">\n                                <p-splitButton label=\"Save\" icon=\"ui-icon-save\" [model]=\"splitButtonItems\" styleClass=\"pink-btn\"></p-splitButton>\n                            </div>\n                        </div>\n                        \n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui-g-12 ui-lg-6\" style=\"padding-top:0\">\n            <div class=\"card \">\n                <h1>Colored Buttons</h1>\n                <p>Raised and Flat buttons with various color alternatives.</p>\n                <div class=\"ui-g\">\n                    <div class=\"ui-g-12\" style=\"text-align:center\">\n\n                        <button pButton type=\"button\" label=\"Blue Button\" style=\"margin-bottom:10px\" class=\"blue-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Green Button\" style=\"margin-bottom:10px\" class=\"green-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Purple Button\" style=\"margin-bottom:10px\" class=\"purple-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Cyan Button\" style=\"margin-bottom:10px\" class=\"cyan-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Red Button\" style=\"margin-bottom:10px\" class=\"red-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Yellow Button\" style=\"margin-bottom:10px\" class=\"yellow-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Orange Button\" style=\"margin-bottom:10px\" class=\"orange-btn\"></button>\n\n                        <button pButton type=\"button\" label=\"Indigo Button\" style=\"margin-bottom:10px\" class=\"indigo-btn\"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/formsdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormsDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_countryservice__ = __webpack_require__("./src/app/demo/service/countryservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormsDemoComponent = (function () {
    function FormsDemoComponent(countryService, breadcrumbService) {
        this.countryService = countryService;
        this.breadcrumbService = breadcrumbService;
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        this.selectedMultiSelectCars = [];
        this.checkboxValues = [];
        this.rangeValues = [20, 80];
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Forms', routerLink: ['/forms'] }
        ]);
    }
    FormsDemoComponent.prototype.ngOnInit = function () {
        this.carOptions = [];
        this.carOptions.push({ label: 'Audi', value: 'Audi' });
        this.carOptions.push({ label: 'BMW', value: 'BMW' });
        this.carOptions.push({ label: 'Fiat', value: 'Fiat' });
        this.carOptions.push({ label: 'Ford', value: 'Ford' });
        this.carOptions.push({ label: 'Honda', value: 'Honda' });
        this.carOptions.push({ label: 'Jaguar', value: 'Jaguar' });
        this.carOptions.push({ label: 'Mercedes', value: 'Mercedes' });
        this.carOptions.push({ label: 'Renault', value: 'Renault' });
        this.carOptions.push({ label: 'VW', value: 'VW' });
        this.carOptions.push({ label: 'Volvo', value: 'Volvo' });
        this.cities = [];
        this.cities.push({ label: 'Select City', value: 0 });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.citiesListbox = this.cities.slice(1);
        this.types = [];
        this.types.push({ label: 'Apartment', value: 'Apartment' });
        this.types.push({ label: 'House', value: 'House' });
        this.types.push({ label: 'Studio', value: 'Studio' });
        this.splitButtonItems = [
            { label: 'Update', icon: 'fa-refresh' },
            { label: 'Delete', icon: 'fa-close' },
            { label: 'Home', icon: 'fa-home', url: 'http://www.primefaces.org/primeng' }
        ];
    };
    FormsDemoComponent.prototype.filterCountry = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountries = _this.searchCountry(query, countries);
        });
    };
    FormsDemoComponent.prototype.searchCountry = function (query, countries) {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    };
    FormsDemoComponent.prototype.filterBrands = function (event) {
        this.filteredBrands = [];
        for (var i = 0; i < this.brands.length; i++) {
            var brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredBrands.push(brand);
            }
        }
    };
    FormsDemoComponent.prototype.handleACDropdownClick = function () {
        var _this = this;
        this.filteredBrands = [];
        // mimic remote call
        setTimeout(function () {
            _this.filteredBrands = _this.brands;
        }, 100);
    };
    FormsDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/formsdemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_countryservice__["a" /* CountryService */], __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], FormsDemoComponent);
    return FormsDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/menusdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div class=\"ui-g-12\">\n        <div class=\"card no-margin\">\n            <h1>Breadcrumb</h1>\n            <p-breadcrumb [model]=\"breadcrumbItems\" [home]=\"homeIcon\"></p-breadcrumb>\n        </div>\n\n        <div class=\"card\">\n            <h1>Steps</h1>\n            <p-steps [model]=\"stepsItems\" [activeIndex]=\"1\"></p-steps>\n        </div>\n\n        <div class=\"card\">\n            <h1>MenuBar</h1>\n            <p-menubar [model]=\"tieredItems\"></p-menubar>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-lg-6\">\n        <!-- Left Colum -->\n        <div class=\"card\">\n            <h1>Plain Menu</h1>\n            <p-menu #menu [model]=\"items\"></p-menu>\n\n            <p-menu #menu popup=\"popup\" [model]=\"items\" [style]=\"{'width':'250px'}\"></p-menu>\n            <button type=\"button\" pButton icon=\"fa-link\" label=\"Show\" (click)=\"menu.toggle($event)\" style=\"margin-top:20px;width:auto\"></button>\n        </div>\n\n        <div class=\"card\">\n            <h1>TieredMenu</h1>\n            <p-tieredMenu [model]=\"tieredItems\" [style]=\"{'width':'250px','margin-bottom':'20px'}\"></p-tieredMenu>\n        </div>\n    </div>\n    <div class=\"ui-g-12 ui-lg-6\">\n        <!-- Right Colum -->\n        <div class=\"card\">\n            <h1 style=\"margin-bottom:40px\">ContextMenu</h1>\n            Right click!\n\n            <p-contextMenu [global]=\"true\" [model]=\"tieredItems\" [style]=\"{'width':'12.5em'}\"></p-contextMenu>\n        </div>\n\n        <div class=\"card\">\n            <h1>SlideMenu</h1>\n            <p-slideMenu [model]=\"items\" [style]=\"{'width':'260px'}\" [menuWidth]=\"260\"></p-slideMenu>\n        </div>\n\n        <div class=\"card\">\n            <h1>PanelMenu</h1>\n            <p-panelMenu [model]=\"panelMenuItems\"></p-panelMenu>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-g-6\">\n        <div class=\"card\">\n            <h1>MegaMenu - Horizontal</h1>\n            <p-megaMenu [model]=\"megaMenuItems\"></p-megaMenu>\n\n            <h1 style=\"margin-top:2em\">MegaMenu - Vertical</h1>\n            <p-megaMenu [model]=\"megaMenuItems\" orientation=\"vertical\" [style]=\"{'width':'200px'}\"></p-megaMenu>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-g-6\">\n        <div class=\"card\">\n            <h1>TabMenu</h1>\n            <p-tabMenu [model]=\"tabMenuItems\" [activeItem]=\"tabMenuItems[3]\"></p-tabMenu>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/menusdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenusDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenusDemoComponent = (function () {
    function MenusDemoComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.homeIcon = { icon: 'fa fa-home' };
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Menus', routerLink: ['/menus'] }
        ]);
    }
    MenusDemoComponent.prototype.ngOnInit = function () {
        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Categories' });
        this.breadcrumbItems.push({ label: 'Sports' });
        this.breadcrumbItems.push({ label: 'Football' });
        this.breadcrumbItems.push({ label: 'Countries' });
        this.breadcrumbItems.push({ label: 'Spain' });
        this.breadcrumbItems.push({ label: 'F.C. Barcelona' });
        this.breadcrumbItems.push({ label: 'Squad' });
        this.breadcrumbItems.push({ label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' });
        this.tabMenuItems = [
            { label: 'Stats', icon: 'fa-bar-chart' },
            { label: 'Calendar', icon: 'fa-calendar' },
            { label: 'Documentation', icon: 'fa-book' },
            { label: 'Support', icon: 'fa-support' },
            { label: 'Social', icon: 'fa-twitter' }
        ];
        this.tieredItems = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa-save' },
                            { label: 'Update', icon: 'fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa-minus' }
                        ]
                    }
                ]
            },
            {
                label: 'Quit', icon: 'fa-minus'
            }
        ];
        this.items = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'fa-plus' },
                    { label: 'Open', icon: 'fa-download' }
                ]
            },
            {
                label: 'Edit',
                items: [
                    { label: 'Undo', icon: 'fa-refresh' },
                    { label: 'Redo', icon: 'fa-repeat' }
                ]
            }];
        this.megaMenuItems = [
            {
                label: 'TV', icon: 'fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ],
                    [
                        {
                            label: 'Sports 3',
                            items: [{ label: 'Sports 3.1' }, { label: 'Sports 3.2' }]
                        },
                        {
                            label: 'Sports 4',
                            items: [{ label: 'Sports 4.1' }, { label: 'Sports 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Sports 5',
                            items: [{ label: 'Sports 5.1' }, { label: 'Sports 5.2' }]
                        },
                        {
                            label: 'Sports 6',
                            items: [{ label: 'Sports 6.1' }, { label: 'Sports 6.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Entertainment', icon: 'fa-child',
                items: [
                    [
                        {
                            label: 'Entertainment 1',
                            items: [{ label: 'Entertainment 1.1' }, { label: 'Entertainment 1.2' }]
                        },
                        {
                            label: 'Entertainment 2',
                            items: [{ label: 'Entertainment 2.1' }, { label: 'Entertainment 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Entertainment 3',
                            items: [{ label: 'Entertainment 3.1' }, { label: 'Entertainment 3.2' }]
                        },
                        {
                            label: 'Entertainment 4',
                            items: [{ label: 'Entertainment 4.1' }, { label: 'Entertainment 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Technology', icon: 'fa-gears',
                items: [
                    [
                        {
                            label: 'Technology 1',
                            items: [{ label: 'Technology 1.1' }, { label: 'Technology 1.2' }]
                        },
                        {
                            label: 'Technology 2',
                            items: [{ label: 'Technology 2.1' }, { label: 'Technology 2.2' }]
                        },
                        {
                            label: 'Technology 3',
                            items: [{ label: 'Technology 3.1' }, { label: 'Technology 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Technology 4',
                            items: [{ label: 'Technology 4.1' }, { label: 'Technology 4.2' }]
                        }
                    ]
                ]
            }
        ];
        this.panelMenuItems = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project', icon: 'fa-lock' },
                            { label: 'Other', icon: 'fa-list' }
                        ]
                    },
                    { label: 'Open', icon: 'fa-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'fa-close' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents',
                        icon: 'fa-bars'
                    },
                    {
                        label: 'Search',
                        icon: 'fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File',
                                icon: 'fa-file',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa-save' },
                            { label: 'Update', icon: 'fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa-minus' }
                        ]
                    }
                ]
            }
        ];
        this.stepsItems = [
            {
                label: 'Personal'
            },
            {
                label: 'Seat'
            },
            {
                label: 'Payment'
            },
            {
                label: 'Confirmation'
            }
        ];
    };
    MenusDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/menusdemo.component.html"),
            styles: ["\n        .ui-steps-item {\n            width: 25%\n        }\n    "],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], MenusDemoComponent);
    return MenusDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/messagesdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n        <div class=\"card no-margin\">\n            <h1>Messages and Growl</h1>\n            <p-messages [value]=\"msgs\"></p-messages>\n            <p-growl [value]=\"msgs\" sticky=\"sticky\"></p-growl>\n\n            <button type=\"button\" pButton (click)=\"showInfo()\" label=\"Info\" style=\"width:100px\" class=\"blue-btn\"></button>\n            <button type=\"button\" pButton (click)=\"showSuccess()\" label=\"Success\" style=\"width:100px\" class=\"green-btn\"></button>\n            <button type=\"button\" pButton (click)=\"showWarn()\" label=\"Warn\" class=\"orange-btn\" style=\"width:100px\"></button>\n            <button type=\"button\" pButton (click)=\"showError()\" label=\"Error\" class=\"pink-btn\" style=\"width:100px\"></button>\n            <button type=\"button\" pButton (click)=\"showMultiple()\" label=\"Multiple\" class=\"purple-btn\" style=\"width:100px\"></button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/messagesdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesDemoComponent = (function () {
    function MessagesDemoComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.msgs = [];
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Messages', routerLink: ['/messages'] }
        ]);
    }
    MessagesDemoComponent.prototype.showInfo = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    };
    MessagesDemoComponent.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    MessagesDemoComponent.prototype.showError = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    };
    MessagesDemoComponent.prototype.showSuccess = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    };
    MessagesDemoComponent.prototype.showMultiple = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' });
    };
    MessagesDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/messagesdemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], MessagesDemoComponent);
    return MessagesDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/miscdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n    <div class=\"ui-g-12 ui-lg-6\">\n        <div class=\"card no-margin\">\n            <h1>ProgressBar</h1>\n            <p-progressBar [value]=\"value\" [showValue]=\"false\"></p-progressBar>\n        </div>\n        <div class=\"card\">\n            <h1>Terminal</h1>\n            <p-terminal [response]=\"response\" welcomeMessage=\"Welcome to Apollo\" prompt=\"primeng $\"></p-terminal>\n        </div>\n    </div>\n    <div class=\"ui-g-12 ui-lg-6\">\n        <div class=\"card no-margin\">\n            <h1>Galleria</h1>\n            <p-galleria [images]=\"images\" panelWidth=\"500\" panelHeight=\"313\"></p-galleria>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/miscdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiscDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_components_terminal_terminalservice__ = __webpack_require__("./node_modules/primeng/components/terminal/terminalservice.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_components_terminal_terminalservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_components_terminal_terminalservice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MiscDemoComponent = (function () {
    function MiscDemoComponent(terminalService, breadcrumbService) {
        var _this = this;
        this.terminalService = terminalService;
        this.breadcrumbService = breadcrumbService;
        this.value = 0;
        this.subscription = this.terminalService.commandHandler.subscribe(function (command) {
            var response = (command === 'date') ? new Date().toDateString() : 'Unknown command: ' + command;
            _this.terminalService.sendResponse(response);
        });
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Misc', routerLink: ['/misc'] }
        ]);
    }
    MiscDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.value = _this.value + Math.floor(Math.random() * 10) + 1;
            if (_this.value >= 100) {
                _this.value = 100;
                clearInterval(_this.interval);
                _this.interval = null;
            }
        }, 2000);
        this.images = [];
        this.images.push({ source: 'assets/demo/images/nature/nature1.jpg', alt: 'Description for Image 1', title: 'Title 1' });
        this.images.push({ source: 'assets/demo/images/nature/nature2.jpg', alt: 'Description for Image 2', title: 'Title 2' });
        this.images.push({ source: 'assets/demo/images/nature/nature3.jpg', alt: 'Description for Image 3', title: 'Title 3' });
        this.images.push({ source: 'assets/demo/images/nature/nature4.jpg', alt: 'Description for Image 4', title: 'Title 4' });
        this.images.push({ source: 'assets/demo/images/nature/nature5.jpg', alt: 'Description for Image 5', title: 'Title 5' });
        this.images.push({ source: 'assets/demo/images/nature/nature6.jpg', alt: 'Description for Image 6', title: 'Title 6' });
        this.images.push({ source: 'assets/demo/images/nature/nature7.jpg', alt: 'Description for Image 7', title: 'Title 7' });
        this.images.push({ source: 'assets/demo/images/nature/nature8.jpg', alt: 'Description for Image 8', title: 'Title 8' });
        this.images.push({ source: 'assets/demo/images/nature/nature9.jpg', alt: 'Description for Image 9', title: 'Title 9' });
        this.images.push({ source: 'assets/demo/images/nature/nature10.jpg', alt: 'Description for Image 10', title: 'Title 10' });
        this.images.push({ source: 'assets/demo/images/nature/nature11.jpg', alt: 'Description for Image 11', title: 'Title 11' });
        this.images.push({ source: 'assets/demo/images/nature/nature12.jpg', alt: 'Description for Image 12', title: 'Title 12' });
    };
    MiscDemoComponent.prototype.onCommand = function (event) {
        if (event.command === 'date') {
            this.response = new Date().toDateString();
        }
        else {
            this.response = 'Unknown command: ' + event.command;
        }
    };
    MiscDemoComponent.prototype.ngOnDestroy = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    MiscDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/miscdemo.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_1_primeng_components_terminal_terminalservice__["TerminalService"]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_primeng_components_terminal_terminalservice__["TerminalService"], __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], MiscDemoComponent);
    return MiscDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/overlaysdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div class=\"ui-g-12 ui-lg-6\">\n        <!-- Left Side -->\n        <div class=\"card no-margin\">\n            <h1>Overlay Panel</h1>\n            <div class=\"ui-g\">\n                <div class=\"ui-g-6\">\n                    <button type=\"button\" pButton label=\"Image\" (click)=\"op1.toggle($event)\"></button>\n                    <p-overlayPanel #op1>\n                        <img src=\"assets/demo/images/nature/nature1.jpg\" alt=\"Nature 1\" />\n                    </p-overlayPanel>\n                </div>\n                <div class=\"ui-g-6\">\n                    <button type=\"button\" pButton label=\"DataTable\" (click)=\"op2.toggle($event)\"></button>\n                    <p-overlayPanel #op2 [showCloseIcon]=\"true\" [dismissable]=\"false\">\n                        <p-table [columns]=\"cols\" [value]=\"cars\" dataKey=\"vin\" [style]=\"{'width':'500px'}\">\n                            <ng-template pTemplate=\"header\" let-columns>\n                                <tr>\n                                    <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                      {{col.header}}\n                                      <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                    </th>\n                                </tr>\n                            </ng-template>\n                            <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                <tr [pSelectableRow]=\"rowData\">\n                                    <td *ngFor=\"let col of columns\">\n                                      {{rowData[col.field]}}\n                                    </td>\n                                </tr>\n                            </ng-template>\n                        </p-table>\n                    </p-overlayPanel>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"card\">\n            <h1>Dialog</h1>\n            <p-dialog header=\"Godfather I\" [(visible)]=\"display\" modal=\"modal\" showEffect=\"fade\" width=\"400\">\n                <div>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.\n                   His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.\n                   Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,\n                   kind and benevolent to those who give respect,\n                   but given to ruthless violence whenever anything stands against the good of the family.</div>\n                <p-footer>\n                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"display=false\" label=\"No\"></button>\n                    <button type=\"button\" pButton icon=\"fa-check\" (click)=\"display=false\" label=\"Yes\"></button>\n                </p-footer>\n            </p-dialog>\n\n            <button type=\"text\" (click)=\"display=true\" pButton icon=\"fa-external-link-square\" label=\"Show\"></button>\n        </div>\n\n        <div class=\"card\">\n            <h1>Confirm Dialog</h1>\n            <p-confirmDialog header=\"Confirmation\" icon=\"fa fa-info\" width=\"425\"></p-confirmDialog>\n\n            <button type=\"text\" (click)=\"confirm()\" pButton icon=\"fa-check\" label=\"Confirm\"></button>\n        </div>\n\n        <div class=\"card\">\n            <h1>Tooltip</h1>\n            <input type=\"text\" pInputText pTooltip=\"Enter your username\" placeholder=\"Right\" tooltipEvent=\"focus\">\n        </div>\n    </div>\n\n    <div class=\"ui-g-12 ui-lg-6\">\n        <!-- Right Side -->\n        <div class=\"card no-margin\">\n            <h1>LightBox</h1>\n            <p-lightbox [images]=\"images\"></p-lightbox>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/overlaysdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlaysDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_carservice__ = __webpack_require__("./src/app/demo/service/carservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OverlaysDemoComponent = (function () {
    function OverlaysDemoComponent(carService, confirmationService, breadcrumbService) {
        this.carService = carService;
        this.confirmationService = confirmationService;
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Overlays', routerLink: ['/overlays'] }
        ]);
    }
    OverlaysDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars.splice(0, 5); });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.images = [];
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos1.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Nature 1'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos2.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos2_small.jpg', title: 'Nature 2'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos3.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos3_small.jpg', title: 'Nature 3'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos4.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos4_small.jpg', title: 'Nature 4'
        });
    };
    OverlaysDemoComponent.prototype.confirm = function () {
        this.confirmationService.confirm({
            message: 'Are you sure to perform this action?'
        });
    };
    OverlaysDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/overlaysdemo.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmationService"]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_carservice__["a" /* CarService */], __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["ConfirmationService"],
            __WEBPACK_IMPORTED_MODULE_2__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], OverlaysDemoComponent);
    return OverlaysDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/panelsdemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n        <div class=\"card no-margin\">\n            <h1>AccordionPanel</h1>\n            <p-accordion>\n                <p-accordionTab header=\"Godfather I\" [selected]=\"true\">\n                    The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n                </p-accordionTab>\n                <p-accordionTab header=\"Godfather II\">\n                    Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.\n                </p-accordionTab>\n                <p-accordionTab header=\"Godfather III\">\n                    After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.\n                </p-accordionTab>\n            </p-accordion>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Panel</h1>\n            <p-panel header=\"Godfather I\" [toggleable]=\"true\">\n                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.\n                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.\n                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,\n                kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n            </p-panel>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>TabView</h1>\n            <p-tabView>\n                <p-tabPanel header=\"Godfather I\" leftIcon=\"fa-check\">\n                    The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n                </p-tabPanel>\n                <p-tabPanel header=\"Godfather II\" leftIcon=\"fa-user-o\"  [closable]=\"true\">\n                    Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.\n                </p-tabPanel>\n                <p-tabPanel header=\"Godfather III\" leftIcon=\"fa-phone\">\n                    After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.\n                </p-tabPanel>\n            </p-tabView>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Fieldset</h1>\n            <p-fieldset legend=\"Toggleable\" toggleable=\"true\">\n                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.\n                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.\n                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,\n                kind and benevolent to those who give respect,\n                but given to ruthless violence whenever anything stands against the good of the family.\n            </p-fieldset>\n        </div>\n    </div>\n\n    <div class=\"ui-g-12\">\n        <div class=\"card\">\n            <h1>Toolbar</h1>\n            <p-toolbar>\n                <div class=\"ui-toolbar-group-left\">\n                    <button pButton type=\"button\" label=\"New\" icon=\"fa-plus\"></button>\n                    <button pButton type=\"button\" label=\"Update\" class=\"pink-btn\" icon=\"fa-refresh\"></button>\n\n                    <i class=\"fa fa-bars\"></i>\n\n                    <button pButton type=\"button\" class=\"green-btn\" icon=\"fa-check\"></button>\n                    <button pButton type=\"button\" class=\"purple-btn\" icon=\"fa-trash\"></button>\n                    <button pButton type=\"button\" class=\"orange-btn\" icon=\"fa-print\"></button>\n                </div>\n\n                <div class=\"ui-toolbar-group-right\">\n                    <p-splitButton label=\"Save\" icon=\"fa-check\" [model]=\"items\"></p-splitButton>\n                </div>\n           </p-toolbar>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/panelsdemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelsDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PanelsDemoComponent = (function () {
    function PanelsDemoComponent(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Panels', routerLink: ['/panels'] }
        ]);
    }
    PanelsDemoComponent.prototype.ngOnInit = function () {
        this.items = [
            { label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'fa-book', routerLink: ['/theming'] }
        ];
    };
    PanelsDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/panelsdemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], PanelsDemoComponent);
    return PanelsDemoComponent;
}());



/***/ }),

/***/ "./src/app/demo/view/sampledemo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12\">\n            <!-- <div class=\"ui-messages ui-widget ui-corner-all ui-messages-success\" style=\"margin: 0 0 1em 0; display: block\">\n                <span class=\"ui-messages-icon fa fa-fw fa-2x fa-check\"></span>\n                <ul>\n                    <li>\n                        <span class=\"ui-messages-summary\" style=\"font-size:16px\">Apollo provides a theme for all 70+ PrimeNG Components. This page contains samples of the commonly used components for demo purposes.</span>\n                    </li>\n                </ul>\n            </div> -->\n\n            <div class=\"card no-margin\">\n                <h1>Form Elements</h1>\n                <div class=\"ui-g form-group\">\n                    <div class=\"ui-g-12 ui-md-6\">\n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"input\">Input</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <input id=\"input\" type=\"text\" pInputText/>\n                        </div>\n                        \n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"textarea\">Textarea</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <textarea [rows]=\"3\" [cols]=\"30\" pInputTextarea autoResize=\"autoResize\"></textarea>\n                        </div>\n                        \n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"calendar\">Calendar</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-calendar id=\"calendar\"></p-calendar>\n                        </div>\n                        \n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"autocomplete\">AutoComplete</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-autoComplete [(ngModel)]=\"country\" [suggestions]=\"filteredCountries\" (completeMethod)=\"filterCountry($event)\" field=\"name\"\n                                placeholder=\"Countries\" [minLength]=\"1\"></p-autoComplete>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"dropdown\">Dropdown</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-dropdown id=\"dropdown\" [options]=\"cities1\" [(ngModel)]=\"selectedCity1\" [autoWidth]=\"false\"></p-dropdown>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"password\">Password</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <input id=\"password\" pPassword type=\"password\" [feedback]=\"false\"/>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            Button\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <button pButton type=\"button\" label=\"Edit\" icon=\"fa-edit\"></button>\n                        </div>\n    \n                        <div class=\"ui-g-12 ui-md-4\">\n                            SplitButton\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-splitButton label=\"Save\" icon=\"fa-save\" [model]=\"splitButtonItems\"></p-splitButton>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"multiselect\">MultiSelect</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-multiSelect id=\"multiselect\" [options]=\"carOptions\" [(ngModel)]=\"selectedMultiSelectCars\"></p-multiSelect>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"slider\">Slider</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-slider></p-slider>\n                        </div>\n                    </div>\n                    \n                    <div class=\"ui-g-12 ui-md-6\">\n                        <div class=\"ui-g-12 ui-md-4\">\n                            Checkbox\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <div class=\"ui-g\">\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <p-checkbox name=\"cg\" value=\"Ultima\" label=\"Ultima\" [(ngModel)]=\"checkboxValues\"></p-checkbox>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <p-checkbox name=\"cg\" value=\"Icarus\" label=\"Icarus\" [(ngModel)]=\"checkboxValues\"></p-checkbox>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <p-checkbox name=\"cg\" value=\"Omega\" label=\"Omega\" [(ngModel)]=\"checkboxValues\"></p-checkbox>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            RadioButton\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <div class=\"ui-g\">\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <p-radioButton name=\"rg\" value=\"Ultima\" label=\"Ultima\" [(ngModel)]=\"radioValue\"></p-radioButton>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <p-radioButton name=\"rg\" value=\"Icarus\" label=\"Icarus\" [(ngModel)]=\"radioValue\"></p-radioButton>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <p-radioButton name=\"rg\" value=\"Omega\" label=\"Omega\" [(ngModel)]=\"radioValue\"></p-radioButton>\n                                </div>\n                            </div>\n                        </div>\n                        \n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"mask\">Mask</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-inputMask mask=\"99/99/9999\" slotChar=\"dd/mm/yyyy\" placeholder=\"Date\"></p-inputMask>\n                        </div>\n                    \n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"spinner\">Spinner</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-spinner></p-spinner>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            ToggleButton\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-toggleButton [(ngModel)]=\"toggleButtonChecked\"></p-toggleButton>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            SelectButton\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-selectButton [options]=\"types\" [(ngModel)]=\"selectedType\"></p-selectButton>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            Dialog\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <button type=\"button\" label=\"Login\" icon=\"fa-external-link\" (click)=\"dialogVisible=true\" pButton></button>\n                        </div>\n\n                        <div class=\"ui-g-12 ui-md-4\">\n                            <label for=\"listbox\">Listbox</label>\n                        </div>\n                        <div class=\"ui-g-12 ui-md-8\">\n                            <p-listbox [options]=\"cities2\" [(ngModel)]=\"selectedCity2\"></p-listbox>\n                        </div>\n                    </div>\n                </div>\n\n                <p-dialog header=\"Login\" [resizable]=\"false\" responsive=\"true\" [(visible)]=\"dialogVisible\">\n                    <div class=\"ui-g form-group\" style=\"margin-bottom: 16px;\">\n                        <div class=\"ui-g-12\">\n                            <input type=\"text\" pInputText placeholder=\"Name\">\n                        </div>\n                        <div class=\"ui-g-12\">\n                            <input type=\"password\" pInputText placeholder=\"Password\">\n                        </div>\n                    </div>\n\n                    <p-footer>\n                        <div class=\"ui-dialog-buttonpane ui-helper-clearfix\">\n                            <button type=\"button\" label=\"Login\" icon=\"fa-user\" (click)=\"dialogVisible=false\" pButton></button>\n                        </div>\n                    </p-footer>\n                </p-dialog>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>List of Cars</h1>\n                <p-table [columns]=\"cols\" [value]=\"cars\" selectionMode=\"single\" dataKey=\"vin\" [(selection)]=\"selectedCar3\" [responsive]=\"true\">\n                    <ng-template pTemplate=\"caption\">\n                        DataTable\n                    </ng-template>\n                    <ng-template pTemplate=\"header\" let-columns>\n                        <tr>\n                          <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                            {{col.header}}\n                            <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                          </th>\n                        </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                        <tr [pSelectableRow]=\"rowData\">\n                          <td *ngFor=\"let col of columns\">\n                            {{rowData[col.field]}}\n                          </td>\n                        </tr>\n                    </ng-template>\n                </p-table>\n            </div>\n        </div>\n\n        <div class=\"ui-g-12 ui-lg-6\">\n            <!-- Left Side -->\n            <div class=\"card card-w-title\">\n                <h1>DataGrid</h1>\n                <p-dataGrid [value]=\"carsLarge\" [paginator]=\"true\" paginatorPosition=\"both\" [rows]=\"20\">\n                    <p-header>\n                        List of Cars\n                    </p-header>\n                    <ng-template let-car pTemplate=\"item\">\n                        <div style=\"padding:3px\" class=\"ui-g-12 ui-md-3\">\n                            <p-panel [header]=\"car.vin\" [style]=\"{'text-align':'center'}\">\n                                <img src=\"assets/demo/images/car/{{car.brand}}.png\" width=\"50\">\n                                <div class=\"car-detail\">{{car.year}} - {{car.color}}</div>\n                            </p-panel>\n                        </div>\n                    </ng-template>\n                </p-dataGrid>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>Tree</h1>\n                <p-tree [value]=\"filesTree\"></p-tree>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>Menu</h1>\n                <p-menu [model]=\"menuItems\"></p-menu>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>PanelMenu</h1>\n                <p-panelMenu [model]=\"panelMenuItems\"></p-panelMenu>\n            </div>\n        </div>\n        <div class=\"ui-g-12 ui-lg-6\">\n            <!-- Right Side -->\n            <div class=\"card card-w-title\">\n                <h1>PickList</h1>\n                <p-pickList [source]=\"sourceCars\" [target]=\"targetCars\" sourceHeader=\"Available\" targetHeader=\"Selected\" [responsive]=\"true\">\n                    <ng-template let-car pTemplate=\"item\">\n                        <span>{{car.brand}}</span>\n                    </ng-template>\n                </p-pickList>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>OrderList</h1>\n                <p-orderList [value]=\"orderListCars\" [listStyle]=\"{'height':'250px'}\" [responsive]=\"true\" header=\"OrderList\">\n                    <ng-template let-car pTemplate=\"item\">\n                        <div class=\"ui-helper-clearfix\">\n                            <img src=\"assets/demo/images/car/{{car.brand}}.png\" style=\"display:inline-block;margin:2px 0 2px 2px\" width=\"50\"/>\n                            <div style=\"font-size:14px;float:right;margin:15px 5px 0 0\">{{car.brand}} - {{car.year}} - {{car.color}}</div>\n                        </div>\n                    </ng-template>\n                </p-orderList>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>Accordion Panel</h1>\n                <p-accordion>\n                    <p-accordionTab header=\"Godfather I\" [selected]=\"true\">\n                        The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n                    </p-accordionTab>\n                    <p-accordionTab header=\"Godfather II\">\n                        Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.\n                    </p-accordionTab>\n                    <p-accordionTab header=\"Godfather III\">\n                        After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.\n                    </p-accordionTab>\n                </p-accordion>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>Panel</h1>\n                <p-panel header=\"Godfather I\" [toggleable]=\"true\">\n                    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.\n                    His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.\n                    Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,\n                    kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n                </p-panel>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>ProgressBar - Static Display</h1>\n                <p-progressBar [value]=\"50\"></p-progressBar>\n            </div>\n\n            <div class=\"card card-w-title\">\n                <h1>Heading 1</h1>\n\n                <h2>Heading 2</h2>\n\n                <h3>Heading 3</h3>\n\n                <h4>Heading 4</h4>\n            </div>\n        </div>\n\n        <div class=\"ui-g-12\">\n            <div class=\"card card-w-title\">\n                <h1>Carousel</h1>\n                <p-carousel headerText=\"Cars\" [value]=\"carouselCars\">\n                    <ng-template let-car pTemplate=\"item\">\n                        <div class=\"ui-g\" style=\"text-align:center\">\n                            <div class=\"ui-g-12\" style=\"text-align:Center\">\n                                <img src=\"assets/demo/images/car/{{car.brand}}.png\" />\n                            </div>\n                            <div class=\"ui-g-6\">Vin: </div>\n                            <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.vin}}</div>\n\n                            <div class=\"ui-g-6\">Year: </div>\n                            <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.year}}</div>\n\n                            <div class=\"ui-g-6\">Brand: </div>\n                            <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.brand}}</div>\n\n                            <div class=\"ui-g-6\">Color: </div>\n                            <div class=\"ui-g-6\" style=\"font-weight:bold\">{{car.color}}</div>\n                        </div>\n                    </ng-template>\n                </p-carousel>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/demo/view/sampledemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_carservice__ = __webpack_require__("./src/app/demo/service/carservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_countryservice__ = __webpack_require__("./src/app/demo/service/countryservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_nodeservice__ = __webpack_require__("./src/app/demo/service/nodeservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SampleDemoComponent = (function () {
    function SampleDemoComponent(carService, countryService, nodeService, breadcrumbService) {
        this.carService = carService;
        this.countryService = countryService;
        this.nodeService = nodeService;
        this.breadcrumbService = breadcrumbService;
        this.checkboxValues = [];
        this.selectedMultiSelectCars = [];
        this.breadcrumbService.setItems([
            { label: 'Settings' },
            { label: 'App Parameter', routerLink: ['/appParameter'] }
        ]);
    }
    SampleDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.carService.getCarsLarge().then(function (cars) { return _this.carsLarge = cars; });
        this.nodeService.getFiles().then(function (files) { return _this.filesTree = files; });
        this.carService.getCarsSmall().then(function (cars) { return _this.sourceCars = cars; });
        this.targetCars = [];
        this.carService.getCarsSmall().then(function (cars) { return _this.orderListCars = cars; });
        this.cities1 = [];
        this.cities1.push({ label: 'Select City', value: null });
        this.cities1.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities1.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities1.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities1.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities1.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.cities2 = this.cities1.slice(1, 6);
        this.splitButtonItems = [
            { label: 'Update', icon: 'fa-refresh' },
            { label: 'Delete', icon: 'fa-close' },
            { label: 'Home', icon: 'fa-home', url: 'http://www.primefaces.org/primeng' }
        ];
        this.carOptions = [];
        this.carOptions.push({ label: 'Audi', value: 'Audi' });
        this.carOptions.push({ label: 'BMW', value: 'BMW' });
        this.carOptions.push({ label: 'Fiat', value: 'Fiat' });
        this.carOptions.push({ label: 'Ford', value: 'Ford' });
        this.carOptions.push({ label: 'Honda', value: 'Honda' });
        this.carOptions.push({ label: 'Jaguar', value: 'Jaguar' });
        this.carOptions.push({ label: 'Mercedes', value: 'Mercedes' });
        this.carOptions.push({ label: 'Renault', value: 'Renault' });
        this.carOptions.push({ label: 'Volkswagen', value: 'Volkswagen' });
        this.carOptions.push({ label: 'Volvo', value: 'Volvo' });
        this.types = [];
        this.types.push({ label: 'Apartment', value: 'Apartment' });
        this.types.push({ label: 'House', value: 'House' });
        this.types.push({ label: 'Studio', value: 'Studio' });
        this.menuItems = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'fa-plus' },
                    { label: 'Open', icon: 'fa-download' }
                ]
            },
            {
                label: 'Edit',
                items: [
                    { label: 'Undo', icon: 'fa-refresh' },
                    { label: 'Redo', icon: 'fa-repeat' }
                ]
            }];
        this.panelMenuItems = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa-save' },
                            { label: 'Update', icon: 'fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa-minus' }
                        ]
                    }
                ]
            }
        ];
        this.carouselCars = [
            { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
            { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
            { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
            { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
            { vin: 'gf45wg5', year: 2011, brand: 'Volkswagen', color: 'Red' },
            { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
            { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
            { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
            { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
        ];
    };
    SampleDemoComponent.prototype.filterCountry = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountries = _this.searchCountry(query, countries);
        });
    };
    SampleDemoComponent.prototype.searchCountry = function (query, countries) {
        // in a real application, make a request to a remote url with the query and return filtered results,
        // for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    };
    SampleDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/demo/view/sampledemo.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_carservice__["a" /* CarService */], __WEBPACK_IMPORTED_MODULE_2__service_countryservice__["a" /* CountryService */], __WEBPACK_IMPORTED_MODULE_3__service_nodeservice__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_4__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], SampleDemoComponent);
    return SampleDemoComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map