import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginAuthenticationService } from '../../services/loginAuthentication.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
  encapsulation : ViewEncapsulation.None

})
export class DashboardContainerComponent implements OnInit {
  isLoggedIn : boolean=false;
  constructor(private loginAuthenticationService: LoginAuthenticationService) {
      this.isLoggedIn=this.loginAuthenticationService.checkLoggedIn();
   }

  ngOnInit() {
  }

}
