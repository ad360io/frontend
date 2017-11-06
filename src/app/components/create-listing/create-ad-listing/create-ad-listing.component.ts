import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CreateHttpService } from '../../../services/create-listing-services/createHttp.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-create-ad-listing',
  templateUrl: './create-ad-listing.component.html',
  styleUrls: ['./create-ad-listing.component.css']
})
export class CreateAdListingComponent implements OnInit {
  submitted = false;
  currencyType = '';

  constructor(private createHttpService: CreateHttpService,
              private titleService: Title,
              private trackCurrency: TrackCurrency) {
    titleService.setTitle('Qchain – Create an Ad Listing');

    this.currencyType = trackCurrency.currency;

    trackCurrency.getCurrency().subscribe(response => {
      this.currencyType = response;
    });
  }

  onSubmit(form: NgForm) {
    this.submitted =  true;

    // this.createHttpService.postAdListing(form.value);
  }

  ngOnInit() { }
}
