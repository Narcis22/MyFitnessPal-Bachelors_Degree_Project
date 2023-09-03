import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgApexchartsModule } from "ng-apexcharts";

//Components
import { ActivityComponent } from './activity/activity.component';
import { CreateMediaComponent } from './create-media/create-media.component';
import { HomeComponent } from './home/home.component';
import { LogWorkoutComponent } from './log-workout/log-workout.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkoutInfoComponent } from './workout-info/workout-info.component';
import { MatSelectModule } from '@angular/material/select';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { GymLocationsComponent } from './gym-locations/gym-locations.component';
import { StatisticsAdminComponent } from './statistics-admin/statistics-admin.component';


@NgModule({
  declarations: [
    ActivityComponent,
    CreateMediaComponent,
    HomeComponent,
    LayoutComponent,
    LogWorkoutComponent,
    ProfileComponent,
    WorkoutInfoComponent,
    UserManagementComponent,
    UserMessagesComponent,
    GymLocationsComponent,
    StatisticsAdminComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,

    //Other
    TranslateModule.forChild(),

    //Angular Material
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatMenuModule,
    GoogleMapsModule,
    NgApexchartsModule
  ],
  exports:[
    ReactiveFormsModule]
})
export class PagesModule { }
