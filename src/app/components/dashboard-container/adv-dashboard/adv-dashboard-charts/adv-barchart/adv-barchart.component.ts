import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';
import { AdvertiserCharts } from '../../../../../models/advertiser-charts.model';
import { TrackCurrency } from '../../../../../services/trackCurrency.service';

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
  eqcCPM = 41.5653832;
  xqcCPM = 33.9283134;
  isDailyActive = true;
  isMonthlyActive = false;
  isWeeklyActive = false;
  constructor(private dashboardService : DashboardService,private trackCurrency: TrackCurrency) {
  }

  ngOnInit() {
    var cpm:any;
    this.dashboardService.getAdvertiserCharts().subscribe(
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
        this.advertiserCharts.update(response,this.trackCurrency.currency);
        this.isLoaded=true;}
    });
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
      this.barChartData = [this.advertiserCharts.dailyData];
      //console.log("daildata:"+this.advertiserCharts.dailyData);
    }
    if(this.chosenChart == "weeklyChart"){
        this.barChartData = [this.advertiserCharts.weeklyData];
        //console.log("weekly:"+this.advertiserCharts.weeklyData);
    }
    if(this.chosenChart == "monthlyChart"){
      this.barChartData = [this.advertiserCharts.monthlyData];
      //console.log("monthly:"+this.advertiserCharts.monthlyData);
    }
    return this.barChartData;

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
