import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authorization/auth/auth.service';
import { Alert } from '../../lib/alert';
import { Constants } from '../../lib/constants';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;

  redirectTo;

  constructor(public spinner: NgxSpinnerService, public constants: Constants, public authService: AuthService, public alert: Alert, public router: Router, public activatedRoute: ActivatedRoute) {
    this.redirectTo = activatedRoute.snapshot.data.redirectTo;
  }

  ngOnInit() { }

  login() {
    this.spinner.show();
    this.authService.login(this.username, this.password).subscribe(res => {
      if (res) {
        let token = res.access_token;
        const user = {
          firstname: 'Akın',
          lastname: 'Işık',
          department: 'Bilgi Teknolojileri',
          title: 'Administrator',
          avatar: '/assets/img/avatar.png'
        };

        this.authService.setToken(token);
        this.authService.setUser(user);
        this.spinner.hide();
        this.router.navigateByUrl(this.redirectTo, { replaceUrl: true });
      } else {
        this.spinner.hide();
        this.alert.swal(this.alert.error, 'Veri yok.', this.alert.errorType);
      }
    }, err => {
      this.spinner.hide();
      this.alert.swal(this.alert.error, err.message, this.alert.errorType);
    });
  }

}
