import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdvertiserTables } from '../../../../models/advertiser-tables.model';
import { DashboardService } from '../../../../services/dashboard-services/dashboard.service';
@Component({
  selector: 'app-adv-dashboard-tables',
  templateUrl: './adv-dashboard-tables.component.html',
  styleUrls: ['./adv-dashboard-tables.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class AdvDashboardTablesComponent implements OnInit {
  advertiserTables: AdvertiserTables = new AdvertiserTables();
  isLoaded=false;
  constructor(private dashboardService : DashboardService) { }
  ngOnInit() {
    this.dashboardService.getAdvertiserTables().subscribe(
      response => {
        //console.log("getadvertisertables result:"+response);
        this.advertiserTables.update(response);
        this.isLoaded=true;
      });
  }
}
