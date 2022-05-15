import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import Usuario from '../models/Usuario';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public usuario$: BehaviorSubject<Usuario>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.usuario$ = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
  }
  
  public get usuarioValue(): Usuario {
    return this.usuario$.value;
  }

  login(username: String, password: String) {
    return this.http.post<any>(`${environment.apiUrl}/usuarios/login`, {"username": username, "password": password})
      .pipe(
        map(response => {
          var usuario: Usuario = {
            ...response.user
          }
          
          localStorage.setItem('usuario', JSON.stringify(usuario));
          localStorage.setItem('token', response.token);
          this.usuario$.next(usuario);
          return usuario;
        })      
      );
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.usuario$.next(null);
    this.router.navigate(['/productos']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    var decoded:any = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

}
