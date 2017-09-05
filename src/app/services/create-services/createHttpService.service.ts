import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


export class CreateHttpService {
  BASE_URL:string='http://localhost:8000/';
  currentUser:any;
  constructor(private http : Http, private trackMode : TrackMode, private trackCurrency : TrackCurrency ){
  }
  postAdspaceForm( data : any ){
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.BASE_URL+'create-adsp/',JSON.stringify(data.value),headers).map((res:Response) => console.log(res.json()));
  }
  postAdForm( data : any ){
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.BASE_URL+'create-adsp/',JSON.stringify(data.value),headers).map((res:Response) => console.log(res.json()));
  }

}
