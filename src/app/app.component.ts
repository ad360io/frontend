import { Component } from '@angular/core';
import { LoginAuthenticationService } from './services/loginAuthentication.service';
import { CreateHttpService } from './services/create-services/createHttpService.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CreateHttpService]
})
export class AppComponent {
  isLoggedIn=false;
  constructor(private loginAuthenticationService : LoginAuthenticationService){
    this.isLoggedIn = loginAuthenticationService.checkLoggedIn();
  }
  checkLoginStatus(){
    return this.loginAuthenticationService.checkLoggedIn();
    //return this.isLoggedIn;
  }
}
