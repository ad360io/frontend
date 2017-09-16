import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user.model';
import { LoginAuthenticationService } from '../../services/loginAuthentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  user : User= new User("","");
  isLoading : boolean;
  isError:boolean=false;
  loginError : string;
  constructor(private loginAuthenticationService: LoginAuthenticationService, private router: Router,) {
   }
   ngOnInit() {
       // reset login status
       this.loginAuthenticationService.logout();
   }

   login() {
       this.isLoading = true;
       this.loginAuthenticationService.login(this.user.username, this.user.password)
           .subscribe(result => {
               if (result === true) {
                   // login successful
                  console.log(this.loginAuthenticationService.getToken())
                  console.log(this.loginAuthenticationService.getUser())
                  console.log("Login was successful!");
                  this.router.navigate(['/dashboard']);
               } else {
                   this.isError=true;
                   this.loginError = 'Incorrect login information';
                   this.isLoading = false;
               }
           });
   }
}
