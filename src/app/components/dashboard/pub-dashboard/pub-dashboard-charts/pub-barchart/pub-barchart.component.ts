import { Component, OnInit } from '@angular/core';
import { PublisherCharts } from '../../../../../models/publisher-charts.model';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';
import { TrackCurrency } from '../../../../../services/trackCurrency.service';

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
   tooltips: { enabled: false },
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
  eqcCPM = 1.9708679;
  xqcCPM = 2.3716234;
  isDailyActive = true;
  isMonthlyActive = false;
  isWeeklyActive = false;
  constructor(private dashboardService : DashboardService,private trackCurrency: TrackCurrency) {
    this.chosenChart = "dailyChart";
    this.publisherCharts = new PublisherCharts();
  }

  ngOnInit() {
    var cpm:any;
    this.dashboardService.getPublisherCharts().subscribe(
      response => {

        if(response){
        if(this.trackCurrency.currency=="eqc" || "EQC"){
          cpm = this.eqcCPM;
        }
        else{
          cpm=this.xqcCPM;
        }
        //console.log(response.dailyData["data"]);
        for(var i=0;i<response.dailyData["data"].length;i++)
        {
          //console.log( parseFloat(response.dailyData["data"][i])/5232.2);
          response.dailyData["data"][i] = (parseFloat(response.dailyData["data"][i])/1000000)*cpm
        }
        for(var i=0;i<response.weeklyData["data"].length;i++)
        {
          //console.log( parseFloat(response.dailyData["data"][i])/5232.2);
          response.weeklyData["data"][i] = (parseFloat(response.weeklyData["data"][i])/1000000)*cpm
        }
        for(var i=0;i<response.monthlyData["data"].length;i++)
        {
          //console.log( parseFloat(response.dailyData["data"][i])/5232.2);
          response.monthlyData["data"][i] = (parseFloat(response.monthlyData["data"][i])/1000000)*cpm
        }
        this.publisherCharts.update(response,this.trackCurrency.currency);
        this.isLoaded=true;}
      }
    )
  }

  // events
  public activeChart(event:any)  {
    var target = event.target || event.srcElement || event.currentTarget;
    this.chosenChart = target.attributes.id.value;
    if(this.chosenChart=="dailyChart"){
      this.isDailyActive = true;
      this.isWeeklyActive = false;
      this.isMonthlyActive = false;
      }
      if(this.chosenChart=="weeklyChart"){
        this.isDailyActive = false;
        this.isWeeklyActive = true;
        this.isMonthlyActive = false;
        }
        if(this.chosenChart=="monthlyChart"){
          this.isDailyActive = false;
          this.isWeeklyActive = false;
          this.isMonthlyActive = true;
          }
    //console.log(this.chosenChart);
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
  public returnBarChartLabels(){
    return this.publisherCharts.barChartLabels;
  }
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
  isDayActive(){
    return this.isDailyActive;
  }
  isWeekActive(){
    return this.isWeeklyActive;
  }
  isTimeActive(){
    return this.isMonthlyActive;
  }
}
