import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageParameters } from '../_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from '../_screens/parameters/add-parameter/add-parameter.component';
import { MisStatusReportComponent } from '../_screens/reports/mis-status-report/mis-status-report.component';
import { ProjectStatusReportComponent } from '../_screens/reports/project-status-report/project-status-report.component';

const misPoRoutes: Routes = [
 { path: '', component: ProjectStatusReportComponent },
	 
];

@NgModule({
  imports: [ RouterModule.forChild(misPoRoutes) ],
  exports: [ RouterModule ]
})
export class MisPoRoutingModule { } 