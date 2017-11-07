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
    let root_URL: string = location.protocol + '//' + location.host;
    let router_link_success: string = '/dashboard';
    let router_link_failure: string = '';

    if (auth.isAuthenticated()) {
      // replace history state, then route without pushing state to not add callback to history
      history.replaceState(null, null, root_URL + router_link_success);
      router.navigate([router_link_success], { skipLocationChange: true });
    } else {
      auth.handleAuthentication(root_URL, router_link_success, router_link_failure);
    }
  }
}
