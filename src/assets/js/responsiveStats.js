function responsiveStats(){
var cardContents = [];
var labelContents = [];

//GETTING THE TEXT CONTENT OF THE CARDS AND LABELS

for( i = 0; i < 5; i++ ){
  cardContents[i] = document.getElementById("cardContent"+(i+1)).textContent;
}

for( i = 0; i < 4; i++ ){
  labelContents[i] = document.getElementById("labelContent"+(i+1)).textContent;
}

// RETURNS A SHORTENED REPRESENTATION OF THE FLOATING POINT NUMBER PASSED TO IT
function truncatedFloat(value,precision) {

  var suffix="";

  if(value >= 1000 && value < 1000000){
    value=value/1000;
    suffix="K";
  }

  if( value >= 1000000 && value < 1000000000){
    value=value/1000000;
    suffix="M";
  }
  if( value >= 1000000000 ){
    value=value/1000000000;
    suffix="B";
  }
  var multiplier = Math.pow(10, precision || 0);
  var newValue = Math.round(value * multiplier) / multiplier;
  newValue+=suffix;
  return newValue;
}

// RETURNS A SHORTENED REPRESENTATIN OF THE INTEGER PASSED TO IT
function truncatedInteger(value) {
  var suffix="";

  if(value >= 1000 && value < 1000000){
    suffix="K";
    value = Math.floor(value/1000);
  }

  if( value >= 1000000 && value < 1000000000){
    suffix="M";
    value = Math.floor(value/1000000);
  }
  if( value >= 1000000000 ){
    value=value/1000000000;
    suffix="B";
  }
  return value+suffix;
}

// SMALL SIZED DEVICES
enquire.register("screen and (max-width:768px)", {
  match : function() {
    for ( i = 0; i < 5; i++ ){
      var value = cardContents[i];
      if( (i!= 1) && (i!= 2) ){
        document.getElementById("cardContent"+(i+1)).innerHTML=truncatedFloat(parseFloat(value),2);
      }
      else {
        value=value.replace(',','');
        ////console.log("replaced integer value:"+value);
        document.getElementById("cardContent"+(i+1)).innerHTML=truncatedInteger(parseInt(value));
      }
  }
    for ( i = 0; i < 4; i++ ){
      document.getElementById("labelContent"+(i+1)).innerHTML="";
    }

  },
  unmatch : function() {
    for ( i = 0; i < 5; i++ ){
      document.getElementById("cardContent"+(i+1)).innerHTML=cardContents[i];
    }

    for ( i = 0; i < 4; i++ ){
      document.getElementById("labelContent"+(i+1)).innerHTML=labelContents[i];
    }

  }

});


// MEDIUM SIZED DEVICES
enquire.register("screen and (max-width:992px)", {
  match : function() {
    for ( i = 0; i < 5; i++ ){
      var value = cardContents[i];
      if( (i!= 1) && (i!= 2) ){
        document.getElementById("cardContent"+(i+1)).innerHTML=truncatedFloat(parseFloat(value),4);
    }
  }

  },
  unmatch : function() {
    for ( i = 0; i < 5; i++ ){
      document.getElementById("cardContent"+(i+1)).innerHTML=cardContents[i];
    }

  }
});
}
