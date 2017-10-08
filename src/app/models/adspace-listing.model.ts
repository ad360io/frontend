import { Adspace } from  './adspace.model';

export class AdspaceListing {
    adspace : Adspace;
    name : string;
    currency : string;
    asking_rate :number;
    ask_date_from :any;
    ask_date_to :any;
    cpi:number;
    cpc:number;
    msg:string;

    constructor(jsonData?:any){
      if(jsonData)
        this.adspace = new Adspace(jsonData["ad"]);
      else
        this.adspace = new Adspace();

      this.name= jsonData && jsonData["name"] || [];
      this.currency = jsonData && jsonData["currency"] || [];
      this.asking_rate = jsonData && jsonData["asking_rate"] || [];
      this.ask_date_from = jsonData && jsonData["ask_date_from"] || [];
      this.msg = jsonData && jsonData["msg"] || [];
      this.cpc = jsonData && jsonData["cpc"] || [];
      this.cpi = jsonData && jsonData["cpi"] || [];
    }
    update(adspaceListing : AdspaceListing){
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
