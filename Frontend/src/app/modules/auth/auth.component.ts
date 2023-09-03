import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  languages = this.translate.getLangs();
  selectedLang = localStorage.getItem('language');
  currentLanguage: string;
  pageDisplayed: string;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ro']);
    const selectedLanguage = localStorage.getItem('language');
    if (selectedLanguage) {
      translate.setDefaultLang(selectedLanguage);
      translate.use(selectedLanguage);
    }
    else {
      translate.setDefaultLang('en');
      translate.use('en');
      localStorage.setItem("language", 'en');
      localStorage.setItem("currentPage", 'auth');
    }

    this.pageDisplayed = localStorage.getItem('currentPage')!;
    this.currentLanguage = translate.currentLang;
  }
  
  ngOnChange(){
    this.pageDisplayed = localStorage.getItem('currentPage')!;
  }

  ngAfterViewInit(){
    this.pageDisplayed = localStorage.getItem('currentPage')!;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    document.location.reload();
  }

}
