import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    makeTestNetRequest(nemAddress:string, xemAmount : string ){
      console.log('This is the nem address'+nemAddress+'The xem amount was:'+xemAmount)
      return this.http.post('http://jsonplaceholder.typicode.com/posts',
      {
          title : 'Another One',
          body : 'This is another message',
          userId : '427'
      });
    }
}
