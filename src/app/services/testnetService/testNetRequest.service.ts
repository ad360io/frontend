import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TestNetRequest {

    constructor(private http: HttpClient,
                private auth: AuthService,
                private trackMode: TrackMode,
                private trackCurrency: TrackCurrency) {
    }

    // makeTestNetRequest(nemAddress:string, xemAmount : string ){
    //   console.log('This is the nem address'+nemAddress+'The xem amount was:'+xemAmount)
    //   return this.http.post('https://wmowh5c05f.execute-api.us-east-2.amazonaws.com/prod/demoFunction?TableName=MyTable'),
    //   {
    //
    //   });
    // }
    makesampleGetRequest(){
    return this.http.get('https://wmowh5c05f.execute-api.us-east-2.amazonaws.com/prod/demoFunction?TableName=MyTable');
  }
}
