import { Component,OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TrackCurrency } from '../../services/trackCurrency.service';
import { TrackMode } from '../../services/trackMode.service';
import { UserService } from '../../services/user.service';
import { TestNet } from '../../services/testnetService/testNet.service';
import { TestNetRequest } from '../../services/testnetService/testNetRequest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  userMode: string = 'ADVERTISER';
  currencyType: string = 'EQC';
  isEthereum: boolean = true;
  isNem: boolean = false;
  dropdownElement: string = 'Advertiser';
  nemAddress :string = '';
  xemAmount : string = '';
  returnedItems : any;
  transactionString = '';
  isTransactionRequestComplete :boolean = false;
  // testNetForm: FormGroup;
  constructor(private auth: AuthService,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private user: UserService,
              private nemTestNet : TestNet,
              private nemTestNetRequest : TestNetRequest,
             ) {
  }

  bgcolorActiveCurrency(currency: string) {
    if (currency === this.currencyType) {
      return { 'background-color': '#ADD3DF' }
    }
  }
  ngOnInit(){
      // this.testNetForm = this.formBuilder.group({
      // nemAddress: [null, [Validators.required]],
      // xemAmount: [null, Validators.required],
      // });
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
      // console.log(res['Items']['0']['names']['S'])
      this.returnedItems= res['Items']['0']['names']['S'];
    },
    err => {
      console.log('There was an error!');
    }
  )
  }
  makeTestNetTransaction(){
    this.nemTestNetRequest.makeTransaction().subscribe(
      res => {
        console.log(res);
        this.isTransactionRequestComplete = true;
        this.transactionString = 'Congrats! You received testnet xqc'
      },
      err => {
        console.log(err);
        this.transactionString = 'There was an issue with the transaction'
      }
    )
  }
}
