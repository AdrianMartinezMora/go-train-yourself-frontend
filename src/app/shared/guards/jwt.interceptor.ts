import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  publicUrls: {url: string; method: string}[] = [
    // {url: '/estadistica/**', method: 'GET'},
  ];

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const usuario = this.accountService.usuarioValue;
    const token = this.accountService.getToken();
    const isLoggedIn = usuario && token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      if(this.needToken(request)){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }

  needToken(request: HttpRequest<any>): boolean{
    let result: boolean = false;
    this.publicUrls.forEach(publicUrl => {
      if(publicUrl.url.endsWith('/**')){
        result = result || (request.url.startsWith(`${environment.apiUrl}${publicUrl.url.replace('/**', '')}`) && request.method.toLowerCase() == publicUrl.method.toLowerCase());
      }else{
        result = result || (request.url == `${environment.apiUrl}${publicUrl.url}` && request.method.toLowerCase() == publicUrl.method.toLowerCase());
      }
    });
    return !result;
  }

}