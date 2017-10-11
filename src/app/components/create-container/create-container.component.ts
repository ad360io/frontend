import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrackMode } from '../../services/trackMode.service';


@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class CreateContainerComponent implements OnInit {

  constructor( private trackMode : TrackMode) { }

  ngOnInit() {
  }
  isPublisher(){
    if (this.trackMode.mode == "PUBLISHER")
      return true;
  }
  isAdvertiser(){
    if (this.trackMode.mode == "ADVERTISER")
      return true;
  }

}
