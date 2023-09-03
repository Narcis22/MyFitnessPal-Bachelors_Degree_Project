import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-my-statistics',
  templateUrl: './my-statistics.component.html',
  styleUrls: ['./my-statistics.component.css']
})
export class MyStatisticsComponent {
  @Input() user: UserModel = {
    id: 0,
    firstName: "",
    lastName: "",
    username: null,
    email: "",
    sex: null,
    height: null,
    weight: null,
    age: null,
  };

  ngOnInit() {
    
  }
  
  bmiRangeMin() {
    let min = 18.5 * this.user.height! * this.user.height! / 10000;
    return min.toFixed(0);
  }

  bmiRangeMax() {
    let max = 24.9 * this.user.height! * this.user.height! / 10000;
    return max.toFixed(0);
  }

  bmi() {
    let bmi = this.user.weight! / (this.user.height! * this.user.height! / 10000);
    return bmi.toFixed(2);
  }

  bmiCategory() {
    let bmi = parseFloat(this.bmi());

    if (bmi < 18.5) 
      return 'underweight';
    
    if (bmi < 25)
      return 'normal weight';
    
    if (bmi < 30)
      return 'overweight';

    if (bmi < 35)
      return 'obese degree 1';

    if (bmi < 40)
      return 'obese degree 2';

    return 'obese degree 3';
  }
}
