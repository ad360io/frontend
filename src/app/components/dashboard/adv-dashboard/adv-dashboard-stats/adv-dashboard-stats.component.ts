import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdvertiserStats } from '../../../../models/advertiser-stats.model';
import { TrackCurrency } from '../../../../services/trackCurrency.service';
import { DashboardService } from '../../../../services/dashboard-services/dashboard.service';

@Component({
  selector: 'app-adv-dashboard-stats',
  templateUrl: './adv-dashboard-stats.component.html',
  styleUrls: ['./adv-dashboard-stats.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class AdvDashboardStatsComponent implements OnInit {
  advertiserStats: AdvertiserStats = new AdvertiserStats();
  currencyType:string="";
    constructor(private dashboardService: DashboardService,private trackCurrency: TrackCurrency) {
      this.currencyType=trackCurrency.currency;
      trackCurrency.getCurrency().subscribe(
        response =>{
        this.currencyType = response;
      });
  }

  ngOnInit() {
    this.dashboardService.getAdvertiserStats().subscribe(
      response => {
        this.advertiserStats.update(response);
    });
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
}
