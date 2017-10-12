import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';
import { AdvertiserCharts } from '../../../../../models/advertiser-charts.model';
import { TrackCurrency } from '../../../../../services/trackCurrency.service';

@Component({
  selector: 'app-adv-linechart',
  templateUrl: './adv-linechart.component.html',
  styleUrls: ['./adv-linechart.component.css']
})
export class AdvLinechartComponent implements OnInit {

  chosenChart: any ="impressionsChart";
  chartData:any;
  isLoaded: boolean = false ;

  advertiserCharts: AdvertiserCharts = new AdvertiserCharts();

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
    isImpressionsActive = true;
    isClicksActive= false;
  constructor(private dashboardService : DashboardService, private trackCurrency: TrackCurrency){

  }

  ngOnInit(){
    this.dashboardService.getAdvertiserCharts().subscribe(
      response => {
        //console.log(response);
        this.advertiserCharts.update(response,this.trackCurrency.currency);
        this.isLoaded=true;
      });
  }
  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
  public activeChart(event:any)  {
    var target = event.target || event.srcElement || event.currentTarget;
    this.chosenChart = target.attributes.id.value;
    if(this.chosenChart=="impressionsChart"){
      this.isImpressionsActive = true;
      this.isClicksActive = false;

      }
      if(this.chosenChart=="clicksChart"){
        this.isImpressionsActive = false;
        this.isClicksActive = true;

        }
    //console.log(this.chosenChart);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
  public chooseDataset(){

    if(this.chosenChart == "impressionsChart"){
        this.chartData = this.advertiserCharts.impressionsData;
    }
    if(this.chosenChart == "clicksChart"){
      this.chartData = this.advertiserCharts.clicksData;
    }

    //console.log(this.chartData)
    return this.chartData;
  }
}
