import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency } from '../../services/trackCurrency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  userMode="PUBLISHER";
  currencyType="EQC";
  isEthereum=true;
  isNem=false;
  dropdownElement="Publisher";
  constructor(private trackMode : TrackMode, private trackCurrency : TrackCurrency) { }

  ngOnInit() {
  }

  checkEthereumActive()
  {
    if(this.isEthereum){
      return "#ADD3DF";
    }
  }
  checkNemActive()
  {
    if(this.isNem){
      return "#ADD3DF";
    }
  }

  // Methods from header to set the mode in the trackMode service.
  setPublisher(){
    this.dropdownElement="Publisher";
    this.userMode = "PUBLISHER";
    this.trackMode.setMode("PUBLISHER");
    console.log(this.userMode);
  }
  setAdvertiser(){
    this.dropdownElement="Advertiser";
    this.userMode = "ADVERTISER";
    this.trackMode.setMode("ADVERTISER");
    console.log(this.userMode);
  }

  //Methods to set the currency type in the trackCurrency service.
  nemActivated(){
    this.isEthereum=false;
    this.isNem=true;
    this.currencyType="XQC";
    this.trackCurrency.setCurrency("XQC");
    console.log(this.currencyType);

  }
  ethereumActivated(){
    this.isEthereum=true;
    this.isNem=false;
    this.currencyType="EQC";
    this.trackCurrency.setCurrency("EQC");
    console.log(this.currencyType);
  }

}
