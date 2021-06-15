import { Component, OnInit } from '@angular/core';

import { BreadcrumbService } from '../../../breadcrumb.service';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode, MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
// import { Circle, DeleteRecords } from '../roles';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { User, CurrentUser, PayloadBean } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { appConfig, messageConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { roleEntityTO, addRoleEntityTO, RoleBean } from '../role';
import { SiteBean } from '../../sites/sites';
import { RoleService } from '../role-service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { element } from 'protractor';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
  providers: [RoleService]
})
export class AddRoleComponent implements OnInit {

  //For Global
  showPageSpinner:boolean;
  msgs: Message[] = [];
  addbreaditems: MenuItem[]
  currentuser: CurrentUser = new CurrentUser();
  baseResponse: any;
  params: any;
  breadLabel: any = 'Add Parameter';
  payloadBean: PayloadBean = new PayloadBean();

  //For Site
  roleBean: RoleBean = new RoleBean();
  editFlag: boolean;
  roleStatusList: any[];
  selectedRoleRight: any[] = [];
  roleRightsList: any[];
  cols: any[];

  constructor(private httpRestClient: HttpRestClient,
    private roleService: RoleService,
    public roleRightsGuard: RoleRightsGuard,
    private router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.roleMenu);

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.payloadBean = new PayloadBean();
    this.payloadBean.accountId = this.currentuser.accountID;
    this.payloadBean.signatureKey = appConfig.privateKey;


    this.httpRestClient.getData("fetch-menus-for-role-rights")
      .subscribe(response => {
        this.roleRightsList = response;
      });

    this.roleBean.roleStatus = appStatusConfig.activeName;
    this.route.params.subscribe(params => { this.params = params; });

    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/roles']);
      } else {
        this.roleService.setter(decrypted);
        this.editRole();
      }
    }
    this.breadcrumbService.setItems([
      { label: 'Administration' },
      { label: 'Roles', routerLink: ['/roles'] },
      { label: this.breadLabel }
    ]);
  }


  ngOnInit() {
    this.roleStatusList = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName }
    ];



    this.cols = [
      { field: 'menuDesc', header: 'Screen Name', id: 'menuID' },
      { field: 'insertAccess', header: 'Add' },
      { field: 'updateAccess', header: 'Edit' },
      { field: 'deleteAccess', header: 'Delete' },
      { field: 'viewAccess', header: 'View' },
      { field: 'printAccess', header: 'Print' },
      { field: 'exportAccess', header: 'Export' }
    ];
  }

  editRole() {
    this.showPageSpinner=true;
    this.payloadBean.id = this.roleService.getter();
    this.httpRestClient.postData("edit-role", this.payloadBean)
      .subscribe(response => {
        this.roleBean = response;
        this.editFlag = true;
        this.breadLabel = 'Edit Role';
        this.breadcrumbService.setItems([
          { label: 'Administration' },
          { label: 'Roles', routerLink: ['/roles'] },
          { label: this.breadLabel }
        ]);
      
        this.httpRestClient.getData("fetch-role-rights/" + this.roleService.getter())
          .subscribe(response => {
            this.selectedRoleRight = response;
            for (let outerCount = 0; outerCount < this.roleRightsList.length; outerCount++) {
              for (let innerCount = 0; innerCount < this.selectedRoleRight.length; innerCount++) {
                if (this.roleRightsList[outerCount].menuID == this.selectedRoleRight[innerCount].menuID) {
                  let selectAllFlag = false;
                  let checkArrayFlag: boolean[] = [];
                  if (this.roleRightsList[outerCount].insertVisible == 1) {
                    if (this.selectedRoleRight[innerCount].insertAccess) {
                      this.roleRightsList[outerCount].insertAccess = true;
                      checkArrayFlag.push(true);
                    } else {
                      checkArrayFlag.push(false);
                    }
                  } else {
                    this.selectedRoleRight[innerCount].insertAccess = false;
                  }

                  if (this.roleRightsList[outerCount].updateVisible == 1) {
                    if (this.selectedRoleRight[innerCount].updateAccess) {
                      this.roleRightsList[outerCount].updateAccess = true;
                      checkArrayFlag.push(true);
                    } else {
                      checkArrayFlag.push(false);
                    }
                  } else {
                    this.selectedRoleRight[innerCount].updateAccess = false;
                  }

                  if (this.roleRightsList[outerCount].deleteVisible == 1) {
                    if (this.selectedRoleRight[innerCount].deleteAccess) {
                      this.roleRightsList[outerCount].deleteAccess = true;
                      checkArrayFlag.push(true);
                    } else {
                      checkArrayFlag.push(false);
                    }
                  } else {
                    this.selectedRoleRight[innerCount].deleteAccess = false;
                  }

                  if (this.roleRightsList[outerCount].viewVisible == 1) {
                    if (this.selectedRoleRight[innerCount].viewAccess) {
                      this.roleRightsList[outerCount].viewAccess = true;
                      checkArrayFlag.push(true);
                    } else {
                      checkArrayFlag.push(false);
                    }
                  } else {
                    this.selectedRoleRight[innerCount].viewAccess = false;
                  }

                  if (this.roleRightsList[outerCount].printVisible == 1) {
                    if (this.selectedRoleRight[innerCount].printAccess) {
                      this.roleRightsList[outerCount].printAccess = true;
                      checkArrayFlag.push(true);
                    } else {
                      checkArrayFlag.push(false);
                    }
                  } else {
                    this.selectedRoleRight[innerCount].printAccess = false;
                  }

                  if (this.roleRightsList[outerCount].exportVisible == 1) {
                    if (this.selectedRoleRight[innerCount].exportAccess) {
                      this.roleRightsList[outerCount].exportAccess = true;
                      checkArrayFlag.push(true);
                    } else {
                      checkArrayFlag.push(false);
                    }
                  } else {
                    this.selectedRoleRight[innerCount].exportAccess = false;
                  }

                  for (let count = 0; count < checkArrayFlag.length; count++) {
                    if (checkArrayFlag[count] == false) {
                      this.selectedRoleRight[innerCount].selectAll = false;
                      this.roleRightsList[outerCount].selectAll = false;
                      break;
                    } else {
                      this.selectedRoleRight[innerCount].selectAll = true;
                      this.roleRightsList[outerCount].selectAll = true;
                    }
                  }
                }
              }
            }
            this.showPageSpinner=false;
          });

      })
  }


  //For Role  

  addRole() {
    if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
      if (this.roleBean.roleName == undefined || this.roleBean.roleName.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Role Name can't be blank!" });
      } else if (this.roleBean.roleDesc == undefined || this.roleBean.roleDesc.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Role Description can't be blank!" });
      } else if (this.roleBean.roleStatus == undefined || this.roleBean.roleStatus.trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Role Status can't be blank!" });
      } else if (this.selectedRoleRight == undefined || this.selectedRoleRight == null || this.selectedRoleRight.length == 0) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Assign atleast one Role Right to Role" });
      } else {
        if (!this.editFlag) {
          this.roleBean.accountID = this.currentuser.accountID;
          this.roleBean.createdBy = this.currentuser.userID;
          this.roleBean.roleRightList = this.selectedRoleRight;
          this.httpRestClient.postData("add-role", this.roleBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                sessionStorage.setItem("successMessage", "AddedSuccess");
                this.router.navigate(['/roles']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        } else {
          this.roleBean.lastModifiedBy = this.currentuser.userID;
          this.roleBean.roleRightList = this.selectedRoleRight;
          this.httpRestClient.putData("update-role", this.roleBean).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/roles']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        }
      }
    }
  }


  onSelectAll(rowData, selectAll) {
    if (selectAll) {
      if (rowData.viewVisible == 1) {
        rowData.viewAccess = true;
      }
      if (rowData.insertVisible == 1) {
        rowData.insertAccess = true;
      }
      if (rowData.updateVisible == 1) {
        rowData.updateAccess = true;
      }
      if (rowData.deleteVisible == 1) {
        rowData.deleteAccess = true;
      }
      if (rowData.printVisible == 1) {
        rowData.printAccess = true;
      }
      if (rowData.exportVisible == 1) {
        rowData.exportAccess = true;
      }
      this.selectRights(rowData);
    } else {
      this.unSelectRights(rowData);
    }
  }


  accessChangeListener(rowData, anyAccess) {
    if (anyAccess) {
      rowData.viewAccess = true;
      this.selectRights(rowData);
    } else {
      rowData.selectAll = false;
      for (let innerCount = 0; innerCount < this.selectedRoleRight.length; innerCount++) {
        if (this.selectedRoleRight[innerCount].menuID == rowData.menuID) {
          var index = this.selectedRoleRight.indexOf(this.selectedRoleRight[innerCount], 0);
          if (index > -1) {
            this.selectedRoleRight.splice(index, 1);
            this.selectedRoleRight.push(rowData);
            break;
          }
        }
      }
    }
  }

  printExportChangeListener(rowData, anyAccess) {
    if (anyAccess) {
      this.selectRights(rowData);
    } else {
      rowData.selectAll = false;
      for (let innerCount = 0; innerCount < this.selectedRoleRight.length; innerCount++) {
        if (this.selectedRoleRight[innerCount].menuID == rowData.menuID) {
          var index = this.selectedRoleRight.indexOf(this.selectedRoleRight[innerCount], 0);
          if (index > -1) {
            this.selectedRoleRight.splice(index, 1);
            this.selectedRoleRight.push(rowData);
            break;
          }
        }
      }
    }
  }

  viewAccessChangeListener(rowData, viewAccess) {
    if (!viewAccess) {
      rowData.selectAll = false;
      this.unSelectRights(rowData);
    } else {
      rowData.viewAccess = true;
      this.selectRights(rowData);
    }
  }

  selectRights(rowData) {
    if (this.selectedRoleRight.length > 0) {
      let checkPushflag = false;
      for (let innerCount = 0; innerCount < this.selectedRoleRight.length; innerCount++) {
        if (this.selectedRoleRight[innerCount].menuID == rowData.menuID) {
          var index = this.selectedRoleRight.indexOf(this.selectedRoleRight[innerCount], 0);
          if (index > -1) {
            this.selectedRoleRight.splice(index, 1);
            this.selectedRoleRight.push(rowData);
            checkPushflag = false;
            break;
          }
        } else {
          checkPushflag = true;
        }
      }
      if (checkPushflag) {
        this.selectedRoleRight.push(rowData);
      }
    } else {
      this.selectedRoleRight.push(rowData);
    }
  }

  unSelectRights(rowData) {
    if (rowData.viewVisible == 1) {
      rowData.viewAccess = false;
    }
    if (rowData.insertVisible == 1) {
      rowData.insertAccess = false;
    }
    if (rowData.updateVisible == 1) {
      rowData.updateAccess = false;
    }
    if (rowData.deleteVisible == 1) {
      rowData.deleteAccess = false;
    }
    if (rowData.printVisible == 1) {
      rowData.printAccess = false;
    }
    if (rowData.exportVisible == 1) {
      rowData.exportAccess = false;
    }
    for (let innerCount = 0; innerCount < this.selectedRoleRight.length; innerCount++) {
      if (this.selectedRoleRight[innerCount].menuID == rowData.menuID) {
        var index = this.selectedRoleRight.indexOf(this.selectedRoleRight[innerCount], 0);
        if (index > -1) {
          this.selectedRoleRight.splice(index, 1);
          break;
        }
      }
    }
  }

}
