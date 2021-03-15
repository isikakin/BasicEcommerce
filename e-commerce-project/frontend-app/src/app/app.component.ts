import { Component } from '@angular/core';
import { AuthService } from './services/authorization/auth/auth.service';
import { Constants } from './lib/constants';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, public constants: Constants) { }

  ngOnInit() {
    $('body').layout('fix');
    this.isAuthenticated;
  }

  get isAuthenticated() {
    return this.authService.isLogged();
  }

}