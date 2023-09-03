import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  currentLanguage: string;
  form: FormGroup;

  constructor(
    public translate: TranslateService,
    public snackBar: MatSnackBar,
    public router: Router,
    private userService: UserService){
      
      this.currentLanguage = translate.currentLang;

      this.form = new FormGroup({
        email: new FormControl(null, Validators.compose([Validators.required, Validators.email]))
      },{});
  }

  touchFields() {
    this.form.controls['email'].markAsTouched({ onlySelf: true });
  }

  async resetPassword(){
    if(!this.form.controls['email'].valid){
      this.touchFields();
      return;
    }

    await this.userService.forgetPassword(this.form.controls['email'].value).subscribe(
      response => {
        if(response) {
          this.snackBar.open(this.translate.instant( 'auth.forgot-password.reset-sent' ), this.translate.instant('general.close'), { duration: 6000 } );
          this.router.navigate(['auth/login']);
        } else {
          this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 6000 } );
        }
      });
  }
}
