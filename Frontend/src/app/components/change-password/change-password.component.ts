import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordModel } from 'src/app/models/change-password-model';
import { UserService } from 'src/app/services/user.service';

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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  form: FormGroup;
  @Input() drawer: any;
  @Output() type = new EventEmitter<string>();
  
  constructor(
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    private userService: UserService, ){
      this.form = new FormGroup({
        currentPassword: new FormControl(null, Validators.compose([Validators.required])),
        password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6), createPasswordStrengthValidator()])),
        confirmPassword: new FormControl(null, Validators.compose([Validators.required])),
      },{
        validators: passwordConfirmValidator
      });
  }

  touchFields() {
    this.form.controls['currentPassword'].markAsTouched({ onlySelf: true });
    this.form.controls['password'].markAsTouched({ onlySelf: true });
    this.form.controls['confirmPassword'].markAsTouched({ onlySelf: true });
  }

  async save() {
    if (!this.form.controls['currentPassword'].valid
        || !this.form.controls['password'].valid || !this.form.controls['confirmPassword'].valid
        || (this.form.errors != null && this.form.errors['passwordConfirmedError'])) {
      this.touchFields();
      return;
    } else {

      let changePassword: ChangePasswordModel = {
        email: localStorage.getItem('email') ?? '',
        password: this.form.controls['currentPassword'].value,
        newPassword: this.form.controls['password'].value,
      }
      
      await this.userService.changePassword(changePassword).subscribe(
        response => {
            this.snackBar.open(this.translate.instant( 'update-account.password-change-success' ), this.translate.instant('general.close'), { duration: 3000 } ); 
            this.drawer.toggle();
          },
        error => {
          if (error.error === 'Invalid credentials') 
            this.snackBar.open(error.error, this.translate.instant('general.close'), { duration: 3000 } ); 
          else 
            this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 3000 } ); 
        }
      );
    }
  }

  backToEdit(){
    this.drawer.toggle();
    this.type.emit('edit-profile');
    this.drawer.toggle();
  }
}
