import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CreateHttpService } from '../../../services/create-listing-services/createHttp.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-create-ad-listing',
  templateUrl: './create-ad-listing.component.html',
  styleUrls: ['./create-ad-listing.component.css']
})
export class CreateAdListingComponent implements OnInit {

  submitted=false;
  currencyType="";
  constructor(private createHttpService : CreateHttpService,
              private trackCurrency: TrackCurrency,
              private titleService: Title) {
    this.currencyType = this.trackCurrency.currency;
    this.trackCurrency.getCurrency().subscribe(
      response => {
        this.currencyType = response;
      }
    )
  }
  onSubmit(form : NgForm) {
    this.submitted =  true;
  // this.createHttpService.postAdForm(form.value);
 }
  ngOnInit() {
    this.titleService.setTitle('Qchain – Create an Ad Listing');
  }

}
