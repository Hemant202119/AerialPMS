import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Contacts, ContactsEntityTO, DeleteRecords } from '../contacts';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { User, CurrentUser } from '../../../_models/data.model';
import { appConfig, appStatusConfig, messageConfig, routeConfig } from '../../../app.config';
import { Message } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';

@Component({
  selector: 'app-manage-contacts',
  templateUrl: './manage-contacts.component.html',
  styleUrls: ['./manage-contacts.component.css']
})
export class ManageContactsComponent implements OnInit {
  manageStatus: any;
  cols: any[];
  showPageSpinner:boolean;
  user: User = new User();
  status: any[];
  currentuser: CurrentUser = new CurrentUser();
  msgs: Message[] = [];
  selectedContact: any;
  contactsentityTO: ContactsEntityTO[];
  contacts: Contacts = new Contacts();
  deleterecords: DeleteRecords = new DeleteRecords();
  baseResponse: any;
  constructor(private breadcrumbService: BreadcrumbService, public roleRightsGuard: RoleRightsGuard, private httpRestClient: HttpRestClient, private router: Router,
    private confirmationService: ConfirmationService) {

    this.roleRightsGuard.hasAllRoles(routeConfig.contactMenu);
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.breadcrumbService.setItems([
      { label: 'Settings' },
      { label: 'Contacts'},

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
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.showPageSpinner=true;
    this.httpRestClient.getData("search-contact").subscribe(
      response => {
        this.contactsentityTO = response;
        this.showPageSpinner=false;
      }
    );
  }
  searchContacts(event) {
    this.showPageSpinner=true;
    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.httpRestClient.getData("search-contact-on-criteria/" + event.value + "").subscribe(
      response => {
        this.contactsentityTO = response;
        this.showPageSpinner=false;
      });
  }

  addContact() {
    if (this.roleRightsGuard.roleRights.insertAccess) {
      this.router.navigate(['/contacts/add-contact']);
    }
  }
  editContact(contactID) {
    if (this.roleRightsGuard.roleRights.viewAccess) {
      var ciphertext = CryptoJS.AES.encrypt(contactID.toString(), appConfig.privateKey);
      this.router.navigate(['/contacts/edit-contact', ciphertext.toString()]);
    }
  }

  ngOnInit() {
    this.cols = [
      { field: 'businessName', header: 'Business Name', id: 'contactID' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'contactType', header: 'Contact Type',class: "table-status" },
      { field: 'contactStatus', header: 'Contact Status', class: "table-status"  },


    ];


    this.status = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName },
      { label: appStatusConfig.allName, value: appStatusConfig.allName },

    ];
  }

  confirm() {
    if (this.roleRightsGuard.roleRights.deleteAccess) {
      if (this.selectedContact == null || this.selectedContact == undefined) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: messageConfig.deleteWarning })
      }
      else {
        this.confirmationService.confirm({
          message: 'Would you like to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this.deleteContact();
          },
          reject: () => {

          }
        });
      }
    }
  }

  deleteContact() {

    this.deleterecords.id = this.selectedContact.contactID;
    this.deleterecords.modifiedBy = this.currentuser.userID;
    this.deleterecords.transactionCount = this.selectedContact.transactionCount;
    this.httpRestClient.deleteData("delete-contact", this.deleterecords).subscribe(
      response => {
        this.baseResponse = response;
        if (this.baseResponse['code'] == 'DELETED') {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.deleteSuccess });
          const index = this.contactsentityTO.indexOf(this.selectedContact);
          if (index !== -1) {
            this.contactsentityTO.splice(index, 1);
          }
        }
        else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        }

      });
  }
}