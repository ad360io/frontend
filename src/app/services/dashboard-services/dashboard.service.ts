import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
Services
*/
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import { DashboardHttpService } from './dashboard-http.service';
/*
Models
*/
import { PublisherStats } from '../../models/publisher-stats.model';
import { PublisherCharts } from '../../models/publisher-charts.model';
import { PublisherTables } from '../../models/publisher-tables.model';
import { AdvertiserStats } from '../../models/advertiser-stats.model';
import { AdvertiserCharts } from '../../models/advertiser-charts.model';
import { AdvertiserTables } from '../../models/advertiser-tables.model';



@Injectable()

export class DashboardService {

  publisherStats: PublisherStats;
  publisherStatsSubject: Subject<any> = new Subject<any>();
  advertiserStats: AdvertiserStats;
  advertiserStatsSubject: Subject<any> = new Subject<any>();
  publisherCharts: PublisherCharts;
  publisherChartsSubject: Subject<any> = new Subject<any>()
  advertiserCharts: AdvertiserCharts;
  advertiserChartsSubject: Subject<any> = new Subject<any>()
  publisherTables: PublisherTables;
  publisherTablesSubject: Subject<any> = new Subject<any>()
  advertiserTables: AdvertiserTables;
  advertiserTablesSubject: Subject<any> = new Subject<any>()

  constructor( private trackMode : TrackMode, private trackCurrency : TrackCurrency, private dashboardHttpService : DashboardHttpService ){

  }

  //SETTERS FOR DASHBOARD COMPONENTS
  loadPublisherDashboard() {
      this.dashboardHttpService.getDashboardStats().subscribe(
      (response : Response) => {
          this.publisherStats = new PublisherStats(response.json());
          this.publisherStats.display();
          this.publisherStatsSubject.next(this.publisherStats);
      });
     this.dashboardHttpService.getDashboardCharts().subscribe(
       (response : Response) => {
           this.publisherCharts = new PublisherCharts(response.json());
           this.publisherChartsSubject.next(this.publisherCharts);
      });
      this.dashboardHttpService.getDashboardTables().subscribe(
       (response : Response) => {
           this.publisherTables = new PublisherTables(response.json());
           this.publisherTablesSubject.next(this.publisherTables);
       });
  }

  loadAdvertiserDashboard() {
      this.dashboardHttpService.getDashboardStats().subscribe(
      (response : Response) => {
          this.advertiserStats = new AdvertiserStats(response.json());
          this.advertiserStatsSubject.next(this.advertiserStats);
      });
     this.dashboardHttpService.getDashboardCharts().subscribe(
       (response : Response) => {
           this.advertiserCharts = new AdvertiserCharts(response.json());
           this.advertiserChartsSubject.next(this.advertiserCharts);
      });
      this.dashboardHttpService.getDashboardTables().subscribe(
       (response : Response) => {
           this.advertiserTables = new AdvertiserTables(response.json());
           this.advertiserTablesSubject.next(this.advertiserTables);
       });
  }
  //GETTERS FOR DASHBOARD COMPONENTS
  getPublisherStats(){
    return this.publisherStatsSubject.asObservable();
  }
  getAdvertiserStats(){
    return this.advertiserStatsSubject.asObservable();
  }
  getPublisherCharts(){
    return this.publisherChartsSubject.asObservable();
  }
  getAdvertiserCharts(){
    return this.advertiserChartsSubject.asObservable();
  }
  getPublisherTables(){
    return this.publisherTablesSubject.asObservable();
  }
  getAdvertiserTables(){
    return this.advertiserTablesSubject.asObservable();
  }

}
