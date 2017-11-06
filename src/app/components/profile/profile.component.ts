import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency} from '../../services/trackCurrency.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userMode: string = '';
  currencyType: string = '';
  isLoggedIn: boolean;

  constructor(private titleService: Title,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private user: UserService) {
    titleService.setTitle('Qchain – Profile');

    this.userMode = trackMode.mode;
    this.currencyType = trackCurrency.currency;

    //Subscribe to receive the mode selected in the header component
    trackMode.getMode().subscribe(
      returnedMode => {
        this.userMode = returnedMode;
      });

    //Subscribe to receive the currency selected in the header component
    trackCurrency.getCurrency().subscribe(
      returnedCurrency => {
        this.currencyType = returnedCurrency;
      });
  }

  ngOnInit() { }

  isAdvertiser() {
    if (this.trackMode.mode == 'ADVERTISER')
      return true;
  }

  isPublisher() {
    if (this.trackMode.mode == 'PUBLISHER')
      return true;
  }
}
