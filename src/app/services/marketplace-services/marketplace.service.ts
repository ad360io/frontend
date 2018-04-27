/*
CORE-LIBS
*/
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

/*
SERVICES
*/
import { MarketplaceHttpService } from './marketplace-http.service';
import { TrackMode } from '../trackMode.service';
import { TrackCurrency } from '../trackCurrency.service';

/*
RXJS
*/
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
MODELS
*/
import { AdListing } from '../../models/ad-listing.model';
import { AdspaceListing } from '../../models/adspace-listing.model';

/*
JSON-ARRAY
*/
import { default as adListingsObject } from './adListings' 
import { default as adspaceListingsObject } from './adspaceListings';



@Injectable()
export class MarketplaceService {

  /** this object should contain the constraints for the chosen ones. */
  filterObject     : object;

  /** The chosen listings are put into this subject to be observed. */
  theChosenListingsSubject : Subject<Array<object>> 
                                = new BehaviorSubject<Array<object>>(this.getWholeList());

  /** These are some hard-coded JSON array that presents the incoming data. */
  adspaceListings  : any = adspaceListingsObject["adspaceListings"] ;
  adListings       : any = adListingsObject["adListings"];

  /** The mode and currency the user is using. */
  mode     : string;
  currency : string;

  constructor(private trackMode: TrackMode,
              private trackCurrency: TrackCurrency,
              private marketplaceHttpService: MarketplaceHttpService) {

                // On start, subscribe to grab mode and currency
                // and each time mode changes, update the listings
                trackMode.getMode().subscribe(
                  currentMode => {
                    this.mode = currentMode;
                    this.updateListings(this.filterObject);
                  } 
                )

                trackCurrency.getCurrency().subscribe(
                  currentCurrency => {
                    this.currency = currentCurrency;
                    this.updateListings(this.filterObject);
                  }
                )
  }


  /**
   * Provide the Chosen Ones as an observable.
   */
  getTheChosenListingsSubject(){
    return this.theChosenListingsSubject.asObservable();
  }

  /**
   * Provide the whole JSON array depends on which mode the user is in.
   */
  getWholeList(){
     return (this.mode === "ADVERTISER" ? this.adspaceListings : this.adListings);
  }

  /**
   * Update the Observable base on new constraints.
   * @param filterObject The new constraints to choose the new chosen ones.
   */
  updateListings(filterObject: object){
    
    // Update the instance variable for Mode subscriber to use.
    this.filterObject = filterObject;
    
    if(filterObject == null){

      // if marketplace-side-filter is never touched, filterObject will be undefined
      // In that case, we want to serve the whole list.
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
              && (parseInt(wholeList[i]["cpm"]) <= cpmRangeFilterHigh)
              && (wholeList[i]["currency"] == this.currency.toLowerCase())) {

                // Only if this listings passes all constraints, it can be the chosen one.
                selectedList.push(wholeList[i]); 
        
              }
      } 
      this.theChosenListingsSubject.next(selectedList);
    }
  }
}
