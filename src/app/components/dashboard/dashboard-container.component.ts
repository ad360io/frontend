import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency } from '../../services/trackCurrency.service';
import { DashboardService } from '../../services/dashboard-services/dashboard.service';
import { DashboardHttpService } from '../../services/dashboard-services/dashboard-http.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
  providers: [DashboardService, DashboardHttpService],
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  userMode: string;
  currencyType: string;

  constructor(private titleService: Title,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency) {
    this.titleService.setTitle('Qchain – Dashboard');

    this.userMode = this.trackMode.mode;
    this.currencyType = this.trackCurrency.currency;

    //Subscribe to receive the mode selected in the header component
    this.trackMode.getMode().subscribe(
      returnedMode => {
        this.userMode = returnedMode;
      });

    //Subscribe to receive the currency selected in the header component
    this.trackCurrency.getCurrency().subscribe(
      returnedCurrency => {
        this.currencyType = returnedCurrency;
        //console.log(returnedCurrency);
      });
  }

  isPublisher() {
    if (this.trackMode.mode == 'PUBLISHER')
      return true;
  }

  isAdvertiser() {
    if (this.trackMode.mode == 'ADVERTISER')
      return true;
  }
}
