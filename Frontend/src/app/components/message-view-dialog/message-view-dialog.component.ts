import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserMessageModel } from 'src/app/models/user-message-model';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-message-view-dialog',
  templateUrl: './message-view-dialog.component.html',
  styleUrls: ['./message-view-dialog.component.css']
})
export class MessageViewDialogComponent {

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
  isLoading: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MessageViewDialogComponent>,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,){

  }

  ngOnInit(){
    this.messageDetails = this.data.userMessage;
  }

  close(){
    this.dialogRef.close();
  }

  getImageFromByteArray(imageContentType: string, image: string){
    let customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + imageContentType + ';base64, ' + image);
    return customProfilePic;
  }
}
