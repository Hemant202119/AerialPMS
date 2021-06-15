import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { UserProfileComponent } from '../_screens/user-profile/user-profile/user-profile.component';

const UserProfileRoutes: Routes = [
	 
    { path: '', component: UserProfileComponent },
	  
];

@NgModule({
  imports: [ RouterModule.forChild(UserProfileRoutes) ],
  exports: [ RouterModule ]
})
export class UserProfileRoutingModule { } 