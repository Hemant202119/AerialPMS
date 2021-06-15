import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Contacts } from '../contacts';
import { CountryService } from '../../../demo/service/countryservice';
import { Message } from 'primeng/primeng';
import { appStatusConfig, appConfig, routeConfig } from '../../../app.config';
import { CurrentUser, User } from '../../../_models/data.model';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: Contacts = new Contacts();
  showPageSpinner:boolean;
  filteredCountries: any[];
  msgs: Message[] = [];
  contactStatusDrpdown: any;
  entityStatus: any;
  currentuser: CurrentUser = new CurrentUser();
  baseResponse: any;
  editFlag: boolean;
  user: User = new User();
  postalBilingSame: boolean = true;
  params: any;

  constructor(private breadcrumbService: BreadcrumbService, private countryService: CountryService,
    public roleRightsGuard: RoleRightsGuard,
    private httpRestClient: HttpRestClient, private router: Router, private route: ActivatedRoute) {
    this.roleRightsGuard.hasAllRoles(routeConfig.contactMenu);
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.contact.contactStatus = appStatusConfig.activeName;
    this.route.params.subscribe(params => { this.params = params; });
    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/contacts']);
      }
      else {
        this.showPageSpinner=true;
        this.httpRestClient.getData("edit-contact/" + decrypted + "")
          .subscribe(response => {
            this.contact = response;
            this.contactStatusDrpdown.forEach(element => {
              if (element == this.contact.contactStatus) {
                this.contact.contactStatus = element;
              }
            });
            this.entityStatus.forEach(element => {
              if (element == this.contact.entityType) {
                this.contact.entityType = element;
              }
            });
            this.editFlag = true;
            this.breadcrumbService.setItems([
              { label: 'Settings' },
              { label: 'Contacts', routerLink: ['/contacts'] },
              { label: 'Edit Contact'}
            ]);
            this.showPageSpinner=false;
          });
      }
    }

    this.breadcrumbService.setItems([
      { label: 'Settings' },
      { label: 'Contacts', routerLink: ['/contacts'] },
      { label: 'Add Contact'},
    ]);
    this.contactStatusDrpdown = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName },
    ];

    this.entityStatus = [
      { label: "Individual", value: "Individual" },
      { label: "Business", value: "Business" },
    ];

  }

  onClear() {
    if (this.postalBilingSame) {
      this.contact.billingAddress1 = '';
      this.contact.billingAddress2 = '';
      this.contact.billingCity = '';
      this.contact.billingCountry = '';
      this.contact.billingPincode = '';
      this.contact.billingState = '';
    }
  }
  validateEmail(email): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }
  addContact() {
    if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      if ( this.contact.contactType == undefined || this.contact.contactType == '' ) {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "Please Select a Contact Type" });
      }
      else if (  this.contact.entityType == undefined || this.contact.entityType == '') {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "Please Select an Option in Entity Type" });
      }
      else if (this.contact.contactStatus == undefined || this.contact.contactStatus.trim() == '') {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "Please Select an Option in Contact Status" });
      }
      else if (this.contact.entityType.trim() == 'Business' && (this.contact.businessName == undefined || this.contact.businessName.trim() == '' )) {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "Business Name Can't be Blank" });
      }
      else if (this.contact.entityType.trim() == 'Individual' && (  this.contact.firstName == undefined || this.contact.firstName.trim() == '' )) {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "First Name Can't be Blank" });
      }
      else if (this.contact.entityType.trim() == 'Individual' && ( this.contact.lastName == undefined || this.contact.lastName.trim() == '' )) {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "Last Name Can't be Blank" });
      }
      else if (this.contact.emailAddress!=undefined && this.contact.emailAddress.trim()!='' && !this.validateEmail(this.contact.emailAddress)  ) {
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "Error Message", detail: "Please enter valid email Address" });
      }
      else {
        if (!this.editFlag) {
          this.user = JSON.parse(sessionStorage.getItem("credentials"));
          this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
          this.contact.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-contact", this.contact).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse) {
                if (this.baseResponse['code'] == 'ADDED') {
                  sessionStorage.setItem("successMessage", "AddedSuccess");
                  this.router.navigate(['/contacts']);
                } else {
                  this.msgs = [];
                  this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
                }
              } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: '', detail: 'Some thing Wrong Please try again!' });
              }
            });
        }
        else {
          this.user = JSON.parse(sessionStorage.getItem("credentials"));
          this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
          this.contact.lastModifiedBy = this.currentuser.userID;
          // this.contact.entityType=this.contact.entityType.value;
          // this.contact.contactStatus=this.contact.contactStatus.value;
          this.httpRestClient.putData("update-contact", this.contact).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/contacts']);
              } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            });
        }
      }
    }
  }
  ngOnInit() {

  }

}
