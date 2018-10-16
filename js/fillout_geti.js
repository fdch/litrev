var booktitles=[],allForms=[],fullquotes=[],alleID=[];
var sliders=[],slidersVals=[],slidersID=[],filQuoteID=[];
var cFormm,num;

var maxQuery=10;

function getNum() {
  var n;
  loadJSON(currentForm, "GET", function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    /////////////////////////////////////////////////////////
    //	 BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////	
    for (var i in entry){
      var e = entry[i];
      n = e.gsx$currentnumber.$t;
    }
    /////////////////////////////////////////////////////////
    //	 END MAIN LOOP
    /////////////////////////////////////////////////////////	
    return chequera(n);
  });
}
function getFil() {
  loadJSON(fil, "GET", function(response) { 
    //	Get all quoteIDS from filled out sheet and make
    //	an array of DATE objects to account for the
    //	unwanted quotes, because they are already filled out.
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    /////////////////////////////////////////////////////////
    //	 BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////
    for (var i in entry){
      var e = entry[i];
      var quotid = e.gsx$quoteid.$t;
      filQuoteID.push(new Date(quotid));
      //	console.log('length:  '+filQuoteID.length);
      //	console.log('lastitem:'+filQuoteID[filQuoteID.length-1]);
    }
    /////////////////////////////////////////////////////////
    //	 END MAIN LOOP
    /////////////////////////////////////////////////////////	
    return chequera(filQuoteID.length);
  });
}
function getKeys() {
  var sliDiv = element('div','', 'sliDiv');
 
  loadJSON(keys, "GET", function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    /////////////////////////////////////////////////////////
    //	 BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////	
    for (var i in entry)
    {
      var e = entry[i];
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
    }
    /////////////////////////////////////////////////////////
    //	 END MAIN LOOP
    /////////////////////////////////////////////////////////	
    return chequera(slidersVals.length);
  });
}
function getQuotes() {
  loadJSON(lit, "GET", function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    /////////////////////////////////////////////////////////
    //	 BEGIN MAIN LOOP
    /////////////////////////////////////////////////////////	
    for (var i in entry)
    {
      var e = entry[i];
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
      //	Finally, make the Submit button
      makeInput(formTag,'input', 
      {
          type:"submit",
          id:"thesubmit",
          value:"Submit"
      });
      //	Push form Element to allForms array
      allForms.push(formTag);
      //	 Push element ID to alleID array
      alleID.push(eID);
    }
    /////////////////////////////////////////////////////////
    //	 END MAIN LOOP
    /////////////////////////////////////////////////////////
    return chequera(allForms.length);
  });//end loadJSON
}
function placeElements(x){
  x.appendChild(element('h3', "Quote ID # "+eqid));
  x.appendChild(element('h4', fullquotes[alleID[num]]));
  cForm="form-"+alleID[num];
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
  x.appendChild(allForms[num]);
  x.appendChild(sliDiv);
  //  document.getElementById(formNames[2]).innerHTML = slidersVals.join(" ");

  return chequera(x);
  //  tagText("text=hello world");   
}
function selQuote(x,target) {
  //  document.getElementById(cForm)
  let val = x.value;
  console.log(val);
  console.log("previous form: "+cForm);
  cForm="form-"+alleID[num];
  console.log("next form: "+cForm);
  console.log("-------"+alleID[val]+"----------");
  console.log(allForms[val]);

  //  fillPhrase();
}
//  function isLetter(str) {
//    return str.length === 1 && str.match(/[a-z]/i);
//  }
function killPhrase() {
  document.getElementById(formNames[1]).value= '';
}
function fillPhrase()
{
  //  Get the Paraphrase Textarea
  var p = document.getElementById(formNames[1]);
  //  Get the Quotes Textarea
  var q = document.getElementById(formNames[0]);
  if (p.value) {
      console.log("Paraphrase \'"+{p}+"\' is already Filled out. Skipping Phrase");
      return 1;
  } else {
    var squote = [];
    //  Get all Quotes into 'phrases' Array
    var phrases = q.value.split('. ');
    if (!phrases.length) {
      console.log({phrases}+" was empty. Skipping auto-fill.");
      return 1;
    } else {
      //////////////////////////////////////////////////////////
      //  BEGIN MAIN LOOP
      //////////////////////////////////////////////////////////
      for (let j in phrases) {
        //  Split all Words from 'phrases' to 'quoter' Array
        var quoter = phrases[j].split(' ');
        if (!quoter.length) {
          console.log({quoter}+" from "+{phrases[j]}+" was empty. Skipping Datamuse.");
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
                console.log("Can't append with empty data in: "+{f[lucky]});
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

function getLit(x)
{
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