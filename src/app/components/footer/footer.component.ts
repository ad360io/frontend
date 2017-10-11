import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  onLoginPage = false;

  constructor() { }

  ngOnInit() {
    if (window.location.pathname.substring(1, ) == '') {
      this.onLoginPage = true;
    }
  }

  checkOnLoginPage(){
    return this.onLoginPage;
  }
}
