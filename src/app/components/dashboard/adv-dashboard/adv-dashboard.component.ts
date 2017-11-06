import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services/dashboard-services/dashboard.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';
import { TrackMode } from '../../../services/trackMode.service';

@Component({
  selector: 'app-adv-dashboard',
  templateUrl: './adv-dashboard.component.html',
  styleUrls: ['./adv-dashboard.component.css'],
  //encapsulation : ViewEncapsulation.None
})
export class AdvDashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService,  private trackCurrency: TrackCurrency, private trackMode: TrackMode) {
  dashboardService.loadAdvertiserDashboard();
}

  ngOnInit() {
    this.trackCurrency.getCurrency().subscribe(
      response => {
        this.dashboardService.loadAdvertiserDashboard();
      }
    )
    this.trackMode.getMode().subscribe(
      response => {
        this.dashboardService.loadAdvertiserDashboard();
      }
    )
  }

}
