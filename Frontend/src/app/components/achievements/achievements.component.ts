import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AchievementModel } from 'src/app/models/achievement-model';
import { FullMedalsListComponent } from '../full-medals-list/full-medals-list.component';
import { ShareTemplateComponent } from '../share-template/share-template.component';
import { AchievementNotificationModel } from 'src/app/models/achievement-notification-model';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent {

  @Input() bronzeMedals: AchievementModel[] = [];
  @Input() silverMedals: AchievementModel[] = [];
  @Input() goldMedals: AchievementModel[] = [];
  @Input() monthlyMedals: AchievementModel[] = [];
  @Input() achievementNotification: AchievementNotificationModel | undefined;
  @Input() newAchievement: AchievementModel | undefined;

  bronzeMedalsMock: AchievementModel[] = [{
    userId: 1,
    sportName: "bowling",
    level: 1
  },{
    userId: 1,
    sportName: "running",
    level: 1
  },{
    userId: 1,
    sportName: "pool-swim",
    level: 1
  },{
    userId: 1,
    sportName: "stair-stepper",
    level: 1
  },{
    userId: 1,
    sportName: "hiking",
    level: 1
  },{
    userId: 1,
    sportName: "eliptical",
    level: 1
  },{
    userId: 1,
    sportName: "HIIT",
    level: 1
  },{
    userId: 1,
    sportName: "cycling",
    level: 1
  }];

  silverMedalsMock: AchievementModel[] = [{
    userId: 1,
    sportName: "bowling",
    level: 2
  },{
    userId: 1,
    sportName: "cycling",
    level: 2
  },{
    userId: 1,
    sportName: "eliptical",
    level: 2
  },{
    userId: 1,
    sportName: "bowling",
    level: 2
  },{
    userId: 1,
    sportName: "traditional-strength",
    level: 2
  },{
    userId: 1,
    sportName: "bowling",
    level: 2
  },{
    userId: 1,
    sportName: "traditional-strength",
    level: 2
  },{
    userId: 1,
    sportName: "bowling",
    level: 2
  }];
  
  goldMedalsMock: AchievementModel[] = [{
    userId: 1,
    sportName: "bowling",
    level: 3
  },{
    userId: 1,
    sportName: "cycling",
    level: 3
  },{
    userId: 1,
    sportName: "eliptical",
    level: 3
  },{
    userId: 1,
    sportName: "running",
    level: 3
  },{
    userId: 1,
    sportName: "stair-stepper",
    level: 3
  },{
    userId: 1,
    sportName: "pool-swim",
    level: 3
  },{
    userId: 1,
    sportName: "bowling",
    level: 3
  },{
    userId: 1,
    sportName: "bowling",
    level: 3
  },{
    userId: 1,
    sportName: "bowling",
    level: 3
  },{
    userId: 1,
    sportName: "bowling",
    level: 3
  },{
    userId: 1,
    sportName: "bowling",
    level: 3
  },{
    userId: 1,
    sportName: "bowling",
    level: 3
  }];

  monthlyMedalsMock: AchievementModel[] = [{
    userId: 1,
    sportName: "01",
    level: 4
  },{
    userId: 1,
    sportName: "02",
    level: 4
  },{
    userId: 1,
    sportName: "03",
    level: 4
  },{
    userId: 1,
    sportName: "04",
    level: 4
  },{
    userId: 1,
    sportName: "05",
    level: 4
  },{
    userId: 1,
    sportName: "06",
    level: 4
  },{
    userId: 1,
    sportName: "07",
    level: 4
  },{
    userId: 1,
    sportName: "08",
    level: 4
  }];

  constructor(
    public translate: TranslateService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,){
      
  }

  ngOnInit() {
  }

  ngOnChanges() {
    
    let url = window. location. href;
    if(url != 'http://localhost:4200/activity?straightToAchievements=true' && url != 'http://localhost:4200/activity')
    {
      if(this.achievementNotification?.hasAchievement === "true"){
        if(this.newAchievement?.level === 4){
          this.openMonthlyShare(this.newAchievement);
          this.achievementNotification.hasAchievement = "false";
        }
        else{
          this.openFullList(this.newAchievement!.level!, true, this.newAchievement!)
          this.achievementNotification.hasAchievement = "false";
        }
      }
    }
  }

  openFullList(level: number, hasNotification?: boolean, newAchievement?: AchievementModel){
    
    if(level === 1){
      if(this.bronzeMedalsMock.length === 0){
        this.snackbar.open(this.translate.instant('errors.no-medals') , this.translate.instant('general.close'), { duration: 3000 } )
      }

      const dialogRef = this.dialog.open(FullMedalsListComponent, {
        autoFocus: true,
        width: "600px",
        data: {
          medals: this.bronzeMedalsMock,
          hasNotification: hasNotification,
          newAchievement: newAchievement
        }
      });
    }

    if(level === 2){
      if(this.silverMedalsMock.length === 0){
        this.snackbar.open(this.translate.instant('errors.no-medals') , this.translate.instant('general.close'), { duration: 3000 } )
      }

      const dialogRef = this.dialog.open(FullMedalsListComponent, {
        autoFocus: true,
        width: "600px",
        data: {
          medals: this.silverMedalsMock,
          hasNotification: hasNotification,
          newAchievement: newAchievement
        }
      });
    }

    if(level === 3){
      if(this.goldMedalsMock.length === 0){
        this.snackbar.open(this.translate.instant('errors.no-medals') , this.translate.instant('general.close'), { duration: 3000 } )
      }

      const dialogRef = this.dialog.open(FullMedalsListComponent, {
        autoFocus: true,
        width: "600px",
        data: {
          medals: this.goldMedalsMock,
          hasNotification: hasNotification,
          newAchievement: newAchievement
        }
      });
    }
  }

  openMonthlyShare(medal: AchievementModel){
    const dialogRef = this.dialog.open(ShareTemplateComponent, {
      autoFocus: true,
      width: "1000px",
      height: "760px",
      data: {
        medal: medal,
        medalType: "month",
        count: 1
      }
    });
  }
}
