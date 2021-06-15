import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageParameters } from '../_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from '../_screens/parameters/add-parameter/add-parameter.component';

const parameterRoutes: Routes = [

      { path: '', component: ManageParameters },
      { path: 'add-parameter', component: AddParameter },
      { path: 'edit-parameter/:id', component: AddParameter },
	 
];

@NgModule({
  imports: [ RouterModule.forChild(parameterRoutes) ],
  exports: [ RouterModule ]
})
export class ParameterRoutingModule { } 