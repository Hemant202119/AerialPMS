import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CurrentUser, AccountUsers, PayloadBean, RoleRights } from '../../_models/data.model';
import { appConfig } from '../../app.config';
import { HttpRestClient } from '../../_services/http-rest-client.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SiteService implements CanActivate {
  currentuser:CurrentUser=new CurrentUser();
  payloadBean:PayloadBean = new PayloadBean();
  accountUsers:AccountUsers=new AccountUsers();
  roleRights:RoleRights= new RoleRights();
  id:any;

  onSelectedContactsChangedSubscription: Subscription;

  constructor(private http: HttpClient,private httpRestClient:HttpRestClient) { 
    this.currentuser=  JSON.parse(sessionStorage.getItem("currentUser"));
    this.accountUsers=  JSON.parse(sessionStorage.getItem("accountUser")); 
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("++++++++++++++++++++++++++++++++++"+next+"-------------"+state);
    this.roleRights.roleID=this.accountUsers.roleID;
    this.roleRights.menuName="SITES";
     this.httpRestClient.postData('role-rights',this.roleRights)
        .subscribe(
                response => {
                  console.log("______"+response);
                this.roleRights =response;
                console.log("______"+  this.roleRights.viewAccess);
                console.log("______"+  this.roleRights.insertAccess);
                console.log("______"+  this.roleRights.deleteAccess);
                console.log("______"+  this.roleRights.updateAccess);
                }
                );
    return true;
  }

    
  
 

  setter(id:any){
    this.id=id;
  }
  
  getter(){
      return this.id;
  }
}