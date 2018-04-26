import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TrackCurrency {
  currency: string = 'EQC';
  currencySubject: Subject<string> = new BehaviorSubject<string>("EQC");

  setCurrency(currency: string){
    this.currency = currency;
    this.currencySubject.next(currency);
   }

  getCurrency(): Observable <string> {
    return this.currencySubject.asObservable();
  }
}
