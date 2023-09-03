import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AchievementModel } from '../models/achievement-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Access-Control-Allow-Origin", "*")
    .set('Authorization', 'Bearer ' + localStorage.getItem('token')),
  };
  private url ='http://localhost:7267/api/Achievement';
  
  constructor(  
    public http: HttpClient,
  ) { }

  public getAll(email: string): Observable<AchievementModel[]> {
    return this.http.get<AchievementModel[]>(`${this.url}/getAll/${email}`, this.httpOptions);
  }

  public getAchievementById(id: number): Observable<AchievementModel> {
    return this.http.get<AchievementModel>(`${this.url}/getAchievementById/${id}`, this.httpOptions);
  }
}
