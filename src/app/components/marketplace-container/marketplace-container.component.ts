import { Component, OnInit } from '@angular/core';
import { LoginAuthenticationService } from '../../services/loginAuthentication.service';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency} from '../../services/trackCurrency.service';

@Component({
  selector: 'app-marketplace-container',
  templateUrl: './marketplace-container.component.html',
  styleUrls: ['./marketplace-container.component.css']
})
export class MarketplaceContainerComponent implements OnInit {

  isLoggedIn : boolean=false;
  userMode:string="";
  currencyType:string="";
  constructor(private loginAuthenticationService: LoginAuthenticationService,private trackMode : TrackMode, private trackCurrency : TrackCurrency) {
      this.isLoggedIn=this.loginAuthenticationService.checkLoggedIn();
      this.userMode = this.trackMode.mode;
      this.currencyType = this.trackCurrency.currency;
   }
  ngOnInit() {
    this.trackMode.getMode().subscribe(
      returnedMode =>{this.userMode = returnedMode;
    });
    this.trackCurrency.getCurrency().subscribe(
      returnedCurrency =>{
        this.currencyType = returnedCurrency;
    });
  }
  checkMode(){
    if(this.trackMode.mode == "PUBLISHER")
      return true;
    else
      return false;
  }

}
