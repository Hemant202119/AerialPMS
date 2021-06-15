import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CurrentUser, PayloadBean, AccountUsers, RoleRights } from '../_models/data.model';
import { HttpRestClient } from '../_services/http-rest-client.service';
import { routeConfig } from '../app.config';


@Injectable()
export class RoleRightsGuard {
    currentuser: CurrentUser;
    accountUsers: AccountUsers;
    roleRights: RoleRights;
    flag: boolean;

    constructor(private router: Router, private http: HttpClient, private httpRestClient: HttpRestClient) {
        this.currentuser = new CurrentUser();
        this.accountUsers = new AccountUsers();
        this.roleRights = new RoleRights();
    }

    hasAllRoles(menuName: string) {
        this.currentuser = new CurrentUser();
        this.accountUsers = new AccountUsers();
        this.roleRights = new RoleRights();
        this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.accountUsers = JSON.parse(sessionStorage.getItem("accountUser"));

        this.roleRights.roleID = this.accountUsers.roleID;
        this.roleRights.accountId = this.accountUsers.accountID;

        //ADD here +++++++++++++

        this.roleRights.menuName = menuName;
        this.httpRestClient.postData('role-rights', this.roleRights)
            .subscribe(
                response => {
                    if (response != null && response != undefined) {
                        this.roleRights = response;
                        console.log(this.roleRights.insertAccess);
                        console.log(this.roleRights.updateAccess);
                        console.log(this.roleRights.deleteAccess);
                        console.log(this.roleRights.viewAccess);
                    } else {
                        this.router.navigate(['/access-denied']);
                    }

                }
            );

    }

}