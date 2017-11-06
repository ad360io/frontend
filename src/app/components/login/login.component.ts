import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(public auth: AuthService,
              private router: Router,
              private titleService: Title) {
    if (auth.isAuthenticated()) {
      router.navigate(['/dashboard']);
    } else {
      titleService.setTitle('Qchain – Login');
    }
  }

  public show_lock_login(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.auth.lock.show();
      document.getElementById('loginCard').style.opacity = '0';
    }
  }

  public show_lock_signup(): void {
    this.auth.lock.show({initialScreen: 'signUp'})
    document.getElementById('loginCard').style.opacity = '0';
  }
}
