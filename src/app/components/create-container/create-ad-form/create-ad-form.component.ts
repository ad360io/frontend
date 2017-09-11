import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateHttpService } from '../../../services/create-services/createHttpService.service';

@Component({
  selector: 'app-create-ad-form',
  templateUrl: './create-ad-form.component.html',
  styleUrls: ['./create-ad-form.component.css']
})
export class CreateAdFormComponent implements OnInit {
  
  submitted=false;
  constructor(private createHttpService : CreateHttpService) {

  }
  onSubmit(form : NgForm) {
  this.createHttpService.postAdForm(form.value);
 }
  ngOnInit() {

  }

}
