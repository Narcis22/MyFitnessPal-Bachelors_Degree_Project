import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {
  
  constructor(
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');
      
      var RolePart = token!.split('.')[1];
      var decodedJwtJsonData = window.atob(RolePart);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      var isAdmin = decodedJwtData.role;
      return isAdmin === 'Admin';
  }
}
