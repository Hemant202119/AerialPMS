import { Component } from '@angular/core';
import { User } from './_models/data.model';
import { Router } from '@angular/router';
import { AppHome } from './app.home.component';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    user:User=new User();
    currentUser :any;
    darkThemeMenu: MenuItem[];
    lightThemeMenu:MenuItem[];
    switchTheme:boolean;
    constructor(public app: AppHome,private router : Router) {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.switchTheme=true;
        this.darkThemeMenu=[
            {
                        label: 'Dark', icon: 'fa fa-fw fa-circle', badge: '8',
                        items: [
                            {
                                label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('blue-dark'); }
                            },
                            {
                                label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('green-dark'); }
                            },
                            {
                                label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('cyan-dark'); }
                            },
                            {
                                label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('purple-dark'); }
                            },
                            {
                                label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('indigo-dark'); }
                            },
                            {
                                label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('yellow-dark'); }
                            },
                            {
                                label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('orange-dark'); }
                            },
                            {
                                label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('pink-dark'); }
                            }
                        ]
                    }
                ]
        this.lightThemeMenu=[
            {
                        label: 'Light', icon: 'fa fa-fw fa-circle-o', badge: '8',
                        items: [
                            {
                                label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('blue-light'); }
                            },
                            {
                                label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('green-light'); }
                            },
                            {
                                label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('cyan-light'); }
                            },
                            {
                                label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('purple-light'); }
                            },
                            {
                                label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('indigo-light'); }
                            },
                            {
                                label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('yellow-light'); }
                            },
                            {
                                label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('orange-light'); }
                            },
                            {
                                label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('pink-light'); }
                            }
                        ]
                    }
                ]        
    }

    themeChange(e) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        const href = themeLink.href;
        const themeFile = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
        const themeTokens = themeFile.split('-');
        const themeName = themeTokens[1];
        const themeMode = themeTokens[2];
        const newThemeMode = (themeMode === 'dark') ? 'light' : 'dark';
        this.switchTheme=(themeMode === 'dark') ? true : false;
        this.app.changeTheme(themeName + '-' + newThemeMode);
    }

    accountSetting(){
        this.router.navigate(['/user-profile']);
    }

    
    logout() {
        // remove user from local storage to log user out
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
