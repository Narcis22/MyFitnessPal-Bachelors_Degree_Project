import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { LoginModel } from '../models/login-model';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  
  url ='http://localhost:7267/api/User/refresh-token'; 
  token: string | null = localStorage.getItem('token');
  refreshToken: string | null = localStorage.getItem("refreshToken");
 
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}
  
  async canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {

      if (this.token && !jwtHelper.isTokenExpired(this.token)) {
        return true;
      }
      const isRefreshSuccess = await this.tryRefreshingTokens(this.token!);
      if (!isRefreshSuccess) { 
        localStorage.setItem('email', '');
        localStorage.setItem('token', '');
        localStorage.setItem('refreshToken', '');
        localStorage.setItem('username', '');
        this.router.navigate(['/auth/login']); 
      }
      return isRefreshSuccess;
    }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    if (!token || !this.refreshToken) { 
      return false;
    }
    const credentials = JSON.stringify({ token: token, refreshToken: this.refreshToken });
    const response = await new Promise<any>((resolve, reject) => {
      this.http.post<LoginModel>(this.url, credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      }).subscribe({
        next: (res: LoginModel) => resolve(res),
        error: (_) => { resolve(false); }
      });
    });
    if(response === false) 
      return response;
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    return true;
  }
}


