import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TimeTickerService {
  dailyAlert: string = 'DailyAlert';
  dailyAlertSubject: Subject<any> = new Subject<any>();
  weeklyAlert: string = 'WeeklyAlert';
  monthlyAlert: string = 'MonthlyAlert';
  startTimeInMilliseconds : any;
  constructor() {
  }
  //This function starts the timer service and determines the elapsed time in milliseconds and will be used to direct the other trackers.
  startTicker(){
    this.startTimeInMilliseconds = Date.now();
  }

  //This is a test function to that emits an event every 5 seconds for testing
  trackSample(){
      let sampleElapsedTime = 5000;
  }

  //This is the function that will return an observable daily alert that other components can subscribe to, to make any updates.
  trackDaily(){
      //dailyInMilliseconds denotes the time elapsed in milliseconds from January 1, 1970 00:00:00 UTC to 10 AM on the current day.
      let sampleElapsedTime = 5000;
      let currentDate = new Date();
      let currentTimeInMilliseconds = Date.now();
      let dailyTenInMilliseconds = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0, 0).getTime();
      let elapsedTimeDaily = currentTimeInMilliseconds - dailyTenInMilliseconds;
      //The condition checks whether its past 10AM
      if(elapsedTimeDaily < 0){
        elapsedTimeDaily += 86400000;
      }
      setTimeout(this.getDailyTime(),elapsedTimeDaily);
  }
  //The daily alert subject sets alert
  getDailyTime(){
    this.dailyAlertSubject.next(this.dailyAlert);
  }

  trackWeekly(){

  }

}
