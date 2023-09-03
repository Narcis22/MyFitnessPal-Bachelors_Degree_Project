import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Translation
import { Injector, APP_INITIALIZER } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LOCATION_INITIALIZED} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Pages
    PagesModule,
    ComponentsModule,
    
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    MatSelectModule,
    MatIconModule,
    MatSortModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    
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
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function ApplicationInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.addLangs([ 'en', 'ro']);
      let selectedLanguage = localStorage.getItem('language');
      if (selectedLanguage) {
        translate.setDefaultLang(selectedLanguage);
      }
      else {
        translate.setDefaultLang('en');
        selectedLanguage = 'en';
        localStorage.setItem("language", 'en');
      }

      // Add current page too localStorage
      if(!localStorage.getItem('currentPage')){
        localStorage.setItem('currentPage', 'wellcome');
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
