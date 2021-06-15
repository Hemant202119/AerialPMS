import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageParameters } from '../_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from '../_screens/parameters/add-parameter/add-parameter.component';
import { ManageApprovalComponent } from '../_screens/PO Approval/manage-approval/manage-approval.component';

const poApprovalRoutes: Routes = [

      { path: '', component: ManageApprovalComponent },
     
];

@NgModule({
  imports: [ RouterModule.forChild(poApprovalRoutes) ],
  exports: [ RouterModule ]
})
export class PoApprovalRoutingModule { } 