import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace-services/marketplace.service';
import { TrackMode } from '../../../services/trackMode.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-marketplace-item-list',
  templateUrl: './marketplace-item-list.component.html',
  styleUrls: ['./marketplace-item-list.component.css']
})
export class MarketplaceItemListComponent implements OnInit {

  selectedList =  [];
  mode         =  "";
  listingType  =  "Ad Spaces";

  constructor(private marketplaceService: MarketplaceService,
              private trackModeService: TrackMode,
              private trackCurrencyService: TrackCurrency) {
   
                this.trackModeService.getMode().subscribe(
                  currentMode => {
                    this.mode = currentMode;
                })

                this.marketplaceService.getTheChosenListingsSubject().subscribe(
                  theChosenListings => {
                    this.selectedList = theChosenListings;
                }

    );
  }

  ngOnInit() { }

  isListEmpty() {
    return this.selectedList.length === 0;
  }

  getListingType() {
    //console.log(this.mode);
    if(this.mode == "ADVERTISER") return "Ad Spaces";
    else return "Ads"
  }

  getImagePlaceholderPath(genre: string) {
    if (genre === "Branded Content") {
      return '../../../../assets/images/branded_content_placeholder.png';
    } else if (genre === "Influencer Post") {
      return '../../../../assets/images/influencer_marketing_placeholder.png';
    } else if (genre === "Sponsorship") {
      return '../../../../assets/images/sponsorships_placeholder.png';
    } else {
      return '../../../../assets/images/pug_face.jpg';
    }
  }

}
