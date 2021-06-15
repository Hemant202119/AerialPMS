import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Router } from '@angular/router';
import { Circle, DeleteRecords, CircleEntityTO } from '../circles';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { User, CurrentUser } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { appConfig, messageConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';


@Component({
  selector: 'app-manage-circles',
  templateUrl: './manage-circles.component.html',
  styleUrls: ['./manage-circles.component.css']
})
export class ManageCirclesComponent implements OnInit {
  //circle:Circle= new Circle();
  circleSearch: CircleEntityTO[];
  showPageSpinner:boolean;
  cols: any[];
  user: User = new User();
  status: any[];
  msgs: Message[] = [];
  selectedCircle: any;
  deleteRecords: DeleteRecords;
  baseResponse: any;
  currentuser: CurrentUser = new CurrentUser();

  constructor(private httpRestClient: HttpRestClient,
    private router: Router, public roleRightsGuard: RoleRightsGuard,
    private breadcrumbService: BreadcrumbService, private confirmationService: ConfirmationService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.circleMenu);

    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.breadcrumbService.setItems([
      { label: 'Manage' },
      { label: 'Circles' }
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
  }

  ngOnInit() {
    this.status = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName },
      { label: appStatusConfig.allName, value: appStatusConfig.allName }
    ];

    this.cols = [
      { field: 'circleName', header: 'Circle Name', id: 'circleID' },
      { field: 'circleStatus', header: 'Circle Status', class: "table-status" }
    ];
    this.showPageSpinner=true;
    this.httpRestClient.getData("search-circle").subscribe(
      response => {
        this.circleSearch = response;
        this.showPageSpinner=false;
      });
  }
  loadCircle(event) {
    this.showPageSpinner=true;
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.httpRestClient.getData("load-circles/" + event.value + "").subscribe(
      response => {
        this.circleSearch = response;
        this.showPageSpinner=false;
      });

  }

  addCircle() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
      this.router.navigate(['/circles/add-circle']);
    }
  }
  editCircle(circleID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
      var ciphertext = CryptoJS.AES.encrypt(circleID.toString(), appConfig.privateKey);
      this.router.navigate(['/circles/edit-circle', ciphertext.toString()]);
    }

  }
  deleteCircle() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedCircle.circleID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedCircle.transactionCount;
    this.httpRestClient.deleteData("delete-circle", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.circleSearch.indexOf(this.selectedCircle);
          if (index !== -1) {
            this.circleSearch.splice(index, 1);
          }
          this.selectedCircle = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }
  confirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      this.msgs = [];
      if (this.selectedCircle == null || this.selectedCircle == undefined) {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      } else if (this.selectedCircle.length != 0) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteCircle();
          },
          reject: () => {

          }
        });
      } else {
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      }
    }
  }

}
