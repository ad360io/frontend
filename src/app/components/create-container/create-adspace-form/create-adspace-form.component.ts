import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateHttpService } from '../../../services/create-services/createHttpService.service';

@Component({
  selector: 'app-create-adspace-form',
  templateUrl: './create-adspace-form.component.html',
  styleUrls: ['./create-adspace-form.component.css']
})
export class CreateAdspaceFormComponent implements OnInit {

  submitted=false;
  constructor(private createHttpService : CreateHttpService) { }
  onSubmit(form : NgForm) {
    this.createHttpService.postAdspaceForm(form.value);
 }
  ngOnInit() {

  }
}
