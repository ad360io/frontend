import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginAuthenticationService } from '../../services/loginAuthentication.service';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency } from '../../services/trackCurrency.service';
import { DashboardService } from '../../services/dashboard-services/dashboard.service';
import { DashboardHttpService } from '../../services/dashboard-services/dashboard-http.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
  providers:[DashboardService, DashboardHttpService],
  encapsulation : ViewEncapsulation.None

})
export class DashboardContainerComponent implements OnInit {

  isLoggedIn : boolean = false;
  userMode : string ;
  currencyType : string ;

  constructor(private loginAuthenticationService: LoginAuthenticationService, private trackMode : TrackMode, private trackCurrency : TrackCurrency) {
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
          //console.log(returnedCurrency);
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
  ngOnInit() {
  }

}
