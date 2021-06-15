import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { LoginComponent } from './_login/login.component';
import { LoginGuard } from './_guards/login.guard';
import { NologinGuard } from './_guards/nologin.guard';
import { AppHome } from './app.home.component';
import { ManageParameters } from './_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from './_screens/parameters/add-parameter/add-parameter.component';
import { ManageCirclesComponent } from './_screens/circles/manage-circles/manage-circles.component';
import { AddCircleComponent } from './_screens/circles/add-circle/add-circle.component';
import { Project } from './_screens/projects/project';
import { AddProjectComponent } from './_screens/projects/add-project/add-project.component';
import { ManageProjectsComponent } from './_screens/projects/manage-projects/manage-projects.component';
import { ManageSitesComponent } from './_screens/sites/manage-sites/manage-sites.component';
import { AddSiteComponent } from './_screens/sites/add-site/add-site.component';
import { ManageContactsComponent } from './_screens/contacts/manage-contacts/manage-contacts.component';
import { AddContactComponent } from './_screens/contacts/add-contact/add-contact.component';
import { SiteService } from './_screens/sites/site-service';
import { RoleRightsGuard } from './_guards/role-rights.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ManageRoleComponent } from './_screens/roles/manage-role/manage-role.component';
import { AddRoleComponent } from './_screens/roles/add-role/add-role.component';
import { ManageUserRightsComponent } from './_screens/user_rights/manage-user-rights/manage-user-rights.component';
import { AddUserRightComponent } from './_screens/user_rights/add-user-right/add-user-right.component';
import { ManageApprovalComponent } from './_screens/PO Approval/manage-approval/manage-approval.component';
import { ManageUsersComponent } from './_screens/users/manage-users/manage-users.component';
import { AddUserComponent } from './_screens/users/add-user/add-user.component';
import { UserProfileComponent } from './_screens/user-profile/user-profile/user-profile.component';
import { SiteStatusReportComponent } from './_screens/reports/site-status-report/site-status-report.component';
import { MisStatusReportComponent } from './_screens/reports/mis-status-report/mis-status-report.component';
import { DashboardComponent } from './_screens/dashboard/dashboard/dashboard.component';
import { ProjectStatusReportComponent } from './_screens/reports/project-status-report/project-status-report.component';
import { ManageAssetsComponent } from './_screens/Assets/manage-assets/manage-assets.component';
import { AddAssetComponent } from './_screens/Assets/add-asset/add-asset.component';
import { ManageReceiveItemsComponent } from './_screens/receiveItems/manageReceiveItems/manage-receive-items.component';
import { AddReceiveItemsComponent } from './_screens/receiveItems/addReceiveItems/add-receive-items.component';
import { ManageUseItemsComponent } from './_screens/useItems/manage-use-items/manage-use-items.component';
import { EditUseItemsComponent } from './_screens/useItems/edit-use-items/edit-use-items.component';



export const routes: Routes = [
    {
        path: '', component: AppHome, canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },


           { path: 'sites', loadChildren: 'app/modules/site.modules#SiteModule' },
            { path: 'roles',loadChildren: 'app/modules/role.modules#RoleModule' },
             { path: 'users', loadChildren: 'app/modules/user.modules#UserModule' },
            { path: 'parameters', loadChildren: 'app/modules/parameter.modules#ParameterModule' },
           
           // { path: 'dashboard',loadChildren: 'app/modules/dasboard.modules#DashboardModule'  },

             { path: 'user-profile',loadChildren: 'app/modules/userprofile.modules#UserProfileModule' },

             { path: 'access-denied',loadChildren: 'app/modules/accessdenied.modules#AccessDeniedModule' },



        //    { path: 'sites', component: ManageSitesComponent },
        //    { path: 'sites/add-site', component: AddSiteComponent },
        //    { path: 'sites/edit-site/:id', component: AddSiteComponent },

        //     { path: 'roles', component: ManageRoleComponent },
        //     { path: 'roles/add-role', component: AddRoleComponent },
        //     { path: 'roles/edit-role/:id', component: AddRoleComponent },

        //     { path: 'users', component: ManageUsersComponent },
        //     { path: 'users/add-user', component: AddUserComponent },
        //     { path: 'users/edit-user/:id', component: AddUserComponent },

        //     { path: 'parameters', component: ManageParameters },
        //     { path: 'parameters/add-parameter', component: AddParameter },
        //     { path: 'parameters/edit-parameter/:id', component: AddParameter },

        //     { path: 'user-profile', component: UserProfileComponent },projectModule

        { path: 'projects', loadChildren: 'app/modules/viewProject.modules#PoApprovalModule'},

            // { path: 'projects', component: ManageProjectsComponent },
            // { path: 'projects/add-project', component: AddProjectComponent },
            // { path: 'projects/edit-project/:id', component: AddProjectComponent },

            { path: 'circles',loadChildren: 'app/modules/circle.modules#CircleModule' },
            // { path: 'circles/add-circle', component: AddCircleComponent },
            // { path: 'circles/edit-circle/:id', component: AddCircleComponent },

            { path: 'contacts', loadChildren: 'app/modules/contact.modules#ContactModule' },
            // { path: 'contacts/add-contact', component: AddContactComponent },
            // { path: 'contacts/edit-contact/:id', component: AddContactComponent },

            { path: 'user-rights', loadChildren: 'app/modules/userright.modules#UserRightModule'},
       

            { path: 'site-status-report', loadChildren:'app/modules/siteStatusReport.modules#SiteStatusReportModule' },
            { path: 'mis-status-report', loadChildren: 'app/modules/misReport.modules#misReportModule' },

          //  { path: 'mis-status-report',loadChildren: 'app/modules/misPoWiseReport.modules#MisPoWiseReport'},
            { path: 'supplier-contractor-report',loadChildren: 'app/modules/misPoWiseReport.modules#MisPoWiseReport' },

            { path: 'approval', loadChildren:'app/modules/poApproval.modules#PoApprovalModule' },

        //    { path: 'access-denied', component: AccessDeniedComponent },
            { path: 'manage-assets',loadChildren:'app/modules/manageItems.modules#ManageItemsReport' },
            // { path: 'add-assets', component: AddAssetComponent },
            // { path: 'edit-assets/:id', component: AddAssetComponent },
            { path: 'receive-items', loadChildren:'app/modules/receiveItems.modules#receiveItemModule' },
            // { path: 'receive-items/add-receive-items', component: AddReceiveItemsComponent },
            // { path: 'receive-items/edit-receive-items/:id', component: AddReceiveItemsComponent },
             { path: 'manage-use-items',loadChildren:'app/modules/useItems.modules#UseItemsModule' },
            // { path: 'manage-use-items/edit-use-items/:id', component: EditUseItemsComponent },
        ]
    },
    { path: 'login', component: LoginComponent, canActivate: [NologinGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
