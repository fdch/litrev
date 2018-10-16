/////////////////////////////////////////////////////////////////////////
//  EDITABLE VARIABLES
/////////////////////////////////////////////////////////////////////////
var maxQuery=10;
/////////////////////////////////////////////////////////////////////////
//  GLOBALS
/////////////////////////////////////////////////////////////////////////
var booktitles=[],allForms=[],fullquotes=[],alleID=[];
var sliders=[],slidersVals=[],slidersID=[],filQuoteID=[];
var cFormm,num=-1,sliDiv = element('div','', 'sliDiv');
/////////////////////////////////////////////////////////////////////////
//  ROUTINES
/////////////////////////////////////////////////////////////////////////
function getNum() {
  loadJSON(currentForm, "GET", function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    var len = entry.length;
    var lim = len-1;
    /////////////////////////////////////////////////////////
    //	 BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////	  
    if (!len) {
      consoleLog(len);
      return 1;
    } else {
        while(len) {
        len--;
        var e = entry[len];
        num = e.gsx$currentnumber.$t;
        if (len == lim) {
          // consoleLog("Excellent, num is: "+num);
          return 0;
        }
      }
    }
    /////////////////////////////////////////////////////////
    //	 END MAIN LOOP
    /////////////////////////////////////////////////////////	
  });
}
function getFil() {
  loadJSON(fil, "GET", function(response) { 
    //	Get all quoteIDS from filled out sheet and make
    //	an array of DATE objects to account for the
    //	unwanted quotes, because they are already filled out.
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    var len = entry.length;
    var lim = len-1;
    /////////////////////////////////////////////////////////
    //   BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////   
    if (!len) {
      consoleLog(len);
      return 1;
    } else {
        while(len) {
        len--;
        var e = entry[len];
        var quotid = e.gsx$quoteid.$t;
        filQuoteID.push(new Date(quotid));
        if (len == lim) {
          // consoleLog("Excellent, num is: "+num);
          return 0;
        }
      }
    }
    /////////////////////////////////////////////////////////
    //   END MAIN LOOP
    /////////////////////////////////////////////////////////
  });
}
function getKeys() {
  loadJSON(keys, "GET", function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    var len = entry.length;
    var lim = len-1;
    /////////////////////////////////////////////////////////
    //   BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////   
    if (!len) {
      consoleLog(len);
      return 1;
    } else {
        while(len) {
        len--;
        var e = entry[len];
        var sliderName = e.gsx$keywords.$t;
        var sliderLink = sliderName.replace(/ /g,'_').toLowerCase();
        // var slValue = Math.floor((Math.random()*100));
        var slValue = 0;
        //  Make a Slider input within the slider Div element
        makeInput(sliDiv,'input',{
           type:"range",
           name: sliderName,
           oninput:"stats(this)",
           value: slValue,
           min:0,
           max:100,
           label:sliderName,
           id:sliderLink,
           style:"display:block;width:"+articleWidth(500)+"px;"
        });
        //  Push slider Values to its corresponding Array
        slidersVals.push(slValue);
        //  Push Slider ID to its sliderLink Array to link it
        slidersID.push(sliderLink);
        if (len == lim) {
          // consoleLog("Excellent, num is: "+num);
          return 0;
        }
      }
    }
    /////////////////////////////////////////////////////////
    //   END MAIN LOOP
    /////////////////////////////////////////////////////////
  });
}
function getQuotes() {
  loadJSON(lit, "GET", function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    var len = entry.length;
    var lim = len-1;
    /////////////////////////////////////////////////////////
    //   BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////   
    if (!len) {
      consoleLog(len);
      return 1;
    } else {
        consoleLog(len);
        while(len) {
        len--;
        var e = entry[len];
        consoleLog(e);
        var ebook = e.gsx$booktitle.$t;
        var eauth = e.gsx$author.$t;
        var equot = e.gsx$quickquote.$t;
        var epara = e.gsx$paraphrase.$t;
        var eqid  = (e.gsx$timestamp.$t).replace(/\'/g,'');
        var eID = booktitles.indexOf(ebook);
        var len = equot.length;
        var col = 40;
        var row = len/col+2;
        //  Make the form Tag with corresponding formAction
        var formTag = makeInput(0, 'form', {
            id:"form-"+eID,
            action:formAction
        });
        //  Go through both textareas and fill them with
        //  either quote or paraphrase
        for (let i=0; i<2; i++) {
          makeInput(formTag,'textarea', 
          {
            id:formNames[i],
            name:formNames[i],
            type:"message",
            rows:row,
            cols:col,
            text:i==0?equot:epara,
            style:"margin-right:5px;"
          });
        }      
        //  Go through both inputs and fill them with
        //  either quote id or slider values
        for (let i=2; i<4; i++) {
          makeInput(formTag,'input', 
          {
            id:formNames[i],
            name:formNames[i],
            type:"text",
            size:(i==3?eqid.length:slidersVals.length*2),
            value:i==3?eqid.replace(/\'/g,''):slidersVals.join(' '),
            style:"display:block;margin:3px"
          });
        }
        //  Finally, make the Submit button
        makeInput(formTag,'input', 
        {
            type:"submit",
            id:"thesubmit",
            value:"Submit"
        });
        //  Push form Element to allForms array
        allForms.push(formTag);
        //   Push element ID to alleID array
        alleID.push(eID);
        if (len == lim) {
          // consoleLog("Excellent, num is: "+num);
          return 0;
        }
      }
    }
    /////////////////////////////////////////////////////////
    //   END MAIN LOOP
    /////////////////////////////////////////////////////////
  });
}
function placeElements(x){
  console.log(filQuoteID.length);
  console.log(filQuoteID);
  var lastQuote = filQuoteID.length - 1;
  x.appendChild(element('h3', "Quote ID # "+filQuoteID[lastQuote]));
  x.appendChild(element('h4', fullquotes[alleID[lastQuote]]));
  cForm="form-"+alleID[lastQuote];
  //  makeInput(x, 'input', {
  //    type:"button",
  //    value:"reMuse",
  //    onclick:"killPhrase();fillPhrase()"
  //  });
  makeDropdown(
    "selQuoteID",
    x,
    alleID,
    "selQuote(this,"+x+")",
    "Select Quote by Number:"
  );
  // if (allForms.length >= 1){
    x.appendChild(allForms[lastQuote]);
  // } else {
  //   console.log(allForms.length);
  //   return consoleLog(allForms),1;
  // }
  // if (sliDiv.length >= 1) {
    x.appendChild(sliDiv);
  // }
  // else {
  //   return consoleLog(sliDiv),1;
  // }
  return x?0:consoleLog(x),1;
}
function selQuote(x,target) {
  //  document.getElementById(cForm)
  let val = x.value;
  consoleLog(val);
  consoleLog("previous form: "+cForm);
  cForm="form-"+alleID[num];
  consoleLog("next form: "+cForm);
  consoleLog("-------"+alleID[val]+"----------");
  consoleLog(allForms[val]);
  //  fillPhrase();
  return 0;
}
function killPhrase() {
  document.getElementById(formNames[1]).value= '';
  return 0;
}
function fillPhrase(){
  //  Get the Paraphrase Textarea
  var p = document.getElementById(formNames[1]);
  //  Get the Quotes Textarea
  var q = document.getElementById(formNames[0]);
  if (p.value) {
      consoleLog("Paraphrase \'"+{p}+"\' is already Filled out. Skipping Phrase");
      return 1;
  } else {
    var squote = [];
    //  Get all Quotes into 'phrases' Array
    var phrases = q.value.split('. ');
    if (!phrases.length) {
      consoleLog({phrases}+" was empty. Skipping auto-fill.");
      return 1;
    } else {
      //////////////////////////////////////////////////////////
      //  BEGIN MAIN LOOP
      //////////////////////////////////////////////////////////
      for (let j in phrases) {
        //  Split all Words from 'phrases' to 'quoter' Array
        var quoter = phrases[j].split(' ');
        if (!quoter.length) {
          consoleLog({quoter}+" from "+{phrases}+" was empty. Skipping Datamuse.");
        } else {
          for (let i in quoter) {
            //  Fetch from datamuse.com
            curl = "https://api.datamuse.com/words?ml="+quoter[i]+"&max="+maxQuery;
            loadJSON(curl, "GET", function(response) { 
              var f = JSON.parse(response);
              var lucky = pdRandom(maxQuery);
              if(f[lucky]){
                p.appendChild(document.createTextNode(f[lucky]['word']+" "));
              } else {
                consoleLog("Can't append with empty data in: "+{f});
              }
            });
          }
        }
        p.appendChild(document.createTextNode(". "));
      }
      //////////////////////////////////////////////////////////
      //  END MAIN LOOP
      //////////////////////////////////////////////////////////
      return 0;
    }
  }
}
/////////////////////////////////////////////////////////////////////////
//  MAIN ROUTINE
/////////////////////////////////////////////////////////////////////////
function getLit(x) {
  if (getBib()) {
    console.log("Couldn't Fetch Bibliography!");
  } else {
    if (getNum()) {
      console.log("Couldn't Fetch Current Fillout Number!");
    } else {
      if (getFil()) {
        console.log("Couldn't Fetch Fillout Quote ID!");
      } else {
        if (getKeys()) {
          console.log("Couldn't Fetch Keywords!");
        } else{
          if (getQuotes()) {
            console.log("Couldn't Fetch Quotes!");
          } else {
            console.log("Everything was Fetched Smoothly :)");
            console.log("...now placing elements on page...");
            if (placeElements(x)) {
              console.log("Coudn't Place Elements!");
            } else {
              console.log("Placed everything... now filling phrase.");
              if (fillPhrase()) {
                console.log("Couldnt' fill the phrase!")
              } else {
                console.log("Congrats! All is good with the world.")
              }
            }
          }
        }
      }
    }
  }
}