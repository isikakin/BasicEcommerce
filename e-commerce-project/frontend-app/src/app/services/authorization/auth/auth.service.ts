import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../../../lib/constants';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  TOKEN: string = 'token';
  USER: string = 'user';

  constructor(public constants: Constants, public http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', this.constants.clientId);
    params.append('client_secret', this.constants.clientSecret);
    params.append('grant_type', this.constants.grant_type);
    params.append('scope', this.constants.scope);

    return this.http.post(this.constants.identityUrl, params.toString(), { headers: headers }).pipe(
      map(res => res),
      catchError(err => throwError(err))
    );
  }

  isLogged() {
    return localStorage.getItem(this.TOKEN) != null;
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.USER);
  }

  setToken(token: any) {
    localStorage.setItem(this.TOKEN, token);
  }

  setUser(user: any) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  get getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  get getUser() {
    return localStorage.getItem(this.USER);
  }

}
