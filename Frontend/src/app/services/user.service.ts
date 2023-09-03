import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserModel } from '../models/register-user-model';
import { UserModel } from '../models/user-model';
import { ChangePasswordModel } from '../models/change-password-model';
import { UserImageModel } from '../models/user-image-model';
import { UserManagementModel } from '../models/user-management-model';
import { LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Access-Control-Allow-Origin", "*")
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url ='http://localhost:7267/api/User';

  constructor(  
      public http: HttpClient,
    ) { }

  public register(user: RegisterUserModel): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  }

  public login(user: any): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.url}/login`, user);
  }

  public refresh(user: any): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.url}/refresh-token`, user);
  }

  public forgetPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/forgetPassword/${email}`, {});
  }
  
  public changePassword(user: ChangePasswordModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/changePassword`, user);
  }

  public getUser(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/getUserModel/${email}`, this.httpOptions);
  }

  public update(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.url}/update`, user, this.httpOptions);
  }

  public sendMail(email: string, message: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/sendMail`, {"email":email, "message": message}, this.httpOptions);
  }

  public uploadImage(image: any, profilePhotoId: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.url}/upload/${email}/${profilePhotoId}`, image);
  }

  public getUserImage(email: string): Observable<UserImageModel> {
    return this.http.get<UserImageModel>(`${this.url}/getUserImage/${email}`, this.httpOptions);
  }

  public getAllUsers(): Observable<UserManagementModel[]> {
    return this.http.get<UserManagementModel[]>(`${this.url}/getAllUsers`, this.httpOptions);
  }

  public delete(email: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/softDelete/${email}`, this.httpOptions);
  }

  public makeAdmin(email: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/makeAdmin/${email}`, this.httpOptions);
  }
}


