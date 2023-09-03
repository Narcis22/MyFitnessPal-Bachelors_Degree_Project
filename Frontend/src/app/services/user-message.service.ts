import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMessageModel } from '../models/user-message-model';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Access-Control-Allow-Origin", "*")
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url ='http://localhost:7267/api/UserMessage';
  
  constructor(
    public http: HttpClient,
  ) { }

  public update(userMessage: UserMessageModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/update`, userMessage, this.httpOptions);
  }

  public getAll(): Observable<UserMessageModel[]> {
    return this.http.get<UserMessageModel[]>(`${this.url}/getAll`, this.httpOptions);
  }

  public sendMailToUser(emailSender: string, emailReceiver: string, message: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/sendMailToUser`, {"emailSender":emailSender, "emailReceiver":emailReceiver, "message": message}, this.httpOptions);
  }
}
