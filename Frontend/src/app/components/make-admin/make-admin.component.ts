import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-make-admin',
  templateUrl: './make-admin.component.html',
  styleUrls: ['./make-admin.component.css']
})
export class MakeAdminComponent {
  isChecked: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<MakeAdminComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private translate: TranslateService){
  }

  async confirmation(){
    await this.userService.makeAdmin(this.data).subscribe(
      (response) => {
        if(response) {
          this.snackBar.open(this.translate.instant( 'user-management.user-made-admin' ), this.translate.instant('general.close'), { duration: 3000 } );

        } else {
          this.snackBar.open(this.translate.instant( 'errors.general' ) , this.translate.instant('general.close'), { duration: 3000 } );
        }
      });
    this.dialogRef.close(true);
  }

  abandon(){
    this.dialogRef.close(false);
  }
}
