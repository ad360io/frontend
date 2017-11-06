import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(public auth: AuthService,
              private router: Router) {
    if (auth.isAuthenticated()) {
      router.navigate(['/dashboard']);
    }
  }

  public show_lock_login(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } else {
      document.getElementById('loginCard').style.opacity = '0';
      this.auth.lock.show();
    }
  }

  public show_lock_signup(): void {
    document.getElementById('loginCard').style.opacity = '0';
    this.auth.lock.show({initialScreen: 'signUp'})
  }
}
