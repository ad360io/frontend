import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { MarketplaceHttpService } from './marketplace-http.service';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AdListing } from '../../models/ad-listing.model';
import { AdspaceListing } from '../../models/adspace-listing.model';

import { default as adListingsObject } from './adListings' 
import { default as adspaceListingsObject } from './adspaceListings';
import { filter } from 'rxjs/operators';


@Injectable()
export class MarketplaceService {
  filterObject             : object;
  theChosenListingsSubject : Subject<Array<object>> = new BehaviorSubject<Array<object>>(this.getWholeList());
  
  adspaceListings          : any = adspaceListingsObject["adspaceListings"] ;
  adListings               : any = adListingsObject["adListings"];

  mode                     : string;

  constructor(private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private marketplaceHttpService: MarketplaceHttpService) {
                trackMode.getMode().subscribe(
                  currentMode =>{
                    this.mode = currentMode;
                    this.updateListings(this.filterObject);
                  } 
                )
  }

  getTheChosenListingsSubject(){
    return this.theChosenListingsSubject.asObservable();
  }

  getWholeList(){
     return (this.mode === "ADVERTISER" ? this.adspaceListings : this.adListings);
  }

  updateListings(filterObject: object){
    this.filterObject = filterObject;
    
    if(filterObject == null){
      this.theChosenListingsSubject.next(this.getWholeList());
    }else{
      let genreFilter = filterObject["genre"];
      let cpiRangeFilterLow = filterObject["adspaceListingCpiRangeLow"];
      let cpiRangeFilterHigh = filterObject["adspaceListingCpiRangeHigh"];
      let cpmRangeFilterLow = filterObject['adspaceListingCpmRangeLow'];
      let cpmRangeFilterHigh = filterObject['adspaceListingCpmRangeHigh'];

      let selectedList = [];
      let wholeList = this.getWholeList();

      for (var i = 0; i < wholeList.length; i++) {
        if ((genreFilter === wholeList[i]["genre"] || genreFilter === "All") 
                && (parseInt(wholeList[i]["cpi"]) >= cpiRangeFilterLow) 
                && (parseInt(wholeList[i]["cpi"]) <= cpiRangeFilterHigh) 
                && (parseInt(wholeList[i]["cpm"]) >= cpmRangeFilterLow)
                && (parseInt(wholeList[i]["cpm"]) <= cpmRangeFilterHigh)) {
          selectedList.push(wholeList[i]); 
        }
      } 
      this.theChosenListingsSubject.next(selectedList);
    }
  }
}
