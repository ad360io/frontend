import { Component } from '@angular/core';
import { LoginAuthenticationService } from './services/loginAuthentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn=false;
  constructor(private loginAuthenticationService : LoginAuthenticationService){
    this.isLoggedIn = loginAuthenticationService.checkLoggedIn();
  }
}
