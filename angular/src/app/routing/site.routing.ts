import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHome } from '../app.home.component';
import { LoginGuard } from '../_guards/login.guard';
import { ManageSitesComponent } from '../_screens/sites/manage-sites/manage-sites.component';
import { AddSiteComponent } from '../_screens/sites/add-site/add-site.component';

const siteRoutes: Routes = [
  // { 
	//   path: '',
  //         component: ManageSitesComponent,
  //         children: [ 
  //       { path: 'sites', component: ManageSitesComponent },
  //       { path: 'sites/add-site', component: AddSiteComponent },
  //       { path: 'sites/edit-site/:id', component: AddSiteComponent },
  //         ]
  //       },
        {path: '',component: ManageSitesComponent,},
        { path: 'edit-site/:id', component: AddSiteComponent },
        { path: 'add-site', component: AddSiteComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(siteRoutes) ],
  exports: [ RouterModule ]
})
export class SiteRoutingModule {
  constructor(){console.log('Site Routing module');console.log(siteRoutes);
  console.log(RouterModule.prototype);}
 } 