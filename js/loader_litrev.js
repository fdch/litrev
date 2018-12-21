/*

  LITREV LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)

  
*/


var dictionary=[];

function getValue(x) {
  location.hash = "#" + x.value.replace(/ /g,"_").toLowerCase();
}

function getCopy(x) {

  var eid="'#" + x.value.replace(/ /g,"_").toLowerCase()+"'";

  console.log("copy(document.getElementById("+eid+"));");
  
}
// localstring=[];
function addWord(arr){
  var s=arr; // local array
  var len=s.length; //length of local array
  if (0>len) return;
  var word=s[0];
  var flag=dictionary.lastIndexOf(word);// flag to see if entry exists
  // var lind=[];//  Array to store local indices
  if (flag==-1) dictionary.push(s[0]);//add nonexisting entry if not in array
  addWord(s.shift());//  Recurse with word array-1
}


function addWords(str) {
  //  Wipe all non-word|num characters and split into array 's'
  var purge=purgeHTML(str);
  // var st=purge.replace(/[^a-zA-Z0-9] /g, "");
  var s=purge.split(' ');
  // console.log(s.join(' '));
  //  Begin filling dictionary
  return addWord(s);
}



function displayLit(target) {
  var i,ql,x = document.getElementById(target), s;
  for (keys in allSections) {
    s=element('section','',keys);
    s.appendChild(element('h3',keys, keys, "selectText(this)"));
    for (ids in allSections[keys]) {
      ql="#"+ids.replace(/:/,''),ids;
      for (i=0; i<allSections[keys][ids].length; i++){
        var page="["+allSections[keys][ids][i][2]+"]";
        var date=allSections[keys][ids][i][3];
        
        var sect=element('section','')
        var quotDiv=element('blockquote','');
        
        var quote=element('blockquote',allSections[keys][ids][i][1]);

        quotDiv.appendChild(element('p',"\\begin{quote}"));
        // quote.appendChild(ql);
        quote.appendChild(element(
          'span',
          " \\cite" + page + "{" + ids + "}",,
          "window.open(" + ql + ", '_top' )"
          ));
        quotDiv.appendChild(quote);
        quotDiv.appendChild(element('p',"\\end{quote} % "+date));

        //  paraphrase
        sect.appendChild(element('p',allSections[keys][ids][i][0]));
        //  quote
        sect.appendChild(quotDiv);

        s.appendChild(sect);
        x.appendChild(s);
        // x.appendChild(element('p',allSections[keys][ids][i].join()));
      }
    }  
  }
}

function makeLitMenus(){
    //  Make dropdown for keyword anchors
  makeDropdown('keywords',
    document.getElementById(sections[0]+"-a"),
    iKey,
    "getValue(this)",
    "Keywords "
  );
  makeDropdown('keywordcopy',
    document.getElementById(sections[0]+"-a"),
    iKey,
    "getCopy(this)",
    "Copy Keyword Text "
  );
}


function getLit() {

  getBib(function(){
    filliKeys(function() {
      fillAbbyQuotes(function() {
        getLitRev(function () {
          welcome();
          displayLit(sections[1]+"-a");
          makeBibTex(sections[2]+"-a");
          makeLitMenus();
          // console.log(dictionary)
        });
      });
    });
  });
}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
