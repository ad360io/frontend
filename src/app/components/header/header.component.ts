import { Component, ViewEncapsulation } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TrackCurrency } from '../../services/trackCurrency.service';
import { TrackMode } from '../../services/trackMode.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {
  userMode: string = 'ADVERTISER';
  currencyType: string = 'EQC';
  isEthereum: boolean = true;
  isNem: boolean = false;
  dropdownElement: string = 'Advertiser';
  activePage: string = '';
  // demoUserString: string = '';
  // userName: string = '';

  constructor(private auth: AuthService,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private user: UserService) {
    this.activePage = window.location.pathname.substring(1, );
    // this.userName = this.user.profile.nickname;
  }

  checkEthereumActive()
  {
    if(this.isEthereum){
      return '#ADD3DF';
    }
  }
  checkNemActive()
  {
    if(this.isNem){
      return '#ADD3DF';
    }
  }

  bgcolorActiveCurrency(currency: string) {
    if (currency === this.currencyType) {
      return { 'background-color': '#ADD3DF' }
    }
  }

  colorActiveNavLink(pageName: string) {
    if (pageName === this.activePage) {
      return { 'color': '#4b80c0' };
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
