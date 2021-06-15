import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { AddRoleComponent } from '../_screens/roles/add-role/add-role.component';
import { ManageRoleComponent } from '../_screens/roles/manage-role/manage-role.component';
import { MisStatusReportComponent } from '../_screens/reports/mis-status-report/mis-status-report.component';
import { ManageUseItemsComponent } from '../_screens/useItems/manage-use-items/manage-use-items.component';
import { EditUseItemsComponent } from '../_screens/useItems/edit-use-items/edit-use-items.component';

const misReportRoutes: Routes = [
	 
  { path: '', component: ManageUseItemsComponent },
 { path: 'edit-use-items/:id', component: EditUseItemsComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(misReportRoutes) ],
  exports: [ RouterModule ]
})
export class useItemsRoutingModule { } 