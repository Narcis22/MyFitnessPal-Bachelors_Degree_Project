import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-us-dialog',
  templateUrl: './contact-us-dialog.component.html',
  styleUrls: ['./contact-us-dialog.component.css']
})
export class ContactUsDialogComponent {
  @Input() drawer: any;
  
  form: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.form = new FormGroup({
      message: new FormControl(null, Validators.required)
    }, {});
  }

  touchFields() {
    this.form.controls['message'].markAsTouched({ onlySelf: true });
  }

  sendMail(){
    if(!this.form.controls['message'].valid) {
      this.touchFields();
      return;
    }
    let email = localStorage.getItem('email') ?? '';
    this.userService.sendMail(email, this.form.controls['message'].value).subscribe(
      (response: boolean) => {
        if (response) {
          this.snackBar.open(this.translate.instant( 'send-message.success' ), this.translate.instant('general.close'), { duration: 3000 } );
          this.closeDrawer();
        } else {
          this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 3000 } );
        }
      }, 
      (error) => {
        this.snackBar.open(this.translate.instant( 'errors.generic' ), this.translate.instant('general.close'), { duration: 3000 } );
      });
  }

  closeDrawer(){
    this.drawer.toggle();
  }
}
