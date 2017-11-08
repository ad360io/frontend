import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UserService {
  namespace: string = 'https://auth.qchain.co/';

  public profile: object;
  public user_metadata: any;
  public app_metadata: any;

  public id: string;
  public verified: boolean;
  public name: string;
  public email: string;
  public picture: string;
  public location: string;
  public Ethereum: object;
  public NEM: object;

  constructor(auth: AuthService) {
    auth.getProfile((err, profile) => {
      this.profile = profile;
      this.user_metadata = profile[this.namespace + 'user_metadata']
      this.app_metadata = profile[this.namespace + 'app_metadata']

      this.id = profile.sub.substring(6, )
      this.verified = profile.email_verified
      this.name = this.user_metadata.name
      this.email = profile.email
      this.picture = profile.picture
      this.location = profile[this.namespace + 'geoip']
      this.Ethereum = this.user_metadata.Ethereum
      this.NEM = this.user_metadata.NEM
    });
  }
}
