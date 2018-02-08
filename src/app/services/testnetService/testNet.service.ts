import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import { TestNetRequest } from '../testnetService/testNetRequest.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class TestNet {

    constructor(private http: HttpClient,
                private auth: AuthService,
                private nemTestNetRequestService: TestNetRequest) {
    }

    makeTestNetQuery(nemAddress:string, xemAmount:string){
      // this.nemTestNetRequestService.makeTestNetRequest(nemAddress,xemAmount).subscribe(
      //   res => {
      //     console.log(res)
      //
      //   },
      //   err => {
      //     console.log('There was an error with the testnet service');
      //   }
      // );

    }

}
