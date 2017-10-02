export class AdvertiserStats {
  public impressions:number;
  public clicks:number;
  public balance:number;
  public eqc_balance:number;
  public xqc_balance:number
  constructor(jsonData?: any){
    this.impressions = jsonData && jsonData["topstat_impressions_today"] || 0;
    this.clicks = jsonData && jsonData["topstat_clicks_today"] || 0;
    this.eqc_balance = jsonData && jsonData["eqc_balance"] || 0;
    this.xqc_balance = jsonData && jsonData["xqc_balance"] || 0;
  }
  update(advertiserStats:AdvertiserStats){
    this.impressions = advertiserStats.impressions;
    this.clicks = advertiserStats.clicks;
    this.eqc_balance=advertiserStats.eqc_balance;
    this.xqc_balance=advertiserStats.xqc_balance;
  }
  display(){
    //console.log("revenue is:"+this.impressions);
    //console.log("revenue is:"+this.clicks);
  }
}
