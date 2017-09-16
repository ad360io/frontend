import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import { LoginAuthenticationService } from '../loginAuthentication.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()


export class MarketplaceHttpService {
  BASE_URL:string='http://localhost:8000/';
  currentUser:any;
  constructor(private http : Http, private trackMode : TrackMode, private trackCurrency : TrackCurrency,private loginAuthenticationService : LoginAuthenticationService ){
  }
  prepareRequestParameters(data : any){
    let params: URLSearchParams = new URLSearchParams();
    params.set('userMode', this.trackMode.mode);
    params.set('userName', this.loginAuthenticationService.getUser());
    params.set('currencyType', this.trackCurrency.currency);
    params.set('adType',data['adTypeList']);
    params.set('adGenre',data['adGenreList']);
    params.set('minrate',data['minrate']);
    params.set('maxrate',data['maxrate']);
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
