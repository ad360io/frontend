import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services/dashboard-services/dashboard.service';
import { PublisherStats } from '../../../models/publisher-stats.model';
import { PublisherCharts } from '../../../models/publisher-charts.model';
import { PublisherTables } from '../../../models/publisher-tables.model';
import { TrackCurrency } from '../../../services/trackCurrency.service';
@Component({
  selector: 'app-pub-dashboard',
  templateUrl: './pub-dashboard.component.html',
  styleUrls: ['./pub-dashboard.component.css'],
  //encapsulation : ViewEncapsulation.None
})
export class PubDashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService, private trackCurrency: TrackCurrency) {
    this.dashboardService.loadPublisherDashboard();
   }

  ngOnInit() {
    this.trackCurrency.getCurrency().subscribe(
      response => {
        this.dashboardService.loadPublisherDashboard();
      }
    )
  }

}
