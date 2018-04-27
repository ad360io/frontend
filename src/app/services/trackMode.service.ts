import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TrackMode {
  mode: string = "ADVERTISER";
  modeSubject: Subject<string> = new BehaviorSubject<string>(this.mode);
  
  constructor(){  }

  setMode(mode: string) {
    this.mode = mode;
    this.modeSubject.next(mode);
  }

  getMode(): Observable <string> {
    return this.modeSubject.asObservable();
  }
  
}
