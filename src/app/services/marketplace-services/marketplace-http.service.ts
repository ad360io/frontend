import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MarketplaceHttpService {
  BASE_URL: string = 'https://still-gorge-60326.herokuapp.com/';
  currentUser: any;

  constructor(private http: Http,
              private auth: AuthService,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency){
  }

  prepareRequestParameters(data: any) {
    let params: URLSearchParams = new URLSearchParams();

    params.set('userMode', this.trackMode.mode);
    // params.set('userName', this.loginAuthenticationService.getUser());
    params.set('currencyType', this.trackCurrency.currency);
    params.set('adType',data['adTypeList']);
    params.set('adGenre',data['adGenreList']);
    params.set('cpi_minrate',data['cpi_minrate']);
    params.set('cpi_maxrate',data['cpi_maxrate']);
    params.set('cpm_minrate',data['cpm_minrate']);
    params.set('cpm_maxrate',data['cpm_maxrate']);

    let requestOptions = new RequestOptions();

    requestOptions.params = params;

    return requestOptions;
  }

  // getAdspaces(){
  //   return this.http.get(this.BASE_URL+'display-marketplace/',this.prepareRequestParameters());
  // }
  // getAdListings() {
  //   return this.http.get(this.BASE_URL+'display-marketplace/',this.prepareRequestParameters());
  // }

}
