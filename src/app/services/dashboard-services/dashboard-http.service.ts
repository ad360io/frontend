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

export class DashboardHttpService{
    BASE_URL:string='http://api.qchaindemo.com/';
    currentUser:any;
    constructor(private http : Http, private trackMode : TrackMode, private trackCurrency : TrackCurrency, private loginAuthenticationService : LoginAuthenticationService ){
    }
    prepareRequestParameters(){
      let params: URLSearchParams = new URLSearchParams();
      params.set('userMode', this.trackMode.mode);
      params.set('userName', this.loginAuthenticationService.getUser());
      params.set('currencyType', this.trackCurrency.currency);
      let requestOptions = new RequestOptions();
      requestOptions.params = params;
      return requestOptions;
    }
    getDashboardStats(){
      return this.http.get(this.BASE_URL+'dashboard-stats/',this.prepareRequestParameters());
    }
    getDashboardCharts(){
      return this.http.get(this.BASE_URL+'dashboard-charts/',this.prepareRequestParameters());
    }
    getDashboardTables(){
      return this.http.get(this.BASE_URL+'dashboard-tables/',this.prepareRequestParameters());
    }
}
