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
  currencyType : string= "";
  userMode: string="";
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
