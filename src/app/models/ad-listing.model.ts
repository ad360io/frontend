import {Ad} from './ad.model';

export class AdListing {
  ad : Ad;
  name : string;
  currency : string;
  asking_rate: number;
  ask_date_from :any;
  ask_date_to : any;
  msg : string;
  cpi:number;
  cpc:number;

  constructor(jsonData?:any){
    if(jsonData)
      this.ad = new Ad(jsonData["ad"]);
    else
      this.ad = new Ad();

    this.name= jsonData && jsonData["name"] || [];
    this.currency = jsonData && jsonData["currency"] || [];
    this.asking_rate = jsonData && jsonData["asking_rate"] || [];
    this.ask_date_from = jsonData && jsonData["ask_date_from"] || [];
    this.msg = jsonData && jsonData["msg"] || [];
    this.cpc = jsonData && jsonData["cpc"] || [];
    this.cpi = jsonData && jsonData["cpi"] || [];
  }
  update(adspaceListing : AdListing){
    this.name = adspaceListing.name;
    this.currency = adspaceListing.currency;
    this.name = adspaceListing.name;
    this.asking_rate = adspaceListing.asking_rate;
    this.ask_date_from = adspaceListing.ask_date_from;
    this.msg = adspaceListing.msg;
    this.cpc = adspaceListing.cpc;
    this.cpi = adspaceListing.cpi;
  }

}
