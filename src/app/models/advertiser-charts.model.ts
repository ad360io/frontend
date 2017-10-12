export class AdvertiserCharts {
  lineChartLabels : Array<any>;
  impressionsData : Array<any>;
  clicksData : Array<any>;
  barChartLabels: Array<any>;
  dailyData : Array<any>;
  weeklyData : Array<any>;
  monthlyData : Array<any>;


  constructor(jsonData?:any){
    this.lineChartLabels = jsonData && jsonData["c1_x"] || [];
    this.impressionsData = jsonData &&  jsonData["c1_y_impressions"] || [];
    this.clicksData = jsonData &&  jsonData["c1_y_clicks"] || [];
    this.barChartLabels = jsonData && jsonData["c2_xdata"] || [];
    this.dailyData = jsonData &&  jsonData["c2_y_weekclicks"] || [];
    this.weeklyData =  jsonData && jsonData["c2_y_day30clicks"] || [];
    this.monthlyData = jsonData && jsonData["c2_y_alltimeclicks"] || [];
  }
  update(advertiserCharts: AdvertiserCharts,currency:string){
    this.convertDates(advertiserCharts.lineChartLabels);
    this.impressionsData = advertiserCharts.impressionsData;
    this.clicksData = advertiserCharts.clicksData;
    this.barChartLabels = advertiserCharts.barChartLabels;
    this.dailyData = advertiserCharts.dailyData;
    this.weeklyData = advertiserCharts.weeklyData;
    this.monthlyData = advertiserCharts.monthlyData;


  }
  convertDates(chartLabels:Array<any>){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    for( var i=0; i<chartLabels.length;i++){
      this.lineChartLabels[i]=days[new Date(chartLabels[i]).getDay()];
    }
  }


}
