import { Component, OnInit } from '@angular/core';
import { PublisherCharts } from '../../../../../models/publisher-charts.model';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';

@Component({
  selector: 'app-pub-barchart',
  templateUrl: './pub-barchart.component.html',
  styleUrls: ['./pub-barchart.component.css']
})
export class PubBarchartComponent implements OnInit {
  publisherCharts : PublisherCharts;
  chosenChart:any;
  isLoaded:boolean=false;
  //barChartSampleData:any[]=[{data: [58.42890899, 55.23969063, 63.13143881, 60.64657295, 59.68306015]}];
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
    this.chosenChart = "dailyChart";
    this.publisherCharts = new PublisherCharts();
  }

  ngOnInit() {
    this.dashboardService.getPublisherCharts().subscribe(
      response => {
        this.publisherCharts.update(response);
        ////console.log(this.publisherCharts.dailyData);
        this.isLoaded=true;
      }
    )
  }

  // events
  public activeChart(event:any)  {
    var target = event.target || event.srcElement || event.currentTarget;
    this.chosenChart = target.attributes.id.value;
    ////console.log(this.chosenChart);
  }
  public chooseChart(){
    if(this.chosenChart == "dailyChart"){
      this.barChartData = [this.publisherCharts.dailyData];
    }
    if(this.chosenChart == "weeklyChart"){
        this.barChartData = [this.publisherCharts.weeklyData];
    }
    if(this.chosenChart == "monthlyChart"){
      this.barChartData = [this.publisherCharts.monthlyData];
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
