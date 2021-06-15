import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message, ConfirmationService, SelectItem } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { User, CurrentUser, DeleteRecords, PayloadBean } from '../../../_models/data.model';
import { Statuses } from '../../../_models/applicationparameter';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ApplicationParameter, ParameterListBean, ParameterValueBean, ParameterListEntityTO } from '../parameters';
import { ParameterService } from '../parameter-service';
import { appConfig, messageConfig, appStatusConfig, routeConfig } from '../../../app.config';
import * as CryptoJS from 'crypto-js';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
@Component({
  templateUrl: './add-parameter.component.html',
  styleUrls: ['./add-parameter.component.css'],
  providers: [ParameterService]
})
export class AddParameter implements OnInit {

  //For Global
  showPageSpinner:boolean;
  msgs: Message[] = [];
  addbreaditems: MenuItem[]
  user: User = new User();
  currentuser: CurrentUser = new CurrentUser();
  baseResponse: any;
  params: any;
  deleteRecords: DeleteRecords;
  breadLabel: any = 'Add Parameter';
  payloadBean: PayloadBean = new PayloadBean();

  //For Parameters
  parameterStatusList: SelectItem[];
  parameterTypeList: SelectItem[];
  parameterDataTypeList: SelectItem[];
  applicationparameter: ApplicationParameter = new ApplicationParameter();
  editFlag: boolean;
  minvalinactive: any;
  lengthinactive: any;
  maxvalinactive: any;
  dateinactive: any;
  decimalinactive: any;


  //For Parameter List
  parameterListBean: ParameterListBean = new ParameterListBean();
  selectedParameterList: any;
  parameterLists: ParameterListEntityTO[];
  editFlagForList: boolean;
  parameterListFlag: boolean;
  parameterListCols: any[];
  displayDialog: boolean;

  //For Parameter Value
  parameterValueBean: ParameterValueBean = new ParameterValueBean();
  editFlagForValue: boolean;
  parameterValueFlag: boolean;
  binaryFlag: boolean;
  displayEditor: boolean;

  constructor(private httpRestClient: HttpRestClient,
    private router: Router, private route: ActivatedRoute,
    private parameterService: ParameterService,
    public roleRightsGuard: RoleRightsGuard,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.parameterMenu);

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.payloadBean = new PayloadBean();
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.applicationparameter.parameterStatus = appStatusConfig.activeName;
    this.route.params.subscribe(params => { this.params = params; });

    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/parameters']);
      } else {
        this.parameterService.setter(decrypted);
        this.editParameters();
      }
    }
    this.breadcrumbService.setItems([
      { label: 'Administration' },
      { label: 'Parameters', routerLink: ['/parameters'] },
      { label: this.breadLabel }
    ]);

  }

  ngOnInit() {

    this.parameterStatusList = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName }
    ];

    this.parameterTypeList = [
      { label: appStatusConfig.userParameter, value: appStatusConfig.userParameter },
      { label: appStatusConfig.systemParameter, value: appStatusConfig.systemParameter }
    ];

    this.parameterDataTypeList = [
      { label: appStatusConfig.binary, value: appStatusConfig.binary },
      { label: appStatusConfig.date, value: appStatusConfig.date },
      { label: appStatusConfig.double, value: appStatusConfig.double },
      { label: appStatusConfig.list, value: appStatusConfig.list },
      { label: appStatusConfig.string, value: appStatusConfig.string },
      { label: appStatusConfig.time, value: appStatusConfig.time }

    ];
    this.lengthinactive = true;
    this.minvalinactive = true;
    this.dateinactive = true;
    this.decimalinactive = true;
    this.maxvalinactive = true;
  }


  //For Parameters  

  addParameter() {
    if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
    
      if ( this.applicationparameter.parameterName == undefined || this.applicationparameter.parameterName.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Name can't be blank!" });
      } else if (this.applicationparameter.parameterCode == undefined || this.applicationparameter.parameterCode.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Code can't be blank!" });
      } else if (this.applicationparameter.parameterType == undefined || this.applicationparameter.parameterType.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Type can't be blank!" });
      } else if (this.applicationparameter.parameterDataType == undefined || this.applicationparameter.parameterDataType.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Data Type can't be blank!" });
      } else if (!(this.minvalinactive) && (this.applicationparameter.parameterMinValue == undefined || this.applicationparameter.parameterMinValue == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Min Value can't be blank!" });
      } else if (!(this.maxvalinactive) && (this.applicationparameter.parameterMaxValue == undefined || this.applicationparameter.parameterMaxValue == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter max Value can't be blank!" });
      } else if (!(this.lengthinactive) && (this.applicationparameter.parameterLength == undefined || this.applicationparameter.parameterLength == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Length can't be blank!" });
      } else if (!(this.decimalinactive) && (this.applicationparameter.parameterDecimalLength == undefined || this.applicationparameter.parameterDecimalLength == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Decimal Length can't be blank!" });
      } else if (this.applicationparameter.parameterStatus == undefined || this.applicationparameter.parameterStatus.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Status can't be blank!" });
      } else {
        if (!this.editFlag) {
          this.applicationparameter.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-parameter", this.applicationparameter).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                sessionStorage.setItem("successMessage", "AddedSuccess");
                this.router.navigate(['/parameters']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        } else {
          this.applicationparameter.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-parameter", this.applicationparameter).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/parameters']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        }
      }
    }
  }
  editParameters() {
    this.showPageSpinner=true;
    this.payloadBean.id = this.parameterService.getter();
    this.httpRestClient.postData("edit-parameter", this.payloadBean)
      .subscribe(response => {
        this.applicationparameter = response;
        this.editFlag = true;
        this.breadLabel = 'Edit Parameter';
        if (this.applicationparameter.parameterDataType == 'List') {
          this.parameterListFlag = true;
          this.parameterListCols = [
            { field: 'parameterListValue', header: 'List Value Name', class: "table-list-name", id: 'parameterListID' },
            { field: 'parameterListCode', header: 'List Value Code', class: "table-list-code" },
            { field: 'parameterListStatus', header: 'List Value Status', class: "table-list-status" }
          ];
        } else if (this.applicationparameter.parameterDataType == 'Binary') {
          this.parameterValueFlag = true;
          this.binaryFlag = true;
        } else {
          this.parameterValueFlag = true;
        }

        this.breadcrumbService.setItems([
          { label: 'Administration' },
          { label: 'Parameters', routerLink: ['/parameters'] },
          { label: this.breadLabel }
        ]);
        this.validateStatus(this.applicationparameter.parameterDataType);
        this.showPageSpinner=false;
      });
  }

  dataTypeChange(event) {
    this.applicationparameter.parameterDateFormat = null;
    this.applicationparameter.parameterMinValue = null;
    this.applicationparameter.parameterLength = null;
    this.applicationparameter.parameterMaxValue = null;
    this.applicationparameter.parameterDecimalLength = null;
    this.lengthinactive = true;
    this.minvalinactive = true;
    this.dateinactive = true;
    this.decimalinactive = true;
    this.maxvalinactive = true;
    this.validateStatus(event.value);

  }
  validateStatus(statusCode) {
    if (statusCode === 'String') {
      this.lengthinactive = false;
    } else if (statusCode === 'Number') {
      this.minvalinactive = false;
      this.maxvalinactive = false;
    } else if (statusCode === 'Double') {
      this.minvalinactive = false;
      this.maxvalinactive = false;
      this.decimalinactive = false;
    } else if (statusCode === 'Date') {
      this.applicationparameter.parameterDateFormat = 'dd/mm/yy';
    }
  }

  resetAddParameter() {
    this.applicationparameter = new ApplicationParameter();
    this.applicationparameter.parameterDateFormat = '';
    this.lengthinactive = true;
    this.minvalinactive = true;
    this.dateinactive = true;
    this.decimalinactive = true;
    this.maxvalinactive = true;
  }

  onTabChange(event: any) {
    this.msgs = [];
    if (event.index == 0) {
      this.editParameters();
    }
    else if (event.index == 1) {
      this.showPageSpinner=true;
      if (this.parameterListFlag) {
        this.payloadBean.id = this.parameterService.getter();
        this.httpRestClient.postData("fetch-parameter-list", this.payloadBean).subscribe(
          response => {
            this.parameterLists = response;
            this.showPageSpinner=false;
          });
      } else if (this.parameterValueFlag) {
        this.payloadBean.id = this.parameterService.getter();
        this.httpRestClient.postData("fetch-parameter-value", this.payloadBean).subscribe(
          response => {
            if (response == null || response == undefined) {
              this.parameterValueBean = new ParameterValueBean();
              this.parameterValueBean.parameterValueStatus = appStatusConfig.activeName;
              this.editFlagForValue = false;
            } else {
              this.parameterValueBean = response;
              this.editFlagForValue = true;
            }
            this.showPageSpinner=false;
          });
      }
    }
  }
  showDialogToAdd() {
    this.displayDialog = true;
    this.parameterListBean = new ParameterListBean();
    this.parameterListBean.parameterListStatus = appStatusConfig.activeName;
    this.editFlagForList = false;
  }
  closeDialog() {
    this.displayDialog = false;
  }

  //For Parameter List
  addParameterList() {
    if (this.editFlagForList == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
      if (this.parameterListBean.parameterListValue == undefined || this.parameterListBean.parameterListValue.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "List Value Name can't be blank!" });
      } else if (this.parameterListBean.parameterListCode == undefined || this.parameterListBean.parameterListCode.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "List Value Code can't be blank!" });
      } else if (this.parameterListBean.parameterListSequence == undefined || this.parameterListBean.parameterListSequence.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "List Value Sequence can't be blank!" });
      } else if (this.parameterListBean.parameterListStatus == undefined || this.parameterListBean.parameterListStatus.trim()== '' ) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "List Value Status can't be blank!" });
      } else {
        if (!this.editFlagForList) {
          this.parameterListBean.parameterID = this.applicationparameter;
          this.parameterListBean.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-parameter-list", this.parameterListBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
                this.displayDialog = false;
                this.payloadBean.id = this.parameterService.getter();
                this.httpRestClient.postData("fetch-parameter-list", this.payloadBean).subscribe(
                  response => {
                    this.parameterLists = response;
                  });
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            })
        } else {
          this.parameterListBean.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-parameter-list", this.parameterListBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
                this.displayDialog = false;
                this.editFlagForList = false;
                this.payloadBean.id = this.parameterService.getter();
                this.httpRestClient.postData("fetch-parameter-list", this.payloadBean).subscribe(
                  response => {
                    this.parameterLists = response;
                  });
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            })
        }

      }
    }
  }

  editParameterList(event) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
      this.displayDialog = true;
      if (event.parameterListID != '' || event.parameterListID != undefined || event.parameterListID != null) {
        this.payloadBean.id = event.parameterListID;
        this.httpRestClient.postData("edit-parameter-list", this.payloadBean)
          .subscribe(response => {
            this.parameterListBean = response;
            this.editFlagForList = true;
          })
      }
    }
  }

  listDeleteConfirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      this.msgs = [];
      if (this.selectedParameterList == null || this.selectedParameterList == undefined) {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      } else if (this.selectedParameterList.length != 0) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteParameterList();
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
  deleteParameterList() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedParameterList.parameterListID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedParameterList.transactionCount;
    this.httpRestClient.deleteData("delete-parameter-list", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.parameterLists.indexOf(this.selectedParameterList);
          if (index !== -1) {
            this.parameterLists.splice(index, 1);
          }
          this.selectedParameterList = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }


  //For Parameter Value
  addParameterValue() {
    if (this.editFlagForValue == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
      if (!this.binaryFlag && ( this.parameterValueBean.parameterValue == undefined || this.parameterValueBean.parameterValue.trim() == '' )) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Paramter Value can't be blank!" });
      } else if (this.binaryFlag && (this.parameterValueBean.parameterBinaryValue == undefined || this.parameterValueBean.parameterBinaryValue.trim() == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Binary Value can't be blank!" });
      } else if ((this.parameterValueBean.parameterValueDescription == undefined || this.parameterValueBean.parameterValueDescription.trim() == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Value Desc can't be blank!" });
      } else if ((this.parameterValueBean.parameterValueStatus == undefined || this.parameterValueBean.parameterValueStatus.trim() == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Parameter Value Status can't be blank!" });
      } else {
        if (!this.editFlagForValue) {
          this.parameterValueBean.parameterID = this.applicationparameter;
          this.parameterValueBean.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-parameter-value", this.parameterValueBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                sessionStorage.setItem("successMessage", "AddedSuccess");
                this.router.navigate(['/parameters']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            })
        } else {
          this.parameterValueBean.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-parameter-value", this.parameterValueBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
                this.editFlagForValue = false;
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/parameters']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            })
        }

      }
    }
  }

}