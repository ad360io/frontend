import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrackCurrency {
  currency: string = 'EQC';
  currencySubject: Subject<string> = new Subject<string>();

  setCurrency(currency: string){
    this.currency = currency;
    this.currencySubject.next(currency);
   }

  getCurrency(): Observable <string> {
    return this.currencySubject.asObservable();
  }
}
