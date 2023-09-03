import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserImageModel } from 'src/app/models/user-image-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  languages = this.translate.getLangs();
  selectedLang = localStorage.getItem('language');
  currentLanguage: string = '';
  currentTab: string = "";
  customProfilePic: any = null;
  isProfilePicCustom: boolean = false;

  userImage: UserImageModel ={
    profilePhotoId: "22",
    imageBase64: "",
    imageContentType: ""
  }

  constructor(
    private translate: TranslateService,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer
    ){
    this.currentLanguage = this.selectedLang!;
    this.setNavbarTabSelected();
    // const token = localStorage.getItem('token');

    // if (token != '') {
    //   this.getUserProfilePic();

    //   if(this.userImage.profilePhotoId === "0") {
    //     this.isProfilePicCustom = true;
    //     this.customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.userImage.imageContentType + ';base64, ' + this.userImage.imageBase64);
    //   }
    // }
  }

  ngOnInit() {
    this.setNavbarTabSelected();
  }

  async getUserProfilePic(){
    let email = localStorage.getItem('email') ?? '';
    await this.userService.getUserImage(email).subscribe(
      (response) => {
        this.userImage = response;
        this.isProfilePicCustom = false;

        if(this.userImage.profilePhotoId == "0") {
          this.customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.userImage.imageContentType + ';base64, ' + this.userImage.imageBase64);
          this.isProfilePicCustom = true;
        }
      }
    );
  }

  setNavbarTabSelected(){
    let url = window. location. href;

    if(url.split("/")[3] === 'log-workout'){
      let elem = document.getElementById("log_workout");
      elem?.classList.add("selected-tab");

      this.currentTab = "log_workout";
    } else if(url.split("/")[3] === 'activity'){
      let elem = document.getElementById("activity");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "activity";
    } else if(url.split("/")[3] === 'home'){
      let elem = document.getElementById("home");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "home";
    }else if(url.split("/")[3] === 'workout-info'){
      let elem = document.getElementById("workout-info");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "workout-info";
    }else if(url.split("/")[3] === 'user-management'){
      let elem = document.getElementById("user-management");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "user-management";
    }else if(url.split("/")[3] === 'user-messages'){
      let elem = document.getElementById("user-messages");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "user-messages";
    }else if(url.split("/")[3] === 'gym-locations'){
      let elem = document.getElementById("gym-locations");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "gym-locations";
    }else if(url.split("/")[3] === 'statistics'){
      let elem = document.getElementById("statistics");
      elem?.classList.add("selected-tab");
      
      this.currentTab = "statistics";
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    document.location.reload();
  }

  async logout(){
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('username', '');

    this.router.navigate(['auth/login']);
  }

  goToLogWorkout() {
    this.router.navigate(['/log-wokout']);
  }

  goToProfile() {
    var elem = document.getElementById(this.currentTab);
    elem?.classList.remove('selected-tab');
    this.router.navigate(['/profile']);
  }

  isAdmin(): boolean {
    // const token = localStorage.getItem('token');
    // var role = '';

    // if (token !== '') {
    //   var rolePart = token!.split('.')[1];
    //   var decodedJwtJsonData = window.atob(rolePart);
    //   var decodedJwtData = JSON.parse(decodedJwtJsonData);
    //   role = decodedJwtData.role;
    // }
  
    // return role === 'Admin';
    return false;
  }
}
