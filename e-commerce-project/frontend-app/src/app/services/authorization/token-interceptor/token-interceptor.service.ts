import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs"
import { Constants } from 'src/app/lib/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService, public constants: Constants) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(this.constants.blobStorageUrl) == -1) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken}`,
        }
      });
    }

    return next.handle(request);
  }
}