import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public constants: Constants, public http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.constants.baseUrl + '/admin/userList').pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    );
  }
}
