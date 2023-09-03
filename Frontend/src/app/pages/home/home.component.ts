import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string | null = "Narcis";

  constructor(public router: Router) {
    this.username = localStorage.getItem('username');
  }

  ngAfterViewInit(){
  }

  scroll(section: string): void {
    (document.getElementById(section) as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' }); 
  }
}
