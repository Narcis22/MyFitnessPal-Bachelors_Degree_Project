import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserImageModel } from 'src/app/models/user-image-model';

@Component({
  selector: 'app-default-avatar-view',
  templateUrl: './default-avatar-view.component.html',
  styleUrls: ['./default-avatar-view.component.css']
})
export class DefaultAvatarViewComponent {

  newUserImage: UserImageModel = {
    imageBase64: "",
    profilePhotoId: "",
    imageContentType: ""
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DefaultAvatarViewComponent>,
    public translate:  TranslateService){
      
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  chooseThis(avatarId: number){
    this.newUserImage.profilePhotoId = avatarId.toString();
    
    // this.profilePhotoId = avatarId.toString();

    this.dialogRef.close(this.newUserImage);
  }
}
