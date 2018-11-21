/*

  LITREV LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)

  
*/
var keyword="blank",keychange=0,keywords=[];

function getValue(x) {
  location.hash = "#" + x.value.replace(/ /g,"_").toLowerCase();
}
function selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}
function getCopy(x) {

  var eid="'#" + x.value.replace(/ /g,"_").toLowerCase()+"'";

  console.log(eid);
  
  selectText(eid);


}


function getLit() {

  getBib();

  loadJSON(lit, "GET", function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    var section;
    ///////////////////////////////////////////////////////////////////////////
    //  BEGIN ENTRY LOOP
    ///////////////////////////////////////////////////////////////////////////
    for (var i in entry) {
      var e = entry[i];
    //var estam = e.gsx$timestamp.$t;
      var ekeyw   = e.gsx$keyword.$t;
      if (keyword.localeCompare(ekeyw)) {
        keychange = 1;
        keyword   = ekeyw;
        keywords.push(keyword);
      } else {
        keychange = 0;
      }
      var ek      = ekeyw.replace(/ /g,"_").toLowerCase();
      var eauth   = e.gsx$author.$t;
      var btitl   =e.gsx$booktitle.$t;
      var id      = eauth.slice(0,3)+(e.gsx$year.$t).slice(2)+":"+btitl.slice(0,3);
      
// \cite{Man02} (p. 28)
      var quoteA  = anchor(
        "#"+id,
        "\\cite{"+id+"} (p. "+e.gsx$page.$t+")",
        '',
       btitl+", "+eauth
      );
      //  Check if keyword exists
      if (ek){
        //  Check if it is different from the previous keyword
        if (keychange) {
          //  Set up a new section title for corresponding keyword
          section = element('section','',ek);
          var st  = element('h5',ekeyw, '', "window.open(\'#menu\',\'_top\')");
          section.appendChild(st);
        }
        ///////////////////////////////////////////////////////////////////////
        //  THE PARAPHRASE
        ///////////////////////////////////////////////////////////////////////
        //  Print the Paraphrasing as a simple paragraph
        section.appendChild(element('p',e.gsx$paraphrase.$t));
        ///////////////////////////////////////////////////////////////////////
        //  THE QUOTE
        ///////////////////////////////////////////////////////////////////////
        //  Blockquote element with the Quote
        var bq = element('blockquote',e.gsx$quickquote.$t);
        //  Append Quote Reference to blockquote
        bq.appendChild(quoteA);
        //  Print Blockquote Element
        section.appendChild(bq);
        //  WHY IS THIS CHECK HERE AGAIN?
        if (keychange) {
          //  Print the section
          document.getElementById(sections[1]+"-a").appendChild(section);
        }
      }
    }
    ///////////////////////////////////////////////////////////////////////////
    //  END ENTRY LOOP
    ///////////////////////////////////////////////////////////////////////////
    //  Make dropdown for keyword anchors
    makeDropdown('keywords',
      document.getElementById(sections[0]+"-a"),
      keywords,
      "getValue(this)",
      "Keywords "
    );
    makeDropdown('keywordcopy',
      document.getElementById(sections[0]+"-a"),
      keywords,
      "getCopy(this)",
      "Copy Keyword Text "
    );
  });
  welcome();
  setTimeout(function () {
    makeBibTex(sections[2]+"-a");
  }, quoteTimeout);
}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
