import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DeleteUserConfirmComponent } from 'src/app/components/delete-user-confirm/delete-user-confirm.component';
import { MakeAdminComponent } from 'src/app/components/make-admin/make-admin.component';
import { UserManagementModel } from 'src/app/models/user-management-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  MockData: UserManagementModel[] = [{
    email: "narcis@gmail.com",
    username: "SuperSporter1",
    firstName: "Narcis",
    lastName: "Necula",
    dateJoin: new Date(),
    profilePicId: "12",
    image: "",
    imageContentType: ""
  },{
    email: "localMeance@gmail.com",
    username: "HeavyDuty",
    firstName: "Marian",
    lastName: "Taran",
    dateJoin: new Date(),
    profilePicId: "17",
    image: "",
    imageContentType: ""
  },{
    email: "adrian_barbosu12@gmail.com",
    username: "zemmiphobia",
    firstName: "Mama",
    lastName: "Mia",
    dateJoin: new Date(),
    profilePicId: "10",
    image: "",
    imageContentType: ""
  },{
    email: "papa1245@gmail.com",
    username: "CrypticHatter",
    firstName: "Bonga",
    lastName: "Coco",
    dateJoin: new Date(),
    profilePicId: "22",
    image: "",
    imageContentType: ""
  },{
    email: "trust_god@gmail.com",
    username: "HackingMama",
    firstName: "Ciociooo",
    lastName: "Ratatat",
    dateJoin: new Date(),
    profilePicId: "0",
    imageContentType: "jpg",
  },{
    email: "narcis@gmail.com",
    username: "Narcis Necula",
    firstName: "Narcis",
    lastName: "Necula",
    dateJoin: new Date(),
    profilePicId: "12",
    image: "",
    imageContentType: ""
  },{
    email: "global@admin.com",
    username: "Denisa Predescu",
    firstName: "Denisa",
    lastName: "Predescu",
    dateJoin: new Date(),
    profilePicId: "17",
    image: "",
    imageContentType: ""
  },{
    email: "papa@sbp.com",
    username: "Mandingo123",
    firstName: "Mama",
    lastName: "Mia",
    dateJoin: new Date(),
    profilePicId: "10",
    image: "",
    imageContentType: ""
  },{
    email: "papa@sbp.com",
    username: "Mandingo123",
    firstName: "Bonga",
    lastName: "Coco",
    dateJoin: new Date(),
    profilePicId: "22",
    image: "",
    imageContentType: ""
  },{
    email: "papalapadapachow@sbp.com",
    username: "Mandingo123",
    firstName: "Ciociooo",
    lastName: "Ratatat",
    dateJoin: new Date(),
    profilePicId: "0",
    imageContentType: "jpg",
  }];

  users: UserManagementModel[] = [];
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {}
  
  displayedColumns: string[] = ['profilePic', 
                                'username',
                                'FirstLastName', 
                                'email',
                                'dateJoin',
                                'actions'];

  dataSource: MatTableDataSource<UserManagementModel> | undefined;

  constructor(private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userService: UserService){
    this.getUsers();
  }

  ngOnInit(){
    // this.dataSource = new MatTableDataSource<UserManagementModel>(this.users);
    this.dataSource = new MatTableDataSource<UserManagementModel>(this.MockData);
    this.loadTable();
  }
  
  async loadTable() {
    // this.dataSource = new MatTableDataSource<UserManagementModel>(this.users);
    this.dataSource = new MatTableDataSource<UserManagementModel>(this.MockData);
    this.dataSource.sort = this.sort!;
  }

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<UserManagementModel>(this.users);
    this.dataSource = new MatTableDataSource<UserManagementModel>(this.MockData);
    this.loadTable();
  }

  async getUsers() {
    await this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.loadTable();
      });
  }

  deleteDialog(user: UserManagementModel){
    const dialogRef = this.dialog.open(DeleteUserConfirmComponent, {
      autoFocus: true,
      width: "600px",
      height: "250px",
      data: user.email
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.users = this.users.filter(x => x.email !== user.email);
        this.loadTable();
      }
    });
  }

  adminDialog(user: UserManagementModel){
    const dialogRef = this.dialog.open(MakeAdminComponent, {
      autoFocus: true,
      width: "600px",
      height: "300px",
      data: user.email
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.users = this.users.filter(x => x.email !== user.email);
        this.loadTable();
      }
    });
  }

  getImageFromByteArray(imageContentType: string, image: string){
    let customProfilePic = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + imageContentType + ';base64, ' + image);
    return customProfilePic;
  }
}