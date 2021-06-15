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

const circleRoutes: Routes = [

  { path: '', component: ManageCirclesComponent },
  { path: 'add-circle', component: AddCircleComponent },
  { path: 'edit-circle/:id', component: AddCircleComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(circleRoutes) ],
  exports: [ RouterModule ]
})
export class circleRoutingModule { } 