import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authorization/auth/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export var ROUTES: RouteInfo[] = [
  { path: 'products', title: 'Ürünler', icon: 'fa fa-shopping-cart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];
  localUser: any;
  user: any;

  constructor(public authService: AuthService) {
    this.getUser();
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  getUser() {
    this.localUser = this.authService.getUser;
    this.user = JSON.parse(this.localUser);
    return this.user;
  }
}
