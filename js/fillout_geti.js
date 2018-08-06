var booktitles=[],allForms=[],fullquotes=[],alleID=[];
var sliders=[],slidersVals=[],slidersID=[];

var maxQuery=4;

function getLit(x)
{

  getBib();

  var num = 0;

  var sliDiv = element('div', '', 'sliDiv');

  loadJSON(currentForm, function(response) 
  { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      num = e.gsx$currentnumber.$t;
    }
  });


  loadJSON(keys, function(response) 
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
  loadJSON(lit, function(response) 
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
      var eqid = e.gsx$id.$t;

      var eID = booktitles.indexOf(ebook);
      var len = equot.length;
      var col = 30;
      var row = len/col+2;

      var formTag = makeInput(0, 'form', 
      {
          id:"form-"+eID,
          action:formAction
      });

      for (let i=0; i<2; i++)
        makeInput(formTag,'textarea', 
        {
          id:formNames[i],
          name:formNames[i],
          type:"message",
          rows:row,
          cols:col,
          text:i==0?equot:epara
        });
      
      
      for (let i=2; i<4; i++)
        makeInput(formTag,'input', 
        {
          id:formNames[i],
          name:formNames[i],
          type:"text",
          size:(i==3?1:slidersVals.length/2),
          value:i==3?num:slidersVals.join(' ')
        });

      makeInput(formTag,'input', 
      {
          type:"submit",
          id:"thesubmit",
          value:"Submit"
      });
  
      allForms.push(formTag);
      alleID.push(eID);
    }

    x.appendChild(element('h3', "Quote Reference #"+num));
    x.appendChild(element('h4', fullquotes[alleID[num]]));
    

    makeInput(x, 'input', {
      type:"button",
      value:"reMuse",
      onclick:"killPhrase();fillPhrase()"
    });

    x.appendChild(allForms[num]);
    x.appendChild(sliDiv);
    
    // document.getElementById(formNames[2]).innerHTML = slidersVals.join(" ");

    fillPhrase();
  
  });
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function getWords(x) {
  let p = new Array(x);
  console.log(p);
  let word = new Array();
  let wordList = new Array();
  for (let i in p) {
    let char = p[i];
    if (!isLetter(char)) {
      //it is a space
      wordList.push(word);
      console.log(word);
      word=[];
    } else  {
      word.push(char);
    } 
  }
  return wordList;
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
  var quoter = q.value;
  // console.log(quoter);

  quoter = quoter.replace(/\"/g,"").replace(/\'/g,"");
  quoter = quoter.replace(/\(/g,"").replace(/\)/g,"");


  getWords(quoter);
  // var myWordList = getWords(quoter);
  // for (let i in myWordList) console.log(myWordList[i]);




  
  for (let i in quoter)
  {
    var words=[];
    if(  !quoter[i].localeCompare('.') 
      || !quoter[i].localeCompare(';') 
      // || !quoter[i].localeCompare(',')
      || !quoter[i].localeCompare('-')
      || !quoter[i].localeCompare(':')
      )
    {
      curl = "https://api.datamuse.com/words?ml="+
              squote.join('')+
              "&max="+
              maxQuery;
      // console.log("DataMusing this: " + squote.join(''));
      loadJSON(curl, function(response)
      { 
        var f = JSON.parse(response);

        for(let i=0; i<maxQuery; i++)
          if(f[i])
            p.appendChild(document.createTextNode(f[i]['word']+" "));
        p.appendChild(document.createTextNode("; "));

      });
      squote=[];  
    } else 
    {
      squote.push(quoter[i].replace(/ /g,"+"));
    }
  }
}