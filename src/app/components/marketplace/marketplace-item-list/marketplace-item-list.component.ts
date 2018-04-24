import { Component, OnInit} from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace-services/marketplace.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-marketplace-item-list',
  templateUrl: './marketplace-item-list.component.html',
  styleUrls: ['./marketplace-item-list.component.css']
})
export class MarketplaceItemListComponent implements OnInit {
  selectedList = [];
  constructor(private marketplaceService : MarketplaceService) { }

  ngOnInit() {
    this.selectedList = this.marketplaceService.getFilteredAdListings();
  }

  isListEmpty(){
    return this.selectedList.length === 0;
  }

}
