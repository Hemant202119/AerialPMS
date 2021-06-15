import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Circle } from '../circles';
import { Message } from 'primeng/components/common/message';
import { Form } from '@angular/forms';
import { HttpRestClient } from '../../../_services/http-rest-client.service';
import { User, CurrentUser } from '../../../_models/data.model';
import * as CryptoJS from 'crypto-js';
import { appConfig, appStatusConfig, routeConfig } from '../../../app.config';
import { RoleRightsGuard } from '../../../_guards/role-rights.guard';
@Component({
  selector: 'app-add-circle',
  templateUrl: './add-circle.component.html',
  styleUrls: ['./add-circle.component.css']
})
export class AddCircleComponent implements OnInit {
  status: any;
  showPageSpinner:boolean;
  msgs: Message[] = [];
  circle: Circle = new Circle();
  baseResponse: any;
  user: User = new User();
  editFlag: boolean;
  params: any;
  currentuser: CurrentUser = new CurrentUser();


  constructor(private httpRestClient: HttpRestClient, private router: Router, private route: ActivatedRoute,
    public roleRightsGuard: RoleRightsGuard, private breadcrumbService: BreadcrumbService) {
    this.roleRightsGuard.hasAllRoles(routeConfig.circleMenu);

    this.user = JSON.parse(sessionStorage.getItem("credentials"));
    this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.circle.circleStatus = appStatusConfig.activeName;
    this.route.params.subscribe(params => { this.params = params; });

    if (this.params['id'] != null || this.params['id'] != undefined) {
      var plaintext = CryptoJS.AES.decrypt(this.params['id'].toString(), appConfig.privateKey);
      var decrypted = plaintext.toString(CryptoJS.enc.Utf8);
      if (decrypted == '' || decrypted == null || decrypted == undefined) {
        this.router.navigate(['/circles']);
      }
      else {
        this.showPageSpinner=true;
        this.httpRestClient.getData("edit-circle/" + decrypted + "")
          .subscribe(response => {
            this.circle = response;
            this.editFlag = true;
            this.breadcrumbService.setItems([
              { label: 'Manage' },
              { label: 'Circles', routerLink: ['/circles'] },
              { label: 'Edit Circle' }
            ]);
            this.showPageSpinner=false;
          });
      }
    }

    this.breadcrumbService.setItems([
      { label: 'Manage' },
      { label: 'Circles', routerLink: ['/circles'] },
      { label: 'Add Circle'}
    ]);
  }
  addCircle() {
    if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
      if ( this.circle.circleName == undefined || this.circle.circleName.trim() == '') {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Circle Name Can't be Blank!" })
      }
      else if ( this.circle.circleStatus == undefined || this.circle.circleStatus == null ) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Circle Status Can't be Blank!" })
      }
      else {
        if (!this.editFlag) {
          this.circle.createdBy = this.currentuser.userID;
          this.httpRestClient.postData("add-circle", this.circle).subscribe(
            response => {
              this.baseResponse = response;
              if (this.baseResponse) {
                if (this.baseResponse['code'] == 'ADDED') {
                  sessionStorage.setItem("successMessage", "AddedSuccess");
                  this.router.navigate(['/circles']);
                } else {
                  this.msgs = [];
                  this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
                }

              } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: '', detail: 'Some thing Wrong Please try again!' });
              }
            });
        }
        else {
          this.circle.lastModifiedBy = this.currentuser.userID;
          this.httpRestClient.putData("update-circle", this.circle).subscribe(
            response => {
              this.baseResponse = response;

              if (this.baseResponse['code'] == 'UPDATED') {
                sessionStorage.setItem("successMessage", "UpdateSuccess");
                this.router.navigate(['/circles']);
              } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
              }
            });
        }
      }
    }
  }
  ngOnInit() {
    this.status = [
      { label: appStatusConfig.activeName, value: appStatusConfig.activeName },
      { label: appStatusConfig.inactiveName, value: appStatusConfig.inactiveName }
    ];
  }

}
