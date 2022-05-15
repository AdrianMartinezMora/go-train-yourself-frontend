import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.usuarioValue;
    if (user && !this.accountService.isTokenExpired(this.accountService.getToken())) {
      return true;
    }
    
    this.accountService.logout();
    //TODO: Cambiar esto
    this.router.navigate(['/login']);
    return false;
  }

}
