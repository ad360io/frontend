import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  root_URL: string = location.protocol + '//' + location.host;
  router_link_success: string = '/dashboard';
  router_link_failure: string = '';

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      // replace history state, then route without pushing state to not add callback to history
      history.replaceState(null, null, this.root_URL + this.router_link_success);
      this.router.navigate([this.router_link_success], { skipLocationChange: true });
    } else {
      this.auth.handleAuthentication(this.root_URL, this.router_link_success, this.router_link_failure);
    }
  }
}
