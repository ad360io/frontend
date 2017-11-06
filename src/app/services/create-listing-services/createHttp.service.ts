import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CreateHttpService {
  BASE_URL: string = 'https://still-gorge-60326.herokuapp.com/';
  currentUser: any;

  constructor(private http: Http,
              private trackMode: TrackMode,
              private trackCurrency: TrackCurrency) {
  }

  postAdspaceListing(data: any): Observable<boolean> {
    //console.log(data);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    //this.http.post(this.BASE_URL + 'create-adspace/', data, headers).map((res: Response) => //console.log(res.json()));

    return this.http.post(this.BASE_URL + 'create-adspace/', data, options).map((response: Response) => {
      //console.log(response)
      return true;
    });
  }

  postAdListing(data: any) {
    //console.log(data);

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //this.http.post(this.BASE_URL + 'create-adspace/', data, headers).map((res: Response) => //console.log(res.json()));
  }
}
