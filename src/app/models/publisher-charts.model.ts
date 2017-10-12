export class PublisherCharts {
  lineChartLabels : Array<any>;
  revenueData : Array<any>;
  impressionsData : Array<any>;
  clicksData : Array<any>;
  rpmData : Array<any>;
  barChartLabels: Array<any>;
  dailyData : Array<any>;
  weeklyData : Array<any>;
  monthlyData : Array<any>;

  constructor(jsonData?:any){

    this.lineChartLabels = jsonData && jsonData["c1_x"] || [];
    this.revenueData =  jsonData &&  jsonData["c1_y_revenue"] || [];
    this.impressionsData = jsonData &&  jsonData["c1_y_impressions"] || [];
    this.clicksData = jsonData &&  jsonData["c1_y_clicks"] || [];
    this.rpmData = jsonData &&  jsonData["c1_y_rpm"] || [];
    this.barChartLabels = jsonData && jsonData["c2_xdata"] || [];
    this.dailyData = jsonData &&  jsonData["c2_y_weekrevenue"] || [];
    this.weeklyData =  jsonData && jsonData["c2_y_day30revenue"] || [];
    this.monthlyData = jsonData && jsonData["c2_y_alltimerevenue"] || [];
  }
  update(publisherCharts: PublisherCharts,currency:string){
    //his.lineChartLabels = publisherCharts.lineChartLabels;
    this.convertDates(publisherCharts.lineChartLabels);
    this.revenueData = publisherCharts.revenueData;
    this.impressionsData = publisherCharts.impressionsData;
    this.clicksData = publisherCharts.clicksData;
    this.rpmData = publisherCharts.rpmData;
    this.barChartLabels = publisherCharts.barChartLabels;
    this.dailyData = publisherCharts.dailyData;
    this.weeklyData = publisherCharts.weeklyData;
    this.monthlyData = publisherCharts.monthlyData;

  }
  convertDates(chartLabels:Array<any>){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    for( var i=0; i<chartLabels.length;i++){
      this.lineChartLabels[i]=days[new Date(chartLabels[i]).getDay()];
    }
  }


}
