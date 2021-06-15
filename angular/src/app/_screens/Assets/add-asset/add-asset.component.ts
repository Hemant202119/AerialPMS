import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { AssetCategoryBean, SubCategoryBean,  AssetSubCategoryTO, AssetCategoryTO, AssetSubCategoryBean, SubCategoryItemTO, SubCategoryItemBean } from '../assets';
import { CurrentUser, PayloadBean, DeleteRecords } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { appConfig, messageConfig, routeConfig } from '../../../app.config';
import { ParameterService } from '../../parameters/parameter-service';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
  providers: [ParameterService]
})
export class AddAssetComponent implements OnInit {
  assetStatusNames: any[];
  cols: any[];
  cols2: any[];
  msgs: Message[] = [];
  selectedSubCategory: any;
  selectedSubCategoryItem:any;
  displayDialog: boolean;
  categoriesID: boolean = false;
  deleterecords: DeleteRecords = new DeleteRecords();
  addItemsDialogFlag: boolean = false;
  currentuser: CurrentUser = new CurrentUser();
  baseResponse: any;
  categoryStatusNames: any[];
 itemTypeStatus: any[];
  breadLabel: any = 'Add Category';
  subCategoryHeaderDialog='Add Sub Category';
  addSubCatItemHeaderDialog='Add Item';
  assetCategoryBean: AssetCategoryBean = new AssetCategoryBean;
  params: any;
  assetSubCategoryBean: AssetSubCategoryBean = new AssetSubCategoryBean();
  showPageSpinner: boolean;
  subCategoryItemBean: SubCategoryItemBean = new SubCategoryItemBean();
  editFlag: boolean=false;
  editSubFlag: boolean=false;
  editSubItemFlag: boolean=false;
  payloadBean: PayloadBean = new PayloadBean();
  
  assetSubCategoryItemTOList: SubCategoryItemTO[];
  assetSubCategoryTOList: AssetSubCategoryTO[];
  assetCategoryTOList: AssetCategoryTO[];
  addAssetSubCategoryFlag:boolean=false;
  enableFlag:boolean=true;
  constructor(private httpRestClient: HttpRestClient,
    public roleRightsGuard: RoleRightsGuard,
    private parameterService: ParameterService,
    private router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
      
     this.roleRightsGuard.hasAllRoles(routeConfig.assetMenu);

    this.payloadBean.signatureKey = appConfig.privateKey;
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.route.params.subscribe(params => { this.params = params; });
    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/manage-assets']);
      } else {
        this.enableFlag=false;
        this.parameterService.setter(decrypted);
        this.editCategory();
      }
    }

    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Manage Items' },
      { label: this.breadLabel }
    ]);

  }


  ngOnInit() {

    this.itemTypeStatus = [
      { label: 'Consumable', value: 'Consumable' }, { label: 'Non-Consumable', value: 'Non-Consumable' }
    ]
    this.categoryStatusNames = [
      { label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }
    ]
    this.assetStatusNames = [
      { label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }
    ]
    this.assetCategoryBean.categoryStatus='Active';
    this.cols = [
      { field: 'categoryName', header: 'Category Name', class: "table-Category-name",id:'assetSubCategoryID' },
      { field: 'subCategoryName', header: 'Sub Category Name ', class: "table-subCategory-name" },
      { field: 'subCategoryCode', header: 'Sub Category Code', class: "table-subCategory-code" },
      { field: 'subCategoryDescription', header: 'Description', class: "table-desc-type" },
      { field: 'subCategoryStatus', header: 'Status', class: "table-status-type" }
    

    ];
    this.cols2 = [
     
      { field: 'subCategoryName', header: 'Sub Category Name ', class: "table-subCategory-name",id:"assetItemID" },
      { field: 'itemName', header: 'Item Name ', class: "table-item-name" },
      { field: 'itemCode', header: 'Item Code', class: "table-item-code" },
      { field: 'itemType', header: 'Item Type', class: "table-status-type" },
      { field: 'itemUnit', header: 'Item Unit', class: "table-desc-type" },
      { field: 'itemStatus', header: 'Status', class: "table-status-type" }


    ];

  }
  ngAfterViewInit() {            
    const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('category-name');
    focusField.focus();
}

  editCategory() {
    this.showPageSpinner = true;
    this.payloadBean.id = this.parameterService.getter();
   
    this.httpRestClient.postData("edit-category", this.payloadBean)
      .subscribe(response => {
        this.assetCategoryBean = response;
        this.editFlag = true;
        this.breadLabel = 'Edit Category';

        this.breadcrumbService.setItems([
          { label: 'Project Inventory' },
          { label: 'Manage Items' },
          { label: this.breadLabel }
        ]);
        this.showPageSpinner = false;
      });
  }
  showDialogToAdd() {
    this.displayDialog = true;

  }
  closeDialogToAdd() {
    this.displayDialog = false;

  }

  addAssetSubCategoryDialog(){
    this.subCategoryHeaderDialog='Add Sub Category';
    this.addAssetSubCategoryFlag = true;
    this.assetSubCategoryBean=new AssetSubCategoryBean();
    this.assetSubCategoryBean.subCategoryStatus='Active';
    const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('sub-category-name');
    focusField.focus();

    
  }
  closeAssetSubCategoryDialog()
  {
    this.addAssetSubCategoryFlag = false;
    this.assetSubCategoryBean=new AssetSubCategoryBean();
    this.editSubFlag=false;
  }

  addCategory() {
    this.msgs = [];
    if (this.assetCategoryBean.categoryName == undefined || this.assetCategoryBean.categoryName.trim() == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Company Name Can't be Blank!" });

    }
    else if (this.assetCategoryBean.categoryCode == undefined || this.assetCategoryBean.categoryCode.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Category Code Can't be Blank!" })
    }
    else if (this.assetCategoryBean.categoryStatus == undefined || this.assetCategoryBean.categoryStatus.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Category Status Can't be Blank!" })
    }
    else {
      if (!this.editFlag) {
        this.showPageSpinner=true;
        this.assetCategoryBean.createdBy = this.currentuser.userID;
        this.httpRestClient.postData("add-category/", this.assetCategoryBean).subscribe(
          response => {
            this.baseResponse = response;
            this.showPageSpinner=false;
            if (this.baseResponse['code'] == 'ADDED') {
              sessionStorage.setItem("successMessage", "AddedSuccess");
              this.router.navigate(['/manage-assets']);
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
          })
      }
      else{
        this.editFlag=false;
        this.showPageSpinner=true;
        this.assetCategoryBean.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-category", this.assetCategoryBean).subscribe(
            response => {
              this.baseResponse = response;
              this.showPageSpinner=false;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/manage-assets']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
      }
    }
  }
  addSubCategory() {
    this.msgs = [];

    // if (this.assetSubCategoryBean.assetCategoryID == undefined || this.assetSubCategoryBean.assetCategoryID == null) {
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Category Name field can't be blank!" });
    // }
    // else 
    if (this.assetSubCategoryBean.subCategoryName == undefined || this.assetSubCategoryBean.subCategoryName.trim() == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Sub Category Name Can't be Blank!" });

    }
    else if (this.assetSubCategoryBean.subCategoryCode == undefined || this.assetSubCategoryBean.subCategoryCode.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Sub Category Code Can't be Blank!" })
    }
    else if (this.assetSubCategoryBean.subCategoryStatus == undefined || this.assetSubCategoryBean.subCategoryStatus.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Sub Category Status Can't be Blank!" })
    }
    else{
      this.assetSubCategoryBean.assetCategoryID=this.assetCategoryBean;
      if(!this.editSubFlag){
        this.showPageSpinner=true;
      this.assetSubCategoryBean.createdBy = this.currentuser.userID;
     this.httpRestClient.postData("add-sub-category/", this.assetSubCategoryBean).subscribe(
        response => {
          this.baseResponse = response;
          this.showPageSpinner=false;
          if (this.baseResponse['code'] == 'ADDED') {
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
            this.payloadBean.searchParameter="Active";
            this.fetchSubCategoryInfoStatuswise();
            this.closeAssetSubCategoryDialog();
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
          
        })
      }
        else{
          this.showPageSpinner=true;
          this.editSubFlag=false;
          this.assetSubCategoryBean.lastModifiedBy = this.currentuser.userID;
            this.httpRestClient.putData("update-sub-category", this.assetSubCategoryBean).subscribe(
              response => {
                this.baseResponse = response;
                this.showPageSpinner=false;
                if (this.baseResponse['code'] == 'UPDATED') {
                  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
                 this.payloadBean.searchParameter="Active";
                 this.fetchSubCategoryInfoStatuswise();
                 this.closeAssetSubCategoryDialog();
                } else {
                  this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
                }
              }
            )
        }
    }

  }
  addItem() {
    this.msgs = [];
    if (this.subCategoryItemBean.assetSubCategoryID == undefined || this.subCategoryItemBean.assetSubCategoryID == null) {
         this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Sub Category Name field can't be blank!" });
       }
      else  if (this.subCategoryItemBean.itemName == undefined || this.subCategoryItemBean.itemName.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item Name Name Can't be Blank!" })
    }
    else if (this.subCategoryItemBean.itemCode == undefined || this.subCategoryItemBean.itemCode.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item Code Can't be Blank!" })
    }
    else if (this.subCategoryItemBean.itemType == undefined || this.subCategoryItemBean.itemType.trim() == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item Type Can't be Blank!" });

    }
    else if (this.subCategoryItemBean.itemUnit == undefined || this.subCategoryItemBean.itemUnit.trim() == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item Unit Can't be Blank!" });

    }
    else if (this.subCategoryItemBean.itemStatus == undefined || this.subCategoryItemBean.itemStatus.trim() == '') {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Item Status Can't be Blank!" })
    }
    else{
      if(!this.editSubItemFlag){
        this.showPageSpinner=true;
      this.subCategoryItemBean.createdBy = this.currentuser.userID;
     this.httpRestClient.postData("add-sub-category-item/", this.subCategoryItemBean).subscribe(
        response => {
          this.baseResponse = response;
          this.showPageSpinner=false;
          if (this.baseResponse['code'] == 'ADDED') {
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
           this.fetchAllItems();
            this.closeSubCategoryItem();
            
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
          
        })
      }
        else{
          this.showPageSpinner=true;
          this.editSubItemFlag=false;
          this.subCategoryItemBean.lastModifiedBy = this.currentuser.userID;
            this.httpRestClient.putData("update-sub-category-item", this.subCategoryItemBean).subscribe(
              response => {
                this.baseResponse = response;
                this.showPageSpinner=false;
                if (this.baseResponse['code'] == 'UPDATED') {
                  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
                  this.fetchAllItems();
                  this.closeSubCategoryItem();
                } else {
                  this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
                }
              }
            )
        }
    }
  }

  onTabChange(event) {
    if (event.index == 0) {
      this.subCategoryItemBean.assetSubCategoryID=undefined;
      this.changeBreadCrumnService("Category");
    }
    else if (event.index == 1) {
      
      this.subCategoryItemBean.assetSubCategoryID=undefined;
      this.payloadBean.searchParameter="Active";
      this.fetchSubCategoryInfoStatuswise();
      this.changeBreadCrumnService("Sub Category");
      // this.httpRestClient.postData("fetch-categories", this.payloadBean).subscribe(
      //   response => {
      //     this.assetCategoryTOList = response;
      //    }
      // );

    } else if (event.index == 2) {
      this.assetSubCategoryItemTOList=[];
      this.payloadBean.searchParameter="Active";
      this.fetchSubCategoryInfoStatuswise();
      this.fetchAllItems();
      this.changeBreadCrumnService("Items");
    }
  }
  changeBreadCrumnService(msg)
  {
    this.breadcrumbService.setItems([
      { label: 'Project Inventory' },
      { label: 'Manage Items' },
      { label: msg }
    ]);
  }

  fetchSubCategoryInfoStatuswise()
  {
    this.showPageSpinner=true;
    this.payloadBean.id=this.assetCategoryBean.assetCategoryID;
    this.httpRestClient.postData("fetch-sub-categories", this.payloadBean).subscribe(
      response => {
        this.assetSubCategoryTOList = response;
        console.log(response);
        this.showPageSpinner=false;
       }
    );
  }
  searchAssetsSubCategory(event)
  {
    this.payloadBean.searchParameter=event.value;
    this.fetchSubCategoryInfoStatuswise();
  }
  editSubCategory(subCatID){
    this.showPageSpinner=true;
    this.payloadBean.id=subCatID;
    this.httpRestClient.postData("edit-sub-category", this.payloadBean).subscribe(
      response => {
        this.subCategoryHeaderDialog='Edit Sub Category';
        this.assetSubCategoryBean= response;
        this.showPageSpinner=false;
        this.editSubFlag=true;
        this.addAssetSubCategoryFlag = true;
       }
    );
    const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('sub-category-name');
    focusField.focus();
  }
  deleteSubCatgeory() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      if (this.selectedSubCategory == null || this.selectedSubCategory == undefined) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning })
      }
      else {
        this.confirmationService.confirm({
          message: 'Would you like to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteAssetSubCategory();
          },
          reject: () => {

          }
        });
      }
    }
  }
  deleteAssetSubCategory() {

    this.deleterecords.id = this.selectedSubCategory.assetSubCategoryID;
    this.deleterecords.modifiedBy = this.currentuser.userID;
    this.deleterecords.transactionCount = this.selectedSubCategory.transactionCount;
    this.httpRestClient.deleteData("delete-sub-category", this.deleterecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          this.payloadBean.searchParameter="Active";
          this.fetchSubCategoryInfoStatuswise();
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }

      });
  }
  fetchItems()
  { this.showPageSpinner=true;
    this.assetSubCategoryItemTOList=[];
    this.payloadBean.searchParameter="Active";
    this.payloadBean.id=this.subCategoryItemBean.assetSubCategoryID.assetSubCategoryID;
    this.httpRestClient.postData("fetch-sub-category-items", this.payloadBean).subscribe(
      response => {
        this.assetSubCategoryItemTOList = response;
        this.showPageSpinner=false;
       }
    );
  }
  fetchAllItems()
  { this.showPageSpinner=true;
    this.assetSubCategoryItemTOList=[];
    this.payloadBean.searchParameter="Active";
    this.payloadBean.id=this.assetCategoryBean.assetCategoryID;
    this.httpRestClient.postData("fetch-all-sub-category-items", this.payloadBean).subscribe(
      response => {
        this.assetSubCategoryItemTOList = response;
        this.showPageSpinner=false;
       }
    );
  }
  
addSubCategoryItem()
{
  this.addSubCatItemHeaderDialog='Add Item';
  this.addItemsDialogFlag=true;
  this.subCategoryItemBean=new SubCategoryItemBean();
  this.subCategoryItemBean.itemStatus='Active';
  const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('sub-category-name-item');
  focusField.focus();
}
closeSubCategoryItem(){
  
  this.assetSubCategoryItemTOList=[];
  this.addItemsDialogFlag=false;
  this.subCategoryItemBean=new SubCategoryItemBean();
  this.editSubItemFlag=false;
}

editSubCategoryItem(subCatItemID){
  this.showPageSpinner=true;
  this.payloadBean.id=subCatItemID;
  this.httpRestClient.postData("edit-sub-category-item", this.payloadBean).subscribe(
    response => {
      this.addSubCatItemHeaderDialog='Edit Item';
      this.subCategoryItemBean= response;
      this.subCategoryItemBean.assetSubCategoryID.categoryName=this.assetCategoryBean.categoryName;
      this.editSubItemFlag=true;
      this.addItemsDialogFlag = true;
      this.showPageSpinner=false;
     }
  );
  const focusField: HTMLLinkElement = <HTMLLinkElement>document.getElementById('sub-category-name-item');
  focusField.focus();
}
deleteSubCatgeoryItem() {
  if (this.roleRightsGuard.roleRights.deleteAccess) {
    if (this.selectedSubCategoryItem == null || this.selectedSubCategoryItem == undefined) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning })
    }
    else {
      this.confirmationService.confirm({
        message: 'Would you like to delete this record?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
          this.deleteAssetSubCategoryItem();
        },
        reject: () => {

        }
      });
    }
  }
}
deleteAssetSubCategoryItem() {

  this.deleterecords.id = this.selectedSubCategoryItem.assetItemID;
  this.deleterecords.modifiedBy = this.currentuser.userID;
  this.deleterecords.transactionCount = this.selectedSubCategoryItem.transactionCount;
  this.httpRestClient.deleteData("delete-sub-category-item", this.deleterecords).subscribe(
    response => {
      this.baseResponse = response;
      if (this.baseResponse['code'] == 'DELETED') {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
       // this.payloadBean.searchParameter="Active";
        this.fetchItems();
      }
      else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
      }

    });
}
}
