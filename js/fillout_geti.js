var booktitles=[],allForms=[],fullquotes=[],alleID=[];
var sliders=[],slidersVals=[],slidersID=[],filQuoteID=[];
var cForm;

var maxQuery=10;

function getLit(x)
{

  getBib();

  var num = 0;

  var sliDiv = element('div', '', 'sliDiv');

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
    filQuoteID=[];
    for (var i in entry){
      var e = entry[i];
      filQuoteID.push(new Date((e.gsx$quoteid.$t).replace(/\'/,'')));
    }
  });

  //Post the array to console to check
  console.log(filQuoteID.join());


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
      var eqid  = (e.gsx$timestamp.$t).replace(/\'/g,'');

      var eID = booktitles.indexOf(ebook);
      var len = equot.length;
      var col = 40;
      var row = len/col+2;

      var formTag = makeInput(0, 'form', {
          id:"form-"+eID,
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
      makeInput(formTag,'input', 
      {
          type:"submit",
          id:"thesubmit",
          value:"Submit"
      });
      
      allForms.push(formTag);
      alleID.push(eID);
    }

    x.appendChild(element('h3', "Quote ID # "+eqid));
    x.appendChild(element('h4', fullquotes[alleID[num]]));
    cForm="form-"+alleID[num];
    

    // makeInput(x, 'input', {
    //   type:"button",
    //   value:"reMuse",
    //   onclick:"killPhrase();fillPhrase()"
    // });

    makeDropdown(
      "selQuoteID",
      x,
      alleID,
      "selQuote(this,"+x+")",
      "Select Quote by Number:"
    );

    x.appendChild(allForms[num]);
    x.appendChild(sliDiv);
    
    // document.getElementById(formNames[2]).innerHTML = slidersVals.join(" ");

    fillPhrase();

    // tagText("text=hello world");
  
  });
}

function selQuote(x,target) {
    // document.getElementById(cForm)
    let val = x.value;
    console.log(val);
    console.log("previous form: "+cForm);
    cForm="form-"+alleID[num];
    console.log("next form: "+cForm);
    console.log("-------"+alleID[val]+"----------");
    console.log(allForms[val]);

    // fillPhrase();
}

// function isLetter(str) {
//   return str.length === 1 && str.match(/[a-z]/i);
// }


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