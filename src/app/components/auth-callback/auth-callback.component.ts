import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent {

  constructor(private auth: AuthService,
              private router: Router) {
    if (auth.isAuthenticated()) {
      router.navigate(['/dashboard']);
    } else {
      auth.handleAuthentication();
    }
  }
}
