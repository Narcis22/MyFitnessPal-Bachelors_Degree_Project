import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { WorkoutModel } from 'src/app/models/workout-model';
import { WorkoutService } from 'src/app/services/workout.service';
import { constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css']
})
export class WorkoutsListComponent {
  workouts: WorkoutModel[] = [];
  listOfSports: any;
  mapOfWorkouts: Map<string, number> = new Map();

  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {}

  MockData: WorkoutModel[] = [{
    username: "",
    sportId: 1,
    createdAt: new Date(),
    duration: "80",
    steps: "13240",
    distance: "12.5"
  },{
    username: "",
    sportId: 2,
    createdAt: new Date("August 21, 2023 01:15:00"),
    duration: "35",
    steps: "10500",
    distance: "13"
  },{
    username: "",
    sportId: 10,
    createdAt: new Date("August 20, 2023 01:15:00"),
    duration: "30",
    steps: null,
    distance: null  
  },{
    username: "",
    sportId: 10,
    createdAt: new Date("August 19, 2023 01:15:00"),
    duration: "60",
    steps: null,
    distance: null  
  },{
    username: "",
    sportId: 5,
    createdAt: new Date("August 19, 2023 01:15:00"),
    duration: "55",
    steps: null,
    distance: "12.5"
  },{
    username: "",
    sportId: 6,
    createdAt: new Date("August 17, 2023 01:15:00"),
    duration: "75",
    steps: null,
    distance: null
  },{
    username: "",
    sportId: 7,
    createdAt: new Date(),
    duration: "23",
    steps: "10200",
    distance: "12.5" 
  },{
    username: "",
    sportId: 8,
    createdAt: new Date(),
    duration: "55",
    steps: "10200",
    distance: "12.5" 
  },{
    username: "",
    sportId: 9,
    createdAt: new Date(),
    duration: "676",
    steps: "10200",
    distance: "12.5"
  },{
    username: "",
    sportId: 10,
    createdAt: new Date(),
    duration: "33",
    steps: "10200",
    distance: "12.5"
  },{
    username: "",
    sportId: 11,
    createdAt: new Date(),
    duration: "66",
    steps: "10200",
    distance: "12.5"
  },{
    username: "",
    sportId: 12,
    createdAt: new Date(),
    duration: "234",
    steps: "10200",
    distance: "12.5"
  },{
    username: "",
    sportId: 14,
    createdAt: new Date(),
    duration: "5",
    steps: "10200",
    distance: "12.5"
  },{
    username: "",
    sportId: 14,
    createdAt: new Date(),
    duration: "12",
    steps: "10200",
    distance: "12.5" 
  },
  ];

  public isLoading: boolean = false;
  displayedColumns: string[] = ['icon', 
                                'date',
                                'duration', 
                                'distance', 
                                'steps', 
                                'noWorkouts'];

  dataSource: MatTableDataSource<WorkoutModel> | undefined;
  sportIcons:any; 

  constructor(
    private translate: TranslateService,
    private workoutService: WorkoutService
    ) {
      this.sportIcons = constants.sportIcons;
      this.getWorkouts();
  }

  ngOnInit(){
    // this.dataSource = new MatTableDataSource<WorkoutModel>(this.workouts);
    this.dataSource = new MatTableDataSource<WorkoutModel>(this.MockData);
    this.getNoWorkouts();
    this.loadTable();
  }

  async getWorkouts() {
    let email = localStorage.getItem('email');
    await this.workoutService.getAll(email!).subscribe(
      response => {
        this.workouts = response;
        // this.dataSource = new MatTableDataSource<WorkoutModel>(this.workouts);
        this.dataSource = new MatTableDataSource<WorkoutModel>(this.MockData);
        this.getNoWorkouts();
      }
    );
  }

  async loadTable() {
    // this.dataSource = new MatTableDataSource<WorkoutModel>(this.workouts);
    this.dataSource = new MatTableDataSource<WorkoutModel>(this.MockData);
    this.dataSource.sort = this.sort!;
  }

  ngAfterViewInit() {
    this.loadTable();
  }

  getNoWorkouts(){

    // To be deleted for real data
    this.workouts = this.MockData;

    this.listOfSports = [...new Map(this.workouts.map(item => [item, item.sportId])).values()];

    for(let i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]){
      this.mapOfWorkouts.set(i.toString(), 0);
    }

    for(let sport in this.listOfSports){
      this.mapOfWorkouts.set(this.listOfSports[sport].toString(), this.mapOfWorkouts.get(this.listOfSports[sport].toString())! + 1);
    }
  }
}
