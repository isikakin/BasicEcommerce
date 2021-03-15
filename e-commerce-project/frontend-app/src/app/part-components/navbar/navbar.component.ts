import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authorization/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  localUser: any;
  user: any;

  constructor(public authService: AuthService, public router: Router) {
    this.getUser();
  }

  ngOnInit() {
  }

  getUser() {
    this.localUser = this.authService.getUser;
    this.user = JSON.parse(this.localUser);
    return this.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
