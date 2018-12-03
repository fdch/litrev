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


function displayLit(x) {

  var section, prevkey='';

  for (keys in allSections) {
    if (prevkey.localeCompare(keys)) {
     // console.log(keys);
      section = element('section','',keys);
      var st  = element('h5',keys, '', "window.open(\'#menu\',\'_top\')");
      section.appendChild(st);
    }
    var previds='';
    for (ids in allSections[keys]) {
      if (previds.localeCompare(ids)) {
      //console.log(ids)
      var link="window.open(\'#"+ids.replace(/:/,'')+"\',\'_top\')";
      section.appendChild(element('h6',ids,'',link));
      }
      for (pairs in allSections[keys][ids]) {
        // console.log(allSections[keys][ids][pairs]);
        var parap=allSections[keys][ids][pairs][0];
        var quote=allSections[keys][ids][pairs][1];
        var pages=allSections[keys][ids][pairs][2];
        var p=element('p',parap);
        var q=element('p',quote+" ("+pages+")");
        section.appendChild(p,q);
      }
    }
  }
}

function getLit() {

  getBib();

  getLitRev(function(){displayLit(sections[1]+"-a")});

  welcome();

  setTimeout(function () {

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
