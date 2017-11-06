import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CreateHttpService } from '../../../services/create-listing-services/createHttp.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-create-adspace-listing',
  templateUrl: './create-adspace-listing.component.html',
  styleUrls: ['./create-adspace-listing.component.css']
})
export class CreateAdspaceListingComponent implements OnInit {

  submitted=false;
  currencyType="EQC"

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
    this.submitted = true;
    //console.log(JSON.stringify(form.value));
  //   this.createHttpService.postAdspaceForm(JSON.stringify(form.value)).subscribe(result => {
  //     if (result === true) {
  //       //console.log("adspace request sent");
  //   }
  // });
 }
  ngOnInit() {
    this.titleService.setTitle('Qchain – Create an Adspace Listing');
  }
}
