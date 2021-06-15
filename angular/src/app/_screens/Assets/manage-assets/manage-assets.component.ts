import { Component, OnInit } from '@angular/core';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { messageConfig, appConfig, routeConfig } from '../../../app.config';

import * as CryptoJS from 'crypto-js';
import { CurrentUser, DeleteRecords, PayloadBean } from '../../../_models/data.model';
import { AssetCategoryTO } from '../assets';

@Component({
  selector: 'app-manage-assets',
  templateUrl: './manage-assets.component.html',
  styleUrls: ['./manage-assets.component.css']
})
export class ManageAssetsComponent implements OnInit {
  cols: any[];
  selectedCategory: any;
  showPageSpinner:boolean;
  displayDialog: boolean;
  baseResponse: any;
  finalList: any[] = [];
  accounList: any[] = [];
  msgs: Message[] = [];
  assetCategoryTOList: AssetCategoryTO[];
  deleterecords: DeleteRecords = new DeleteRecords();
  currentuser: CurrentUser = new CurrentUser();

  payloadBean: PayloadBean = new PayloadBean();





  assetStatusNames: any[];
  constructor(
    private httpRestClient: HttpRestClient,
    public roleRightsGuard: RoleRightsGuard,
    private router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
      this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
      this.roleRightsGuard.hasAllRoles(routeConfig.assetMenu);
    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Manage Items' }
    ]);
    this.payloadBean = new PayloadBean();
    this.payloadBean.signatureKey = appConfig.privateKey;
    this.payloadBean.searchParameter='Active';
    this.fetchCategoryInfoStatuswise();

    if(sessionStorage.getItem("successMessage")=='AddedSuccess'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
      sessionStorage.setItem("successMessage", "");

    }
    if(sessionStorage.getItem("successMessage")=='UpdateSuccess'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
      sessionStorage.setItem("successMessage", "");

    }
   
  }

  ngOnInit() {

    this.assetStatusNames = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' }
    ]

    this.cols = [
      { field: 'categoryName', header: 'Category Name ', class: "table-category-name",id: 'assetCategoryID' },
      { field: 'categoryCode', header: 'Category Code', class: "table-category-code" },
      { field: 'categoryDescription', header: 'Description', class: "table-category-desc" },
      { field: 'categoryStatus', header: 'Status', class: "table-status-type" },

    ];

  }

  fetchCategoryInfoStatuswise()
  {
    this.showPageSpinner=true;
    this.httpRestClient.postData("fetch-categories", this.payloadBean).subscribe(
      response => {
        this.assetCategoryTOList = response;
        this.showPageSpinner=false;
       }
    );
  }

  searchAssets(event)
  {
    this.payloadBean.searchParameter=event.value;
    this.fetchCategoryInfoStatuswise();
  }
  deleteCatgeory() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      if (this.selectedCategory == null || this.selectedCategory == undefined) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning })
      }
      else {
        this.confirmationService.confirm({
          message: 'Would you like to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteAssetCategory();
          },
          reject: () => {

          }
        });
      }
    }
  }
  deleteAssetCategory() {

    this.deleterecords.id = this.selectedCategory.assetCategoryID;
    this.deleterecords.modifiedBy = this.currentuser.userID;
    this.deleterecords.transactionCount = this.selectedCategory.transactionCount;
    this.httpRestClient.deleteData("delete-category", this.deleterecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          this.payloadBean.searchParameter='Active';
          this.fetchCategoryInfoStatuswise();
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }

      });
  }

  editCategory(categoryID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
       var ciphertext = CryptoJS.AES.encrypt(categoryID.toString(), appConfig.privateKey);
       this.router.navigate(['manage-assets/edit-assets', ciphertext.toString()]);
    }
  }
}





