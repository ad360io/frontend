export class Ad {
  adType : string;
  adGenre : string;
  height : number;
  width : number;
  advertiser : number;

  constructor(jsonData?:any){
    this.adType = jsonData && jsonData["adType"] || [];
    this.adGenre = jsonData && jsonData["adGenre"] || [];
    this.adGenre= jsonData && jsonData["height"] || [];
    this.height = jsonData && jsonData["width"] || [];
    this.width = jsonData && jsonData["advertiser"] || [];
  }
  update(ad : Ad){
    this.adType = ad.adType;
    this.adGenre = ad.adGenre;
    this.height = ad.height;
    this.width = ad.width;
    this.advertiser = ad.advertiser;
  }
}
