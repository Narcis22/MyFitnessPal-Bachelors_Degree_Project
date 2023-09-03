import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModel } from 'src/app/models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    public translate: TranslateService,
    public router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    localStorage.setItem('currentPage', 'login');
    
    this.form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  login() {
    this.userService.login(this.form.value).subscribe(
      (result: LoginModel) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("email", this.form.value.email);
        localStorage.setItem("username", result.username);
        this.router.navigate(['/home']);
      }, 
      (error) => {
        if (error.error == 'Invalid credentials') {
          this.snackBar.open(this.translate.instant('errors.invalid-credentials'), this.translate.instant('general.close'), { duration: 3000 } );
        } else {
          this.snackBar.open(this.translate.instant('errors.generic'), this.translate.instant('general.close'), { duration: 3000 } );
        }
      }
    );
  }
  
  gotoRegister() {
    localStorage.setItem('currentPage', 'register');
    this.router.navigate(['auth/register']);
  }

  gotoForgotPasword() {
    localStorage.setItem('currentPage', 'forgot-password');
    this.router.navigate(['auth/forgot-password']);
  }
}
