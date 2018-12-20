/*

  LITREV FILLOUT LOADER FILE


  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)


*/
var rquotes=[];
function removeQuote(head,main,stuff){
  var h = head, m = main, s = stuff;
  removeChilds(h);removeChilds(m);
  if(s.length) for (let i in s) h.appendChild(s[i]);
}
///////////////////////////////////////////////////////////////////////////////
//  QUOTE SELECTOR
///////////////////////////////////////////////////////////////////////////////
function selQuote(x) {
    let val = x.value;
    console.log("| Fetched: \'"+val+"\'");
    consoleLine();
    removeQuote(headTag,mainTag,hstuff);
    makeQuote(headTag,mainTag,val);
}
///////////////////////////////////////////////////////////////////////////////
//  PARAPHRASING TOOL
///////////////////////////////////////////////////////////////////////////////
function fillPhrase(quote) {
  var x = quote || currQuote;
  var p = document.getElementById(formNames[1]);
  var q = document.getElementById(formNames[0]);
  if (p.value) {
      console.log("| \'"+x+"\' is already filled");
      return;
  } else {
    console.log("| Datamusing \'"+x+"\'...");
    var phrases = q.value.split('. ');
    // console.log(phrases);
    for (let j in phrases) {
      var quoter = phrases[j].split(' ');
      for (let i in quoter) {
        var curl = dMuse + quoter[i] + "&max=" + maxQuery;
        loadJSON(curl, "GET", function(response) { 
          var f = JSON.parse(response);
          var lucky = pdRandom(maxQuery);
          if(f[lucky])
            p.appendChild(document.createTextNode(f[lucky]['word']+" "));
        });
      }
      p.appendChild(document.createTextNode(". "));
    }
  }
}
function refillPhrase(quote) {
  var q = quote || currQuote;
  document.getElementById(formNames[1]).value= '';
  fillPhrase(q);
}
///////////////////////////////////////////////////////////////////////////////
//  QUOTE KEYWORD ANALYZER
///////////////////////////////////////////////////////////////////////////////
function analyze(quote) {
  var q = quote || currQuote;
  var dirty=0,found=[],sliderObject={};
  //  Place all slider names into 'sliderObject' for keyword search
  if (slidersID.length) {
    for (let s in slidersID){
      sliderObject[slidersID[s]]=[];
      let sname = slidersID[s].replace(/-/g,' ').replace(/_/g,' ');
      sliderObject[slidersID[s]].push(sname.split(' '));
    }
  }
  //  slider Element ID in the Form
  var slElem  = formNames[2];
  //  Get the Quote into 'phrases' string
  var phrases = document.getElementById(formNames[0]).value;
  //  Trim the text for unwanted chars into the 'ph' array
  var ph      = purgeHTML(phrases);
  //  Split 'ph' into array 'phar'
  var phar    = ph.split(' ');
  //  Get Word Frequency of 'phar' into the 'arr' Object
  var arr     = wordFreq(phar);
  //  Sort the 'arr' object based on values and return its keys
  var arrSort = Object.keys(arr).sort(function(a,b){return arr[b]-arr[a]});
  //  Limit fetch up to 100 word candidates
  var len     = (phar.length <= maxQuery*10)?phar.length:maxQuery*10; 
  //  Loop through all candidates
  if (len) {
    for (var i=0; i<=len-1; i++) {
      var wd = arrSort[i];
      // console.log(wd);
      var unwanted=0;
      //  Skip analysis if word appears in 'preps' array
      for (var j in preps)
        if (!comp(wd,preps[j])) {unwanted=1; break;}
        else {unwanted=0;}
      if (unwanted) { continue; } //  Skip it
      else {
        //  Check against all slider IDs in 'sliderObject'
        for (let w in sliderObject) { 
          for (let x in sliderObject[w]) {
            var kw = sliderObject[w][x];
            //  If there is a match, post it,
            //  and increment 30 the keyword value
            if(!comp(wd,kw)||!comp(wd+"s",kw)) {
              dirty=1;
              found.push(kw);
              let index = slidersID.indexOf(sliderObject[w][x][0]);
              //  Update Slider Element Value
              document.getElementById(slidersID[index]).value += confidence;
              //  Update Slider Value Array
              slidersVals[index] += confidence;
              //  Update values of the Form Input elmement
              //  which is holding 'slidersVals'
              document.getElementById(slElem).value=slidersVals.join(' ');
            }
          }
        }
      }
    }
  } else {
    console.error({len});
  }
  //  Give out a responsive console message after analysis is done.
  if (!dirty){
    console.log("| analyze(\'"+q+"\')");
    console.log("|         --> Couldn't find matches <--         |");
    consoleLine();
  } else {
    consoleLine();
    console.log("| analyze(\'"+q+"\') --> Result:");
    for (var i in found) console.log(found[i]);
    consoleLine();
  }
}
///////////////////////////////////////////////////////////////////////////////
//  SLIDERS FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
function stats(x) {
  let val = x.value;
  let ind = x.id;
  let i = slidersID.indexOf(ind);
  slidersVals[i]=val;
  // console.log("Change Value of "+ind+" at ["+i+"] to: "+val);
  let sv = slidersVals.join(' ');
  document.getElementById(formNames[2]).value = sv;
  // console.log(sv)
}
function randomSliders(){
  var arr=[];
  for (var i in slidersID) {
    var r = pdRandom(100);
    document.getElementById(slidersID[i]).value=r;
    arr.push(r);
  }
  slidersVals = arr;
  let sv = slidersVals.join(' ');
  document.getElementById(formNames[2]).value = sv;
}


function makeKeys(callback) {
  loadJSON(keys, "GET", function(response) 
    { 
      var f  =  JSON.parse(response);
      var entry = f.feed.entry;
      for (var i in entry)
      {
        var e = entry[i];
        var sliderName = e.gsx$keywords.$t;
        var sliderLink = sliderName.replace(/ /g,'_').toLowerCase();
        var rValue = 0;//Math.floor((Math.random()*100));
        makeInput(sliDiv,'input',{
           type:"range",
           name: sliderName,
           oninput:"stats(this)",
           onchange:"stats(this)",
           value: rValue,
           min:0,
           max:100,
           label:sliderName,
           id:sliderLink,
           style:"display:block;width:"+articleWidth(500)+"px;"
        });
        slidersVals.push(rValue);
        slidersID.push(sliderLink);
      }
      //  view slidersID array
      // console.log(slidersID);
    });
  callback();
}

function fillLit(e,callback) {
  var entry = e;
  for (var i in entry)  {
    var e = entry[i];

    var ebook   = e.gsx$booktitle.$t;
    var eauth   = e.gsx$author.$t;
    var equot   = e.gsx$quickquote.$t;
    var epara   = e.gsx$paraphrase.$t;
    var eqid    = e.gsx$timestamp.$t;

    var eID     = booktitles.indexOf(ebook);
    var len     = equot.length;
    var col     = 40;
    var row     = len/col+2;

    var formTag = makeInput(0, 'form', {action:formAction});

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
    makeInput(formTag,'input', {
        type:"submit",
        id:"thesubmit",
        value:"Submit"
    });
    
    allFormObjects[eqid]={};
    allFormObjects[eqid][0]=formTag;
    allFormObjects[eqid][1]=eID;
    allFormObjects[eqid][2]=eauth;
    allFormObjects[eqid][3]=ebook;

    alleqID.push(eqid);
  }
  callback();
}

function makeLit(callback) {
  loadJSON(lit, "GET", function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    fillLit(entry,callback);
  });
}
function filterQuotes(callback){
  remainQuotes = alleqID.filter(f => !filQuoteID.includes(f));
  
  callback(function(){remainQuotes.sort( function(a,b) {
    return (new Date(a)).getTime() - (new Date(b)).getTime();
  });});
}

///////////////////////////////////////////////////////////////////////////////
//  GET ALL QUOTES
///////////////////////////////////////////////////////////////////////////////
function getLit(main,head) {
  getBib(function() {
    getFilledQuotesID(function() {
      makeKeys(function() {
        makeLit(function() {
          filterQuotes(function(rquotes) {
            welcome();
            

            consoleLine();
            console.log("| Filled Quotes     : "+filQuoteID.length);
            console.log("| Total Quotes      : "+alleqID.length);
            console.log("| Remaining Quotes  : "+remainQuotes.length);
            consoleLine();

            ///////////////////////////////////////////////////////////////////
            //  QUOTE DISPLAY
            ///////////////////////////////////////////////////////////////////

            var currQuote;  //  Store current quote Timestamp

            var e = remainQuotes[pdRandom(remainQuotes.length)];

            makeDropdown(
              "selQuoteID",
              main,
              remainQuotes,
              "selQuote(this)",
              "Select Quote by Number:"
            ); 

            head.appendChild(element('h3', "Quote ID: "+e));
            head.appendChild(element('h4', allFormObjects[e][3]+". "+allFormObjects[e][2]));
            main.appendChild(allFormObjects[e][0]);
            //  Empty 'slidersVals'
            if(slidersVals.length)
              for (var i in slidersVals)
                slidersVals[i]=0;

            makeInput(main,'input',{
              type:'button',
              id:'rSliders',
              value:'randomSliders',
              onclick:'randomSliders()'
            });
            makeInput(main,'input',{
              type:'button',
              id:'analyze',
              value:'analyze',
              onclick:'analyze()'
            });
            // makeInput(m,'input',{
            //   type:"button",
            //   id:'refill',
            //   value:"Refill Phrase",
            //   onclick:"refillPhrase()"
            // });
            main.appendChild(sliDiv);
            
            //  Empty slider element values
            if(slidersID.length)
              for (var i in slidersID)
                document.getElementById(slidersID[i]).value=0;

            fillPhrase(e);
            analyze(e);
            currQuote=e;
          })
        });
      }); 
    });
  });
}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
