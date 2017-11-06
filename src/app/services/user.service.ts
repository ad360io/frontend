import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UserService {
  public profile: any;

  constructor(auth: AuthService) {
    auth.getProfile((err, profile) => {
      this.profile = profile;
    });
  }
}
