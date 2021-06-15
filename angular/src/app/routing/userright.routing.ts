import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { ManageUserRightsComponent } from '../_screens/user_rights/manage-user-rights/manage-user-rights.component';
import { AddUserRightComponent } from '../_screens/user_rights/add-user-right/add-user-right.component';

const userRightRoutes: Routes = [
	 
  { path: '', component: ManageUserRightsComponent },
  { path: 'add-edit-user-rights', component: AddUserRightComponent },
	  
];

@NgModule({
  imports: [ RouterModule.forChild(userRightRoutes) ],
  exports: [ RouterModule ]
})
export class UserRightRoutingModule { } 