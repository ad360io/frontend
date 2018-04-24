import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace-services/marketplace.service';

@Component({
  selector: 'app-marketplace-side-filter',
  templateUrl: './marketplace-side-filter.component.html',
  styleUrls: ['./marketplace-side-filter.component.css']
})
export class MarketplaceSideFilterComponent implements OnInit {

  currencyType: string = "";
  genre: string;
  cpiRangeValues = [10, 50];
  cpmRangeValues = [5, 50];


  constructor(private marketplaceService: MarketplaceService) {
  }


  ngOnInit() {
    this.updateGenre("All");
  }


  updateGenre(genre: any) {
    this.genre = genre;
    this.onChange();
  }


  onChange() {
    let filterObject = {
          'genre': this.genre,
          'adspaceListingCpiRangeLow'  : this.cpiRangeValues[0],
          'adspaceListingCpiRangeHigh' : this.cpiRangeValues[1],
          'adspaceListingCpmRangeLow'  : this.cpmRangeValues[0],
          'adspaceListingCpmRangeHigh' : this.cpmRangeValues[1]
    };
    
    this.marketplaceService.filterAdspaceListings(filterObject);
  }

}
