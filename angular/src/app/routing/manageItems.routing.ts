import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { AddRoleComponent } from '../_screens/roles/add-role/add-role.component';
import { ManageRoleComponent } from '../_screens/roles/manage-role/manage-role.component';
import { MisStatusReportComponent } from '../_screens/reports/mis-status-report/mis-status-report.component';
import { ManageAssetsComponent } from '../_screens/Assets/manage-assets/manage-assets.component';
import { AddAssetComponent } from '../_screens/Assets/add-asset/add-asset.component';

const misReportRoutes: Routes = [
	 
  { path: '', component: ManageAssetsComponent },
  { path: 'add-assets', component: AddAssetComponent },
  { path: 'edit-assets/:id', component: AddAssetComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(misReportRoutes) ],
  exports: [ RouterModule ]
})
export class manageItemRoutingModule { } 