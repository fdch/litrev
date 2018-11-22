/*

  LITREV LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)

  
*/
var keyword="blank",keychange=0,keywords=[];

var dictionary=[];

function getValue(x) {
  location.hash = "#" + x.value.replace(/ /g,"_").toLowerCase();
}

function getCopy(x) {

  var eid="'#" + x.value.replace(/ /g,"_").toLowerCase()+"'";

  console.log("copy(document.getElementById("+eid+"));");
  
}

function addWord(arr){
  var s=arr; // local array
  var len=s.length; //length of local array
  //  flag to see if entry exists
  flag=0;
  //  Array to store local indices
  var lind=[];
  
  if (0==len) {
      return 1;//  return if word array is empty
  } else {
    if (1<dictionary.length) //  dictionary has some words
      for (var i in dictionary) { // look up through the dictionary entries
        var entry=dictionary[i];
        if (entry.localeCompare(s[len])){ // compare words
          flag++;// Word exists. 
          break;
        }
      }
    //  otherwise dictionary is empty, so we fill it anyway
    if (!flag) dictionary.push(s[len]);// Word exits, add it as new entry    
    //  remove last word locally
    s.splice(len,1);
    //  Recurse with word array-1
    addWord(s)
  }
}


function addWords(str) {
  //  Wipe all non-word|num characters and split into array 's'
  var st=str.replace(/[^a-zA-Z0-9]/g, "");
  var s=st.split(' ');
  //  Begin filling dictionary
  return addWord(s);
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
      var thequote = e.gsx$quickquote.$t;
      var paraphra = e.gsx$paraphrase.$t;
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
        section.appendChild(element('p',paraphra));
        ///////////////////////////////////////////////////////////////////////
        //  THE QUOTE
        ///////////////////////////////////////////////////////////////////////
        //  Blockquote element with the Quote
        var bq = element('blockquote',thequote);
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

      if(!addWords(thequote)){
        console.log("Something was seriously wrong with addWords()");
      } else {
        
      }
      // addWords(paraphra);
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
    console.log(dictionary)
  }, quoteTimeout);
}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
