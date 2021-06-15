import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';
import 'rxjs/add/operator/toPromise';

import { AccordionModule, ConfirmationService } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ColorPickerModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


import { AppComponent } from './app.component';
import { AppHome } from './app.home.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { LoginComponent } from './_login/login.component';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';

import { ManageProjectsComponent } from './_screens/projects/manage-projects/manage-projects.component';
import { AddProjectComponent } from './_screens/projects/add-project/add-project.component';

import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';

import { CarService } from './demo/service/carservice';
import { CountryService } from './demo/service/countryservice';
import { EventService } from './demo/service/eventservice';
import { NodeService } from './demo/service/nodeservice';
import { BreadcrumbService } from './breadcrumb.service';

/** Services */
import {LoginGuard} from './_guards/login.guard';
import {NologinGuard} from './_guards/nologin.guard';
import { HttpRestClient } from './_services/http-rest-client.service';
import { DateFormatPipe } from './_core/date-format';
import { DateTimeFormatPipe } from './_core/date-time-format';
import { ParameterService } from './_screens/parameters/parameter-service';
import { ManageCirclesComponent } from './_screens/circles/manage-circles/manage-circles.component';
import { AddCircleComponent } from './_screens/circles/add-circle/add-circle.component';
import { ManageContactsComponent } from './_screens/contacts/manage-contacts/manage-contacts.component';
import { AddContactComponent } from './_screens/contacts/add-contact/add-contact.component';
import { SiteService } from './_screens/sites/site-service';
import { RoleRightsGuard } from './_guards/role-rights.guard';
import { ManageUserRightsComponent } from './_screens/user_rights/manage-user-rights/manage-user-rights.component';
import { AddUserRightComponent } from './_screens/user_rights/add-user-right/add-user-right.component';
import { ManageApprovalComponent } from './_screens/PO Approval/manage-approval/manage-approval.component';


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
import { ManageParameters } from './_screens/parameters/manage-parameters/manage-parameters.component';
import { AddParameter } from './_screens/parameters/add-parameter/add-parameter.component';
import { ManageSitesComponent } from './_screens/sites/manage-sites/manage-sites.component';
import { AddSiteComponent } from './_screens/sites/add-site/add-site.component';
import { AddRoleComponent } from './_screens/roles/add-role/add-role.component';
import { ManageRoleComponent } from './_screens/roles/manage-role/manage-role.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ManageUsersComponent } from './_screens/users/manage-users/manage-users.component';
import { AddUserComponent } from './_screens/users/add-user/add-user.component';
import { UserProfileComponent } from './_screens/user-profile/user-profile/user-profile.component';








@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        KeyFilterModule,
        ProgressSpinnerModule,
        
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent,
        AppBreadcrumbComponent,
        AppHome,
        SampleDemoComponent,
        FormsDemoComponent,
        DataDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        ChartsDemoComponent,
        FileDemoComponent,
        MiscDemoComponent,
        EmptyDemoComponent,
        LoginComponent,   
        DocumentationComponent,       
         DashboardComponent,   
        // ManageAssetsComponent,
        // AddAssetComponent,        
        // ManageUseItemsComponent,
        // EditUseItemsComponent
       ],    
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },ConfirmationService,SiteService,RoleRightsGuard,
        CarService, CountryService, EventService, NodeService, BreadcrumbService,LoginGuard,NologinGuard,HttpRestClient
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
