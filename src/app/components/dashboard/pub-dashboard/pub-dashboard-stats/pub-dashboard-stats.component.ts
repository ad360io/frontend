import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard-services/dashboard.service';
import { PublisherStats } from '../../../../models/publisher-stats.model';
import { TrackCurrency } from '../../../../services/trackCurrency.service';

@Component({
  selector: 'app-pub-dashboard-stats',
  templateUrl: './pub-dashboard-stats.component.html',
  styleUrls: ['./pub-dashboard-stats.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class PubDashboardStatsComponent implements OnInit {
  publisherStats : PublisherStats=new PublisherStats();
  revenue : any;
  impressions : any ;
  clicks : any ;
  cpm : any;
  eqc_balance : any;
  xqc_balance : any;
  currencyType : string= "";
  userMode: string="";
  revenueDailyChange :any;
  impressionsDailyChange : any ;
  clicksDailyChange : any ;
  cpmDailyChange : any;
  statsDailyChangeLabels : boolean[] = [true,true,true,true,true];

  constructor(private dashboardService : DashboardService,private trackCurrency: TrackCurrency) {
    this.currencyType = trackCurrency.currency;
  }
  ngOnInit() {
    this.trackCurrency.getCurrency().subscribe(
      response =>{
        this.currencyType=response;
        //console.log(response);
    });
    this.dashboardService.getPublisherStats().subscribe(
      response => {
        this.publisherStats.update(response);
    });
    this.verifyTime();
  }

  isEqc(){
    if (this.trackCurrency.currency == "EQC")
      return true;
    else
      return false;
  }
  isXqc(){
    if (this.trackCurrency.currency == "XQC")
      return true;
    else
      return false;
  }
  getRandomArbitraryNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  verifyTime(){
    console.log('verify time was called!');
    let now = new Date();
    let timeInMilliseconds = now.getTime();
   //  let elapsedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0).getTime() - timeInMilliseconds;
   //  if (elapsedTime < 0) {
   //   elapsedTime += 86400000; // updates at 10A.M. daily
   // }
   setTimeout(this.updateStats(), 10000);
  }
  updateStats(){
    console.log('Update stats was called!');
    this.calculateDailyChanges();
    var today = new Date().getTime();
    this.revenue = this.getRandomArbitraryNumberInRange(10,55);
    this.impressions = Math.floor(this.getRandomArbitraryNumberInRange(4000,7000));
    this.clicks = Math.floor(this.getRandomArbitraryNumberInRange(2000,3500));
    this.cpm = this.getRandomArbitraryNumberInRange(40,45);
    this.xqc_balance = this.getRandomArbitraryNumberInRange(100,125);
    this.eqc_balance = this.getRandomArbitraryNumberInRange(10,50);

  }
  calculateDailyChanges(){
    this.revenueDailyChange = (Math.floor(this.getRandomArbitraryNumberInRange(10,55))- this.revenue)*100/(this.revenue);
    this.impressionsDailyChange = (Math.floor(this.getRandomArbitraryNumberInRange(4000,7000) - this.impressions)*100/(this.impressions));
    this.clicksDailyChange = (Math.floor(this.getRandomArbitraryNumberInRange(2000,3500) - this.clicks)*100/(this.clicks));
    this.cpmDailyChange = (this.getRandomArbitraryNumberInRange(40,45) - this.cpm)*100/(this.cpm);
  }
  trackLabelsforChanges(){

  }
}
