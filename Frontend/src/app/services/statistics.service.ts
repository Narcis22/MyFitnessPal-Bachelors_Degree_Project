import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsSportModel } from '../models/statistics-sport-model';
import { Observable } from 'rxjs';
import { StatisticsAchievementModel } from '../models/statistics-achievement-model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Access-Control-Allow-Origin", "*")
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url ='http://localhost:7267/api/Statistics';
  
  constructor(
    public http: HttpClient,
  ) { }

  public getStatisticsSport(): Observable<StatisticsSportModel[]> {
    return this.http.get<StatisticsSportModel[]>(`${this.url}/getStatisticsSport`, this.httpOptions);
  }

  public getStatisticsAchievement(): Observable<StatisticsAchievementModel[]> {
    return this.http.get<StatisticsAchievementModel[]>(`${this.url}/getStatisticsAchievement`, this.httpOptions);
  }

  public getAllSportIds(email: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/getSportIds/${email}`, this.httpOptions);
  }
}
