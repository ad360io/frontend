import { Component, OnInit } from '@angular/core';
import { TrackMode } from '../../../services/trackMode.service';
import { TrackCurrency} from '../../../services/trackCurrency.service';
import {CalendarModule} from 'primeng/primeng'
import { MarketplaceService } from '../../../services/marketplace-services/marketplace.service';

@Component({
  selector: 'app-adv-marketplace',
  templateUrl: './adv-marketplace.component.html',
  styleUrls: ['./adv-marketplace.component.css']
})
export class AdvMarketplaceComponent implements OnInit {

  currencyType:string="";
  Adtype:any="Banner Top";
  genre:any="Movies";
  rangeValues2= [10,50];
  rangeValues3= [5,50];
  dt1 :any;
  dt2 :any;
  customAdlistingMessageIntroList = ['We are going on an ad blitz to promote our new product','We are looking to get the word out about our new product','Your users will want to see these cool new services','This is a product you will be thrilled to show your users']
  customAdlistingOutroList = ['Have our ads featured on your awesome website!','Introduce us to your amazing audience!','Feature us on your website']
  
  constructor(private trackCurrency:TrackCurrency, private marketplaceService : MarketplaceService) {
    this.dt1 = new Date(2017,7,12);
    this.dt2 = Date.now();
    this.currencyType = this.trackCurrency.currency;
}
  ngOnInit() {
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
 onSubmit(){}

}
