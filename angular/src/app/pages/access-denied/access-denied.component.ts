import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(private router: Router,private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      { label: 'Access Denied' }
    ]);
  }

  ngOnInit() {
  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }

}
