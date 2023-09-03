import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkoutService } from 'src/app/services/workout.service';
import { LogWorkoutModel } from 'src/app/models/log-workout-model';
import { constants } from 'src/app/constants/constants';
import { AchievementNotificationModel } from 'src/app/models/achievement-notification-model';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.component.html',
  styleUrls: ['./log-workout.component.css']
})
export class LogWorkoutComponent {
  imageName: string = "";
  form: FormGroup;
  formType: number = 2;
  sportId: number = 0;

  sportsList: any;
  sportIcons: any;
  constructor(private translate: TranslateService,
              private router: Router,
              private snackBar: MatSnackBar,
              private workoutService: WorkoutService) {

    this.form = new FormGroup({
      duration: new FormControl(null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])),
      distance: new FormControl(null, Validators.compose([Validators.pattern("^[0-9]*$")])),
      steps: new FormControl(null, Validators.compose([Validators.pattern("^[0-9]*$")]))
    });

    this.sportsList = constants.sportsList;
    this.sportIcons = constants.sportIcons;
  }

  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['duration'].markAsTouched({ onlySelf: true });
    this.form.controls['steps'].markAsTouched({ onlySelf: true });
    this.form.controls['distance'].markAsTouched({ onlySelf: true });
  }

  //FormType: 1- Only duration field
  //          2- Duration + Distance fields
  //          3- All three fields
  swipeToSecondFaze(sport: number){
    if(sport === 5 || sport === 6 || sport === 7 || sport === 11 || sport === 12 || sport === 13){
      this.formType = 1;
    } else if (sport === 2 || sport === 3 || sport === 4 || sport === 8 || sport === 10){
      this.formType = 2;
    } else if(sport === 0 || sport === 1 || sport === 9) {
      this.formType = 3;
    }

    let x = document.getElementById("first-slide");
    x?.classList.add("hidden");

    this.imageName = this.sportIcons[sport];

    this.sportId = sport + 1;
    this.form.controls['duration'].setValue(null);
    this.form.controls['steps'].setValue(null);
    this.form.controls['distance'].setValue(null);
  }

  goBack(){
    let x = document.getElementById("first-slide");
    x?.classList.remove("hidden")
    this.imageName = "";
  }

  async addWorkout(){
    if (!this.form.controls['duration'].valid || 
        !this.form.controls['steps'].valid || 
        !this.form.controls['distance'].valid ) {
      this.touchFields();
      return;
    }

    let logWorkout: LogWorkoutModel = {
      sportId: this.sportId,
      email: localStorage.getItem('email')!,
      duration: this.form.controls['duration'].value,
      steps: this.form.controls['steps'].value,
      distance: this.form.controls['distance'].value
    }

    await this.workoutService.logWorkout(logWorkout).subscribe((response: AchievementNotificationModel) => {
        this.router.navigate(['activity'], { 
          queryParams: { 
            hasAchievement: response.hasAchievement, 
            achievementId: response.achievementId 
          }});
        this.snackBar.open(this.translate.instant( 'log-workout.succes' ), this.translate.instant('general.close'), { duration: 3000 } );
    });
  }
}
