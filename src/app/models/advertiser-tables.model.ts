export class AdvertiserTables {
  websiteName :Array<any>;
  adType :Array<any>;
  adGenre :Array<any>;
  publisherName : Array<any>;
  contractDate :Array <any>;
  
  constructor(jsonData?:any){
    this.websiteName = jsonData && jsonData["t1_col1"] || [];
    this.adType = jsonData && jsonData["t1_col2"] || [];
    this.adGenre= jsonData && jsonData["t1_col3"] || [];
    this.publisherName = jsonData && jsonData["t2_col1"] || [];
    this.contractDate = jsonData && jsonData["t2_col2"] || [];
  }
  update(advertiserTables : AdvertiserTables){
    this.websiteName = advertiserTables.websiteName;
    this.adType = advertiserTables.adType;
    this.adGenre = advertiserTables.adGenre;
    this.publisherName = advertiserTables.publisherName;
    this.contractDate = advertiserTables.contractDate;
  }
}
