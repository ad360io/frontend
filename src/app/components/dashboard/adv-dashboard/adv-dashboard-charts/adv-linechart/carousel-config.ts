import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-carousel-config',
  template: './adv-linechart.component.html',
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselConfig implements OnInit {

   constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = -1;
    config.wrap = true;
    config.keyboard = true;
  }

  ngOnInit() {  }
}
