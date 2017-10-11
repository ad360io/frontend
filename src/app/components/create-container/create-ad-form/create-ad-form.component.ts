import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CreateHttpService } from '../../../services/create-services/createHttpService.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-create-ad-form',
  templateUrl: './create-ad-form.component.html',
  styleUrls: ['./create-ad-form.component.css']
})
export class CreateAdFormComponent implements OnInit {

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
