import { Component, OnInit } from '@angular/core';
import { LoginAuthenticationService } from '../../services/loginAuthentication.service';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency} from '../../services/trackCurrency.service';
import { MarketplaceHttpService } from '../../services/marketplace-services/marketplace-http.service';
import { MarketplaceService } from '../../services/marketplace-services/marketplace.service';

@Component({
  selector: 'app-marketplace-container',
  templateUrl: './marketplace-container.component.html',
  styleUrls: ['./marketplace-container.component.css'],
  providers: [MarketplaceService, MarketplaceHttpService]
})
export class MarketplaceContainerComponent implements OnInit {
userMode : string="";
currencyType : string = "";
isLoggedIn : boolean;
constructor (private loginAuthenticationService: LoginAuthenticationService, private trackCurrency : TrackCurrency, private trackMode : TrackMode ){
  this.userMode = this.trackMode.mode;
  this.currencyType = this.trackCurrency.currency;
  //Check whether the user is logged in
  this.isLoggedIn=this.loginAuthenticationService.checkLoggedIn();
  //Subscribe to receive the mode selected in the header component
  this.trackMode.getMode().subscribe(
    returnedMode => {
      this.userMode = returnedMode;
    });
  //Subscribe to receive the currency selected in the header component
  this.trackCurrency.getCurrency().subscribe(
    returnedCurrency => {
      this.currencyType = returnedCurrency;
    });
}
isAdvertiser(){
  if(this.trackMode.mode == "ADVERTISER")
    return true;
  else
    return false;
}
isPublisher(){
  if(this.trackMode.mode == "PUBLISHER")
    return true;
  else
    return false;
}
ngOnInit(){

}

}
