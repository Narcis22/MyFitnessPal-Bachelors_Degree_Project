import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ContactUsDialogComponent } from 'src/app/components/contact-us-dialog/contact-us-dialog.component';
import { EditProfileDialogComponent } from 'src/app/components/edit-profile-dialog/edit-profile-dialog.component';
import { AchievementModel } from 'src/app/models/achievement-model';
import { UserImageModel } from 'src/app/models/user-image-model';
import { UserModel } from 'src/app/models/user-model';
import { AchievementService } from 'src/app/services/achievement.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService } from 'src/app/services/user.service';
import { constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: UserModel = {
    id: 0,
    firstName: "Narcis",
    lastName: "Necula",
    username: "Narcis Necula",
    email: "narcisnecula5@gmail.com",
    sex: "Male",
    height: 192,
    weight: 105,
    age: 22
  };

  userImage: UserImageModel = {
    profilePhotoId: '22',
    imageBase64: '',
    imageContentType: ''
  };

  isProfilePicCustom: boolean = false;
  pictureProfile: string = "";
  medalType: string[] = ['', 'bronze', 'silver', 'gold', 'month'];

  // Mock data
  sports: number[] = [1,2,3,4,5,6,7,8,9];
  achievements: AchievementModel[] = [{
    userId: 1,
    sportName: "01",
    level: 4
  },{
    userId: 1,
    sportName: "bowling",
    level: 2
  },{
    userId: 1,
    sportName: "running",
    level: 1
  },{
    userId: 1,
    sportName: "03",
    level: 4
  },{
    userId: 1,
    sportName: "05",
    level: 4
  },{
    userId: 1,
    sportName: "walking",
    level: 2
  },{
    userId: 1,
    sportName: "walking",
    level: 2
  },{
    userId: 1,
    sportName: "walking",
    level: 2
  },{
    userId: 1,
    sportName: "indoor-cycling",
    level: 1
  },{
    userId: 1,
    sportName: "pool-swim",
    level: 3
  },{
    userId: 1,
    sportName: "11",
    level: 4
  },{
    userId: 1,
    sportName: "hiking",
    level: 1
  },{
    userId: 1,
    sportName: "hiking",
    level: 2
  },{
    userId: 1,
    sportName: "hiking",
    level: 2
  },{
    userId: 1,
    sportName: "hiking",
    level: 2
  },
  ];

  sportIcons: any;
  type: string | undefined;
  customProfilePic: any = null;

  constructor(
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
    private statisticsService: StatisticsService,
    private achievementService: AchievementService,
    private sanitizer: DomSanitizer,
    private router: Router, )
  {
      this.sportIcons = constants.sportIcons;
      this.getData();

      //TODO: Get all achievements of this user max 34 elements returned in frontend from the API call
      
      if(this.userImage.profilePhotoId === "0") {
          this.isProfilePicCustom = true;
          this.customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.userImage.imageContentType + ';base64, ' + this.userImage.imageBase64);
      }

  }

  ngOnInit() {
    this.getData();
  }
  
  async getData() {
    let email = localStorage.getItem('email') ?? ''; 
    await this.userService.getUser(email).subscribe(
      (response: UserModel) => {
        this.user = response;
      }
    );

    await this.statisticsService.getAllSportIds(email).subscribe(
      (response: number[]) => {
        this.sports = response;
      }
    );

    await this.achievementService.getAll(email).subscribe(
      (response: AchievementModel[]) => {
        this.achievements = response;
      }
    );

    await this.userService.getUserImage(email).subscribe(
      (response) => {
        this.userImage.profilePhotoId = response.profilePhotoId;
        this.userImage.imageBase64 = response.imageBase64;
        this.userImage.imageContentType = response.imageContentType;

        this.isProfilePicCustom = false;
        if (this.userImage.profilePhotoId == "0")
        {
          this.customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.userImage.imageContentType + ';base64, ' + this.userImage.imageBase64);
          this.isProfilePicCustom = true;
        }
      }
    );
  }

  openDrawer(drawer: MatDrawer, type: string){
    this.type = type;
    drawer.toggle();
  }

  detectUpdate(event: UserModel) {
    this.user = event;
  }

  changeDrawer(type: string) {
    this.type = type;
  }
  
  photoUploaded(userImage: UserImageModel) {
    this.userImage = userImage;
    this.isProfilePicCustom = false;

    if(this.userImage.profilePhotoId == "0") {
      this.isProfilePicCustom = true;
      this.customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.userImage.imageContentType + ';base64, ' + this.userImage.imageBase64);
    }
  }

  gotoActivity(){
    this.router.navigate(['activity']);
  }

  gotoAcievements(){
    this.router.navigate(['activity'],{ queryParams: { straightToAchievements : true }});
  }
}
