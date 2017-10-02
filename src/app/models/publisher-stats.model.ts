export class PublisherStats {
  public revenue:number;
  public impressions:number;
  public clicks:number;
  public rpm:number;
  public eqc_balance:number;
  public xqc_balance:number;
  constructor(jsonData?: any){
    this.revenue = jsonData && jsonData["topstat_revenue_today"] || 0;
    this.impressions = jsonData && jsonData["topstat_impressions_today"] || 0;
    this.clicks = jsonData && jsonData["topstat_clicks_today"] || 0;
    this.rpm = jsonData && jsonData["topstat_rpm_today"] || 0;
    this.eqc_balance = jsonData && jsonData["eqc_balance"] || 0;
    this.xqc_balance = jsonData && jsonData["xqc_balance"] || 0;
  }
  update(publisherStats:PublisherStats){
    this.revenue = publisherStats.revenue;
    this.impressions = publisherStats.impressions;
    this.clicks = publisherStats.clicks;
    this.rpm = publisherStats.rpm;
    this.eqc_balance=publisherStats.eqc_balance;
    this.xqc_balance=publisherStats.xqc_balance;
  }
  display(){
    //console.log("revenue is:"+this.revenue);
    //console.log("revenue is:"+this.impressions);
    //console.log("revenue is:"+this.clicks);
    //console.log("revenue is:"+this.rpm);
  }
}
