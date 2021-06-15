import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageUsersComponent } from '../_screens/users/manage-users/manage-users.component';
import { AddUserComponent } from '../_screens/users/add-user/add-user.component';

const userRoutes: Routes = [
	 
      { path: '', component: ManageUsersComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: AddUserComponent },
	 
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { } 