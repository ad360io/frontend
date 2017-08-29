import { Component, OnInit } from '@angular/core';
import { LoginAuthenticationService } from '../../services/loginAuthentication.service';

@Component({
  selector: 'app-marketplace-container',
  templateUrl: './marketplace-container.component.html',
  styleUrls: ['./marketplace-container.component.css']
})
export class MarketplaceContainerComponent implements OnInit {

  isLoggedIn : boolean=false;
  constructor(private loginAuthenticationService: LoginAuthenticationService) {
      this.isLoggedIn=this.loginAuthenticationService.checkLoggedIn();
   }
  ngOnInit() {
  }

}
