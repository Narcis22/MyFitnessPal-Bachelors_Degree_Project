import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AchievementModel } from 'src/app/models/achievement-model';
import { AchievementService } from 'src/app/services/achievement.service';
import { AchievementNotificationModel } from 'src/app/models/achievement-notification-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit{

  achievementNotification: AchievementNotificationModel = {achievementId: "15", hasAchievement: "true"};

  displayContent: string = "workouts";
  achievements: AchievementModel[] = [];

  bronzeMedals: AchievementModel[] = [];
  silverMedals: AchievementModel[] = [];
  goldMedals: AchievementModel[] = [];
  monthlyMedals: AchievementModel[] = [];
  newAchievement: AchievementModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private achievementService: AchievementService,
    private snackBar: MatSnackBar,
    public translate: TranslateService){

    let url = window. location. href;
    if(url != '')
    {
      if(url != 'http://localhost:4200/activity') 
      {
        this.achievementNotification.hasAchievement = url.split("=")[1].split("&")[0];
        this.achievementNotification.achievementId = url.split("=")[2];

        if(this.achievementNotification.hasAchievement === "true") {
          this.getNewAchievement();
          this.gotoAchievements();
        }
      }
    }
    this.getAchievements();
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
  }

  gotoAchievements(){
    this.displayContent = 'achievements';
  }

  goBack(){
    this.displayContent = 'workouts';
  }

  async getNewAchievement() {
    this.achievementService.getAchievementById(parseInt(this.achievementNotification.achievementId)).subscribe(
      (response: AchievementModel) => {
        this.newAchievement = response;
      }
    );
  }

  async getAchievements() {
    let email = localStorage.getItem('email') ?? '';
    await this.achievementService.getAll(email).subscribe(
      (response: AchievementModel[]) => {
        this.achievements = response;
        this.bronzeMedals = this.achievements.filter(x => x.level === 1);
        this.silverMedals = this.achievements.filter(x => x.level === 2);
        this.goldMedals = this.achievements.filter(x => x.level === 3);
        this.monthlyMedals = this.achievements.filter(x => x.level === 4);
      }
    );

    // Comment on real data
    this.bronzeMedals = this.achievements.find(x => x.level === 1) ? [] : [];
    this.silverMedals = this.achievements.find(x => x.level === 2) ? [] : [];
    this.goldMedals = this.achievements.find(x => x.level === 3) ? [] : [];
    this.monthlyMedals = this.achievements.find(x => x.level === 4) ? [] : [];
  }
}
