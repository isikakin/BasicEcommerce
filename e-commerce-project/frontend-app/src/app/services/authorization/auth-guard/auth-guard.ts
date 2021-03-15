import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate() {
    if (this.authService.isLogged()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
