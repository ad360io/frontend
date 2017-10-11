import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateHttpService } from '../../../services/create-services/createHttpService.service';
import { TrackCurrency } from '../../../services/trackCurrency.service';

@Component({
  selector: 'app-create-adspace-form',
  templateUrl: './create-adspace-form.component.html',
  styleUrls: ['./create-adspace-form.component.css']
})
export class CreateAdspaceFormComponent implements OnInit {

  submitted=false;
  currencyType="EQC"
  constructor(private createHttpService : CreateHttpService, private trackCurrency: TrackCurrency) {
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

  }
}
