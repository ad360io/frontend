import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard-services/dashboard.service';
import { PublisherCharts } from '../../../../models/publisher-charts.model';
@Component({
  selector: 'app-pub-dashboard-charts',
  templateUrl: './pub-dashboard-charts.component.html',
  styleUrls: ['./pub-dashboard-charts.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class PubDashboardChartsComponent implements OnInit {
  publisherCharts : PublisherCharts;
  constructor(private dashboardService:DashboardService) {

  }

  ngOnInit() {
    this.dashboardService.getPublisherCharts().subscribe(
      response => {
      //console.log(response);
    });
  }

}
