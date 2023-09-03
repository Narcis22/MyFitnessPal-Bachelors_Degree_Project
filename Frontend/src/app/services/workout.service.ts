import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogWorkoutModel } from '../models/log-workout-model';
import { WorkoutModel } from '../models/workout-model';
import { AchievementNotificationModel } from '../models/achievement-notification-model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Access-Control-Allow-Origin", "*")
    .set('Authorization', 'Bearer ' + localStorage.getItem('token')),
  };
  private url ='http://localhost:7267/api/Workout';

  constructor(  
      public http: HttpClient,
    ) { }

    // achievement notification model return 
  public logWorkout(workout: LogWorkoutModel): Observable<AchievementNotificationModel> {
    return this.http.post<AchievementNotificationModel>(`${this.url}/create`, workout, this.httpOptions);
  }

  public getAll(email: string): Observable<WorkoutModel[]> {
    return this.http.get<WorkoutModel[]>(`${this.url}/getAll/${email}`, this.httpOptions);
  }
}
