import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { MarketplaceHttpService } from './marketplace-http.service';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AdListing } from '../../models/ad-listing.model';
import { AdspaceListing } from '../../models/adspace-listing.model';


@Injectable()
export class MarketplaceService {
  adListings: Array <AdListing>;
  adspaceListings: Array <AdspaceListing>;
  adListingsSubject: Subject<any> = new Subject<any>();
  adspaceListingsSubject : Subject<any> = new Subject<any>();

  constructor(private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private marketplaceHttpService: MarketplaceHttpService) {

  }

 // filterListings(){
 //   this.marketplaceHttpService.loadPublisherMarketplace();
 // }
}
