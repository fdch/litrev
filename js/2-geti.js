/*

  LITREV LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)

  
*/
var keyword="blank", keychange=0;
var allekeyw=[],keywords=[],booktitles=[],fullquotes=[];

function getValue(x) {
  location.hash = "#" + x.value.replace(/ /g,"_").toLowerCase();
}

function getLit() {

  getBib();
  
  var ulTag = element('ul');
  document.getElementById(sections[2]+"-a").appendChild(ulTag);
  for(let i in fullquotes)
    ulTag.appendChild(element('li', fullquotes[i].join(''), "eID"+i));

  loadJSON(lit, "GET", function(response) {
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
  welcome();
}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
