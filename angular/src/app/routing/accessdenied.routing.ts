import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { AccessDeniedComponent } from '../pages/access-denied/access-denied.component';

const AccessDeniedRoutes: Routes = [
	 
    { path: '', component: AccessDeniedComponent },
	  
];

@NgModule({
  imports: [ RouterModule.forChild(AccessDeniedRoutes) ],
  exports: [ RouterModule ]
})
export class AccessDeniedRoutingModule { } 