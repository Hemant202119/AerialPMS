import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from './app.component';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html',
    styles: ['@keyframes ui-progress-spinner-color { 100%, 0% { stroke: #d62d20; }40% {stroke: #0057e7;}66% {stroke: #008744;} 80%,90% {stroke: #ffa700; }}']
})
export class AppBreadcrumbComponent implements OnDestroy {

    subscription: Subscription;

    showProgressSpinner: boolean;

    items: MenuItem[];

    constructor(public breadcrumbService: BreadcrumbService,private router : Router) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
