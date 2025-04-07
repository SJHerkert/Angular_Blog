import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private auth:AuthService, private router:Router){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree  {
      if(this.auth.isAuthenticated()){
        return true;
      }
      return this.router.parseUrl('');
    }
}
