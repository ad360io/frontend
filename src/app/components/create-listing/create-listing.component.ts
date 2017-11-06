import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrackMode } from '../../services/trackMode.service';
import { CreateHttpService } from '../../services/create-listing-services/createHttp.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
  providers: [CreateHttpService],
  //encapsulation : ViewEncapsulation.None
})
export class CreateListingComponent implements OnInit {

  constructor(private trackMode: TrackMode) { }

  ngOnInit() { }

  isAdvertiser() {
    if (this.trackMode.mode == 'ADVERTISER')
      return true;
  }

  isPublisher() {
    if (this.trackMode.mode == 'PUBLISHER')
      return true;
  }
}
