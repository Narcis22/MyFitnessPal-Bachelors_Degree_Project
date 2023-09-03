import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrls: ['./workout-info.component.css']
})
export class WorkoutInfoComponent {
  id: string | null = "";

  constructor(private route: ActivatedRoute,
    public translate: TranslateService){

  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
