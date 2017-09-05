import { Component, OnInit } from '@angular/core';
import { TrackMode } from '../../../services/trackMode.service';
import { TrackCurrency} from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-pub-marketplace',
  templateUrl: './pub-marketplace.component.html',
  styleUrls: ['./pub-marketplace.component.css']
})
export class PubMarketplaceComponent implements OnInit {

  rangeValues= [0,100];
  currencyType:string="";
  Adtype:any="Banner Top";
  genre:any="Movies";
  constructor(private trackCurrency:TrackCurrency) {
    this.currencyType = this.trackCurrency.currency;
}
  ngOnInit() {
    console.log("MarketPlace Component called");
    this.trackCurrency.getCurrency().subscribe(
      returnedValue => {
        this.currencyType = returnedValue;
      });
  }
  updateGenre(genre:any){
    this.genre = genre;
  }
  updateAdtype(adtype:any){
    this.Adtype = adtype;

  }

}
