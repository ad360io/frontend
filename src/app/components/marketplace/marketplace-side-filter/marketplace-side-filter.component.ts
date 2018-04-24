import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace-services/marketplace.service';

@Component({
  selector: 'app-marketplace-side-filter',
  templateUrl: './marketplace-side-filter.component.html',
  styleUrls: ['./marketplace-side-filter.component.css']
})
export class MarketplaceSideFilterComponent implements OnInit {

  currencyType: string = "";
  genre: any = "All";
  rangeValues2 = [10, 50];
  rangeValues3 = [5, 50];


  constructor(private marketplaceService: MarketplaceService) {
  }


  ngOnInit() {
    this.onSubmit();
  }


  updateGenre(genre: any) {
    this.genre = genre;
  }


  onSubmit() {
    let filterObject = {
          'genre': this.genre,
          'adspaceListingCpiRangeLow'  : this.rangeValues2[0],
          'adspaceListingCpiRangeHigh' : this.rangeValues2[1],
          'adspaceListingCpmRangeLow'  : this.rangeValues3[0],
          'adspaceListingCpmRangeHigh' : this.rangeValues3[1]
    };
    
    this.marketplaceService.setFilter(filterObject);
  }

}
