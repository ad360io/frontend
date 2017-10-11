import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard-services/dashboard.service';
import { PublisherTables} from '../../../../models/publisher-tables.model';
@Component({
  selector: 'app-pub-dashboard-tables',
  templateUrl: './pub-dashboard-tables.component.html',
  // styleUrls: ['./pub-dashboard-tables.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class PubDashboardTablesComponent implements OnInit {
  t1length=0;
  publisherTables: PublisherTables = new PublisherTables();
  isLoaded=false;
  constructor(private dashboardService : DashboardService) {

   }

  ngOnInit() {
    this.dashboardService.getPublisherTables().subscribe(
      response => {
        //console.log(response);
        this.publisherTables.update(response);
        this.t1length = this.publisherTables.websiteName.length;
        this.isLoaded=true;
      });
  }

}
