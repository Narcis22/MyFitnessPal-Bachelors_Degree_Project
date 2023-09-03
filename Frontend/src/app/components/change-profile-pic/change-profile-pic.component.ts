import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserImageModel } from 'src/app/models/user-image-model';
import { UserService } from 'src/app/services/user.service';
import { DefaultAvatarViewComponent } from '../default-avatar-view/default-avatar-view.component';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent implements OnInit {
  public form!: FormGroup;

  image: any = null;
  contentType: string = "";
  profilePicId: string = "";
  isProfilePicCustom: boolean = false;
  uploadImageForm: any;

  @Input() drawer: any;
  @Input() userImage: any;
  @Output() uploaded = new EventEmitter<UserImageModel>();
  
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      fileContact: new FormControl('', [Validators.required]),
    });

    if (this.userImage.profilePhotoId === "0")
    {
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.userImage.imageContentType + ';base64, ' + this.userImage.imageBase64);
      this.isProfilePicCustom = true;
    } else {
      this.profilePicId = this.userImage.profilePhotoId;
    }
  }

  close(){
    this.drawer.toggle();
  }

  public Submit(files: File[]): void {    
    this.handleFileInput(files);
  }

  validateFileExtension(file: string | undefined) {
    if (file === 'jpg' || file === 'png' || file === 'jpeg') 
      return true;
    else 
      return false;
  }

  public async handleFileInput(data:any) {
    const files = data.files as File[];

    if (this.form.valid && this.validateFileExtension(files[0].name.split('.').pop())) 
    {
      this.uploadImageForm = new FormData();
      Array.from(files).forEach((f) => this.uploadImageForm.append('file', f));
      
      this.profilePicId = "0";
      this.isProfilePicCustom=true;
  
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.snackBar.open(this.translate.instant('edit-picture.file-type-error'), this.translate.instant('general.close'), {duration: 3000})
    }
  }

  async getUserImage() {
    let email = localStorage.getItem('email') ?? '';
    await this.userService.getUserImage(email).subscribe(
      (response) => {
        this.userImage = response;
        this.uploaded.emit(this.userImage);
      });
  }

  openAvatarList() {
    const dialogRef = this.dialog.open(DefaultAvatarViewComponent, {
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: UserImageModel) => {
      if(result){
        this.updateTheAvatarImage(result);
      }
    });
  }

  updateTheAvatarImage(newUserImage: UserImageModel){
    this.image = newUserImage.imageBase64; // will be ""
    this.contentType= newUserImage.imageContentType;  // will be ""
    this.profilePicId = newUserImage.profilePhotoId;
    this.isProfilePicCustom = false;
    this.uploadImageForm = null;
  }

  async saveChanges(){
    let email = localStorage.getItem('email') ?? '';
    
    await this.userService.uploadImage(this.uploadImageForm, this.profilePicId, email).subscribe(
      (response) => {
        if (response){
          this.snackBar.open(this.translate.instant( 'update-account.success' ), this.translate.instant('general.close'), { duration: 3000 } );
          this.getUserImage();
        }
      }
    );

    this.drawer.toggle();
  }
}

