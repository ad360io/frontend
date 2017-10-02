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
    this.submitted = true;
    //console.log(JSON.stringify(form.value));
    this.createHttpService.postAdspaceForm(JSON.stringify(form.value)).subscribe(result => {
      if (result === true) {
        //console.log("adspace request sent");
    }
  });
 }
  ngOnInit() {

  }
}
