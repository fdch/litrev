var keyword="blank", keychange=0;
var allekeyw=[],keywords=[],booktitles=[],fullquotes=[];

function getLit()
{
  loadJSON(bib, function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;

    var ulTag = element('ul');
    document.getElementById(sections[2]+"-a").appendChild(ulTag);

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

      var quote = new Array();

      var eidnice = "["+i+"]";

      quote.push(eidnice," ", eauth,", ",ename);

      if(eslas) quote.push(", & ", eslas,", ", esfir);
      
      quote.push(". ",ebook,". ");

      if (edito) {
        quote.push(", in ",ejour,". ",edito," (Ed.) ");
        if (evolu) quote.push("Vol. ", evolu);
        if (enumb) quote.push("No. ", enumb);
      }
      
      quote.push(eyear,". ", epubl, ".");

      booktitles.push(ebook);
      fullquotes.push(quote.join(''));

      ulTag.appendChild(element('li', quote.join(''), "eID"+i));
    }
  });

  loadJSON(lit, function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;

    var section;
    
    for (var i in entry)
    {
      var e = entry[i];
    //var estam = e.gsx$timestamp.$t;
      var ekeyw = e.gsx$keyword.$t;
      if (keyword.localeCompare(ekeyw)) {
        keychange=1;
        keyword=ekeyw;
        keywords.push(keyword);
        // console.log(keyword);
      } else keychange=0;

      var ebook = e.gsx$booktitle.$t;
      var epage = e.gsx$page.$t;
      var eauth = e.gsx$author.$t;
      var equot = e.gsx$quickquote.$t;
      var epara = e.gsx$paraphrase.$t;
      var eID = booktitles.indexOf(ebook);

      var quoteref = new Array();

      quoteref.push(
        fullquotes[eID],
        " (p. ",epage,") "
        );
      var quoteA = anchor("#eID"+eID,"["+eID+"]",'',ebook);

      var ek = ekeyw.replace(/ /g,"_").toLowerCase();
      allekeyw.push(ek);

      if (ek){
        if (keychange) {
          section = element('section','',ek);
          let st = element('h5',ekeyw, '', "window.open(\'#menu\',\'_top\')");
          section.appendChild(st);
        }        
        section.appendChild(element('p',epara));
          var bq = element('blockquote',equot);
          bq.appendChild(quoteA);
          // bq.appendChild(element('p',quoteref.join('')));
        
        section.appendChild(bq);
        
        if (keychange){ 
          document.getElementById(sections[1]+"-a").appendChild(section);
        }
      }
    }
    makeDropdown('keywords',
      document.getElementById(sections[0]+"-a"),
      keywords,
      "getValue(this)",
      "Keywords "
    );
  });
}
function getValue(x) {
  window.open("#"+keywords.replace(/ /g,"_").toLowerCase(),'_top');
}