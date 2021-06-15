import { PayloadBean } from './../../../_models/data.model';
import { PurchaseOrdersBean } from './../../PO Approval/POApproval';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { User, AutoLookup, parameterListDropDown, CurrentUser, Contacts, ProjectCategories, ExecutionModelsEntityTO, DrawingTypeEnityTO } from '../../../_models/data.model';
import { Applicationparameter } from '../../../_models/applicationparameter';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Project, Statuses, ProjectStatus, CustomerPOs, InvoiceDetails, InvoiceDetailsTO, ContractorPOs, SupplierPOs, PaymentDetails, FRDetails, FRDetailsTO, PaymentDetailsTO, DrawingItems, BOQBean } from '../project';
import { ProjectService } from '../project-services';
import { DateFormatPipe } from '../../../_core/date-format';
import { appConfig, Constants, messageConfig, routeConfig } from '../../../app.config';
import * as CryptoJS from 'crypto-js';
import { Circle } from '../../circles/circles';
import { ParameterValueTO } from '../../parameters/parameters';
import { element } from 'protractor';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
import { AUTOCOMPLETE_VALUE_ACCESSOR } from 'primeng/primeng';
import { WSAEHOSTUNREACH } from 'constants';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [MessageService, ProjectService, DateFormatPipe]
})
export class AddProjectComponent implements OnInit {
  // Global variables  
  showPageSpinner: boolean;
  showSpinner: boolean;
  user: User = new User();
  addresponse: Boolean = false;
  baseResponse: any;
  params: any;
  breadLabel: any = 'Add Project';
  dateFormat: any;
  totalRecords: number;
  activeTabIndex: number = 0;
  validateNumber: RegExp = /[0-9]$/;
  currentuser: CurrentUser = new CurrentUser();
  msgs: Message[] = [];
  dialogmsgs: Message[] = [];
  dialogHeader: any;
  // Edit Project Tab 
  editFlag: boolean;
  cols: any[];
  filteredBrands: any[];
  siteTypeListv: any[];
  statusValueList: any[];
  activityTypeList: any[];
  contactAutoLookupList: Contacts[] = [];
  circleAutoLookupList: Circle[] = [];
  projectCategoryAutoLookupList: ProjectCategories[] = [];
  executionModelAutoLookupList: ExecutionModelsEntityTO[] = [];
  drawingtypeAutoLookupList: DrawingTypeEnityTO[] = [];
  filteredContactsSingle: any[];
  filteredCirclesSingle: any[];
  filteredProjectCategoriesSingle: any[];
  filteredExecutionModelsSingle: any[];
  filteredDrawingTypesSingle: any[];
  matchResult: boolean = false;
  project: Project = new Project();
  projectbean: Project = new Project();
  contactbean: Contacts = new Contacts();
  oneTimeClick = false;
  // Project Status tab
  displayProjectStatusDialog: boolean;
  projectStatusDialogHeader: any;
  projectStatuses: ProjectStatus = new ProjectStatus();
  projectStatusesSearch: ProjectStatus[];
  CustomerName: string;
  // Customer POs  tab And Add Invoice
  poDialogHeader: any;
  invoiceDialogHeader: any;
  maxEditTotalAmount: any;
  totalInvoiceAmount: any;
  pendingInvoiceAmount: any;
  poheader: any;
  selectedPOs: any;
  poFlag: boolean;
  CustomerPOsEditFlag: boolean = false;
  InvoiceEditFlag: boolean;
  displayPODialog: boolean;
  displayAddInvoiceDialog: boolean;
  customerPOs: CustomerPOs = new CustomerPOs();
  customerpocols: any[] = [];
  customerPOsearch: CustomerPOs[];
  invoiceSearch: InvoiceDetailsTO[];
  invoiceDetails: InvoiceDetails = new InvoiceDetails();
  invoicecols: any[];
  customerPOsBean: CustomerPOs = new CustomerPOs();
  activityLabel: String;

  // Contractor PO Tab
  contractorPOFlag: boolean;
  contractorPoInvoiceDialogHeader: any;
  filteredContractorSingle: any[];
  contractorpocols: any[] = [];
  contractorPOsearch: ContractorPOs[];
  contractorPOs: ContractorPOs = new ContractorPOs();
  conPoDialogHeader: any;
  displayConPODialog: boolean;
  ContractorPOsEditFlag: boolean = false;
  contractorAutoLookupList: any[] = [];
  selectedContractorPOs: any;
  displayContractorPOAddInvoiceDialog: boolean;
  contractorPOsBean: ContractorPOs = new ContractorPOs();
  addedContractorInvoice: any;
  //FR Invoice
  frInvoiceDialogHeader: any;
  FrEditFlag: boolean;
  frDetails: FRDetails = new FRDetails();
  totalFrAmount: any;
  pendingFrAmount: any;
  displayFrDialog: boolean;
  frcols: any[];
  frSearch: FRDetailsTO[];
  purcahseOrderId: any;
  parameterValueTO: ParameterValueTO = new ParameterValueTO();


  //Payment Invoice
  paymentcols: any[];
  paymentInvoiceDialogHeader: any;
  paymentEditFlag: boolean;
  paymentDetails: PaymentDetails = new PaymentDetails();
  displayPaymentDialog: boolean;
  paymentSearch: PaymentDetailsTO[];
  totalPaymentAmount: any;
  pendingPaymentAmount: any;
  addedPaymentAmount: any;
  paymentTypeList: any[];


  //Supplier PO  
  drawingItems: DrawingItems = new DrawingItems();
  supplierPOSearch: SupplierPOs[];
  supplierPOsEditFlag: boolean = false;
  displaySupplierPODialog: boolean = false;
  supplierPos: SupplierPOs = new SupplierPOs();
  supplierpocolsOne: any[] = [];
  supplierpocolsTwo: any[] = [];
  filteredSupplierSingle: any[];
  supplierAutoLookupList: SupplierPOs[] = [];
  supplierDrawingItems: DrawingItems[] = [];
  supplieractivityTypeList: any[];
  selectedSupplierPOs: any;
  selectedSupplierdrawings: any[] = [];
  editSupplierFlag = true;
  addedSupplierInvoice: any;
  displaySupplierPOAddInvoiceDialog: boolean;
  displaySupplierPaymentDialog: boolean;
  displaySupplierFRDialog: boolean;


  // BOQ Variables
  boqCols: any[] = [];
  boqcolsTwo: any[] = [];
  boqBeanObject: BOQBean = new BOQBean();
  boqtableSearch: BOQBean[];
  displayProjectBOQDialog = false;
  boqEditFlag: boolean = false;
  boqDrawingItems: DrawingItems[] = [];
  selectedboqDrawingItems: any[] = [];

  //for v2.2
  filteredActivity: any[];
  supplierActivity: any[];
  CancleDialog: boolean;
  poStatus: any[];
  CancleDialog2: boolean;
  purchaseOrdersBean: PurchaseOrdersBean = new PurchaseOrdersBean;
  paymentTypeMailList: any[];
  emailRecipients: any[] = [];
  payloadBean: PayloadBean = new PayloadBean();
  reminderFlag: boolean;
  poID: String;
  reminderFlag1: boolean;
  tabFlag1: boolean;
  tabFlag2: boolean;
  tabFlag3: boolean;
  tabFlag4: boolean;
  boqTotalAmount: any;
  totalPaidAmount:any=0;
  constructor(
    private httpRestClient: HttpRestClient,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private projectService: ProjectService, public roleRightsGuard: RoleRightsGuard,
    private dateFormatPipe: DateFormatPipe) {
    this.roleRightsGuard.hasAllRoles(routeConfig.addProjectMenu);
    this.breadcrumbService.setItems([
      { label: 'Aerial' },
      { label: 'Projects', routerLink: ['/projects'] },
      { label: 'Add Project', routerLink: ['/projects/add-project'] }
    ]);

    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));

    this.httpRestClient.getData("contact-autolookup/" + this.currentuser.userID).subscribe(
      response => { this.contactAutoLookupList = response; });

    this.httpRestClient.getData("category-autolookup").subscribe(
      response => { this.projectCategoryAutoLookupList = response; });

    this.httpRestClient.getData("execution-model-autolookup").subscribe(
      response => { this.executionModelAutoLookupList = response; });

    this.httpRestClient.getData("parameter-list/SITE_TYPE_LIST_ID").subscribe(
      response => {
        this.siteTypeListv = response;
      });

    this.httpRestClient.getData("parameter-list/STATUS_LIST_ID").subscribe(
      response => {
        this.statusValueList = response;
        for (let count = 0; count < this.statusValueList.length; count++) {
          if (this.statusValueList[count].parameterListCode == "NEW") {
            this.project.statusListID = this.statusValueList[count];
            break;
          }
        }

      });

    this.route.params.subscribe(params => { this.params = params; });

    if (this.params['id'] != null || this.params['id'] != undefined) {
      this.showPageSpinner = true;
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/projects']);
      } else {
        this.httpRestClient.getData("editProject/" + decrypted + "")
          .subscribe(response => {
            this.project = response;
            this.dialogHeader = this.project.contactID.businessName + " (" + this.project.siteName + "-" + this.project.siteID + ") " + this.project.categoryID.categoryName;
            this.project.allocationDate = new Date(this.project.allocationDate);
            if (this.project.completionDate != null && this.project.completionDate != undefined)
              this.project.completionDate = new Date(this.project.completionDate);
            else {
              this.project.completionDate = null;
            }

            if (this.project.contactID.entityType == 'Individual') {
              this.project.contactID.businessName = this.project.contactID.firstName + ' ' + this.project.contactID.lastName;
            }
            this.project.statusDate = new Date(this.project.statusDate);
            this.editFlag = true;
            this.breadLabel = 'Edit Project';
            this.breadcrumbService.setItems([
              { label: 'Aerial' },
              { label: 'Projects', routerLink: ['/projects'] },
              { label: this.breadLabel }
            ]);
            this.showPageSpinner = false;
          });
        this.cols = [
          { field: 'statusDate', header: 'Status Date', class: "status-date", id: 'projectStatusID' },
          { field: 'statusName', header: 'Project Status', class: "status-name" },
          { field: 'notes', header: 'Notes', class: "status-note" }
        ];
        this.projectService.setter(decrypted);
        //                       

      }
    }

    this.editFlag = false;
    this.breadcrumbService.setItems([
      { label: 'Aerial' },
      { label: 'Projects', routerLink: ['/projects'] },
      { label: this.breadLabel }
    ]);
  }

  ngOnInit() {



    this.dateFormat = Constants.DATE_FMT_TS;
    this.displayAddInvoiceDialog = false;
    this.displayContractorPOAddInvoiceDialog = false;
    this.invoicecols = [
      { field: 'invoiceNo', header: 'Invoice No', id: 'idID' },
      { field: 'invoiceDate', header: 'Invoice Date', class: "center-align" },
      { field: 'invoiceAmount', header: 'Invoice Amount', class: "center-align" },
      { field: 'gst', header: 'GST Amount', class: "center-align" },
      { field: 'totalAmount', header: 'Total Amount', class: "center-align" }
    ];
    this.frcols = [
      { field: 'frAmount', header: 'FR Amount', class: "left-align", id: 'frID' },
      // { field: 'emailAddresses', header: 'Email Addresses' ,class:'center-align'},
      { field: 'frDate', header: 'FR Date', class: "center-align" },
      { field: 'notes', header: 'Notes', class: "center-align" },
      // { field: 'totalAmount', header: 'Total Amount' ,class:"center-align"} 
    ];
    this.paymentcols = [
      { field: 'paymentAmount', header: 'Paid Amount', class: "left-align", id: 'pdID' },
      { field: 'paymentDate', header: 'Payment Date', class: "center-align" },
      { field: 'notes', header: 'Notes', class: "center-align" },
    ];

    this.tabData();
  }

  circlesOfParticularCustomer(event) {

    this.httpRestClient.getData("circle-autolookup/" + event.contactID + "/" + this.currentuser.userID).subscribe(
      response => { this.circleAutoLookupList = response; });
  }
  // Edit Project Tab Functions
  drawingTypeValues(value) {
    this.project.drawingTypeID = null;
    this.httpRestClient.getData("drawing-type-autolookup/" + value.execModelID).subscribe(
      response => { this.drawingtypeAutoLookupList = response; });
  }
  filterContactSingle(event) {
    let query = event.query;
    this.filteredContactsSingle = this.filterDataForCustomer(query, this.contactAutoLookupList);
  };

  filterCircleSingle(event) {
    let query = event.query;
    this.filteredCirclesSingle = this.filterDataForCircle(query, this.circleAutoLookupList);
  };
  filterProjectCategorySingle(event) {
    let query = event.query;
    this.filteredProjectCategoriesSingle = this.filterDataForProjectCategory(query, this.projectCategoryAutoLookupList);
  };
  filterExecutionModelSingle(event) {
    let query = event.query;
    this.filteredExecutionModelsSingle = this.filterDataForExecutionModel(query, this.executionModelAutoLookupList);
  };
  filterDrawingTypeSingle(event) {
    let query = event.query;
    this.filteredDrawingTypesSingle = this.filterDataForDrawingType(query, this.drawingtypeAutoLookupList);
  };

  filterContractorTypeSingle(event) {
    let query = event.query;
    this.filteredContractorSingle = this.filterDataForContractor(query, this.contractorAutoLookupList);
  };


  filterDataForContractor(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.businessName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }
  filterDataForCustomer(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.businessName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }
  filterDataForCircle(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.circleName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }
  filterDataForProjectCategory(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.categoryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }
  filterDataForExecutionModel(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.execModelName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }
  filterDataForDrawingType(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.drawingTypeName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }


  addProjectData() {
    if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      this.msgs = [];
      if ((this.project.contactID == '' || this.project.contactID == undefined)) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Customer Name can't be blank!" });
      }
      else if ((this.project.circleID == '' || this.project.circleID == undefined)) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Circle Name can't be blank!" });
      }
      // else if ((this.project.projectName == undefined || this.project.projectName.trim() == '')) {
      //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Project Name can't be blank!" });
      // }
      else if ((this.project.categoryID == undefined || this.project.categoryID == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Project Category Name can't be blank!" });
      } else if ((this.project.execModelID == undefined || this.project.execModelID == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Execution Model Name can't be blank!" });
      } else if ((this.project.drawingTypeID == undefined || this.project.drawingTypeID == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Drawing type can't be blank!" });

      } else if ((this.project.siteID == undefined || this.project.siteID.trim() == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Id can't be blank!" });
      }
      else if ((this.project.siteName == undefined || this.project.siteName.trim() == '')) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Name can't be blank!" });
      } else if (this.project.allocationDate == undefined || this.project.allocationDate == null) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Allocation Date can't be blank!" });
      }
      else if ((this.project.statusDate == undefined || this.project.statusDate == null)) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Current Status Date  can't be blank!" });
      }
      else if (!(this.project.allocationDate == undefined || this.project.allocationDate == null
        || this.project.completionDate == undefined || this.project.completionDate == null)
        && (new Date(this.project.allocationDate) > (new Date(this.project.completionDate)))) {
        this.project.completionDate = null;
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Allocation Date can't be greater than Completion Date!" });
      }
      else if ((this.project.statusListID == null || this.project.statusListID == undefined)) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Current Status can't be blank!" });
      } else if ((this.project.siteTypeListID == null || this.project.siteTypeListID == undefined)) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Type can't be blank!" });
      } else {
        this.project.projectName = this.project.siteName;
        if (!this.editFlag) {
          this.project.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-project/", this.project).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                sessionStorage.setItem("successMessage", "AddedSuccess");
                this.router.navigate(['./projects']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            });
        } else {

          this.project.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-project/", this.project).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/projects']);
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        }
      }
    }
  }
  setCurrentDateValue() {
    this.project.statusDate = this.project.allocationDate;
  }

  // Tab Change Events 
  onTabChange(event: any) {
    this.activeTabIndex = event.index;
    this.msgs = [];
    if (this.activeTabIndex == 0) {
      this.showPageSpinner = true;
      this.httpRestClient.getData("editProject/" + this.projectService.getter() + "")
        .subscribe(response => {
          this.project = response;
          this.project.allocationDate = new Date(this.project.allocationDate);
          if (this.project.completionDate != null && this.project.completionDate != undefined)
            this.project.completionDate = new Date(this.project.completionDate);
          else {
            this.project.completionDate = null;
          }
          this.project.statusDate = new Date(this.project.statusDate);
          this.editFlag = true;
          this.showPageSpinner = false;
        });
    }
    else if (this.activeTabIndex == 1) {
      this.showPageSpinner = true;
      this.boqCols = [
        { field: 'boqdate', header: 'Date', class: 'status-date', id: 'boqID' },
        { field: 'totalBoqAmount', header: 'BOQ Total Amount', class: 'status-name' },
        { field: 'userId', header: 'User', class: 'status-name' },
        { field: 'notes', header: 'Notes', class: 'status-note' }
      ];
      this.httpRestClient.getData("fetch-boq-info/" + this.projectService.getter() + "").subscribe(
        response => {
          this.boqtableSearch = response;


          if (this.boqtableSearch.length > 0) {
            this.boqBeanObject.grandTotalOfBOQ = this.boqtableSearch[this.boqtableSearch.length - 1].grandTotalOfBOQ;
          }
          else {
            this.boqBeanObject.grandTotalOfBOQ = 0;
          }
          this.showPageSpinner = false;
        });

    }
    else if (this.activeTabIndex == 2) {
      this.showPageSpinner = true;
      this.projectStatusDialogHeader = "Add Project Status";
      this.httpRestClient.getData("project-statuses/" + this.projectService.getter() + "").subscribe(
        response => {
          this.projectStatusesSearch = response;
          this.showPageSpinner = false;
        });
    }


    else if (this.activeTabIndex == 3) {

      this.poFlag = true;
      this.showPageSpinner = true;
      this.poDialogHeader = "Add Customer  PO";

      this.httpRestClient.getData("parameter-list/ACTIVITY_TYPES").subscribe(
        response => {
          this.activityTypeList = response;
        });
      this.customerpocols = [
        { field: 'poNo', header: 'PO No.', id: 'poID' },
        { field: 'poDate', header: 'PO Date', class: "center-align" },
        { field: 'activityType', header: 'Activity Type', class: "center-align" },
        { field: 'basicAmount', header: 'PO Amount', class: "center-align" },
        { field: 'taxAmount', header: 'GST Amount', class: "center-align" },
        { field: 'totalAmount', header: 'Total Amount', class: "center-align" },
        // { field: 'poStatus', header: 'PO Status'},
        { field: 'invoiceStatus', header: 'Invoice Status' }
      ];

      this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Customer").subscribe(
        response => {
          this.customerPOsearch = response;
          this.showPageSpinner = false;
        });


    }
    else if (this.activeTabIndex == 4) {
      this.showPageSpinner = true;
      this.forBOQAmountCheck();
      this.contractorPOFlag = true;
      this.poDialogHeader = "Add Contractor  PO";

      this.httpRestClient.getData("parameter-list/ACTIVITY_TYPES").subscribe(
        response => {
          this.activityTypeList = response;

        })
      this.contractorpocols = [
        { field: 'businessName', header: 'Contractor Name.', id: 'poID' },
        { field: 'boqItemName', header: 'BOQ Item', class: "center-align" },
        { field: 'poDate', header: 'PO Date', class: "center-align" },
        { field: 'poNo', header: 'PO No.', id: 'poID' },
        { field: 'basicAmount', header: 'PO Amount', class: "center-align" },
        { field: 'taxAmount', header: 'GST', class: "center-align" },
        { field: 'totalAmount', header: 'Total Amount', class: "center-align" },
        { field: 'poStatus', header: 'PO Status', poStatus: 'poStatus' },
        { field: 'frStatus', header: 'FR Status', class: "center-align" },
        { field: 'paymentStatus', header: 'Payment Status', class: "center-align" },
        { field: 'paymentStatus', header: 'Cancel Status', class: "center-align" },
        { field: 'invoiceStatus', header: 'Invoice Status', class: "center-align" },
        { field: '', header: 'Mail Reminder', class: "center-align" },
      ];

      this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
        response => {
          this.contractorPOsearch = response;
          this.showPageSpinner = false;
        });

      this.httpRestClient.getData("supplier-autoLookUp/Contractor").subscribe(
        response => { this.contractorAutoLookupList = response; });
    }
    //Supplier Code 
    else if (this.activeTabIndex == 5) {
      this.showPageSpinner = true;
      this.forBOQAmountCheck();
      this.callingApisForSupplierPo();
      this.supplierpocolsOne = [
        { field: 'businessName', header: 'Supplier Name', id: 'poID' },
        { field: 'boqItemName', header: 'BOQ Item', class: "center-align" },
        { field: 'poDate', header: 'PO Date', class: "center-align" },
        { field: 'poNo', header: 'PO No.' },
        { field: 'basicAmount', header: 'Basic Amount' },
        { field: 'taxAmount', header: 'GST' },
        { field: 'totalAmount', header: 'Total Amount' },
        { field: 'poStatus', header: 'PO Status', class: "center-align" },
        { field: 'frStatus', header: 'FR Status', class: "center-align" },
        { field: 'paymentStatus', header: 'Payment Status', class: "center-align" },
        { field: 'paymentStatus', header: 'Cancel Status', class: "center-align" },
        { field: 'invoiceStatus', header: 'Invoice Status', class: "center-align" },
        { field: '', header: 'Mail Reminder', class: "center-align" },

      ];
      // this.supplierpocolsTwo = [
      //   { field: 'itemName', header: 'Item', id: 'itemID' },
      //   { field: 'itemUnit', header: 'Unit' },
      //   { field: 'itemQty', header: 'Qty' },
      //   { field: 'qtyApprovedforProcurement', header: 'Qty Appd' },
      //   { field: 'newProcurementQty', header: 'New Qty' },
      //   { field: 'budgetAmount', header: 'Amount' },
      //   { field: 'alreadySpent', header: 'Last Amt' },
      //   { field: 'itemUnitRate', header: 'Last Rate', class: "center-align" },
      //   { field: 'currentUnitRate', header: 'Curr Rate' },
      //   { field: 'currentUnitGST', header: 'Curr GST', class: "center-align" },
      //   { field: 'amount', header: 'Amount', class: "center-align" }
      // ];
      this.supplierpocolsTwo = [
        { field: 'itemName', header: 'Item', id: 'itemID' },
        { field: 'itemUnit', header: 'Unit' },
        { field: 'itemQty', header: 'BOQ Qty' },
        { field: 'budgetAmount', header: 'BOQ Amt' },
        { field: 'qtyApprovedforProcurement', header: ' Ord Qty' },
        { field: 'alreadySpent', header: 'Ord Amt' },
        { field: 'itemUnitRate', header: 'Last Rate', class: "center-align" },
        { field: 'newProcurementQty', header: 'New Qty', value: "NewQtyFieldValue" },
        { field: 'currentUnitRate', header: ' New Rate' },
        { field: 'currentUnitGST', header: 'New GST', class: "center-align" },
        { field: 'amount', header: 'New Amt', class: "center-align" }
      ];
    }

  }


  // Dialog Box Close & Open 

  showDialogToAdd() {
    this.projectStatuses = new ProjectStatus();
    this.projectStatuses.statusDate = new Date();
    this.displayProjectStatusDialog = true;
  }

  showPODialog() {
    this.customerPOs = new CustomerPOs();
    this.customerPOs.poDate = new Date();
    this.displayPODialog = true;
    this.poDialogHeader = "Add Customer PO";
    this.CustomerPOsEditFlag = false;
  }


  closeDialog() {
    this.projectStatuses = new ProjectStatus();
    this.displayProjectStatusDialog = false;
    this.displayPODialog = false;
    this.displayAddInvoiceDialog = false;
    this.displayConPODialog = false;
    this.ContractorPOsEditFlag = false;
    this.CustomerPOsEditFlag = false;
    this.displaySupplierPODialog = false;
    this.displayProjectBOQDialog = false;
  }
  showContractorPODialog() {
    this.ContractorPOsEditFlag = false;
    this.contractorPOs = new ContractorPOs();
    this.contractorPOs.poDate = new Date();
    this.displayConPODialog = true;
    this.conPoDialogHeader = "Add Contractor PO";
  }

  //  Project Status Tab 

  addProjectStatus() {
    this.msgs = [];
    if (this.projectStatuses.statusDate == null || this.projectStatuses.statusDate == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Status Date can't be blank!" });
    }
    else if (this.projectStatuses.statusListID == null || this.projectStatuses.statusListID == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Status can't be blank!" });
    }
    else if (this.projectStatuses.statusListID.parameterListValue.toLowerCase().localeCompare(this.project.statusListID.parameterListValue.toLowerCase()) == 0) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Status can't be same as Current Status" });
    }
    else {
      this.projectbean.projectID = this.projectService.getter();
      this.projectStatuses.projectID = this.projectbean;
      this.projectStatuses.createdBy = this.currentuser.userID;
      this.httpRestClient.postData("add-project-status/", this.projectStatuses).subscribe(
        response => {
          this.baseResponse = response;
          if (this.baseResponse['code'] == 'ADDED') {
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
            this.displayProjectStatusDialog = false;
            this.httpRestClient.getData("project-statuses/" + this.projectService.getter() + "").subscribe(
              response => {
                this.projectStatusesSearch = response;
              });
            this.httpRestClient.getData("editProject/" + this.projectService.getter() + "")
              .subscribe(response => {
                this.project = response;
                this.project.allocationDate = new Date(this.project.allocationDate);
                if (this.project.completionDate != null && this.project.completionDate != undefined)
                  this.project.completionDate = new Date(this.project.completionDate);
                else {
                  this.project.completionDate = null;
                }
                this.project.statusDate = new Date(this.project.statusDate);
                this.editFlag = true;
              });
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
        })

    }
  }
  //  Customer POs Tab 

  AddPOs() {
    this.msgs = [];

    if (this.customerPOs.poDate == undefined || this.customerPOs.poDate == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Date can't be blank!" });
    }
    else if (this.customerPOs.poNo == undefined || this.customerPOs.poNo.trim() == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO No. can't be blank!" });
    }
    else if (this.customerPOs.basicAmount == undefined || this.customerPOs.basicAmount == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Amount can't be blank" });
    }
    else if ((this.customerPOs.taxAmount == undefined || this.customerPOs.taxAmount.length == 0)) {

      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount  can't be blank" });
    }
    else if (this.customerPOs.totalAmount == undefined || this.customerPOs.totalAmount == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Total Amount can't be blank" });
    }
    else if (this.customerPOs.activityTypeListID == null || this.customerPOs.activityTypeListID == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Activity Type can't be blank" });
    }
    else {
      this.projectbean.projectID = this.projectService.getter();
      this.contactbean.contactID = this.project.contactID.contactID;
      this.customerPOs.projectID = this.projectbean;
      this.customerPOs.contactID = this.contactbean;
      this.customerPOs.poStatus = 'Approved';
      if (!this.CustomerPOsEditFlag) {
        this.customerPOs.invoiceStatus = 'None';
        this.httpRestClient.postData("add-customer-po/", this.customerPOs).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.displayPODialog = false;
              this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Customer").subscribe(
                response => {
                  this.customerPOsearch = response;
                });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
          })
      } else {
        this.httpRestClient.putData("update-customer-po/", this.customerPOs).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.displayPODialog = false;
              this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Customer").subscribe(
                response => {
                  this.customerPOsearch = response;
                });
              this.CustomerPOsEditFlag = false;
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
          }
        )
      }
    }
  }

  preparePOsTotal() {

    if (this.customerPOs.basicAmount != null && this.customerPOs.basicAmount != undefined && this.customerPOs.basicAmount != '' && this.customerPOs.taxAmount != null && this.customerPOs.taxAmount != undefined && this.customerPOs.taxAmount != '') {
      this.customerPOs.totalAmount = parseInt(this.customerPOs.basicAmount) + parseInt(this.customerPOs.taxAmount);
    }
    else if (this.customerPOs.basicAmount != null && this.customerPOs.basicAmount != undefined && this.customerPOs.basicAmount != '') {
      this.customerPOs.totalAmount = parseInt(this.customerPOs.basicAmount);
    }
    else if (this.customerPOs.taxAmount != null && this.customerPOs.taxAmount != undefined && this.customerPOs.taxAmount != '') {
      this.customerPOs.totalAmount = parseInt(this.customerPOs.taxAmount);
    }
    else { this.customerPOs.totalAmount = '' }

    //Contractor Po's total
    if (this.contractorPOs.basicAmount != null && this.contractorPOs.basicAmount != undefined && this.contractorPOs.basicAmount != '' && this.contractorPOs.taxAmount != null && this.contractorPOs.taxAmount != undefined && this.contractorPOs.taxAmount != '') {
      this.contractorPOs.totalAmount = parseInt(this.contractorPOs.basicAmount) + parseInt(this.contractorPOs.taxAmount);
    }
    else if (this.contractorPOs.basicAmount != null && this.contractorPOs.basicAmount != undefined && this.contractorPOs.basicAmount != '') {
      this.contractorPOs.totalAmount = parseInt(this.contractorPOs.basicAmount);
    }
    else if (this.contractorPOs.taxAmount != null && this.contractorPOs.taxAmount != undefined && this.contractorPOs.taxAmount != '') {
      this.contractorPOs.totalAmount = parseInt(this.contractorPOs.taxAmount);
    }
    else { this.contractorPOs.totalAmount = '' }

  }

  editCustomerPO(poID) {
    this.showPageSpinner = true;
    this.CustomerPOsEditFlag = true;
    this.poDialogHeader = "Edit Customer PO ";
    this.httpRestClient.getData("edit-customer-po/" + poID + "")
      .subscribe(response => {
        this.customerPOs = response;
        this.customerPOs.poDate = new Date(this.customerPOs.poDate);
        this.showPageSpinner = false;
      });
    this.displayPODialog = true;
  }
  //Edit ContractorPO

  editContractorPO(poID) {
    this.showPageSpinner = true;
    this.ContractorPOsEditFlag = true;
    this.conPoDialogHeader = "Edit Contractor PO ";
    this.httpRestClient.getData("edit-contractor-po/" + poID + "")
      .subscribe(response => {
        this.contractorPOs = response;
        this.contractorPOs.poDate = new Date(this.contractorPOs.poDate);
        this.showPageSpinner = false;
        if (this.contractorPOs.contactID.entityType == 'Individual') {
          this.contractorPOs.contactID.businessName = this.contractorPOs.contactID.firstName + ' ' + this.contractorPOs.contactID.lastName;
        }
      });
    this.displayConPODialog = true;
  }



  // Add Invoice Functions
  showAddInvoiceDialog(event, event1) {
    this.showPageSpinner = true;
    this.oneTimeClick = true;
    this.selectedPOs = event;
    this.invoiceDialogHeader = "Add PO Invoice";
    this.InvoiceEditFlag = false;
    this.invoiceDetails = new InvoiceDetails();
    this.invoiceDetails.invoiceDate = new Date();
    this.msgs = [];
    this.totalInvoiceAmount = 0;
    this.pendingInvoiceAmount = 0;
    this.purcahseOrderId = this.selectedPOs.poID;
    if (this.selectedPOs == null || this.selectedPOs == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    } else if (this.selectedPOs.length != 0) {
      this.httpRestClient.getData("edit-customer-po/" + this.selectedPOs.poID + "")
        .subscribe(response => {
          this.customerPOs = response;
          this.customerPOs.poDate = new Date(this.customerPOs.poDate);
          this.activityLabel = this.customerPOs.activityTypeListID.parameterListValue;

          this.httpRestClient.getData("invoice-details/" + this.selectedPOs.poID + "")
            .subscribe(response => {
              this.invoiceSearch = response;
              response.forEach((element) => {
                this.totalInvoiceAmount = this.totalInvoiceAmount + element.totalAmount;
              });
              this.pendingInvoiceAmount = this.customerPOs.totalAmount - this.totalInvoiceAmount;
              this.displayAddInvoiceDialog = true;
              this.showPageSpinner = false;
            });
          setTimeout(() => {
            this.oneTimeClick = false;
          }, 100);


        });
    } else {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      this.oneTimeClick = false;
    }


  }


  AddInvoice() {
    if (this.pendingInvoiceAmount != 0) {
      this.dialogmsgs = [];
      this.customerPOsBean.poID = this.selectedPOs.poID;
      this.invoiceDetails.poID = this.customerPOsBean;
      this.invoiceDetails.createdBy = this.currentuser.userID;
      if ((this.invoiceDetails.invoiceDate == null || this.invoiceDetails.invoiceDate == undefined)) {
        this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Date can't be blank!" });
      }
      else if (this.invoiceDetails.invoiceNo == undefined || this.invoiceDetails.invoiceNo.trim() == '') {
        this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice No can't be blank!" });
      }
      else if ((this.invoiceDetails.invoiceAmount == undefined || this.invoiceDetails.invoiceAmount == '')) {
        this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Amount can't be blank!" });
      }
      else if (this.invoiceDetails.gst == undefined || this.invoiceDetails.gst == '') {
        this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount can't be blank!" });
      } else if ((!this.InvoiceEditFlag && this.invoiceDetails.totalAmount > this.pendingInvoiceAmount)) {
        this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Total Amount  can't be greater than Pending Amount" });
      }
      else if (this.InvoiceEditFlag && this.invoiceDetails.totalAmount > (this.maxEditTotalAmount + this.pendingInvoiceAmount)) {
        this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Total Amount  can't be greater than  " + (this.maxEditTotalAmount + this.pendingInvoiceAmount) });
      }
      else {
        this.showPageSpinner = true;
        this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
          .subscribe(response => {
            this.customerPOs = response;
            this.customerPOs.poDate = new Date(this.customerPOs.poDate);
          });
        if (!this.InvoiceEditFlag) {
          this.httpRestClient.postData("add-invoice", this.invoiceDetails).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'ADDED') {
                this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
                this.httpRestClient.getData("invoice-details/" + this.selectedPOs.poID + "")
                  .subscribe(response => {
                    this.invoiceSearch = response;
                    this.totalInvoiceAmount = 0;
                    this.pendingInvoiceAmount = 0;
                    response.forEach((element) => {
                      this.totalInvoiceAmount = this.totalInvoiceAmount + element.totalAmount;
                    });
                    this.pendingInvoiceAmount = this.customerPOs.totalAmount - this.totalInvoiceAmount;


                    if (this.pendingInvoiceAmount == 0) {

                      this.customerPOs.invoiceStatus = "Completed";

                      this.httpRestClient.putData("update-contractor-po/", this.customerPOs).subscribe(
                        response => {
                          this.baseResponse = response;
                          if (this.baseResponse['code'] == 'UPDATED') {
                            this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                          }
                        });
                    }
                    else {

                      this.customerPOs.invoiceStatus = "Partial";
                      this.httpRestClient.putData("update-customer-po/", this.customerPOs).subscribe(
                        response => {
                          this.baseResponse = response;
                          if (this.baseResponse['code'] == 'UPDATED') {
                            this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                          }
                        });
                    }


                  });
                this.invoiceDetails = new InvoiceDetails();
                this.invoiceDetails.invoiceDate = new Date();
              } else {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
              this.showPageSpinner = false;
            });
        } else {
          this.httpRestClient.putData("update-invoice-details", this.invoiceDetails).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
                this.httpRestClient.getData("invoice-details/" + this.selectedPOs.poID + "")
                  .subscribe(response => {
                    this.invoiceSearch = response;
                    this.totalInvoiceAmount = 0;
                    this.pendingInvoiceAmount = 0;
                    response.forEach((element) => {
                      this.totalInvoiceAmount = this.totalInvoiceAmount + element.totalAmount;
                    });
                    this.pendingInvoiceAmount = this.customerPOs.totalAmount - this.totalInvoiceAmount;

                    if (this.pendingInvoiceAmount == 0) {
                      this.customerPOs.invoiceStatus = "Completed";
                      this.httpRestClient.putData("update-contractor-po/", this.customerPOs).subscribe(
                        response => {
                          this.baseResponse = response;
                          if (this.baseResponse['code'] == 'UPDATED') {
                            this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                          }
                        });
                    }
                    else {
                      this.customerPOs.invoiceStatus = "Partial";
                      this.httpRestClient.putData("update-contractor-po/", this.customerPOs).subscribe(
                        response => {
                          this.baseResponse = response;
                          if (this.baseResponse['code'] == 'UPDATED') {
                            this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                          }
                        });
                    }

                    this.showPageSpinner = false;
                  });

                this.invoiceDetails = new InvoiceDetails();
                this.invoiceDetails.invoiceDate = new Date();
                this.InvoiceEditFlag = false;
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            }
          )
        }
      }
    }
  }

  //Add Contractor's invoie
  AddContractorPOInvoice() {
    this.dialogmsgs = [];
    this.contractorPOsBean.poID = this.purcahseOrderId;
    this.invoiceDetails.poID = this.contractorPOsBean;
    this.invoiceDetails.createdBy = this.currentuser.userID;
    if (this.invoiceDetails.invoiceNo == undefined || this.invoiceDetails.invoiceNo.trim() == '') {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice No can't be blank!" });
    }
    else if ((this.invoiceDetails.invoiceDate == null || this.invoiceDetails.invoiceDate == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Date can't be blank!" });
    }
    else if ((this.invoiceDetails.invoiceAmount == undefined || this.invoiceDetails.invoiceAmount == '')) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Amount can't be blank!" });
    }
    else if (this.invoiceDetails.gst == undefined || this.invoiceDetails.gst == '') {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount can't be blank!" });
    }
    else if ((!this.InvoiceEditFlag && this.invoiceDetails.totalAmount > this.pendingInvoiceAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than  Total PO Amount" });//("+this.pendingInvoiceAmount+")"});                
    }
    else if (this.InvoiceEditFlag && this.invoiceDetails.totalAmount > (this.maxEditTotalAmount + this.pendingInvoiceAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than  Total PO Amount" });//("+(this.maxEditTotalAmount+this.pendingInvoiceAmount)});                
    }
    else {
      this.showPageSpinner = true;
      this.refreshPoStatus(this.purcahseOrderId);
      if (!this.InvoiceEditFlag) {
        this.httpRestClient.postData("add-invoice", this.invoiceDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.httpRestClient.getData("invoice-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.invoiceSearch = response;
                  this.addedContractorInvoice = 0;
                  this.totalInvoiceAmount = 0;
                  this.pendingInvoiceAmount = 0;
                  response.forEach((element) => {
                    this.addedContractorInvoice = this.addedContractorInvoice + element.totalAmount;
                  });
                  // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                  //   .subscribe(response => {
                  //     this.paymentSearch = response;
                  //     response.forEach((element) => {
                  //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                  //     });
                  this.pendingInvoiceAmount = this.contractorPOs.totalAmount - this.addedContractorInvoice;

                  if (this.pendingInvoiceAmount == 0) {
                    this.contractorPOs.invoiceStatus = "Completed";
                  }
                  else {
                    this.contractorPOs.invoiceStatus = "Partial";
                  }
                  this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
                    response => {
                      this.baseResponse = response;
                      if (this.baseResponse['code'] == 'UPDATED') {
                        this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                      }
                    });
                  // });


                });
              this.invoiceDetails = new InvoiceDetails();
              this.invoiceDetails.invoiceDate = new Date();
            } else {
              this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      } else {
        this.httpRestClient.putData("update-invoice-details", this.invoiceDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.httpRestClient.getData("invoice-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.invoiceSearch = response;
                  this.addedContractorInvoice = 0;
                  this.totalInvoiceAmount = 0;
                  this.pendingInvoiceAmount = 0;
                  response.forEach((element) => {
                    this.addedContractorInvoice = this.addedContractorInvoice + element.totalAmount;
                  });
                  // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                  //   .subscribe(response => {
                  //     this.paymentSearch = response;
                  //     response.forEach((element) => {
                  //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                  //     });
                  this.pendingInvoiceAmount = this.contractorPOs.totalAmount - this.addedContractorInvoice;
                  if (this.pendingInvoiceAmount == 0) {
                    this.contractorPOs.invoiceStatus = "Completed";
                  }
                  else {
                    this.contractorPOs.invoiceStatus = "Partial";
                  }
                  this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
                    response => {
                      this.baseResponse = response;
                      if (this.baseResponse['code'] == 'UPDATED') {
                        this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                      }
                    });
                  //  });



                });
              this.InvoiceEditFlag = false;
              this.invoiceDetails = new InvoiceDetails();
              this.invoiceDetails.invoiceDate = new Date();
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      }
    }
  }

  prepareInvoiceTotal() {
    if (this.invoiceDetails.invoiceAmount != null && this.invoiceDetails.invoiceAmount != undefined && this.invoiceDetails.invoiceAmount != '' && this.invoiceDetails.gst != null && this.invoiceDetails.gst != undefined && this.invoiceDetails.gst != '') {
      this.invoiceDetails.totalAmount = parseInt(this.invoiceDetails.invoiceAmount) + parseInt(this.invoiceDetails.gst);
    }
    else if (this.invoiceDetails.invoiceAmount != null && this.invoiceDetails.invoiceAmount != undefined && this.invoiceDetails.invoiceAmount != '') {
      this.invoiceDetails.totalAmount = parseInt(this.invoiceDetails.invoiceAmount);
    }
    else if (this.invoiceDetails.gst != null && this.invoiceDetails.gst != undefined && this.invoiceDetails.gst != '') {
      this.invoiceDetails.totalAmount = parseInt(this.invoiceDetails.gst);
    }
    else { this.invoiceDetails.totalAmount = '' }
  }

  closeContractorInvoiceDialog() {
    this.displayContractorPOAddInvoiceDialog = false;
    this.invoiceDetails = new InvoiceDetails();
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
      response => {
        this.contractorPOsearch = response;
      });
  }

  closeInvoiceDialog() {
    this.displayAddInvoiceDialog = false;
    this.invoiceDetails = new InvoiceDetails();
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Customer").subscribe(
      response => {
        this.customerPOsearch = response;
      });
  }

  editInvoice(idID) {
    this.contractorPoInvoiceDialogHeader = "Edit Invoice Details";
    this.invoiceDialogHeader = "Edit PO Invoice";
    this.maxEditTotalAmount = 0;
    this.InvoiceEditFlag = true;
    this.httpRestClient.getData("edit-invoice/" + idID + "")
      .subscribe(response => {
        this.invoiceDetails = response;
        this.invoiceDetails.invoiceDate = new Date(this.invoiceDetails.invoiceDate);
        // this.maxEditTotalAmount = this.invoiceDetails.invoiceAmount;
        this.maxEditTotalAmount = this.invoiceDetails.totalAmount;
      });
  }



  // Add ContractorPO Invoice Functions
  showAddContractorPOInvoiceDialog(poID) {
    this.showPageSpinner = true;
    this.contractorPoInvoiceDialogHeader = "Add Invoice Details";
    this.InvoiceEditFlag = false;
    this.invoiceDetails = new InvoiceDetails();
    this.invoiceDetails.invoiceDate = new Date();
    this.msgs = [];
    this.totalInvoiceAmount = 0;
    this.pendingInvoiceAmount = 0;
    this.addedContractorInvoice = 0;
    if (poID == null || poID == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    } else if (poID.length != 0) {

      this.purcahseOrderId = poID;
      this.httpRestClient.getData("edit-contractor-po/" + poID + "")
        .subscribe(response => {
          this.contractorPOs = response;
          this.contractorPOs.poDate = new Date(this.contractorPOs.poDate);
          this.activityLabel = this.contractorPOs.activityTypeListID.parameterListValue;

          this.httpRestClient.getData("invoice-details/" + poID + "")
            .subscribe(response => {
              this.invoiceSearch = response;
              response.forEach((element) => {
                this.addedContractorInvoice = this.addedContractorInvoice + element.totalAmount;
              });
              // this.httpRestClient.getData("payment-details/" + poID + "")
              //   .subscribe(response => {
              //     this.paymentSearch = response;
              //     response.forEach((element) => {
              //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;

              //     });         
              this.pendingInvoiceAmount = this.contractorPOs.totalAmount - this.addedContractorInvoice;
              this.displayContractorPOAddInvoiceDialog = true;
              this.httpRestClient.getData("fr-details/" + poID + "")
                .subscribe(response => {
                  this.frSearch = response;
                  this.totalFrAmount = 0;
                  response.forEach((element) => {
                    this.totalFrAmount = this.totalFrAmount + element.frAmount;
                  });
                });
              this.showPageSpinner = false;
            });
          //});
          setTimeout(() => {
            this.oneTimeClick = false;
          }, 100);

        });


    } else {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      this.oneTimeClick = false;
    }


  }


  //  Contractor POs Tab 

  AddContractorPOs() {

    this.msgs = [];
    if (this.contractorPOs.poDate == undefined || this.contractorPOs.poDate == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Date can't be blank!" });
    }
    // else if (this.contractorPOs.poNo == undefined || this.contractorPOs.poNo.trim() == '') {
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO No. can't be blank!" });
    // }
    else if (this.contractorPOs.basicAmount == undefined || this.contractorPOs.basicAmount == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Amount can't be blank" });
    }
    else if (this.contractorPOs.taxAmount == undefined || this.contractorPOs.taxAmount == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount  can't be blank" });
    }
    else if (this.contractorPOs.totalAmount == undefined || this.contractorPOs.totalAmount == '') {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Total Amount can't be blank" });
    }
    else if (this.contractorPOs.activityTypeListID == null || this.contractorPOs.activityTypeListID == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Activity Type can't be blank" });
    }
    else if (this.boqTotalAmount < this.contractorPOs.totalAmount) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Your PO cannot be greater then BOQ Remaning amount" });
    }
    else {
      this.showPageSpinner = true;
      this.projectbean.projectID = this.projectService.getter();
      //this.contactbean.contactID=this.project.contactID.contactID;
      this.contractorPOs.projectID = this.projectbean;
      // this.contractorPOs.contactID=this.contactbean;
      this.contractorPOs.invoiceStatus = 'None';
      this.contractorPOs.poStatus = 'Pending';
      if (!this.ContractorPOsEditFlag) {
        this.httpRestClient.postData("add-contractor-po/", this.contractorPOs).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: this.baseResponse['message'] });
              this.displayConPODialog = false;
              console.log("search-po/" + this.projectService.getter() + "/Contractor")

              this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
                response => {
                  this.contractorPOsearch = response;
                });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      } else {
        this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.displayConPODialog = false;
              this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
                response => {
                  this.contractorPOsearch = response;
                });
              this.ContractorPOsEditFlag = false;
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      }
    }
  }


  // SUPPLIER PO Code


  AddSupplierPOInvoice() {
    this.dialogmsgs = [];
    this.supplierPos.poID = this.purcahseOrderId;
    this.invoiceDetails.poID = this.supplierPos;
    this.invoiceDetails.createdBy = this.currentuser.userID;
    if (this.invoiceDetails.invoiceNo == undefined || this.invoiceDetails.invoiceNo.trim() == '') {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice No can't be blank!" });
    }
    else if ((this.invoiceDetails.invoiceDate == undefined || this.invoiceDetails.invoiceDate == null)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Date can't be blank!" });
    }
    else if ((this.invoiceDetails.invoiceAmount == undefined || this.invoiceDetails.invoiceAmount == '')) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Amount can't be blank!" });
    }
    else if (this.invoiceDetails.gst == undefined || this.invoiceDetails.gst == '') {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount can't be blank!" });
    }
    else if ((!this.InvoiceEditFlag && this.invoiceDetails.totalAmount > this.pendingInvoiceAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than Total PO Amount" });//("+this.pendingInvoiceAmount+")"});                
    }
    else if (this.InvoiceEditFlag && this.invoiceDetails.totalAmount > (this.maxEditTotalAmount + this.pendingInvoiceAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than Total PO Amount" });//("+(this.maxEditTotalAmount+this.pendingInvoiceAmount)});                
    }
    else {
      this.showPageSpinner = true;
      this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
        .subscribe(response => {
          this.supplierPos = response;
          this.supplierPos.poDate = new Date(this.supplierPos.poDate);
        });
      if (!this.InvoiceEditFlag) {
        this.httpRestClient.postData("add-invoice", this.invoiceDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.httpRestClient.getData("invoice-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.invoiceSearch = response;
                  this.addedSupplierInvoice = 0;
                  this.totalInvoiceAmount = 0;
                  this.pendingInvoiceAmount = 0;

                  response.forEach((element) => {
                    //this.addedSupplierInvoice += element.invoiceAmount;
                    this.addedSupplierInvoice += element.totalAmount;
                  });
                  // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                  //   .subscribe(response => {
                  //     this.paymentSearch = response;
                  //     response.forEach((element) => {
                  //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                  //     });
                  this.pendingInvoiceAmount = this.supplierPos.totalAmount - this.addedSupplierInvoice;
                  // this.pendingInvoiceAmount = this.totalInvoiceAmount - this.addedSupplierInvoice;

                  if (this.pendingInvoiceAmount == 0) {
                    this.supplierPos.invoiceStatus = "Completed";
                  }
                  else {
                    this.supplierPos.invoiceStatus = "Partial";
                  }
                  this.httpRestClient.putData("update-contractor-po/", this.supplierPos).subscribe(
                    response => {
                      this.baseResponse = response;
                      if (this.baseResponse['code'] == 'UPDATED') {
                        this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                      }
                    });
                  //});


                });
              this.invoiceDetails = new InvoiceDetails();
              this.invoiceDetails.invoiceDate = new Date();
            } else {
              this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      } else {
        this.httpRestClient.putData("update-invoice-details", this.invoiceDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.httpRestClient.getData("invoice-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.invoiceSearch = response;
                  this.addedSupplierInvoice = 0;
                  this.totalInvoiceAmount = 0;
                  this.pendingInvoiceAmount = 0;
                  response.forEach((element) => {
                    //this.addedSupplierInvoice += element.invoiceAmount;
                    this.addedSupplierInvoice += element.totalAmount;
                  });
                  // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                  //   .subscribe(response => {
                  //     this.paymentSearch = response;
                  //     response.forEach((element) => {
                  //       this.totalInvoiceAmount += element.paymentAmount;
                  //     });

                  this.pendingInvoiceAmount = this.supplierPos.totalAmount - this.addedSupplierInvoice;

                  if (this.pendingInvoiceAmount == 0) {

                    this.supplierPos.invoiceStatus = "Completed";
                  }
                  else {
                    this.supplierPos.invoiceStatus = "Partial";
                  }
                  this.httpRestClient.putData("update-contractor-po/", this.supplierPos).subscribe(
                    response => {
                      this.baseResponse = response;
                      if (this.baseResponse['code'] == 'UPDATED') {
                        this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                      }
                    });
                  // });



                });
              this.InvoiceEditFlag = false;
              this.invoiceDetails = new InvoiceDetails();
              this.invoiceDetails.invoiceDate = new Date();
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      }
    }
  }
  closeSupplierInvoiceDialog() {
    this.displaySupplierPOAddInvoiceDialog = false;
    this.invoiceDetails = new InvoiceDetails();
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
      response => {
        this.supplierPOSearch = response;
      });
  }


  showAddSupplierPOInvoiceDialog(poID) {
    this.showPageSpinner = true;
    this.contractorPoInvoiceDialogHeader = "Add Invoice Details";
    this.InvoiceEditFlag = false;
    this.invoiceDetails = new InvoiceDetails();
    this.invoiceDetails.invoiceDate = new Date();
    this.msgs = [];
    //this.totalInvoiceAmount = 0;
    this.pendingInvoiceAmount = 0;
    this.addedSupplierInvoice = 0;
    this.purcahseOrderId = poID;
    this.httpRestClient.getData("edit-contractor-po/" + poID + "")
      .subscribe(response => {
        this.supplierPos = response;

        this.supplierPos.poDate = new Date(this.supplierPos.poDate);
        this.activityLabel = this.supplierPos.activityTypeListID.parameterListValue;

        this.httpRestClient.getData("invoice-details/" + poID + "")
          .subscribe(response => {
            this.invoiceSearch = response;

            response.forEach((element) => {
              this.addedSupplierInvoice += element.totalAmount;
            });
            this.pendingInvoiceAmount += parseInt(this.supplierPos.totalAmount) - parseInt(this.addedSupplierInvoice);
            this.httpRestClient.getData("fr-details/" + poID + "")
              .subscribe(response => {
                this.frSearch = response;
                this.totalFrAmount = 0;
                response.forEach((element) => {
                  this.totalFrAmount = this.totalFrAmount + element.frAmount;
                });
              });
            this.displaySupplierPOAddInvoiceDialog = true;
            this.showPageSpinner = false;
          });
        setTimeout(() => {
          this.oneTimeClick = false;
        }, 100);

      });
    //       this.httpRestClient.getData("invoice-details/" + poID + "")
    // .subscribe(response => {
    //   this.invoiceSearch = response;
    //   response.forEach((element) => {
    //     this.addedSupplierInvoice += element.invoiceAmount;
    //   });
    //   this.httpRestClient.getData("payment-details/" + poID + "")
    //     .subscribe(response => {
    //       this.paymentSearch = response;
    //       response.forEach((element) => {
    //         this.totalInvoiceAmount += element.paymentAmount;

    //       });

    //       this.pendingInvoiceAmount = this.totalInvoiceAmount - this.addedSupplierInvoice;
    //       this.displaySupplierPOAddInvoiceDialog = true;
    //     });
    // });
  }

  closeSupplierPaymentDialog() {
    this.displaySupplierPaymentDialog = false;
    this.paymentEditFlag = false;
    this.paymentDetails = new PaymentDetails();
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
      response => {
        this.supplierPOSearch = response;
      });
  }

  //ADD Payment Details
  addSupplierPaymentDetails() {
    this.dialogmsgs = [];


    this.supplierPos.poID = this.purcahseOrderId;
    this.paymentDetails.poID = this.supplierPos;
    this.paymentDetails.createdBy = this.currentuser.userID;
    if (this.paymentDetails.paymentAmount == undefined || this.paymentDetails.paymentAmount.trim() == '' || this.paymentDetails.paymentAmount.trim() == 0) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Amount can't be blank or 0!" });
    }
    else if ((this.paymentDetails.paymentDate == null || this.paymentDetails.paymentDate == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Date can't be blank!" });
    }
    else if ((this.paymentDetails.paymentTypeListID == null || this.paymentDetails.paymentTypeListID == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Mode can't be blank!" });
    }
    // else if (this.paymentDetails.paymentParticulars == undefined || this.paymentDetails.paymentParticulars.trim() == '') {
    //   this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Particulars can't be blank!" });
    // }
    else if (!this.paymentEditFlag && this.paymentDetails.paymentAmount > this.pendingPaymentAmount) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" });//+(this.pendingPaymentAmount)});                
    }
    else if (this.paymentEditFlag && this.paymentDetails.paymentAmount > (this.maxEditTotalAmount + this.pendingPaymentAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" });//+(this.maxEditTotalAmount+this.pendingPaymentAmount)});                
    }
    // else if(this.payloadBean.searchParameter==undefined|| this.payloadBean.searchParameter==''){
    //   this.msgs = [];
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter Email Address" });
    // }
    else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {

      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });

    }
    else {
      this.showPageSpinner = true;
      this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
        .subscribe(response => {
          this.supplierPos = response;
          this.supplierPos.poDate = new Date(this.supplierPos.poDate);
        });
      var id;
      if (!this.paymentEditFlag) {
        this.httpRestClient.postData("add-payment", this.paymentDetails).subscribe(
          response => {
            this.baseResponse = response;
            id = this.baseResponse.message;
            if (this.baseResponse['code'] == 'ADDED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.addedPaymentAmount = 0;
              this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.paymentSearch = response;
                  response.forEach((element) => {
                    this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
                  });
                  this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                    .subscribe(response => {
                      this.frSearch = response;
                      this.totalPaymentAmount = 0;
                      this.pendingPaymentAmount = 0;
                      response.forEach((element) => {
                        this.totalPaymentAmount = this.totalPaymentAmount + element.frAmount;
                      });
                      this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);

                      if (this.pendingPaymentAmount == 0) {
                        this.supplierPos.paymentStatus = "Completed";

                        this.getInvoiceDetailMethod();
                        if (this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') {
                          this.httpRestClient.getData("sendMail/" + this.payloadBean.searchParameter + "/" + id)
                            .subscribe(response => {
                              this.paymentTypeMailList = response;
                            });
                          this.payloadBean.searchParameter = undefined;
                        }
                      }
                      else {
                        this.supplierPos.paymentStatus = "Partial";
                        this.getInvoiceDetailMethod();

                      }
                    });
                });
              this.paymentDetails = new PaymentDetails();
              this.paymentDetails.paymentDate = new Date();
            } else {
              this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          });
      } else {
        this.httpRestClient.putData("update-payment-details", this.paymentDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.addedPaymentAmount = 0;
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.paymentSearch = response;
                  response.forEach((element) => {
                    this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
                  });
                  this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                    .subscribe(response => {
                      this.frSearch = response;
                      this.totalPaymentAmount = 0;
                      this.pendingPaymentAmount = 0;

                      response.forEach((element) => {
                        this.totalPaymentAmount = this.totalPaymentAmount + element.frAmount;
                      });
                      this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);

                      if (this.pendingPaymentAmount == 0) {
                        this.supplierPos.paymentStatus = "Completed";
                        this.getInvoiceDetailMethod();
                      }
                      else {
                        this.supplierPos.paymentStatus = "Partial";
                        this.getInvoiceDetailMethod();
                      }


                    });
                  this.showPageSpinner = false;
                });


              this.paymentEditFlag = false;
              this.paymentDetails = new PaymentDetails();
              this.paymentDetails.paymentDate = new Date();
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
          }
        )
      }
    }
  }
  getInvoiceDetailMethod() {
    this.updateSupplierPoStatuses("Payment");
    // let invoiceAmount = 0;
    // this.httpRestClient.getData("invoice-details/" + this.purcahseOrderId)
    //   .subscribe(response => {
    //     this.invoiceSearch = response;
    //     response.forEach((element) => {
    //       invoiceAmount += element.invoiceAmount;
    //     });
    //     if ((invoiceAmount != 0) && (invoiceAmount != this.totalPaymentAmount)) {
    //       this.supplierPos.invoiceStatus = "Partial";
    //     }
    //     this.updateSupplierPoStatuses("Payment");
    //   });
  }
  updateSupplierPoStatuses(paymnetType) {


    this.httpRestClient.putData("update-contractor-po/", this.supplierPos).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'UPDATED') {
          this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: paymnetType + " Status Updated successfully!" });
        }
      });
  }
  //Show payment Dialog
  showSupplierPaymentDetails(poID) {
    console.log("djbc");
    this.showPageSpinner = true;
    this.paymentInvoiceDialogHeader = "Add Payment Details";
    this.paymentEditFlag = false;
    this.paymentDetails = new PaymentDetails();
    this.paymentDetails.paymentDate = new Date();
    this.msgs = [];
    this.purcahseOrderId = poID;
    this.httpRestClient.getData("edit-contractor-po/" + poID + "")
      .subscribe(response => {
        this.supplierPos = response;
        this.supplierPos.poDate = new Date(this.supplierPos.poDate);
        this.activityLabel = this.supplierPos.activityTypeListID.parameterListValue;
      });
    this.totalPaymentAmount = 0;
    this.addedPaymentAmount = 0;
    this.httpRestClient.getData("payment-details/" + poID + "")
      .subscribe(response => {
        this.paymentSearch = response;
        response.forEach((element) => {
          this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
        });
        this.httpRestClient.getData("fr-details/" + poID + "")
          .subscribe(response => {
            this.frSearch = response;
            response.forEach((element) => {
              this.totalPaymentAmount = this.totalPaymentAmount + element.frAmount;
            });
            this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);
            this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
              .subscribe(response => { this.paymentTypeList = response; });
          });
        this.showPageSpinner = false;
      });
    this.displaySupplierPaymentDialog = true;
    setTimeout(() => {
      this.oneTimeClick = false;
    }, 100);
  }



  //close FR Dialog
  closeSupplierFrDialog() {
    this.displaySupplierFRDialog = false;
    this.FrEditFlag = false;
    this.frDetails = new FRDetails();

    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
      response => { this.supplierPOSearch = response; });
  }
  validateEmail(email): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }
  checkEmailMethod(email): boolean {
    let emailArray: string[];
    let validateEmailFlag = true;
    emailArray = email.split(",");
    for (let count = 0; count < emailArray.length; count++) {
      validateEmailFlag = this.validateEmail(emailArray[count]);
      if (!validateEmailFlag) {
        break;
      }
    }
    return validateEmailFlag;
  }
  //Add FR 
  addSupplierFundRequest() {
    this.dialogmsgs = [];
    this.supplierPos.poID = this.purcahseOrderId;
    this.frDetails.poID = this.supplierPos;

    if (this.frDetails.frAmount == undefined || this.frDetails.frAmount == '' || this.frDetails.frAmount == 0) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Amount can't be blank or 0!" });
    }
    else if ((this.frDetails.frDate == null || this.frDetails.frDate == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Date can't be blank!" });
    }
    else if ((this.frDetails.emailAddresses == undefined || this.frDetails.emailAddresses.trim() == '')) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Addresses can't be blank!" });
    }
    else if (!(this.checkEmailMethod(this.frDetails.emailAddresses))) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Enter valid Email Address!" });
    }
    else if (!this.FrEditFlag && this.frDetails.frAmount > this.pendingFrAmount) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " });  //+(this.pendingFrAmount)});                
    }
    else if (this.FrEditFlag && this.frDetails.frAmount > (this.maxEditTotalAmount + this.pendingFrAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " });  //+(this.maxEditTotalAmount+this.pendingFrAmount)});                
    }
    else {

      this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
        .subscribe(response => {
          this.supplierPos = response;
          this.supplierPos.poDate = new Date(this.supplierPos.poDate);
        });

      this.showSpinner = true;
      if (!this.FrEditFlag) {
        this.frDetails.createdBy = this.currentuser.userID;
        this.httpRestClient.postData("add-fr", this.frDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.frSearch = response;
                  this.totalFrAmount = 0;
                  this.pendingFrAmount = 0;
                  response.forEach((element) => {
                    this.totalFrAmount = this.totalFrAmount + element.frAmount;
                  });
                  //this.pendingFrAmount = parseInt(this.supplierPos.basicAmount) - parseInt(this.totalFrAmount);
                  this.pendingFrAmount = parseInt(this.supplierPos.totalAmount) - parseInt(this.totalFrAmount);
                  if (this.pendingFrAmount == 0) {
                    this.supplierPos.frStatus = "Completed";
                    this.getPaymentDetailsMethod();
                  }
                  else {
                    this.supplierPos.frStatus = "Partial";
                    this.getPaymentDetailsMethod();
                  }


                });
              this.frDetails = new FRDetails();
              this.frDetails.frDate = new Date();
              this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                .subscribe(response => {
                  this.parameterValueTO = response;
                  this.frDetails.emailAddresses = this.parameterValueTO.parameterValue;
                  if (this.parameterValueTO.customValue1 != undefined) {
                    this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue1;
                  }
                  if (this.parameterValueTO.customValue2 != undefined) {
                    this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue2;
                  }
                });


            } else {
              this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showSpinner = false;
            setTimeout(() => {
              this.msgs = [];
              this.dialogmsgs = [];
            }, 1500);
          });
      } else {
        this.frDetails.lastModifiedBy = this.currentuser.userID;

        this.httpRestClient.putData("update-fr-details", this.frDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.frSearch = response;

                  this.totalFrAmount = 0;
                  this.pendingFrAmount = 0;
                  response.forEach((element) => {
                    this.totalFrAmount = this.totalFrAmount + element.frAmount;
                  });
                  // this.pendingFrAmount = parseInt(this.supplierPos.basicAmount) - parseInt(this.totalFrAmount);
                  this.pendingFrAmount = parseInt(this.supplierPos.totalAmount) - parseInt(this.totalFrAmount);

                  if (this.pendingFrAmount == 0) {
                    this.supplierPos.frStatus = "Completed";
                    this.getPaymentDetailsMethod();
                  }
                  else {
                    this.supplierPos.frStatus = "Partial";
                    this.getPaymentDetailsMethod();
                  }
                });
              this.FrEditFlag = false;
              this.frDetails = new FRDetails();
              this.frDetails.frDate = new Date();
              this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                .subscribe(response => {
                  this.parameterValueTO = response;
                  this.frDetails.emailAddresses = this.parameterValueTO.parameterValue;

                });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showSpinner = false;
            setTimeout(() => {
              this.msgs = [];
              this.dialogmsgs = [];
            }, 1500);
          }
        )
      }
    }
  }

  getPaymentDetailsMethod() {
    let paymentAmount = 0;
    this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
      .subscribe(response => {
        this.paymentSearch = response;
        response.forEach((element) => {
          paymentAmount += element.paymentAmount;
        });
        if ((paymentAmount != 0) && (paymentAmount != this.totalFrAmount)) {
          this.supplierPos.paymentStatus = "Partial";

        }
        this.updateSupplierPoStatuses("FR");
      });
  }
  // Add FR Invoice 
  showSupplierFRDialog(poID) {
    this.showPageSpinner = true;
    this.frInvoiceDialogHeader = "Add Fund Request";
    this.FrEditFlag = false;
    this.frDetails = new FRDetails();
    this.msgs = [];
    this.purcahseOrderId = poID;
    this.httpRestClient.getData("edit-customer-po/" + poID + "")
      .subscribe(response => {
        this.supplierPos = response;
        this.supplierPos.poDate = new Date(this.supplierPos.poDate);
        this.frDetails.frDate = new Date();
        this.activityLabel = this.supplierPos.activityTypeListID.parameterListValue;
        if (this.supplierPos.contactID.entityType == 'Individual') {
          this.supplierPos.contactID.businessName = this.supplierPos.contactID.firstName + ' ' + this.supplierPos.contactID.lastName;
        }
        this.CustomerName = this.supplierPos.contactID.businessName;
        this.totalFrAmount = 0;
        this.pendingFrAmount = 0;
        this.httpRestClient.getData("fr-details/" + poID + "")
          .subscribe(response => {
            this.frSearch = response;
            response.forEach((element) => {
              this.totalFrAmount = this.totalFrAmount + element.frAmount;
            });
            this.pendingFrAmount = parseInt(this.supplierPos.totalAmount) - parseInt(this.totalFrAmount);
            this.showPageSpinner = false;
          });
        this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
          .subscribe(response => {
            this.parameterValueTO = response;
            this.frDetails.emailAddresses = this.parameterValueTO.parameterValue;
            if (this.parameterValueTO.customValue1 != undefined) {
              this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue1;
            }
            if (this.parameterValueTO.customValue2 != undefined) {
              this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue2;
            }
          });
        this.displaySupplierFRDialog = true;
        setTimeout(() => {
          this.oneTimeClick = false;
        }, 100);
      });
  }
  filteredSupplierSingleMethod(event) {
    let query = event.query;
    this.filteredSupplierSingle = this.filterDataForSupplier(query, this.supplierAutoLookupList);
  };

  filterDataForSupplier(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.businessName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }

  callingApisForSupplierPo(): void {
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
      response => {
        this.supplierPOSearch = response;
        this.showPageSpinner = false;
      });

    this.httpRestClient.getData("parameter-list/ACTIVITY_TYPES").subscribe(
      response => {
        this.supplieractivityTypeList = response;
        console.log(this.supplieractivityTypeList);

      });

    this.httpRestClient.getData("supplier-autoLookUp/Supplier").subscribe(
      response => { this.supplierAutoLookupList = response; });
  }

  showSuplierPODialog() {
    this.showPageSpinner = true;
    this.supplierPos = new SupplierPOs();
    this.displaySupplierPODialog = true;
    this.selectedSupplierdrawings = [];
    this.poheader = "Add Supplier PO";
    this.supplierPos.poDate = new Date();
    this.projectStatusDialogHeader = "Add Project Status";
    this.supplierPOsEditFlag = false;
    this.httpRestClient.getData("supplier-drawing-Items/" + this.project.drawingTypeID.drawingTypeID + "/" + this.project.projectID).subscribe(
      response => {
        this.supplierDrawingItems = response;
        this.showPageSpinner = false;
      });
  }
  editSupplierPO(poID) {
    this.showPageSpinner = true;
    this.displaySupplierPODialog = true;
    this.selectedSupplierdrawings = [] = [];
    this.supplierPOsEditFlag = true;
    this.poheader = "Edit Supplier PO ";

    this.httpRestClient.getData("edit-customer-po/" + poID + "")
      .subscribe(response => {
        this.supplierPos = response;
        if (this.supplierPos.contactID.entityType == 'Individual') {
          this.supplierPos.contactID.businessName = this.supplierPos.contactID.firstName + ' ' + this.supplierPos.contactID.lastName;
        }
        this.supplierPos.poDate = new Date(this.supplierPos.poDate);
      });

    this.httpRestClient.getData("supplier-drawing-Items/" + this.project.drawingTypeID.drawingTypeID + "/" + this.project.projectID).subscribe(
      response => {
        this.supplierDrawingItems = response;
        this.httpRestClient.getData("supplier-drawing-selected-Items/" + poID + "/" + this.project.projectID).subscribe(
          response => {
            this.selectedSupplierdrawings = response;

            for (let counterofDrawingItem = 0; counterofDrawingItem < this.supplierDrawingItems.length; counterofDrawingItem++) {
              for (let countOfSelectedDrawingItem = 0; countOfSelectedDrawingItem < this.selectedSupplierdrawings.length; countOfSelectedDrawingItem++) {
                if (this.supplierDrawingItems[counterofDrawingItem].itemID == this.selectedSupplierdrawings[countOfSelectedDrawingItem].itemID) {
                  this.selectedSupplierdrawings[countOfSelectedDrawingItem].NewQtyFieldValue = this.selectedSupplierdrawings[countOfSelectedDrawingItem].newProcurementQty;
                  this.supplierDrawingItems[counterofDrawingItem] = this.selectedSupplierdrawings[countOfSelectedDrawingItem];
                  // this.supplierDrawingItems[counterofDrawingItem].budgetAmount = this.supplierDrawingItems[counterofDrawingItem].newProcurementQty * this.supplierDrawingItems[counterofDrawingItem].currentUnitRate;
                  // this.selectedSupplierdrawings[counterofDrawingItem].newProcurementQty = (this.selectedSupplierdrawings[counterofDrawingItem].newProcurementQty != undefined ? this.selectedSupplierdrawings[counterofDrawingItem].newProcurementQty : 0);
                  // this.selectedSupplierdrawings[counterofDrawingItem].currentUnitGST = (this.selectedSupplierdrawings[counterofDrawingItem].currentUnitGST != undefined ? this.selectedSupplierdrawings[counterofDrawingItem].currentUnitGST : 0);

                }
              }
            }
            this.showPageSpinner = false;
          });

      });
  }
  addSupplier() {
    this.msgs = [];
    if (this.supplierPos.contactID == undefined || this.supplierPos.contactID == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Supplier Name can't be blank!" });
    }
    else if (this.supplierPos.activityTypeListID == undefined || this.supplierPos.activityTypeListID == null) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Activity Type can't be blank!" });
    }
    // else if (this.supplierPos.poNo == undefined || this.supplierPos.poNo == null || this.supplierPos.poNo.trim() == '') {
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO No. can't be blank!" });
    // }
    else if (this.supplierDrawingItems.length == 0) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please firstly add project BOQs." });
    }
    else if (this.selectedSupplierdrawings == undefined || this.selectedSupplierdrawings.length == 0) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Select one Item." });
    }
    else if (this.boqTotalAmount < this.supplierPos.totalAmount) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Your PO cannot be greater then BOQ Remaning amount" });

    }
    else {
      for (let counter = 0; counter < this.selectedSupplierdrawings.length; counter++) {
        let orderQuantity = (this.selectedSupplierdrawings[counter].qtyApprovedforProcurement == null ? 0 : this.selectedSupplierdrawings[counter].qtyApprovedforProcurement);
        let budgetQuantity = (this.selectedSupplierdrawings[counter].itemQty == null ? 0 : this.selectedSupplierdrawings[counter].itemQty);
        let differenceOfItems = parseInt(budgetQuantity) - parseInt(orderQuantity);
        if (this.supplierPOsEditFlag && (differenceOfItems + parseInt(this.selectedSupplierdrawings[counter].NewQtyFieldValue) < this.selectedSupplierdrawings[counter].newProcurementQty)) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Qty  of "' + this.selectedSupplierdrawings[counter].itemName + '" is ' + (differenceOfItems == 0 ? 'already ordered.' : 'cannnot be greater than' + differenceOfItems) });
          return;
        }
        else if (!this.supplierPOsEditFlag && differenceOfItems < this.selectedSupplierdrawings[counter].newProcurementQty) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Qty  of "' + this.selectedSupplierdrawings[counter].itemName + '" is ' + (differenceOfItems == 0 ? 'already ordered.' : 'cannnot be greater than' + differenceOfItems) });
          return;
        }
        if (this.selectedSupplierdrawings[counter].newProcurementQty == undefined || this.selectedSupplierdrawings[counter].newProcurementQty == 0 || this.selectedSupplierdrawings[counter].newProcurementQty == 0) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Qty of "' + this.selectedSupplierdrawings[counter].itemName + '" cannot be empty or 0!' });
          return;
        }
        else if (this.selectedSupplierdrawings[counter].currentUnitRate == undefined || this.selectedSupplierdrawings[counter].currentUnitRate == 0) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Rate of "' + this.selectedSupplierdrawings[counter].itemName + '" cannot be empty or 0!' });
          return;
        }
        else if (this.selectedSupplierdrawings[counter].currentUnitGST == undefined || this.selectedSupplierdrawings[counter].currentUnitGST.length == 0) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New GST of "' + this.selectedSupplierdrawings[counter].itemName + '" cannot be empty!' });
          return;
        }

      }

      this.supplierPos.invoiceStatus = 'None';
      this.supplierPos.poStatus = 'Pending';
      this.supplierPos.frStatus = 'None';
      this.supplierPos.paymentStatus = 'None';
      this.projectbean.projectID = this.projectService.getter();
      this.supplierPos.projectID = this.projectbean;
      this.supplierPos.purchaseOrderItemList = this.selectedSupplierdrawings;
      if (!this.supplierPOsEditFlag) {
        this.supplierPos.createdBy = this.currentuser.userID;

        this.httpRestClient.postData("add-supplier-po/", this.supplierPos).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: this.baseResponse['message'] });
              this.displaySupplierPODialog = false;
              this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
                response => {
                  this.supplierPOSearch = response;
                });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
          });
      } else {
        this.supplierPos.lastModifiedBy = this.currentuser.userID;
        this.httpRestClient.putData("update-Supplier-po/", this.supplierPos).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.displaySupplierPODialog = false;
              this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
                response => {
                  this.supplierPOSearch = response;
                });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
          }
        );
      }
    }
  }

  onRowSelect() {
    let basicAmount: any = 0;
    let taxAmount: any = 0;
    let totalAmount: any = 0;
    let basicPlusGstAmount: any = 0;

    for (let count = 0; count < this.selectedSupplierdrawings.length; count++) {
      let totalRowAmount = 0;
      if (this.selectedSupplierdrawings[count].newProcurementQty != undefined && !this.validateNumber.test(this.selectedSupplierdrawings[count].newProcurementQty)) {
        this.selectedSupplierdrawings[count].newProcurementQty = this.selectedSupplierdrawings[count].newProcurementQty.toString().substring(0, this.selectedSupplierdrawings[count].newProcurementQty.length - 1);
        return;
      }
      else if (this.selectedSupplierdrawings[count].currentUnitRate != undefined && !this.validateNumber.test(this.selectedSupplierdrawings[count].currentUnitRate)) {
        this.selectedSupplierdrawings[count].currentUnitRate = this.selectedSupplierdrawings[count].currentUnitRate.toString().substring(0, this.selectedSupplierdrawings[count].currentUnitRate.length - 1);
        return;
      }
      else if (this.selectedSupplierdrawings[count].currentUnitGST != undefined && !this.validateNumber.test(this.selectedSupplierdrawings[count].currentUnitGST)) {
        this.selectedSupplierdrawings[count].currentUnitGST = this.selectedSupplierdrawings[count].currentUnitGST.toString().substring(0, this.selectedSupplierdrawings[count].currentUnitGST.length - 1);
        return;
      }
      this.selectedSupplierdrawings[count].newProcurementQty = (this.selectedSupplierdrawings[count].newProcurementQty != null ? this.selectedSupplierdrawings[count].newProcurementQty : (this.selectedSupplierdrawings[count].itemQty - this.selectedSupplierdrawings[count].qtyApprovedforProcurement));
      this.selectedSupplierdrawings[count].currentUnitGST = (this.selectedSupplierdrawings[count].currentUnitGST != null ? this.selectedSupplierdrawings[count].currentUnitGST : 0);

      if (!(this.selectedSupplierdrawings[count].newProcurementQty == undefined || this.selectedSupplierdrawings[count].newProcurementQty == null
        || this.selectedSupplierdrawings[count].newProcurementQty.length == 0) && !(this.selectedSupplierdrawings[count].currentUnitRate == undefined
          || this.selectedSupplierdrawings[count].currentUnitRate == null || this.selectedSupplierdrawings[count].currentUnitRate.length == 0)) {
        totalRowAmount = parseInt(this.selectedSupplierdrawings[count].newProcurementQty) * parseInt(this.selectedSupplierdrawings[count].currentUnitRate);
        // this.selectedSupplierdrawings[count].budgetAmount = rowAmount;
        basicAmount += parseInt(this.selectedSupplierdrawings[count].newProcurementQty) * parseInt(this.selectedSupplierdrawings[count].currentUnitRate);
        if (!(this.selectedSupplierdrawings[count].currentUnitGST == undefined
          || this.selectedSupplierdrawings[count].currentUnitGST == null
          || this.selectedSupplierdrawings[count].currentUnitGST == '' || this.selectedSupplierdrawings[count].currentUnitGST == 0)) {
          basicPlusGstAmount = parseInt(this.selectedSupplierdrawings[count].currentUnitGST) * parseInt(this.selectedSupplierdrawings[count].newProcurementQty);
          totalRowAmount += basicPlusGstAmount;
          taxAmount += parseInt(basicPlusGstAmount);
        }
        // totalAmount += parseInt(basicAmount) + parseInt(taxAmount);
        totalAmount += totalRowAmount;
        this.selectedSupplierdrawings[count].amount = totalRowAmount;

      }
    }

    this.supplierPos.taxAmount = parseInt(taxAmount);
    this.supplierPos.basicAmount = parseInt(basicAmount);
    this.supplierPos.totalAmount = parseInt(totalAmount);

  }
  onRowUnSelect(event) {
    event.data.newProcurementQty = null;
    event.data.currentUnitGST = null;
    this.onRowSelect();
  }

  //  End Of Supplier Code


  // Add FR Invoice 
  showFRDialog(poID) {
    this.showPageSpinner = true;
    this.frInvoiceDialogHeader = "Add Fund Request";
    this.FrEditFlag = false;
    this.frDetails = new FRDetails();
    this.msgs = [];


    //this.pendingInvoiceAmount=0;
    if (poID == null || poID == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    } else if (poID != 0) {
      this.purcahseOrderId = poID;
      this.httpRestClient.getData("edit-contractor-po/" + poID + "")
        .subscribe(response => {
          this.contractorPOs = response;
          this.contractorPOs.poDate = new Date(this.contractorPOs.poDate);
          this.frDetails.frDate = new Date();
          this.activityLabel = this.contractorPOs.activityTypeListID.parameterListValue;
          if (this.contractorPOs.contactID.entityType == 'Individual') {
            this.contractorPOs.contactID.businessName = this.contractorPOs.contactID.firstName + ' ' + this.contractorPOs.contactID.lastName;
          }
          this.CustomerName = this.contractorPOs.contactID.businessName;
          this.totalFrAmount = 0;
          this.pendingFrAmount = 0;
          this.httpRestClient.getData("fr-details/" + poID + "")
            .subscribe(response => {
              this.frSearch = response;
              response.forEach((element) => {
                this.totalFrAmount = this.totalFrAmount + element.frAmount;
              });
              this.pendingFrAmount = parseInt(this.contractorPOs.totalAmount) - parseInt(this.totalFrAmount);

              // this.pendingInvoiceAmount= this.contractorPOs.totalAmount- this.totalInvoiceAmount;
              this.showPageSpinner = false;
            });
          this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
            .subscribe(response => {
              this.parameterValueTO = response;

              this.frDetails.emailAddresses = this.parameterValueTO.parameterValue;
              if (this.parameterValueTO.customValue1 != undefined) {
                this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue1;
              }
              if (this.parameterValueTO.customValue2 != undefined) {
                this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue2;
              }
            });
          this.displayFrDialog = true;
          setTimeout(() => {
            this.oneTimeClick = false;
          }, 100);
        });
    } else {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      this.oneTimeClick = false;
    }


  }

  //Add FR 
  AddFundRequest() {
    this.dialogmsgs = [];
    this.contractorPOsBean.poID = this.purcahseOrderId;
    this.frDetails.poID = this.contractorPOsBean;

    if (this.frDetails.frAmount == undefined || this.frDetails.frAmount == '' || this.frDetails.frAmount == 0) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Amount can't be blank or 0!" });
    }
    else if ((this.frDetails.frDate == null || this.frDetails.frDate == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Date can't be blank!" });
    }
    else if ((this.frDetails.emailAddresses == undefined || this.frDetails.emailAddresses.trim() == '')) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Addresses can't be blank!" });
    }
    else if (!(this.checkEmailMethod(this.frDetails.emailAddresses))) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Enter valid Email Address!" });
    }
    else if (!this.FrEditFlag && this.frDetails.frAmount > this.pendingFrAmount) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " });  //+(this.pendingFrAmount)});                
    }
    else if (this.FrEditFlag && this.frDetails.frAmount > (this.maxEditTotalAmount + this.pendingFrAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " });  //+(this.maxEditTotalAmount+this.pendingFrAmount)});                
    }
    else {
      this.refreshPoStatus(this.purcahseOrderId);
      this.showSpinner = true;
      if (!this.FrEditFlag) {
        this.frDetails.createdBy = this.currentuser.userID;

        this.httpRestClient.postData("add-fr", this.frDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'ADDED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.frSearch = response;
                  this.totalFrAmount = 0;
                  this.pendingFrAmount = 0;
                  response.forEach((element) => {
                    this.totalFrAmount = this.totalFrAmount + element.frAmount;
                  });
                  this.pendingFrAmount = parseInt(this.contractorPOs.totalAmount) - parseInt(this.totalFrAmount);

                  if (this.pendingFrAmount == 0) {
                    this.contractorPOs.frStatus = "Completed";
                  }
                  else {
                    this.contractorPOs.frStatus = "Partial";
                  }
                  this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
                    response => {
                      this.baseResponse = response;
                      if (this.baseResponse['code'] == 'UPDATED') {
                        this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "FR Status Updated successfully!" });
                      }
                    });

                });
              this.frDetails = new FRDetails();
              this.frDetails.frDate = new Date();
              this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                .subscribe(response => {
                  this.parameterValueTO = response;

                  this.frDetails.emailAddresses = this.parameterValueTO.parameterValue;
                  if (this.parameterValueTO.customValue1 != undefined) {
                    this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue1;
                  }
                  if (this.parameterValueTO.customValue2 != undefined) {
                    this.frDetails.emailAddresses = this.frDetails.emailAddresses + "," + this.parameterValueTO.customValue2;
                  }
                });

            } else {
              this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showSpinner = false;
            setTimeout(() => {
              this.dialogmsgs = [];
              this.msgs = []
            }, 1500);
          });

      } else {
        this.frDetails.lastModifiedBy = this.currentuser.userID;
        this.httpRestClient.putData("update-fr-details", this.frDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.frSearch = response;
                  this.totalFrAmount = 0;
                  this.pendingFrAmount = 0;
                  response.forEach((element) => {
                    this.totalFrAmount = this.totalFrAmount + element.frAmount;
                  });
                  this.pendingFrAmount = parseInt(this.contractorPOs.totalAmount) - parseInt(this.totalFrAmount);

                  if (this.pendingFrAmount == 0) {
                    this.contractorPOs.frStatus = "Completed";
                  }
                  else {
                    this.contractorPOs.frStatus = "Partial";
                  }
                  this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
                    response => {
                      this.baseResponse = response;
                      if (this.baseResponse['code'] == 'UPDATED') {
                        this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "FR Status Updated successfully!" });
                      }
                    });


                });
              this.FrEditFlag = false;
              this.frDetails = new FRDetails();
              this.frDetails.frDate = new Date();
              this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                .subscribe(response => {
                  this.parameterValueTO = response;
                  this.frDetails.emailAddresses = this.parameterValueTO.parameterValue;

                });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showSpinner = false;
            setTimeout(() => {
              this.dialogmsgs = [];
              this.msgs = []
            }, 1500);
          }
        )
      }
    }
  }


  //Close FR Dialog
  closeFrDialog() {
    this.displayFrDialog = false;
    this.FrEditFlag = false;
    this.frDetails = new FRDetails();
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
      response => {
        this.contractorPOsearch = response;
      });
  }

  //Edit FR
  editFR(frID) {
    this.frInvoiceDialogHeader = "Edit Fund Request";
    this.maxEditTotalAmount = 0;
    this.FrEditFlag = true;
    this.httpRestClient.getData("edit-fr/" + frID + "")
      .subscribe(response => {
        this.frDetails = response;
        this.frDetails.frDate = new Date(this.frDetails.frDate);
        this.maxEditTotalAmount = this.frDetails.frAmount;
      });
  }


  // Show Payment Details 
  showPaymentDetails(poID) {
    this.showPageSpinner = true;
    this.paymentInvoiceDialogHeader = "Add Payment Details";
    this.paymentEditFlag = false;
    this.paymentDetails = new PaymentDetails();
    this.paymentDetails.paymentDate = new Date();
    this.msgs = [];


    //this.pendingInvoiceAmount=0;
    if (poID == null || poID == undefined) {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
    } else if (poID != 0) {
      this.purcahseOrderId = poID;
      this.httpRestClient.getData("edit-contractor-po/" + poID + "")
        .subscribe(response => {
          this.contractorPOs = response;
          this.contractorPOs.poDate = new Date(this.contractorPOs.poDate);
          this.activityLabel = this.contractorPOs.activityTypeListID.parameterListValue;
        });
      this.totalPaymentAmount = 0;
      this.addedPaymentAmount = 0;
      //  this.pendingPaymentAmount=this.contractorPOs.totalAmount;
      this.httpRestClient.getData("payment-details/" + poID + "")
        .subscribe(response => {
          this.paymentSearch = response;
          response.forEach((element) => {
            this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
          });
          this.httpRestClient.getData("fr-details/" + poID + "")
            .subscribe(response => {
              this.frSearch = response;
              response.forEach((element) => {
                this.totalPaymentAmount = this.totalPaymentAmount + element.frAmount;
              });
              this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);
              this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
                .subscribe(response => { this.paymentTypeList = response; });
            });
          setTimeout(() => {
            this.oneTimeClick = false;
          }, 100);
          this.showPageSpinner = false;
        });





      this.displayPaymentDialog = true;

      // });
    } else {
      this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning });
      this.oneTimeClick = false;
    }


  }
  //Close Payment Dialog
  closePaymentDialog() {
    this.displayPaymentDialog = false;
    this.paymentEditFlag = false;
    this.paymentDetails = new PaymentDetails();
    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
      response => {
        this.contractorPOsearch = response;
      });
  }
  refreshPoStatus(poID) {
    this.httpRestClient.getData("edit-contractor-po/" + poID + "")
      .subscribe(response => {
        this.contractorPOs = response;
        this.contractorPOs.poDate = new Date(this.contractorPOs.poDate);
        this.activityLabel = this.contractorPOs.activityTypeListID.parameterListValue;
      });
  }
  //ADD Payment Details
  AddPaymentDetails() {
    this.dialogmsgs = [];
    this.contractorPOsBean.poID = this.purcahseOrderId;
    this.paymentDetails.poID = this.contractorPOsBean;
    this.paymentDetails.createdBy = this.currentuser.userID;
    if (this.paymentDetails.paymentAmount == undefined || this.paymentDetails.paymentAmount.trim() == '' || this.paymentDetails.paymentAmount.trim() == 0) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Amount can't be blank or 0!" });
    }
    else if ((this.paymentDetails.paymentDate == null || this.paymentDetails.paymentDate == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Date can't be blank!" });
    }
    else if ((this.paymentDetails.paymentTypeListID == null || this.paymentDetails.paymentTypeListID == undefined)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Mode can't be blank!" });
    }
    // else if (this.paymentDetails.paymentParticulars == undefined || this.paymentDetails.paymentParticulars.trim() == '') {
    //   this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Particulars can't be blank!" });
    // }
    else if (!this.paymentEditFlag && this.paymentDetails.paymentAmount > this.pendingPaymentAmount) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" });//+(this.pendingPaymentAmount)});                
    }
    else if (this.paymentEditFlag && this.paymentDetails.paymentAmount > (this.maxEditTotalAmount + this.pendingPaymentAmount)) {
      this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" });//+(this.maxEditTotalAmount+this.pendingPaymentAmount)});                
    }
    // else if(this.payloadBean.searchParameter==undefined|| this.payloadBean.searchParameter==''){
    //   this.msgs = [];
    //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter Email Address" });
    // }
    else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });

    }
    else {
      this.showPageSpinner = true;
      this.refreshPoStatus(this.purcahseOrderId);
      var id;
      if (!this.paymentEditFlag) {
        this.httpRestClient.postData("add-payment", this.paymentDetails).subscribe(
          response => {
            this.baseResponse = response;

            id = this.baseResponse.message;

            if (this.baseResponse['code'] == 'ADDED') {
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
              this.addedPaymentAmount = 0;
              this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.paymentSearch = response;
                  response.forEach((element) => {
                    this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
                  });
                  this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                    .subscribe(response => {
                      this.frSearch = response;
                      this.totalPaymentAmount = 0;
                      this.pendingPaymentAmount = 0;

                      response.forEach((element) => {
                        this.totalPaymentAmount = this.totalPaymentAmount + element.frAmount;
                      });
                      this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);
                      if (this.pendingPaymentAmount == 0) {
                        this.contractorPOs.paymentStatus = "Completed";
                        if (this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') {
                          this.httpRestClient.getData("sendMail/" + this.payloadBean.searchParameter + "/" + id)
                            .subscribe(response => {
                              this.paymentTypeMailList = response;
                            });
                          this.payloadBean.searchParameter = undefined;

                        }
                      }
                      else {
                        this.contractorPOs.paymentStatus = "Partial";

                      }


                      this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
                        response => {
                          this.baseResponse = response;
                          if (this.baseResponse['code'] == 'UPDATED') {
                            this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Payment Status Updated successfully!" });
                          }
                        });

                    });
                });
              this.paymentDetails = new PaymentDetails();
              this.paymentDetails.paymentDate = new Date();
            } else {
              this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          })
      } else {
        this.httpRestClient.putData("update-payment-details", this.paymentDetails).subscribe(
          response => {
            this.baseResponse = response;
            if (this.baseResponse['code'] == 'UPDATED') {
              this.addedPaymentAmount = 0;
              this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
              this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                .subscribe(response => {
                  this.paymentSearch = response;
                  response.forEach((element) => {
                    this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
                  });
                  this.httpRestClient.getData("fr-details/" + this.purcahseOrderId + "")
                    .subscribe(response => {
                      this.frSearch = response;
                      this.totalPaymentAmount = 0;
                      this.pendingPaymentAmount = 0;

                      response.forEach((element) => {
                        this.totalPaymentAmount = this.totalPaymentAmount + element.frAmount;
                      });
                      this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);
                      if (this.pendingPaymentAmount == 0) {
                        this.contractorPOs.paymentStatus = "Completed";
                      }
                      else {
                        this.contractorPOs.paymentStatus = "Partial";
                      }
                      this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(
                        response => {
                          this.baseResponse = response;
                          if (this.baseResponse['code'] == 'UPDATED') {
                            this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Payment Status Updated successfully!" });
                          }
                        });

                    });
                });
              this.paymentEditFlag = false;
              this.paymentDetails = new PaymentDetails();
              this.paymentDetails.paymentDate = new Date();
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
            }
            this.showPageSpinner = false;
          }
        )
      }
    }
  }
  //Edit FR
  editPaymentDetails(pdID) {
    this.paymentInvoiceDialogHeader = "Edit Payment Details";
    this.maxEditTotalAmount = 0;
    this.paymentEditFlag = true;
    this.httpRestClient.getData("edit-payment/" + pdID + "")
      .subscribe(response => {
        this.paymentDetails = response;
        this.paymentDetails.paymentDate = new Date(this.paymentDetails.paymentDate);
        this.maxEditTotalAmount = this.paymentDetails.paymentAmount;
      });
  }
  showDialogToAddBOQ() {

    this.showPageSpinner = true;
    this.boqcolsTwo = [
      { field: 'itemName', header: 'Item', id: 'itemID' },
      { field: 'itemUnit', header: 'Unit' },
      { field: 'itemQty', header: 'BGT Qty' },
      { field: 'itemUnitRate', header: 'BGT Rate', class: "center-align" },
      { field: 'budgetAmount', header: ' BGT Amt' },
      { field: 'newProcurementQty', header: 'BOQ Qty' },
    ];
    this.displayProjectBOQDialog = true;
    this.boqEditFlag = false;
    this.selectedboqDrawingItems = [];
    this.boqBeanObject = new BOQBean();
    if (this.boqtableSearch.length > 0) {
      this.boqBeanObject.grandTotalOfBOQ = this.boqtableSearch[this.boqtableSearch.length - 1].grandTotalOfBOQ;
    }
    else {
      this.boqBeanObject.grandTotalOfBOQ = 0;
    }
    this.projectStatusDialogHeader = "Add Project BOQ";
    this.boqBeanObject.boqdate = new Date();
    this.httpRestClient.getData("fetch-boq-drawing-items/" + this.projectService.getter() + "/" + this.project.drawingTypeID.drawingTypeID).subscribe(
      response => {
        this.boqDrawingItems = response;
        this.showPageSpinner = false;
      });
  }

  onBOQRowSelect() {
    for (let count = 0; count < this.selectedboqDrawingItems.length; count++) {
      this.selectedboqDrawingItems[count].newProcurementQty = (this.selectedboqDrawingItems[count].newProcurementQty != null ? this.selectedboqDrawingItems[count].newProcurementQty : 0);
      if (this.selectedboqDrawingItems[count].newProcurementQty != undefined
        && !this.validateNumber.test(this.selectedboqDrawingItems[count].newProcurementQty)) {
        this.selectedboqDrawingItems[count].newProcurementQty = this.selectedboqDrawingItems[count].newProcurementQty.toString().substring(0, this.selectedboqDrawingItems[count].newProcurementQty.length - 1);
        return;
      }
      else if (this.selectedboqDrawingItems[count].itemUnitRate != undefined && !this.validateNumber.test(this.selectedboqDrawingItems[count].itemUnitRate)) {
        this.selectedboqDrawingItems[count].itemUnitRate = this.selectedboqDrawingItems[count].itemUnitRate.toString().substring(0, this.selectedboqDrawingItems[count].itemUnitRate.length - 1);
        return;
      }
      else if (!(this.selectedboqDrawingItems[count].newProcurementQty == null || this.selectedboqDrawingItems[count].newProcurementQty == "") && !(this.selectedboqDrawingItems[count].itemUnitRate == null || this.selectedboqDrawingItems[count].itemUnitRate == '')) {
        this.selectedboqDrawingItems[count].budgetAmount = parseInt(this.selectedboqDrawingItems[count].newProcurementQty) * parseInt(this.selectedboqDrawingItems[count].itemUnitRate);
      }
    }
  }
  onBOQRowUnSelect(row) {
    row.data.newProcurementQty = null;
    this.onBOQRowSelect();
  }
  addProjectBOQ() {
    this.msgs = [];
    if (this.boqDrawingItems.length == 0) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: " There are no items available to create BOQ." });
      return;
    }
    else if (this.selectedboqDrawingItems.length == 0) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select atleast one item." });
      return;
    }
    for (let count = 0; count < this.selectedboqDrawingItems.length; count++) {
      if (this.selectedboqDrawingItems[count].itemUnitRate == undefined || this.selectedboqDrawingItems[count].itemUnitRate == 0 || this.selectedboqDrawingItems[count].itemUnitRate.toString().trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'BOQ Rate cannot be empty or 0 of item "' + this.selectedboqDrawingItems[count].itemName + '".' });
        return;
      }
      else if (this.selectedboqDrawingItems[count].newProcurementQty == undefined || this.selectedboqDrawingItems[count].newProcurementQty == 0
        || this.selectedboqDrawingItems[count].newProcurementQty.toString().trim() == '') {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'BOQ Qty cannot be empty or 0 of item "' + this.selectedboqDrawingItems[count].itemName + '".' });
        return;
      }
    }

    this.projectbean.projectID = this.projectService.getter();
    this.boqBeanObject.projectID = this.projectbean;
    this.boqBeanObject.purchaseOrderItemList = this.selectedboqDrawingItems;
    if (!this.boqEditFlag) {
      this.boqBeanObject.createdBy = this.currentuser.userID;
      this.httpRestClient.postData("add-project-boq-po/", this.boqBeanObject).subscribe(
        response => {
          this.baseResponse = response;
          if (this.baseResponse['code'] == 'ADDED') {
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.AddSuccess });
            this.displayProjectBOQDialog = false;
            this.httpRestClient.getData("fetch-boq-info/" + this.projectService.getter() + "").subscribe(
              response => {
                this.boqtableSearch = response
                if (this.boqtableSearch.length > 0) {
                  this.boqBeanObject.grandTotalOfBOQ = this.boqtableSearch[this.boqtableSearch.length - 1].grandTotalOfBOQ;
                }
                else {
                  this.boqBeanObject.grandTotalOfBOQ = 0;
                }
              });
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
          }
        });
    }
    // } else {
    //   this.supplierPos.lastModifiedBy = this.currentuser.userID;
    //   this.httpRestClient.putData("update-Supplier-po/", this.supplierPos).subscribe(
    //     response => {
    //       this.baseResponse = response;
    //       if (this.baseResponse['code'] == 'UPDATED') {
    //         this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
    //         this.displaySupplierPODialog = false;
    //         this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
    //           response => {
    //             this.supplierPOSearch = response;
    //           });
    //       } else {
    //         this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
    //       }
    //     });
    // }
  }
  editProjectBOQ(pkID) {
    this.showPageSpinner = true;
    this.boqcolsTwo = [
      { field: 'itemName', header: 'Item', id: 'itemID' },
      { field: 'itemUnit', header: 'Unit' },
      { field: 'itemQty', header: 'BOQ Qty', class: "center-align" },
      { field: 'itemUnitRate', header: 'BOQ Rate', class: "center-align" },
      { field: 'budgetAmount', header: ' BOQ Amt', class: "center-align" }
    ];
    this.boqEditFlag = true;
    this.projectStatusDialogHeader = "Project BOQ";
    this.httpRestClient.getData("edit-project-boq/" + pkID + "")
      .subscribe(response => {
        this.boqBeanObject = response;
        if (this.boqtableSearch.length > 0) {
          this.boqBeanObject.grandTotalOfBOQ = this.boqtableSearch[this.boqtableSearch.length - 1].grandTotalOfBOQ;
        }
        else {
          this.boqBeanObject.grandTotalOfBOQ = 0;
        }
        this.boqBeanObject.boqdate = new Date(this.boqBeanObject.boqdate);
      });
    this.displayProjectBOQDialog = true;
    this.httpRestClient.getData("boq-drawing-selected-Items/" + pkID).subscribe(
      response => {
        this.boqDrawingItems = response;
        this.showPageSpinner = false;
      });
  }

  filteredActivityType(event) {
    let query = event.query;
    this.filteredActivity = this.filterDataForActivityType(query, this.activityTypeList);
  }
  filterDataForActivityType(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.parameterListValue.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }
  supplierActivityType(event) {
    let query = event.query;
    this.supplierActivity = this.filterDataForActivityType(query, this.supplieractivityTypeList);
  }
  supplierDataForActivityType(query, data: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.parameterListValue.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push(record);
      }
    }
    return filtered;
  }

  //for v2.2
  CancleStatus(poID, rowData) {
    this.showPageSpinner = true;
    this.paymentInvoiceDialogHeader = "Cancel PO";
    this.paymentEditFlag = false;
    this.paymentDetails = new PaymentDetails();
    this.paymentDetails.paymentDate = new Date();
    this.msgs = [];
    this.purcahseOrderId = poID;

    this.totalPaymentAmount = 0;
    this.addedPaymentAmount = 0;
    this.httpRestClient.getData("payment-details/" + poID + "")
      .subscribe(response => {
        this.paymentSearch = response;
        response.forEach((element) => {
          this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
        });
        this.httpRestClient.getData("fr-details/" + poID + "")
          .subscribe(response => {
            this.frSearch = response;

            this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);
            this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
              .subscribe(response => { this.paymentTypeList = response; });
          });
        this.totalPaymentAmount = rowData.totalAmount;
        // console.log(rowData);


      });
    this.purchaseOrdersBean.poID = rowData.poID
    setTimeout(() => {
      if (rowData.totalAmount == this.pendingPaymentAmount) {
        this.purchaseOrdersBean.poStatus = 'Cancelled';
      }
      else {
        this.purchaseOrdersBean.poStatus = 'Partial Cancelled';

      }
      this.showPageSpinner = false;

      this.CancleDialog = true;

    }, 2000);
    setTimeout(() => {
      this.oneTimeClick = false;
    }, 100);
  }



  //close FR Dialog
  closeCancleStatusDialog() {
    this.CancleDialog = false;
    this.FrEditFlag = false;
    this.frDetails = new FRDetails();

    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
      response => { this.supplierPOSearch = response; });
  }

  cancelPO() {
    // this.httpRestClient.postData("update-poStatus" , this.projectService.getter() ).subscribe(
    //   response => { this.supplierPOSearch = response; });
    this.purchaseOrdersBean.transactionCount = 1
    this.showPageSpinner = true;
    this.httpRestClient.postData("update-poStatus", this.purchaseOrdersBean).subscribe(
      response => {
        this.baseResponse = response;
        this.showPageSpinner = false;
        if (this.baseResponse['code'] == 'UPDATED') {
          this.closeCancleStatusDialog();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )


  }

  CancleStatus2(poID, rowData) {
    this.showPageSpinner = true;
    this.paymentInvoiceDialogHeader = "Cancel PO";
    this.paymentEditFlag = false;
    this.paymentDetails = new PaymentDetails();
    this.paymentDetails.paymentDate = new Date();
    this.msgs = [];
    this.purcahseOrderId = poID;

    this.totalPaymentAmount = 0;
    this.addedPaymentAmount = 0;
    this.httpRestClient.getData("payment-details/" + poID + "")
      .subscribe(response => {
        this.paymentSearch = response;
        response.forEach((element) => {
          this.addedPaymentAmount = this.addedPaymentAmount + element.paymentAmount;
        });
        this.httpRestClient.getData("fr-details/" + poID + "")
          .subscribe(response => {
            this.frSearch = response;

            this.pendingPaymentAmount = parseInt(this.totalPaymentAmount) - parseInt(this.addedPaymentAmount);
            this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
              .subscribe(response => { this.paymentTypeList = response; });
          });
        this.totalPaymentAmount = rowData.totalAmount;
        // console.log(rowData);

      });
    this.purchaseOrdersBean.poID = rowData.poID
    setTimeout(() => {
      if (rowData.totalAmount == this.pendingPaymentAmount) {
        this.purchaseOrdersBean.poStatus = 'Cancelled';
      }
      else {
        this.purchaseOrdersBean.poStatus = 'Partial Cancelled';

      }
      this.showPageSpinner = false;

      this.CancleDialog2 = true;

    }, 2000);


    setTimeout(() => {
      this.oneTimeClick = false;
    }, 100);
  }



  //close FR Dialog
  closeCancleStatusDialog2() {
    this.CancleDialog2 = false;
    this.FrEditFlag = false;
    this.frDetails = new FRDetails();

    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
      response => {
        this.contractorPOsearch = response;
      });
  }

  cancelPO2() {
    // this.httpRestClient.postData("update-poStatus" , this.projectService.getter() ).subscribe(
    //   response => { this.supplierPOSearch = response; });
    this.purchaseOrdersBean.transactionCount = 1
    this.showPageSpinner = true;
    this.httpRestClient.postData("update-poStatus", this.purchaseOrdersBean).subscribe(
      response => {
        this.baseResponse = response;
        this.showPageSpinner = false;
        if (this.baseResponse['code'] == 'UPDATED') {
          this.closeCancleStatusDialog2();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }
      }
    )


  }

  validateEmail1(email): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }
  validateMultipleEmail(email) {
    this.emailRecipients = email.split(",");
    for (var i = 0; i < this.emailRecipients.length; i++) {
      if (this.emailRecipients[i] != "") {
        var flag = this.validateEmail1(this.emailRecipients[i]);
      }
    }
    return flag;
  }






  //reminder icon
  reminderIcon(poID, rowData) {
    this.poID = rowData.poID;
    this.paymentInvoiceDialogHeader = "Reminder Dialog";
    this.reminderFlag = true;
  }



  closeCancleReminderDialog() {
    this.reminderFlag = false;

  }

  ReminderMails() {
    if (this.payloadBean.searchParameter == undefined || this.payloadBean.searchParameter == '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter Email Address" });
    }
    else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });
    }
    else {
      console.log(this.payloadBean.searchParameter);

      this.httpRestClient.getData("reminderMail/" + this.payloadBean.searchParameter + "/" + this.poID)
        .subscribe(response => {
          this.paymentTypeMailList = response;
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: "Mail Send Successfully" });
          this.reminderFlag = false;

        });

      this.payloadBean.searchParameter = undefined;
    }

  }

  reminderIcon1(poID, rowData) {
    this.poID = rowData.poID;
    this.paymentInvoiceDialogHeader = "Reminder Dialog";
    this.reminderFlag1 = true;
  }



  closeCancleReminderDialog1() {
    this.reminderFlag1 = false;

  }

  ReminderMails1() {
    if (this.payloadBean.searchParameter == undefined || this.payloadBean.searchParameter == '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter Email Address" });
    }
    else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });
    }
    else {
      console.log(this.payloadBean.searchParameter);

      this.httpRestClient.getData("reminderMail/" + this.payloadBean.searchParameter + "/" + this.poID)
        .subscribe(response => {
          this.paymentTypeMailList = response;
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: "Mail Send Successfully" });
          this.reminderFlag1 = false;

        });

      this.payloadBean.searchParameter = undefined;

    }

  }
  async tabData() {
    var tabdata = await sessionStorage.getItem("tabData");
    //  if (tabdata != undefined ) {
    var data = tabdata.split(',');
    // if(data.length!==4){
    if (data[0].toUpperCase() == 'Y')
      this.tabFlag1 = false;
    else
      this.tabFlag1 = true;

    if (data[1].toUpperCase() == 'Y')
      this.tabFlag2 = false;
    else
      this.tabFlag2 = true;

    if (data[2].toUpperCase() == 'Y')
      this.tabFlag3 = false;
    else
      this.tabFlag3 = true;

    if (data[3].toUpperCase() == 'Y')
      this.tabFlag4 = false;
    else
      this.tabFlag4 = true;
    // }
    //}
    // else {
    //   this.tabFlag1 = true;
    //   this.tabFlag2 = true;
    //   this.tabFlag3 = true;
    //   this.tabFlag4 = true;
    // }
  }

  forBOQAmountCheck() {
    var totalAmount = 0;
    this.totalPaidAmount=0;
    var paymentAmount=0;
    var paymentAmount1=0;
    this.showPageSpinner = true;    
    this.httpRestClient.getData("fetch-boq-info/" + this.projectService.getter() + "").subscribe(
      response => {
        this.boqtableSearch = response;
        
        if (this.boqtableSearch.length > 0) {
          this.boqTotalAmount = this.boqtableSearch[this.boqtableSearch.length - 1].grandTotalOfBOQ;
        }
        else {
          this.boqTotalAmount = 0;
        }
      });

    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(
      response => {

        this.contractorPOsearch = response;
       
        for (var i = 0; i < this.contractorPOsearch.length; i++) {
         
          if (this.contractorPOsearch[i].poStatus != 'Cancelled' && this.contractorPOsearch[i].poStatus != 'Partial Cancelled') {
            totalAmount += this.contractorPOsearch[i].totalAmount;
          }
          else{
            if (this.contractorPOsearch[i].poStatus == 'Partial Cancelled') {
              this.httpRestClient.getData("sum/" + this.contractorPOsearch[i].poID + "")
              .subscribe(response => {
                this.paymentSearch = response;
                //if(this.paymentSearch.length>0)
               paymentAmount= this.paymentSearch[0].addition;
          });
        }            
            if (this.contractorPOsearch[i].poStatus == 'Partial Cancelled') {
              this.totalPaidAmount += this.contractorPOsearch[i].totalAmount;
            }
          }
        }
      });

    this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
      response => {
        this.supplierPOSearch = response;
        for (var i = 0; i < this.supplierPOSearch.length; i++) {
          if (this.supplierPOSearch[i].poStatus != 'Cancelled' && this.supplierPOSearch[i].poStatus != 'Partial Cancelled') {
            totalAmount += this.supplierPOSearch[i].totalAmount;
          }
          else{
            if (this.supplierPOSearch[i].poStatus == 'Partial Cancelled') {
              this.httpRestClient.getData("sum/" + this.supplierPOSearch[i].poID + "")
              .subscribe(response => {
                this.paymentSearch = response;
                //if(this.paymentSearch.length>0)
               paymentAmount1= this.paymentSearch[0].addition;
          });
        }     
            if (this.supplierPOSearch[i].poStatus == 'Partial Cancelled') {
              this.totalPaidAmount += this.supplierPOSearch[i].totalAmount;
            }
          }
        }    
        
      });
      setTimeout(() => {
        this.boqTotalAmount = this.boqTotalAmount - totalAmount-(this.totalPaidAmount-(paymentAmount+paymentAmount1));
        // alert(this.boqTotalAmount)
        this.showPageSpinner = false;

      },3000)
     
  }
  
}


