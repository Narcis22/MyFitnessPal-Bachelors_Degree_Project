import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MessageViewDialogComponent } from 'src/app/components/message-view-dialog/message-view-dialog.component';
import { SendMessageComponent } from 'src/app/components/send-message/send-message.component';
import { UserMessageModel } from 'src/app/models/user-message-model';
import { UserMessageService } from 'src/app/services/user-message.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent {


  MockData: UserMessageModel[] = [{
    messageId: "1",
    emailSender: "narcisnecula5@gmail.com",
    profilePicId: "0",
    imageContentType: "jpg",
    isSeen: false,
    message: "Hello!",
    dateSent: new Date(100)
  },{
    messageId: "2",
    emailSender: "deni@test.com",
    profilePicId: "3",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Hello!",
    dateSent: new Date(10000000000)
  },{
    messageId: "3",
    emailSender: "notAUSer@test.com",
    profilePicId: "5",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus lacus, consequat eu nisl posuere, porttitor tristique massa. Mauris ut elit et mauris elementum iaculis. Maecenas pretium velit in sem hendrerit dapibus et porta magna. Nulla dictum, turpis quis suscipit fringilla, massa sem iaculis nibh, in tincidunt lorem orci quis turpis. Proin quis justo laoreet, vulputate mi ut, semper nulla. Maecenas imperdiet ultrices tellus pellentesque fermentum. Vestibulum facilisis varius semper. Curabitur vulputate accumsan leo quis condimentum. Nunc felis risus, laoreet nec purus ac, sagittis consectetur massa. In hac habitasse platea dictumst. Vivamus bibendum interdum ex eget euismod. Nulla id purus vel mi luctus vehicula vitae sed urna. Curabitur congue neque odio, in maximus eros malesuada in. Nulla vitae diam vel nibh interdum aliquet. Fusce at neque vitae erat placerat congue in sit amet ligula. Aenean elementum luctus sem, convallis cursus est. ",
    dateSent: new Date(100000000)
  },{
    messageId: "4",
    emailSender: "testEmailbase@test.com",
    profilePicId: "7",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Hello!",
    dateSent: new Date(10060000000)
  },{
    messageId: "5",
    emailSender: "faxigim157@poverts.com",
    profilePicId: "8",
    image: "",
    imageContentType: "",
    isSeen: true,
    message: "",
    dateSent: new Date(1)
  },{
    messageId: "6",
    emailSender: "cemoya8695@poverts.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "",
    dateSent: new Date(1)
  },{
    messageId: "7",
    emailSender: "tenilol652@stypedia.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: true,
    message: "Hello!",
    dateSent: new Date(1)
  },{
    messageId: "8",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus lacus, consequat eu nisl posuere, porttitor tristique massa. Mauris ut elit et mauris elementum iaculis. Maecenas pretium velit in sem hendrerit dapibus et porta magna. Nulla dictum, turpis quis suscipit fringilla, massa sem iaculis nibh, in tincidunt lorem orci quis turpis. Proin quis justo laoreet, vulputate mi ut, semper nulla. Maecenas imperdiet ultrices tellus pellentesque fermentum. Vestibulum facilisis varius semper. Curabitur vulputate accumsan leo quis condimentum. Nunc felis risus, laoreet nec purus ac, sagittis consectetur massa. In hac habitasse platea dictumst. Vivamus bibendum interdum ex eget euismod. Nulla id purus vel mi luctus vehicula vitae sed urna. Curabitur congue neque odio, in maximus eros malesuada in. Nulla vitae diam vel nibh interdum aliquet. Fusce at neque vitae erat placerat congue in sit amet ligula. Aenean elementum luctus sem, convallis cursus est. ",
    dateSent: new Date(1)
  },{
    messageId: "9",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "",
    dateSent: new Date(1)
  },{
    messageId: "10",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus lacus, consequat eu nisl posuere, porttitor tristique massa. Mauris ut elit et mauris elementum iaculis. Maecenas pretium velit in sem hendrerit dapibus et porta magna. Nulla dictum, turpis quis suscipit fringilla, massa sem iaculis nibh, in tincidunt lorem orci quis turpis. Proin quis justo laoreet, vulputate mi ut, semper nulla. Maecenas imperdiet ultrices tellus pellentesque fermentum. Vestibulum facilisis varius semper. Curabitur vulputate accumsan leo quis condimentum. Nunc felis risus, laoreet nec purus ac, sagittis consectetur massa. In hac habitasse platea dictumst. Vivamus bibendum interdum ex eget euismod. Nulla id purus vel mi luctus vehicula vitae sed urna. Curabitur congue neque odio, in maximus eros malesuada in. Nulla vitae diam vel nibh interdum aliquet. Fusce at neque vitae erat placerat congue in sit amet ligula. Aenean elementum luctus sem, convallis cursus est. ",
    dateSent: new Date(1)
  },{
    messageId: "11",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus lacus, consequat eu nisl posuere, porttitor tristique massa. Mauris ut elit et mauris elementum iaculis. Maecenas pretium velit in sem hendrerit dapibus et porta magna. Nulla dictum, turpis quis suscipit fringilla, massa sem iaculis nibh, in tincidunt lorem orci quis turpis. Proin quis justo laoreet, vulputate mi ut, semper nulla. Maecenas imperdiet ultrices tellus pellentesque fermentum. Vestibulum facilisis varius semper. Curabitur vulputate accumsan leo quis condimentum. Nunc felis risus, laoreet nec purus ac, sagittis consectetur massa. In hac habitasse platea dictumst. Vivamus bibendum interdum ex eget euismod. Nulla id purus vel mi luctus vehicula vitae sed urna. Curabitur congue neque odio, in maximus eros malesuada in. Nulla vitae diam vel nibh interdum aliquet. Fusce at neque vitae erat placerat congue in sit amet ligula. Aenean elementum luctus sem, convallis cursus est. ",
    dateSent: new Date(1)
  },{
    messageId: "12",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "",
    dateSent: new Date(1)
  },{
    messageId: "13",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "",
    dateSent: new Date(1)
  },{
    messageId: "14",
    emailSender: "test@test.com",
    profilePicId: "1",
    image: "",
    imageContentType: "",
    isSeen: false,
    message: "",
    dateSent: new Date(1)
  }];

  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {}

  userMessages: UserMessageModel[] = [];
  displayedColumns: string[] = ['profilePic', 
                                'email',
                                'date',
                                'message-preview', 
                                'seenStatus', 
                                'actions'];

  dataSource: MatTableDataSource<UserMessageModel> | undefined;

  constructor(private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userMessageService: UserMessageService ) {
    this.getMessages();
    this.loadTable();
  }
  
  ngOnInit(){
    // this.dataSource = new MatTableDataSource<UserMessageModel>(this.userMessages);
    this.dataSource = new MatTableDataSource<UserMessageModel>(this.MockData);
    this.loadTable();
  }

  async getMessages() {
    this.userMessageService.getAll().subscribe(
      (response: UserMessageModel[]) => {
        this.userMessages = response.reverse();
        this.loadTable();
      }
    );
  }

  async loadTable() {
    // this.dataSource = new MatTableDataSource<UserMessageModel>(this.userMessages);
    this.dataSource = new MatTableDataSource<UserMessageModel>(this.MockData);
    this.dataSource.sort = this.sort!;
  }

  ngAfterViewInit() {
    this.loadTable();
  }

  getImageFromByteArray(imageContentType: string, image: string){
    let customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + imageContentType + ';base64, ' + image);
    return customProfilePic;
  }

  openMailDialog(userMessage: UserMessageModel){
    this.userMessages = this.MockData;
    
    const dialogRef = this.dialog.open(MessageViewDialogComponent, {
      autoFocus: true,
      width: "600px",
      height: "700px",
      data:{
        userMessage: userMessage
      }
    });

    let index = this.userMessages.findIndex(x => x.messageId === userMessage.messageId);

    if (this.userMessages[index].isSeen === false)
      this.userMessageService.update(userMessage).subscribe(() => {});

    this.userMessages[index].isSeen = true;
    
    this.MockData = this.userMessages;
    this.loadTable();
  }

  openSendMailDialog(userMessage: UserMessageModel){
    const dialogRef = this.dialog.open(SendMessageComponent, {
      autoFocus: true,
      width: "600px",
      height: "700px",
      data:{
        userMessage: userMessage
      }
    });

    let index = this.userMessages.findIndex(x => x.messageId === userMessage.messageId);

    if (this.userMessages[index].isSeen === false)
      this.userMessageService.update(userMessage).subscribe(() => {});

    this.userMessages[index].isSeen = true;
    this.loadTable();
  }
}