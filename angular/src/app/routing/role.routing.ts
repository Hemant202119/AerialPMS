import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { AddRoleComponent } from '../_screens/roles/add-role/add-role.component';
import { ManageRoleComponent } from '../_screens/roles/manage-role/manage-role.component';

const roleRoutes: Routes = [
	 
        { path: '', component: ManageRoleComponent },
        { path: 'add-role', component: AddRoleComponent },
        { path: 'edit-role/:id', component: AddRoleComponent },
	  
];

@NgModule({
  imports: [ RouterModule.forChild(roleRoutes) ],
  exports: [ RouterModule ]
})
export class RoleRoutingModule { } 