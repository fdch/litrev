var booktitles=[],allForms=[],fullquotes=[],alleID=[];
var sliders=[],slidersVals=[],slidersID=[];

function getLit() {

  getBib();

  var x = document.getElementById(sections[1]+"-a");

  var num = 0;

  loadJSON(currentForm, function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      num = e.gsx$currentnumber.$t;
    }
  });

  loadJSON(keys, function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      var sliderName = e.gsx$keywords.$t;
      var sliderLink = linkify(sliderName);
      var rValue = 0;//Math.floor((Math.random()*100));
      var slider = "\
      <label style=\"font-size:0.8em;\">"+sliderName+"</label>\
      <input class=\"slider\" type=\"range\" id=\""+sliderLink+"\" value=\""+rValue+"\"\
      oninput=\"changeVals(\'"+sliderLink+"\',this.value);updateVals(\'#probs\');\">"; 
      sliders.push(slider);
      slidersVals.push(rValue);
      slidersID.push(sliderLink);

    }
  });

  var updateScript = "<script>\
      function changeVals(x,n) { \
        slidersVals[jQuery.inArray( x, slidersID )]=n; \
      }\
      function updateVals(x) { \
        $(x).val( slidersVals.join(\" \") ) ; \
      }\
  </script>";

  loadJSON(lit, function(response) {
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
      var ta_defs = "";
      var quoteref = "<a href=\"#eID"+eID+"\" title=\""+ebook+". "+eauth+".\">["+eID+"]</a>";
      
      var len = equot.length;
      var cols = 30;
      var rows = len/cols+2;
      var size = "rows=\""+rows+"\" cols=\""+cols+"\"";

      var form = "\
      <form id=\"theform\" action=\""+formAction+"\">\
      <div class=\"quote-container\">\
      <textarea name=\""+formNames[0]+"\" id=\"quoteLabel\" type=\"message\" \
            "+size+">"+equot+"\</textarea>\
      </div><div class=\"paraph-container\">\
      <textarea name=\""+formNames[1]+"\" id=\"paraphraseLabel\" type=\"message\" \
            "+size+">"+epara+"</textarea>\
      </div><div class=\"slider-container\">\
      "+sliders.join("")+"\
      </div><div>\
      <input name=\""+formNames[2]+"\" type=\"text\" id=\"probs\">\
      </div><div>\
      <input name=\""+formNames[3]+"\" type=\"text\" id=\"quoteId\" value=\""+num+"\">\
      </div><div>\
      <input type=\"submit\" id=\"thesubmit\" value=\"Submit\">\
      </div>\
      </form>\
      "+updateScript+"";
  
      allForms.push(form);
      alleID.push(eID);
    }
  x.append("<h3>#"+num+"</h3>"+allBibs[alleID[num]]);
  x.append(allForms[num]);
  updateVals($('#probs'));
  });
}