import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adv-dashboard-wallet',
  templateUrl: './adv-dashboard-wallet.component.html',
  styleUrls: ['./adv-dashboard-wallet.component.css']
})
export class AdvDashboardWalletComponent implements OnInit {

  eqc_balance: number = 123458.33;
  xqc_balance: number = 0.0000012;
   
  constructor() { }
  ngOnInit() {
  }

}
