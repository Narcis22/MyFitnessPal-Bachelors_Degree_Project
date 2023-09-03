import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StatisticsAchievementModel } from 'src/app/models/statistics-achievement-model';
import { StatisticsSportModel } from 'src/app/models/statistics-sport-model';
import { StatisticsService } from 'src/app/services/statistics.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
} from "ng-apexcharts";

export type StatisticsSportChartOptions = {
  series: ApexAxisChartSeries | '';
  chart?: ApexChart | '';
  dataLabels?: ApexDataLabels | '';
  plotOptions?: ApexPlotOptions | '';
  xaxis?: ApexXAxis | '';
  stroke?: ApexStroke | '';
};

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type StatisticsAchievementChartOptions = {
  series: ApexAxisChartSeries | '';
  chart: ApexChart | '';
  dataLabels: ApexDataLabels | '';
  plotOptions: ApexPlotOptions | '';
  yaxis: ApexYAxis | '';
  xaxis: ApexXAxis | '';
  grid: ApexGrid | '';
  colors: string[] | '';
  legend: ApexLegend | '';
};

@Component({
  selector: 'app-statistics-admin',
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.css']
})

export class StatisticsAdminComponent {
  @ViewChild("statisticsSportChart") chart!: ChartComponent;
  public statisticsSportChart: Partial<StatisticsSportChartOptions> | any;
  @ViewChild("statisticsAchievementChart") chart2!: ChartComponent;
  public statisticsAchievementChart: Partial<StatisticsAchievementChartOptions> | any;

  MockDataSport: StatisticsSportModel[] = [{
    sportName: "walking",
    totalDuration: 6000,
    noWorkouts: 200
  },{
    sportName: "running",
    totalDuration: 3750,
    noWorkouts: 150
  },{
    sportName: "cycling",
    totalDuration: 3424,
    noWorkouts: 214
  },{
    sportName: "indoor-cycling",
    totalDuration: 8710,
    noWorkouts: 134
  },{
    sportName: "eliptical",
    totalDuration: 8680,
    noWorkouts: 124
  },{
    sportName: "traditional-strength",
    totalDuration: 4000,
    noWorkouts: 40
  },{
    sportName: "HIIT",
    totalDuration: 810,
    noWorkouts: 324
  },{
    sportName: "stair-stepper",
    totalDuration: 6012,
    noWorkouts: 167
  },{
    sportName: "hiking",
    totalDuration: 11520,
    noWorkouts: 64
  },{
    sportName: "pool-swim",
    totalDuration: 7425,
    noWorkouts: 145
  },{
    sportName: "functional-strength",
    totalDuration: 21125,
    noWorkouts: 325
  },{
    sportName: "yoga",
    totalDuration: 3060,
    noWorkouts: 68
  },{
    sportName: "rowing-machine",
    totalDuration: 6480,
    noWorkouts: 216
  },{
    sportName: "bowling",
    totalDuration: 17,
    noWorkouts: 240
  }]

  
  MockDataAchievement: StatisticsAchievementModel[] = [{
    monthName: "01",
    noUsersAtTheTime: 250,
    procentOfUsers: 40
  },{
    monthName: "02",
    noUsersAtTheTime: 275,
    procentOfUsers: 35
  },{
    monthName: "03",
    noUsersAtTheTime: 300,
    procentOfUsers: 32
  },{
    monthName: "04",
    noUsersAtTheTime: 340,
    procentOfUsers: 50
  },{
    monthName: "05",
    noUsersAtTheTime: 400,
    procentOfUsers: 69
  },{
    monthName: "06",
    noUsersAtTheTime: 514,
    procentOfUsers: 74
  },{
    monthName: "07",
    noUsersAtTheTime: 680,
    procentOfUsers: 73
  },{
    monthName: "08",
    noUsersAtTheTime: 743,
    procentOfUsers: 65
  },{
    monthName: "09",
    noUsersAtTheTime: 802,
    procentOfUsers: 60
  },{
    monthName: "10",
    noUsersAtTheTime: 835,
    procentOfUsers: 45
  },{
    monthName: "11",
    noUsersAtTheTime: 890,
    procentOfUsers: 40
  },{
    monthName: "12",
    noUsersAtTheTime: 921,
    procentOfUsers: 30
  }]

  statisticsSport!: StatisticsSportModel[] | [];
  statisticsAchievement!: StatisticsAchievementModel[] | [];
  totalEntries: number = 0
  totalTime: number = 0;
  
  constructor(
    private translate: TranslateService,
    private statisticsService: StatisticsService,
  ) {
    this.getStatistics();
  }

  async getStatistics() {
    await this.statisticsService.getStatisticsSport().subscribe(
      (response: StatisticsSportModel[]) => {
        this.statisticsSport = response;
        
        this.statisticsSport?.forEach(sport => {
          this.totalEntries += sport.noWorkouts;
          this.totalTime += sport.totalDuration;
        });

        this.getStatisticsSportChart();
      }
    );

    this.MockDataSport?.forEach(sport => {
      this.totalEntries += sport.noWorkouts;
      this.totalTime += sport.totalDuration;
    });
    this.getStatisticsSportChart();

    await this.statisticsService.getStatisticsAchievement().subscribe(
      (response: StatisticsAchievementModel[]) => {
        this.statisticsAchievement = response;
        this.getStatisticsAchievementChart();
      }
    );
    this.getStatisticsAchievementChart();
  }

  getStatisticsSportChart() {
    this.statisticsSportChart = {
      series: [
        {
          name: "percentage of sport enteries relative to all activities logged",
          data: this.MockDataSport.map(x => (x.noWorkouts * 100 / this.totalEntries).toFixed(2))
          // data: this.statisticsSport.map(x => (x.noWorkouts * 100 / this.totalEntries).toFixed(2))
        },
        {
          name: "percentage of time spent on sport relative to total time spent on workouts",
          data:  this.MockDataSport.map(x => (x.totalDuration * 100 / this.totalTime).toFixed(2))
          // data:  this.statisticsSport.map(x => (x.totalDuration * 100 / this.totalTime).toFixed(2))
        }
      ],
      chart: {
        type: "bar",
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: this.MockDataSport.map(x => x.sportName),
        // categories: this.statisticsSport.map(x => x.sportName)
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      }
    };
  }
  
  getMonthName(month: string) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[parseInt(month) - 1];
  }

  getStatisticsAchievementChart() {
    this.statisticsAchievementChart = {
      series: [
        {
          name: "distibuted",
          data: this.MockDataAchievement.map(x => x.procentOfUsers)
          // data: this.statisticsAchievement.map(x => x.procentOfUsers)
        }
      ],
      chart: {
        height: 600,
        type: "bar" 
      },
      colors: [
        "#6cbaf9",
        "#5ce1ff",
        "#16ddd5",
        "#4fe0a5",
        "#88f36f",
        "#d3f03c",
        "#f3e330",
        "#fde85a",
        "#ffb845",
        "#ff9356",
        "#ff6b59",
        "#fb6269"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: 
          this.MockDataAchievement.map(x => [this.getMonthName(x.monthName), x.noUsersAtTheTime + " users at that time"]),
          // this.statisticsAchievement.map(x => [this.getMonthName(x.monthName), x.noUsersAtTheTime + " users at that time"]),
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      }
      ,yaxis: {
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      }
    };
  }
}
