import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserMessageModel } from 'src/app/models/user-message-model';
import { UserMessageService } from 'src/app/services/user-message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {

  messageDetails: UserMessageModel = {
    messageId: "0",
    emailSender: "string",
    profilePicId: "4",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus lacus, consequat eu nisl posuere, porttitor tristique massa. Mauris ut elit et mauris elementum iaculis. Maecenas pretium velit in sem hendrerit dapibus et porta magna. Nulla dictum, turpis quis suscipit fringilla, massa sem iaculis nibh, in tincidunt lorem orci quis turpis. Proin quis justo laoreet, vulputate mi ut, semper nulla. Maecenas imperdiet ultrices tellus pellentesque fermentum. Vestibulum facilisis varius semper. Curabitur vulputate accumsan leo quis condimentum. Nunc felis risus, laoreet nec purus ac, sagittis consectetur massa. In hac habitasse platea dictumst. Vivamus bibendum interdum ex eget euismod. Nulla id purus vel mi luctus vehicula vitae sed urna. Curabitur congue neque odio, in maximus eros malesuada in. Nulla vitae diam vel nibh interdum aliquet. Fusce at neque vitae erat placerat congue in sit amet ligula. Aenean elementum luctus sem, convallis cursus est. ",
    dateSent: new Date
  };
  form: FormGroup; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SendMessageComponent>,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private userMessageService: UserMessageService){
      this.form = new FormGroup({   
        message: new FormControl(null, Validators.required)
      }, {});
  }

  isLoading: boolean = false;

  ngOnInit(){
    this.messageDetails = this.data.userMessage;
  }

  close(){
    this.dialogRef.close();
  }
  
  async sendMail(){
    this.isLoading = true;
    let email = localStorage.getItem('email') ?? '';
    await this.userMessageService.sendMailToUser(email, this.messageDetails.emailSender, this.messageDetails.message).subscribe(
      (response: boolean) => {
        if (response) {
          this.snackBar.open(this.translate.instant( 'send-message.success' ), this.translate.instant('general.close'), { duration: 3000 } );
          this.dialogRef.close();
        } else {
          this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 3000 } );
        }
        this.isLoading = false;
      }, 
      (error) => {
        this.isLoading = false;
        this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 3000 } );
      });
  }
  getImageFromByteArray(imageContentType: string, image: string){
    let customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + imageContentType + ';base64, ' + image);
    return customProfilePic;
  }
}
