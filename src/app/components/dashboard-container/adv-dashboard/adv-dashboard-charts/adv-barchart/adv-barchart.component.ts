import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';
import { AdvertiserCharts } from '../../../../../models/advertiser-charts.model';

@Component({
  selector: 'app-adv-barchart',
  templateUrl: './adv-barchart.component.html',
  styleUrls: ['./adv-barchart.component.css']
})
export class AdvBarchartComponent implements OnInit {
  advertiserCharts : AdvertiserCharts = new AdvertiserCharts();
  chosenChart:any = "dailyChart";
  isLoaded:boolean=false;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
     legend: { display: false }
  };
  barChartData:any=[];
  public barChartLabels=[];
  public barChartType:  string = 'bar';
  public barChartLegend:boolean = true;
  private colors = [
  {
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(0, 255, 0, 0.6)',
      'rgba(102, 0, 204, 0.6)',
      'rgba(255, 128, 0, 0.6)'
    ]
  }
  ];
  constructor(private dashboardService : DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.getAdvertiserCharts().subscribe(
      response => {
        this.advertiserCharts.update(response);
        this.isLoaded=true;
    });
  }
  // events
  public activeChart(event:any)  {
    var target = event.target || event.srcElement || event.currentTarget;
    this.chosenChart = target.attributes.id.value;
    ////console.log(this.chosenChart);
  }
  public chooseChart(){
    if(this.chosenChart == "dailyChart"){
      this.barChartData = [this.advertiserCharts.dailyData];
      ////console.log("daildata:"+this.advertiserCharts.dailyData);
    }
    if(this.chosenChart == "weeklyChart"){
        this.barChartData = [this.advertiserCharts.weeklyData];
        ////console.log("weekly:"+this.advertiserCharts.weeklyData);
    }
    if(this.chosenChart == "monthlyChart"){
      this.barChartData = [this.advertiserCharts.monthlyData];
      ////console.log("monthly:"+this.advertiserCharts.monthlyData);
    }
    return this.barChartData;

  }
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
}
