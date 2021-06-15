import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { User, DeleteRecords, CurrentUser, PayloadBean, DropDown } from '../../../_models/data.model';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ApplicationParameter, ApplicationParameterEntityTO } from '../parameters';
import { Statuses } from '../../../_models/applicationparameter';
import { appConfig, messageConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { ParameterService } from '../parameter-service';
import * as CryptoJS from 'crypto-js';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  templateUrl: './manage-parameters.component.html',
  styleUrls: ['./manage-parameters.component.css'],
  providers: [MessageService, ParameterService]

})

export class ManageParameters implements OnInit {
  showPageSpinner:boolean;
  status: SelectItem[];
  appParameterList: ApplicationParameterEntityTO[];
  selectedParameter: any;
  cols: any[];
  totalRecords: number;
  msgs: Message[] = [];
  user: User = new User();
  currentuser: CurrentUser = new CurrentUser();
  parameterStatus: Statuses;
  deleteRecords: DeleteRecords;
  value: boolean;
  baseResponse: any;
  payloadBean: PayloadBean = new PayloadBean();

  constructor(
    private httpRestClient: HttpRestClient,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public roleRightsGuard: RoleRightsGuard,
    private parameterService: ParameterService,
    private confirmationService: ConfirmationService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.parameterMenu);

    this.breadcrumbService.setItems([
      { label: 'Administration' },
      { label: 'Parameters' }
    ]);
    if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");
    }
    if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");
    }

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.payloadBean = new PayloadBean();
    this.payloadBean.signatureKey = appConfig.privateKey;
this.showPageSpinner=true;
    this.httpRestClient.postData("search-parameters", this.payloadBean).subscribe(
      response => {
        this.appParameterList = response;
        this.showPageSpinner=false;
      }
    );

  }
  ngOnInit() {

    //An array of Status
    this.status = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName },
      { label: appStatusConfig.allName, value: appStatusConfig.allName }
    ];
    this.cols = [
      { field: 'parameterName', header: 'Parameter Name', class: "table-parameter-name", id: 'parameterID' },
      { field: 'parameterCode', header: 'Parameter Code', class: "table-parameter-code" },
      { field: 'parameterType', header: 'Parameter Type', class: "table-parameter-type" },
      { field: 'parameterDataType', header: 'Data Type', class: "table-data-type" },
      { field: 'parameterStatus', header: 'Status', class: "table-status-type" }
    ];

  }

  searchParameters(event) {
    this.showPageSpinner=true;
    this.payloadBean.searchParameter = event.value;
    this.httpRestClient.postData("search-parameters-on-criteria", this.payloadBean).subscribe(
      response => {
        this.appParameterList = response;
        this.showPageSpinner=false;
      }
    )
  }

  editParameter(parameterID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
       var ciphertext = CryptoJS.AES.encrypt(parameterID.toString(), appConfig.privateKey);
       this.router.navigate(['/parameters/edit-parameter', ciphertext.toString()]);
    }
  }

  addParameter() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
      this.router.navigate(['/parameters/add-parameter']);
    }
  }

  deleteParameters() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedParameter.parameterID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedParameter.transactionCount;
    this.httpRestClient.deleteData("delete-parameter", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.appParameterList.indexOf(this.selectedParameter);
          if (index !== -1) {
            this.appParameterList.splice(index, 1);
          }
          this.selectedParameter = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }


confirm() {
  if (this.roleRightsGuard.roleRights.deleteAccess) {
    this.msgs = [];
    if (this.selectedParameter == null || this.selectedParameter == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    } else if (this.selectedParameter.length != 0) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
          this.deleteParameters();
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

}


