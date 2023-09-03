// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injector, APP_INITIALIZER } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Third-party
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

// Internal
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ComponentsModule } from '../../components/components.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

// import { JwtHelperService, JWT_OPTIONS, JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';
// const JWT_Module_Options: JwtModuleOptions = {
//   config: {
//       tokenGetter: yourTokenGetter,
//       whitelistedDomains: yourWhitelistedDomains
//   }
// };

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ForgotPasswordComponent
  ],
  imports: [
    // JwtModule.forRoot(JWT_Module_Options),
    // Core
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    NgSelectModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,

    // Internal
    ComponentsModule,

    // Third-party
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
})
export class AuthModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function ApplicationInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.addLangs(['en', 'ro']);
      let selectedLanguage = localStorage.getItem('language');
      if (selectedLanguage) {
        translate.setDefaultLang(selectedLanguage);
      }
      else {
        translate.setDefaultLang('en');
        selectedLanguage = 'en';
        localStorage.setItem("language", 'en');
      }

      translate.use(selectedLanguage).subscribe(() => {
        console.info(`Successfully initialized '${selectedLanguage}' language.'`);
      }, err => {
        console.error(`There was a problem with '${selectedLanguage}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}
