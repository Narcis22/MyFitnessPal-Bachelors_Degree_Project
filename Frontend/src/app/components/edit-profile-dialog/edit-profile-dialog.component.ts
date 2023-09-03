import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  @Input() data: UserModel = {
    id: 0,
    firstName: "",
    lastName: "",
    username: null,
    email: "",
    sex: null,
    height: null,
    weight: null,
    age: null,
  };

  @Input() drawer: any;
  @Output() detectUpdate = new EventEmitter<UserModel>();
  @Output() type = new EventEmitter<string>();

  form: FormGroup;
  selectedSex: string = "";
  sexes: string[] = ['Female', 'Male'];

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private translate: TranslateService){ 

      this.form = new FormGroup({
        username:  new FormControl(null),
        sex: new FormControl(null),
        height: new FormControl(null, Validators.compose([Validators.pattern("^[0-9]*$")])),
        weight: new FormControl(null, Validators.compose([Validators.pattern("^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$")])),
        age: new FormControl(null, Validators.compose([Validators.pattern("^[0-9]*$")]))
      },{ });
  }

  touchFields() {
    this.form.controls['height'].markAsTouched({ onlySelf: true });
    this.form.controls['weight'].markAsTouched({ onlySelf: true });
    this.form.controls['age'].markAsTouched({ onlySelf: true });
  }
  
  ngOnInit(): void {
    this.form.setValue({
      username: this.data.username,
      sex: this.data.sex,
      height: this.data.height,
      weight: this.data.weight,
      age: this.data.age
    });
    this.selectedSex = this.form.controls['sex'].value;
  }

  changePasswordToggle(){
    this.drawer.toggle();
    this.type.emit('change-password');
    this.drawer.toggle();
  }

  closeDrawer(){
    this.drawer.toggle();
  } 

  async updateUser(){
    if (!this.form.controls['height'].valid || 
        !this.form.controls['weight'].valid || 
        !this.form.controls['age'].valid) {
      this.touchFields();
      return;
    } else {
      this.data.username = this.form.value.username;
      this.data.sex = this.form.value.sex;
      this.data.height = this.form.value.height;
      this.data.weight = this.form.value.weight;
      this.data.age = this.form.value.age;

      await this.userService.update(this.data).subscribe(
        (response: UserModel) => { 
          this.snackBar.open(this.translate.instant( 'update-account.success' ), this.translate.instant('general.close'), { duration: 3000 } );
          this.detectUpdate.emit(response);
          localStorage.setItem('username', response.username !== null ? response.username : '');
          this.drawer.toggle();
        }, 
        (error) => {
          this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 3000 } );
        });
    }
  }
}
