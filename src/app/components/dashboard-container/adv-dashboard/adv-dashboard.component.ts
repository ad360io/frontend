import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard-services/dashboard.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-adv-dashboard',
  templateUrl: './adv-dashboard.component.html',
  styleUrls: ['./adv-dashboard.component.css']
})
export class AdvDashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService,  private trackCurrency: TrackCurrency) {
  this.dashboardService.loadAdvertiserDashboard();
}

  ngOnInit() {
    this.trackCurrency.getCurrency().subscribe(
      response => {
        this.dashboardService.loadAdvertiserDashboard();
      }
    )
  }

}
