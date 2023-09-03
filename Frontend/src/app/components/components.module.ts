import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { WorkoutInfoArmsComponent } from './workout-info/workout-info-arms/workout-info-arms.component';
import { WorkoutInfoChestComponent } from './workout-info/workout-info-chest/workout-info-chest.component';
import { WorkoutInfoBackComponent } from './workout-info/workout-info-back/workout-info-back.component';
import { WorkoutInfoLegsComponent } from './workout-info/workout-info-legs/workout-info-legs.component';
import { WorkoutInfoCoreComponent } from './workout-info/workout-info-core/workout-info-core.component';
import { ContactUsDialogComponent } from './contact-us-dialog/contact-us-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyStatisticsComponent } from './my-statistics/my-statistics.component';
import { ChangeProfilePicComponent } from './change-profile-pic/change-profile-pic.component';
import { DefaultAvatarViewComponent } from './default-avatar-view/default-avatar-view.component';
import { MessageViewDialogComponent } from './message-view-dialog/message-view-dialog.component';
import { DeleteUserConfirmComponent } from './delete-user-confirm/delete-user-confirm.component';
import { FullMedalsListComponent } from './full-medals-list/full-medals-list.component';
import { ShareTemplateComponent } from './share-template/share-template.component';
import { SendMessageComponent } from './send-message/send-message.component';
    import { MatCheckboxModule } from '@angular/material/checkbox';
    import { MakeAdminComponent } from './make-admin/make-admin.component';

@NgModule({
  declarations: [  
    WorkoutsListComponent, 
    AchievementsComponent, 
    EditProfileDialogComponent,
    ContactUsDialogComponent, 
    ChangePasswordComponent, 
    MyStatisticsComponent,
    WorkoutInfoArmsComponent, 
    WorkoutInfoChestComponent, 
    WorkoutInfoBackComponent, 
    WorkoutInfoLegsComponent, 
    WorkoutInfoCoreComponent,
    ChangeProfilePicComponent,
    DefaultAvatarViewComponent,
    MessageViewDialogComponent,
    DeleteUserConfirmComponent,
    FullMedalsListComponent,
    ShareTemplateComponent,
    SendMessageComponent,
    MakeAdminComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule,
    WorkoutsListComponent,
    AchievementsComponent,
    EditProfileDialogComponent,
    FormsModule,
    ReactiveFormsModule,
    ChangePasswordComponent,
    MyStatisticsComponent,
    ContactUsDialogComponent,
    WorkoutInfoArmsComponent, 
    WorkoutInfoChestComponent, 
    WorkoutInfoBackComponent, 
    WorkoutInfoLegsComponent, 
    WorkoutInfoCoreComponent,
    ChangeProfilePicComponent,
    DefaultAvatarViewComponent,
    MessageViewDialogComponent,
    DeleteUserConfirmComponent,
    FullMedalsListComponent,
    ShareTemplateComponent,
    SendMessageComponent
  ]
})
export class ComponentsModule { }
