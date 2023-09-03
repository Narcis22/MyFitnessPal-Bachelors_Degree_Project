import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterUserModel } from 'src/app/models/register-user-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserImageModel } from 'src/app/models/user-image-model';
import { DefaultAvatarViewComponent } from 'src/app/components/default-avatar-view/default-avatar-view.component';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;
      if (!value) {
          return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
      return !passwordValid ? {passwordStrength:true}: null;
  }
}

export const passwordConfirmValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordConfirmedError: true } : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  profilePhotoId: string = '';
  
  form: FormGroup;
  currentLanguage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { 
    this.currentLanguage = translate.currentLang;

    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.compose([Validators.required])),
      lastName: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6), createPasswordStrengthValidator()])),
      confirmPassword: new FormControl(null, Validators.compose([Validators.required])),
    },{
      validators: passwordConfirmValidator
    });
  }
  
  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['firstName'].markAsTouched({ onlySelf: true });
    this.form.controls['lastName'].markAsTouched({ onlySelf: true });
    this.form.controls['email'].markAsTouched({ onlySelf: true });
    this.form.controls['password'].markAsTouched({ onlySelf: true });
    this.form.controls['confirmPassword'].markAsTouched({ onlySelf: true });
  }

  register(){
    if (!this.form.controls['firstName'].valid || !this.form.controls['lastName'].valid || !this.form.controls['email'].valid
        || !this.form.controls['password'].valid || !this.form.controls['confirmPassword'].valid
        || (this.form.errors != null && this.form.errors['passwordConfirmedError'])) {
      this.touchFields();
      return;
    } else {
      let newUser: RegisterUserModel = {
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        profilePhotoId: ''
      };
      newUser.profilePhotoId = this.profilePhotoId;

      if (newUser.profilePhotoId === '') {
        let randomPhotoId = Math.floor(Math.random() * 25 + 1);
        newUser.profilePhotoId = randomPhotoId.toString();
      }
      
      this.userService.register(newUser).subscribe(
        (result) => {
          this.snackBar.open(this.translate.instant( 'auth.register-success' ), this.translate.instant('general.close'), { duration: 3000 } );
            this.gotoLogin();
        }, 
        (error) => {
          this.snackBar.open(error.error, this.translate.instant('general.close'), { duration: 3000 } );
        }
      )
    }
  }

  gotoLogin(){
    localStorage.setItem('currentPage', 'login');
    this.router.navigate(['auth/login']);
  }

  openAvatarList(){
    const dialogRef = this.dialog.open(DefaultAvatarViewComponent, {
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: UserImageModel) => {
      if(result){
        //Add the new avatar to the newUserModel
        this.profilePhotoId = result.profilePhotoId;
      }
    });
  }
}
