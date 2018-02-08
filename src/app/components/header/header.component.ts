import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TrackCurrency } from '../../services/trackCurrency.service';
import { TrackMode } from '../../services/trackMode.service';
import { UserService } from '../../services/user.service';
import { TestNet } from '../../services/testnetService/testNet.service';
import { TestNetRequest } from '../../services/testnetService/testNetRequest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  userMode: string = 'ADVERTISER';
  currencyType: string = 'EQC';
  isEthereum: boolean = true;
  isNem: boolean = false;
  dropdownElement: string = 'Advertiser';
  nemAddress :string = '';
  xemAmount : string = '';
  constructor(private auth: AuthService,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private user: UserService,
              private nemTestNet : TestNet,
              private nemTestNetRequest : TestNetRequest ) {
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

  // makeTestNetQuery(){
  //   this.nemTestNet.makeTestNetQuery(this.nemAddress,this.xemAmount);
  //
  // }
  makeDirectRequest(){
    // this.nemTestNetRequest.makeTestNetRequest(this.nemAddress,this.xemAmount).subscribe(
    //   res => {
    //     console.log('This is from the component'+res);
    //   },
    //   err => {
    //     console.log('There was an error');
    //   }
    //
    // )
    this.nemTestNetRequest.makesampleGetRequest().subscribe(
    res => {
      console.log(res);
    },
    err => {
      console.log('There was an error!');
    }
  )
  }
}
