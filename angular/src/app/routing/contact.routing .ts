import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageParameters } from '../_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from '../_screens/parameters/add-parameter/add-parameter.component';
import { ManageApprovalComponent } from '../_screens/PO Approval/manage-approval/manage-approval.component';
import { ManageReceiveItemsComponent } from '../_screens/receiveItems/manageReceiveItems/manage-receive-items.component';
import { AddReceiveItemsComponent } from '../_screens/receiveItems/addReceiveItems/add-receive-items.component';
import { ManageCirclesComponent } from '../_screens/circles/manage-circles/manage-circles.component';
import { AddCircleComponent } from '../_screens/circles/add-circle/add-circle.component';
import { ManageContactsComponent } from '../_screens/contacts/manage-contacts/manage-contacts.component';
import { AddContactComponent } from '../_screens/contacts/add-contact/add-contact.component';

const contactRoutes: Routes = [

  { path: '', component: ManageContactsComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'edit-contact/:id', component: AddContactComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(contactRoutes) ],
  exports: [ RouterModule ]
})
export class ContactRoutingModule { } 