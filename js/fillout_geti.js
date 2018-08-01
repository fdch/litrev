var booktitles=[],allForms=[],fullquotes=[],alleID=[];
var sliders=[],slidersVals=[],slidersID=[];

function getLit(x)
{

  getBib();

  var num = 0;

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

      var slider = makeInput(0,'input',{
         type:"range",
         name: sliderName,
         oninput:"changeVals(\'"+sliderLink+"\',this.value);\
                  updateVals(\'"+formNames[2]+"\');",
         value: rValue,
         min:0,
         max:100,
         label:sliderName,
         id:sliderLink,
      });


      // var slider = "\
      // <label style=\"font-size:0.8em;\">"+sliderName+"</label>\
      // <input class=\"slider\" type=\"range\" id=\""+sliderLink+"\" value=\""+rValue+"\"\
      // oninput=\"changeVals(\'"+sliderLink+"\',this.value);updateVals(\'#probs\');\">"; 
      sliders.push(slider);
      slidersVals.push(rValue);
      slidersID.push(sliderLink);

    }
  });
  // console.log(sliders.length);
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
      // var ta_defs = "";
      // var quoteref = "<a href=\"#eID"+eID+"\" title=\""+ebook+". "+eauth+".\">["+eID+"]</a>";
      
      var len = equot.length;
      var col = 30;
      var row = len/col+2;

      var formTag = makeInput(0, 'form', 
      {
          id:"theform",
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

      // var form = "\
      // <form id=\"theform\" action=\""+formAction+"\">\
      // <div class=\"quote-container\">\
      // <textarea name=\""+formNames[0]+"\" id=\"quoteLabel\" type=\"message\" \
      //       "+size+">"+equot+"\</textarea>\
      // </div><div class=\"paraph-container\">\
      // <textarea name=\""+formNames[1]+"\" id=\"paraphraseLabel\" type=\"message\" \
      //       "+size+">"+epara+"</textarea>\
      // </div><div class=\"slider-container\">\
      // "+sliders.join("")+"\
      // </div><div>\
      // <input name=\""+formNames[2]+"\" type=\"text\" id=\"probs\">\
      // </div><div>\
      // <input name=\""+formNames[3]+"\" type=\"text\" id=\"quoteId\" value=\""+num+"\">\
      // </div><div>\
      // <input type=\"submit\" id=\"thesubmit\" value=\"Submit\">\
      // </div>\
      // </form>\
      // "+updateScript+"";
  
      allForms.push(formTag);
      alleID.push(eID);
    }

    x.appendChild(element('h3', "#"+num));
    x.appendChild(element('h4', fullquotes[alleID[num]]));
    x.appendChild(allForms[num]);
    

    // console.log(sliders.length);


    for (let i=0;i<sliders.length;i++)
      formTag.appendChild(sliders[i]);
      // console.log(sliders[i]);
    
    updateVals(document.getElementById(formNames[2]));
  });
  
  var paraph = document.getElementById(formNames[1]).innerHTML;
  var quoter = document.getElementById(formNames[0]).innerHTML;
  
  if (!paraph) 
  {
    quoter = quoter.replace(/\"/g,"").replace(/\'/g,"").replace(/\(/g,"").replace(/\)/g,"");
    for (let i in quoter) {
      var squote = '';
      if(!quoter[i].localeCompare('.')) {
        curl = "https://api.datamuse.com/words?ml="+squote+"&max=1";
        console.log("DataMusing this: " + curl);
        
        loadJSON(curl, function(response) { 
          var f  =  JSON.parse(response);
          var val='';
          for (let j in f["word"]) {
            val+=f["word"][j]+" ";
          }
          paraph = val;
          // console.log(val);
        });
      } else squote+=quoter[i].replace(/ /g,"+");

    }
  }
}






