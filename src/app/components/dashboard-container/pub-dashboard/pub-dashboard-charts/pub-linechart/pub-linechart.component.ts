import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';
import { PublisherCharts } from '../../../../../models/publisher-charts.model';

@Component({
  selector: 'app-pub-linechart',
  templateUrl: './pub-linechart.component.html',
  styleUrls: ['./pub-linechart.component.css']
})
export class PubLinechartComponent implements OnInit {

  chosenChart: any ="revenueChart";
  chartData:any;
  revenuelabels=[];
  // lineChart
  publisherCharts: PublisherCharts;

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,161,181,0.6)',
      borderColor: 'rgba(255,161,181,1)',
      pointBackgroundColor: 'rgba(255,161,181,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,161,181,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(134,199,243,0.6)',
      borderColor: 'rgba(134,199,243,1)',
      pointBackgroundColor: 'rgba(134,199,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(134,199,243,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(255,226,154,0.6)',
      borderColor: 'rgba(255,226,154,1)',
      pointBackgroundColor: 'rgba(255,226,154,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,226,154,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(241,242,244,0.6)',
      borderColor: 'rgba(241,242,244,1)',
      pointBackgroundColor: 'rgba(241,242,244,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(241,242,244,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(147,217,217,0.6)',
      borderColor: 'rgba(147,217,217,1)',
      pointBackgroundColor: 'rgba(147,217,217,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(147,217,217,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  isLoaded =false;
  constructor(private dashboardService : DashboardService){
    this.publisherCharts = new PublisherCharts();
  }


  ngOnInit(){
    this.dashboardService.getPublisherCharts().subscribe(
      response => {
        console.log(response.lineChartLabels)
        this.publisherCharts.update(response);
        console.log("Omegalul+"+this.publisherCharts);
        this.isLoaded=true;
      }
    )

  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public activeChart(event:any)  {
    var target = event.target || event.srcElement || event.currentTarget;
    this.chosenChart = target.attributes.id;
    console.log(this.chosenChart);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public chooseDataset(){
    if(this.chosenChart == "revenueChart"){
      this.chartData = this.publisherCharts.revenueData;
    }
    if(this.chosenChart == "impressionsChart"){
        this.chartData = this.publisherCharts.impressionsData;
    }
    if(this.chosenChart == "clicksChart"){
      this.chartData = this.publisherCharts.clicksData;
    }
    if(this.chosenChart == "rpmChart"){
      this.chartData = this.publisherCharts.rpmData;
    }
    console.log(this.chartData)
    return this.chartData;
  }


}
