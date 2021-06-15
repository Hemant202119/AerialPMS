import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageParameters } from '../_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from '../_screens/parameters/add-parameter/add-parameter.component';
import { ManageApprovalComponent } from '../_screens/PO Approval/manage-approval/manage-approval.component';
import { ManageReceiveItemsComponent } from '../_screens/receiveItems/manageReceiveItems/manage-receive-items.component';
import { AddReceiveItemsComponent } from '../_screens/receiveItems/addReceiveItems/add-receive-items.component';

const poApprovalRoutes: Routes = [

            { path: '', component: ManageReceiveItemsComponent },
            { path: 'add-receive-items', component: AddReceiveItemsComponent },
            { path: 'edit-receive-items/:id', component: AddReceiveItemsComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(poApprovalRoutes) ],
  exports: [ RouterModule ]
})
export class receiveItemRoutingModule { } 