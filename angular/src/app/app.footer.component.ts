import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <div class="layout-footer upper-footer topbar">
        <div class="clearfix">
          
          <span class="footer-text-right">
              <ul>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">About Us</a></li>
              </ul>    
          </span>
        </div>
      </div>
      <div class="atBottom topbar">
        <div class="clearfix profile">
        <div class="ui-g">
          <div class="ui-g-12 ui-sm-4 ui-md-4">
            <span class="footer-Logo"><img class="logo" alt="apollo-layout" src="assets/layout/images/company_logo.png" /></span>
          </div>
          <div class="ui-g-12 ui-sm-4 ui-md-4">  
            <span class="footer-text-center username">Edios Software Solutions</span>
          </div>
          <div class="ui-g-12 ui-sm-4 ui-md-4">  
            <span class="footer-text-right username">© edios 2018 All Rights Reserved</span>
          </div>  
        </div>
      </div>
    `
})
export class AppFooterComponent {

}
