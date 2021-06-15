import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { AccessDeniedComponent } from '../pages/access-denied/access-denied.component';
import { SiteStatusReportComponent } from '../_screens/reports/site-status-report/site-status-report.component';

const sitesStatusRoutes: Routes = [
	 
    { path: '', component: SiteStatusReportComponent },
	  
];

@NgModule({
  imports: [ RouterModule.forChild(sitesStatusRoutes) ],
  exports: [ RouterModule ]
})
export class SiteStatusReportRoutingModule { } 