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

  constructor(private marketplaceService : MarketplaceService) { 
    this.marketplaceService.getAdspaceListings().subscribe(
      adspaceListings => {
        this.selectedList = adspaceListings;
      }
    );
  }

  ngOnInit() {  }

  isListEmpty(){
    return this.selectedList.length === 0;
  }

  getImagePlaceholderPath(genre: string){
    if (genre === "Branded Content"){
      return '../../../../assets/images/branded_content_placeholder.png';
    }else if (genre === "Influencer Post"){
      return '../../../../assets/images/influencer_marketing_placeholder.png';
    }else if (genre === "Sponsorship"){
      return '../../../../assets/images/sponsorships_placeholder.png';
    }else{
      return '../../../../assets/images/pug_face.jpg';
    }
  }

}
