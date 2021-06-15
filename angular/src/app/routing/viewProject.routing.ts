import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageParameters } from '../_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from '../_screens/parameters/add-parameter/add-parameter.component';
import { ManageApprovalComponent } from '../_screens/PO Approval/manage-approval/manage-approval.component';
import { ManageProjectsComponent } from '../_screens/projects/manage-projects/manage-projects.component';
import { AddProjectComponent } from '../_screens/projects/add-project/add-project.component';

const viewPRoutes: Routes = [

  { path: '', component: ManageProjectsComponent },
  { path: 'add-project', component: AddProjectComponent },
 { path: 'edit-project/:id', component: AddProjectComponent },

     
];

@NgModule({
  imports: [ RouterModule.forChild(viewPRoutes) ],
  exports: [ RouterModule ]
})
export class ViewProjectRoutingModule { } 