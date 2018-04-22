var booktitles=[];
var allForms=[];
var allBibs=[];
var alleID=[];
var sliders=[];
var slidersVals=[];
var slidersID=[];

function getBib(x,sheet)
{
  loadJSON(sheet, function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var eauth = e.gsx$lastname.$t;
      var ename = e.gsx$firstname.$t;
      var ebook = e.gsx$title.$t;
      var eyear = e.gsx$year.$t;
      var epubl = e.gsx$publisher.$t;
      var edito = e.gsx$editor.$t;
      var ejour = e.gsx$journal.$t;
      var evolu = e.gsx$volume.$t;
      var enumb = e.gsx$number.$t;
      var eslas = e.gsx$secondlastname.$t;
      var esfir = e.gsx$secondfirstname.$t;
      var quote = eauth+", ";
      quote += ename+". ";
      quote += "<i>"+ebook+"</i>.";
      if (edito) {
        quote += ", in ";
        quote += "<i>"+ejour+"</i>. ";
        quote += edito+" (Ed.) ";
        if (evolu) quote += " Vol. "+evolu;
        if (enumb) quote += " No. "+enumb;
      }
      quote += " "+eyear+". ";
      quote += epubl+". ";
      booktitles.push(ebook);
      allBibs.push("<p id=eID"+i+"><span>["+i+"] </span>"+quote+"</p>");
    }
  });
}

function getLit(x, sheet, formsheet, keysheet)
{
  //get current number from the formsheet
  var num = 0;
  loadJSON(formsheet, function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      num = e.gsx$currentnumber.$t;
    }
  })
  //get all keywords from the 'keys' sheet
  loadJSON(keysheet, function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      var sliderName = e.gsx$keywords.$t;
      var sliderLink = linkify(sliderName);
      var rValue = Math.floor((Math.random()*100));
      var slider = "\
      <input type=\"range\" id=\""+sliderLink+"\" value=\""+rValue+"\"\
      oninput=\"changeVals(\'"+sliderLink+"\',this.value);updateVals($(\'#probs\'));\">\
      <label>"+sliderName+"</label>";
     
      sliders.push(slider);
      slidersVals.push(rValue);
      slidersID.push(sliderLink);

    }
  })
  var updateScript = "<script>\
function changeVals(x,n) { slidersVals[x]=n; }\
function updateVals(x) { $(x).val( slidersVals.join(\" \") ) ; };\
</script>";



  //get all entries from the quotes 'sheet'
  loadJSON(sheet, function(response) {
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

      var eID = jQuery.inArray( ebook, booktitles );
      var ta_defs = "type=\"message\" rows=\"60\" cols=\"40\"";
      var quoteref = "<a href=\"#eID"+eID+"\" title=\""+ebook+". "+eauth+".\">["+eID+"]</a>";
      var form = "\
      <h3>#"+num+"</h3>\
      <form id=\"theform\" action=\""+formAction+"\">\
      <div class=\"quote-container\">\
      <textarea name=\""+formNames[0]+"\" id=\"quoteLabel\" "+ta_defs+">"+equot+"\</textarea>\
      </div><div class=\"paraph-container\">\
      <textarea name=\""+formNames[1]+"\" id=\"paraphraseLabel\" "+ta_defs+" >"+epara+"</textarea>\
      </div><div class=\"slider-container\">\
      "+sliders.join("")+"\
      </div><div>\
      <input name=\""+formNames[2]+"\" type=\"text\" id=\"probs\">\
      </div>\<div>\
      <input type=\"submit\" id=\"thesubmit\" value=\"Submit\">\
      </div>\
      </form>\
      "+updateScript+"";
  
      allForms.push(form);
      alleID.push(eID);
    }
  x.append(allBibs[alleID[num]]);
  x.append(allForms[num]);
  updateVals($('#probs'));
  });
}