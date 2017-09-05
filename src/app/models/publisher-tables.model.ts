export class PublisherTables {
  websiteName :Array<any>;
  adType :Array<any>;
  adGenre :Array<any>;
  advertiserName : Array<any>;
  contractDate :Array <any>;
  
  constructor(jsonData?:any){
    this.websiteName = jsonData && jsonData["t1_col1"] || [];
    this.adType = jsonData && jsonData["t1_col2"] || [];
    this.adGenre = jsonData && jsonData["t1_col3"] || [];
    this.advertiserName = jsonData && jsonData["t2_col1"] || [];
    this.contractDate = jsonData && jsonData["t2_col2"] || [];
  }
  update(publisherTables : PublisherTables){
    this.websiteName = publisherTables.websiteName;
    this.adType = publisherTables.adType;
    this.adGenre = publisherTables.adGenre;
    this.advertiserName = publisherTables.advertiserName;
    this.contractDate = publisherTables.contractDate;
  }
}
