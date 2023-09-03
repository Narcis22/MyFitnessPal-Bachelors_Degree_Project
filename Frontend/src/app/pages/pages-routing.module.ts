import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { CreateMediaComponent } from './create-media/create-media.component';
import { LogWorkoutComponent } from './log-workout/log-workout.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkoutInfoComponent } from './workout-info/workout-info.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { GymLocationsComponent } from './gym-locations/gym-locations.component';
import { AdminAccessGuard } from '../guards/admin-access.guard';
import { StatisticsAdminComponent } from './statistics-admin/statistics-admin.component';
import { AuthorizationGuard } from '../guards/authorization.guard';

const routes: Routes = [
{
    path: '',
    // canActivate: [AuthorizationGuard],
    component: LayoutComponent,
    children: [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'activity',
        component: ActivityComponent
    },
    {
        path: 'create-media',
        component: CreateMediaComponent
    },
    {
        path: 'log-workout',
        component: LogWorkoutComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'workout-info',
        component: HomeComponent
    },
    {
        path: 'workout-info/:id',
        component: WorkoutInfoComponent
    },
    {
        // canActivate: [AdminAccessGuard],
        path: 'user-management',
        component: UserManagementComponent
    },
    {
        // canActivate: [AdminAccessGuard],
        path: 'user-messages',
        component: UserMessagesComponent
    },
    {
        // canActivate: [AdminAccessGuard],
        path: 'statistics',
        component: StatisticsAdminComponent
    },
    {
        path: 'gym-locations',
        component: GymLocationsComponent
    },
    {     
        path: '**',
        redirectTo: 'error/404' 
    },]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
