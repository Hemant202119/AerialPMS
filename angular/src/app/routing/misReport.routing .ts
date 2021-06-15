import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { AddRoleComponent } from '../_screens/roles/add-role/add-role.component';
import { ManageRoleComponent } from '../_screens/roles/manage-role/manage-role.component';
import { MisStatusReportComponent } from '../_screens/reports/mis-status-report/mis-status-report.component';

const misReportRoutes: Routes = [
	 
  { path: '', component: MisStatusReportComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(misReportRoutes) ],
  exports: [ RouterModule ]
})
export class misReportRoutingModule { } 