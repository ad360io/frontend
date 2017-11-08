import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TrackCurrency } from '../../services/trackCurrency.service';
import { TrackMode } from '../../services/trackMode.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  userMode: string = 'ADVERTISER';
  currencyType: string = 'EQC';
  isEthereum: boolean = true;
  isNem: boolean = false;
  dropdownElement: string = 'Advertiser';

  constructor(private auth: AuthService,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private user: UserService) {
  }

  bgcolorActiveCurrency(currency: string) {
    if (currency === this.currencyType) {
      return { 'background-color': '#ADD3DF' }
    }
  }

  // Methods from header to set the mode in the trackMode service.
  setPublisher(){
    this.dropdownElement = 'Publisher';
    this.userMode = 'PUBLISHER';
    this.trackMode.setMode('PUBLISHER');
    //console.log(this.userMode);
  }
  setAdvertiser(){
    this.dropdownElement = 'Advertiser';
    this.userMode = 'ADVERTISER';
    this.trackMode.setMode('ADVERTISER');
    //console.log(this.userMode);
  }

  //Methods to set the currency type in the trackCurrency service.
  nemActivated(){
    this.isEthereum = false;
    this.isNem = true;
    this.currencyType = 'XQC';
    this.trackCurrency.setCurrency('XQC');
    //console.log(this.currencyType);

  }
  ethereumActivated(){
    this.isEthereum = true;
    this.isNem = false;
    this.currencyType = 'EQC';
    this.trackCurrency.setCurrency('EQC');
    //console.log(this.currencyType);
  }

  // setCurrency
}
