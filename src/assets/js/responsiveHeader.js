function responsiveHeader(){
// LARGE SIZED DEVICES
enquire.register("screen and (max-width:1230px)", {
  match : function() {
  //document.getElementById("accountNumber").style.display="none";
  },
  unmatch : function() {
  //document.getElementById("accountNumber").style.display="inline-block";
  }
});

// MEDIUM SIZED DEVICES
enquire.register("screen and (max-width:992px)", {
  match : function() {
      //document.getElementById("accountNumber").style.display="none";


      document.getElementById("dropdown2").style.display="none";
      document.getElementById("dropdown3").style.display="none";
    },
    unmatch : function() {


      document.getElementById("dropdown2").style.display="inline-block";
      document.getElementById("dropdown3").style.display="inline-block";
    }
});

// SMALL SIZED DEVICES
enquire.register("screen and (max-width:768px)", {
  match : function() {
    //document.getElementById("accountNumber").style.display="none";
    document.getElementById("dropdown1").style.display="none";

  },
  unmatch : function() {
    document.getElementById("dropdown1").style.display="inline-block";
  }

});

}
