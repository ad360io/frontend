import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pub-barchart',
  templateUrl: './pub-barchart.component.html',
  styleUrls: ['./pub-barchart.component.css']
})
export class PubBarchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  chosenChart:any;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
     legend: { display: false }
  };
  barChartData:any[]=[{data: [58.42890899, 55.23969063, 63.13143881, 60.64657295, 59.68306015]}];
  public barChartLabels:string[] = ['Con.10', 'Con.15', 'Con.17', 'Con.12', 'Con.14'];
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
  public dailyChartData:any[] = [
  {data: [2.095714286,2.0615614,2.1539269,1.9533846,1.220565]},
  ];
  public weeklyChartData:any[] = [
  {data: [14.67039929, 14.43093924, 15.0774886, 13.67369243, 8.54395876]
}
  ];
  public monthlyChartData:any[] = [
  {data: [58.42890899, 55.23969063, 63.13143881, 60.64657295, 59.68306015]}
  ];

  // events
  public activeChart(eventInfo:any)  {
    this.chosenChart= eventInfo.toElement.id;
    this.chooseChart();
    console.log(this.chosenChart);
  }
  public chooseChart(){
    if(this.chosenChart == "dailyChart"){
      this.barChartData = this.dailyChartData;
    }
    if(this.chosenChart == "weeklyChart"){
        this.barChartData = this.weeklyChartData;
    }
    if(this.chosenChart == "monthlyChart"){
      this.barChartData = this.monthlyChartData;
    }
  }
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
