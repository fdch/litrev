function removeQuote(head,main,stuff){
  var h = head, m = main, s = stuff;
  removeChilds(h);removeChilds(m);
  for (let i in s) h.appendChild(s[i]);
}
function makeQuote(head,main,id) {
  var h = head, m = main, e = id;
  // var authors = [];
  // for (var i in remainQuotes) {
  //   authors.push(allFormObjects[remainQuotes[i]][2]);
  // }
  makeDropdown(
    "selQuoteID",
    m,
    remainQuotes,
    "selQuote(this)",
    "Select Quote by Number:"
  ); 
  h.appendChild(element('h3', "Quote ID # "+e));
  h.appendChild(element('h4', fullquotes[allFormObjects[e][1]]));
  m.appendChild(allFormObjects[e][0]);
  makeInput(m,'input',{
    type:'button',
    id:'rSliders',
    value:'randomSliders',
    onclick:'randomSliders()'
  })
  makeInput(m,'input',{
    type:'button',
    id:'analyze',
    value:'analyze',
    onclick:'analyze()'
  })
  m.appendChild(sliDiv);
  fillPhrase();
}
function selQuote(x) {
    let val = x.value;
    console.log(allFormObjects[val][0]);
    removeQuote(headTag,mainTag,hstuff);
    makeQuote(headTag,mainTag,val); 
}
function killPhrase() {
  document.getElementById(formNames[1]).value= '';
}
function fillPhrase()
{
  var p = document.getElementById(formNames[1]);
  var q = document.getElementById(formNames[0]);
  if (p.value) {console.log("is filled");return;}
  var squote = [];
  // console.log(quoter);

  var phrases = q.value.split('. ')

  for (let j in phrases) {
    var quoter = phrases[j].split(' ');
    // console.log(quoter.join(' '));
    
    for (let i in quoter)
    {
      curl = "https://api.datamuse.com/words?ml="+
              quoter[i]+
              "&max="+
              maxQuery;
      // console.log("DataMusing this: " + squote.join(''));
      loadJSON(curl, "GET", function(response) { 
        var f = JSON.parse(response);
        var lucky = pdRandom(maxQuery);
        if(f[lucky]) p.appendChild(document.createTextNode(f[lucky]['word']+" "));
        
      });

    }
    p.appendChild(document.createTextNode(". "));
  }
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
function analyze() {
  console.log("analyze");
  


  
}
function getLit(x,y) {
  getBib();
  loadJSON(currentForm, "GET", function(response) 
  { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      num = e.gsx$currentnumber.$t;
    }
  });

  loadJSON(fil, "GET", function(response) 
  { 
    // Get all quoteIDS from filled out sheet and make
    // an array of DATE objects to account for the
    // unwanted quotes, because they are already filled out.
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      var quotid = e.gsx$quoteid.$t;
      filQuoteID.push(quotid);
      // console.log('length:  '+filQuoteID.length);
      // console.log('lastitem:'+filQuoteID[filQuoteID.length-1]);
    }
    //Post the array to console to check
    // console.log(filQuoteID);
  });
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
  });
  loadJSON(lit, "GET", function(response) 
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];

      var ebook = e.gsx$booktitle.$t;
      var eauth = e.gsx$author.$t;
      var equot = e.gsx$quickquote.$t;
      var epara = e.gsx$paraphrase.$t;
      var eqid  = e.gsx$timestamp.$t;

      var eID = booktitles.indexOf(ebook);
      var len = equot.length;
      var col = 40;
      var row = len/col+2;

      var formID = "form-"+eID;

      var formTag = makeInput(0, 'form', {
          id:formID,
          action:formAction
      });

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

    // makeInput(x, 'input', {
    //   type:"button",
    //   value:"reMuse",
    //   onclick:"killPhrase();fillPhrase()"
    // });
    
    console.log("Waiting "+quoteTimeout+"msec for correct loading.");

    setTimeout(function() {    
      remainQuotes= alleqID.filter(f => !filQuoteID.includes(f));
      console.log("Filled Quotes   : "+filQuoteID.length);
      console.log("Total Quotes    : "+alleqID.length);
      console.log("Remaining Quotes: "+remainQuotes.length);
      
      makeQuote(y,x,eqid);
      
    }, quoteTimeout);

  });
}