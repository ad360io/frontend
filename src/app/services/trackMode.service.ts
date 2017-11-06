import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrackMode {
  mode: string = 'ADVERTISER';
  modeSubject: Subject<string> = new Subject<string>();

  setMode(mode: string) {
    this.mode = mode;
    this.modeSubject.next(mode);
  }

  getMode(): Observable <string> {
    return this.modeSubject.asObservable();
  }
}
