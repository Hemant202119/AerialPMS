import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { User, DeleteRecords, CurrentUser } from '../../../_models/data.model';
import { Applicationparameter } from '../../../_models/applicationparameter';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { appConfig, messageConfig, routeConfig } from '../../../app.config';
import 'rxjs/add/operator/switchMap';
import { Project, Statuses } from '../project';
import { ProjectService } from '../project-services';
import { ParameterListBean } from '../../parameters/parameters';
import * as CryptoJS from 'crypto-js';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';


@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css'],
  providers: [MessageService,ProjectService]
})
export class ManageProjectsComponent implements OnInit {
  showPageSpinner: boolean;
  projectStatus: Statuses[];
  selectedProject: any;
  projectStatusList: ParameterListBean[] = [];
  currentuser: CurrentUser = new CurrentUser();
  user: User = new User();
  projectSearch: Project[];
  cols: any[];
  totalRecords: number;
  msgs: Message[] = [];
  project: Project = new Project();
  deleteRecords: DeleteRecords;
  baseResponse: any;
  deleteArray: any[] = [];
  dateformat: any;

  constructor(private httpRestClient: HttpRestClient, private router: Router,
    public roleRightsGuard: RoleRightsGuard, private route: ActivatedRoute,
     private breadcrumbService: BreadcrumbService, private projectService: ProjectService,
      private confirmationService: ConfirmationService) {
        this.roleRightsGuard.hasAllRoles(routeConfig.viewProjectMenu);
    this.breadcrumbService.setItems([
      { label: 'Aerial' },
      { label: 'Projects', routerLink: ['/projects'] }
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
    this.dateformat = 'dd-MMM-yyyy';
    // this.httpRestClient.getData("project-status/PROJECT_STATUS") .subscribe(
    //   response => {       
    //      this.projectStatus=response;         
    //  }
    // );
    this.httpRestClient.getData("parameter-list/STATUS_LIST_ID").subscribe(
      response => {
        this.projectStatusList = response;
        for (let count = 0; count < this.projectStatusList.length; count++) {
          if (this.projectStatusList[count].parameterListCode == "ALL") {
            this.project.statusListID = this.projectStatusList[count];
            break;
          }
        }
      }
    );
  }
  ngOnInit() {
    this.showPageSpinner = true;
    this.cols = [
      { field: 'customerName', header: 'Customer', class: "table-project-name", id: 'projectID' },
      { field: 'circleName', header: 'Circle' },
      { field: 'projectName', header: 'Project Name' },
      { field: 'categoryName', header: 'Category' },
      { field: 'execModelName', header: 'Exec. Model' },
      { field: 'siteID', header: 'Site ID' },
      { field: 'siteName', header: 'Site Name' },
      { field: 'allocationDate', header: 'Allocation Date', class: "center-align" },
      { field: 'status', header: 'Status', class: "center-align" }
    ];

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.httpRestClient.getData("projects/" + this.currentuser.userID).subscribe(
      response => {
        this.projectSearch = response;
        this.showPageSpinner = false;
      }
    )
  }

  loadProject(event) {
    this.showPageSpinner = true;
    this.httpRestClient.getData("project/" + event.value.parameterListCode + "/" + this.currentuser.userID).subscribe(
      response => {
        this.projectSearch = response;
        this.showPageSpinner = false;
      }
    )
  }

  editProject(projectID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
    var ciphertext = CryptoJS.AES.encrypt(projectID.toString(), appConfig.privateKey);
    this.router.navigate(['/projects/edit-project', ciphertext.toString()]);
    }
  }

  addProject() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
    this.router.navigate(['/projects/add-project']);
    }
  }

  deleteProjects() {
    this.deleteRecords = new DeleteRecords();
    this.deleteRecords.id = this.selectedProject.projectID;
    this.deleteRecords.modifiedBy = this.currentuser.userID;
    this.deleteRecords.transactionCount = this.selectedProject.transactionCount;

    this.httpRestClient.deleteData("delete-project", this.deleteRecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.projectSearch.indexOf(this.selectedProject);
          if (index !== -1) {
            this.projectSearch.splice(index, 1);
          }
          this.selectedProject = null;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )
  }

  confirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
    this.msgs = [];
    if (this.selectedProject == null || this.selectedProject == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    } else if (this.selectedProject.length != 0) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
          this.deleteProjects();
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
