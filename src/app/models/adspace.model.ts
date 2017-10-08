export class Adspace {
  publisher : string;
  website : string;
  name : string;
  adtype : string;
  genre : string;
  height : number;
  width : number;

  constructor(jsonData?:any){
    this.publisher = jsonData && jsonData["publisher"] || [];
    this.website = jsonData && jsonData["website"] || [];
    this.name= jsonData && jsonData["name"] || [];
    this.adtype = jsonData && jsonData["adtype"] || [];
    this.genre = jsonData && jsonData["genre"] || [];
    this.height = jsonData && jsonData["height"] || [];
    this.width = jsonData && jsonData["width"] || [];
  }
  update(adspace : Adspace){
    this.publisher = adspace.publisher;
    this.website = adspace.website;
    this.name = adspace.name;
    this.adtype = adspace.adtype;
    this.genre = adspace.genre;
    this.height = adspace.height;
    this.width = adspace.width;
  }

}
