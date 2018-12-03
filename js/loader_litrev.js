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



// { <-- allSections
//   "actor-network_theory": { <-- allSections[keys]
//     "Lat90:On": [ <--allSections[keys][ids]
//       [  <-- allSections[keys][ids][0]
//         "PAr", <-- allSections[keys][ids][0][0]
//         "Quot",<-- allSections[keys][ids][0][1]
//         "14"   <-- allSections[keys][ids][0][2]
//       ],<-- allSections[keys][ids][1]...

function displayLit(target) {
  // console.log("displayLit("+target+")");
  var x = document.getElementById(target);
  // console.log(allSections);

  var section, prevkey='';

  for (keys in allSections) {
     // console.log(keys);
    if (prevkey.localeCompare(keys)) {
      x.appendChild(element('h5',keys, '', "window.open(\'#menu\',\'_top\')"));
    }
    var previds='';
    for (ids in allSections[keys]) {
      if (previds.localeCompare(ids)) {
      //console.log(ids)
        var link="window.open(\'#"+ids.replace(/:/,'')+"\',\'_top\')";
        x.appendChild(element('h6',ids,'',link));
      }
      
      var pairLen=allSections[keys][ids].length;

      // parsed["actor-network_theory"]["Lat90:On"][0][0]
      var i=0;
      for (i=0; i<pairLen; i++) {
        // console.log(allSections[keys][ids][pairs][i]);
        // var parap=allSections[keys][ids][i][0];
        // var quote=allSections[keys][ids][i][1];
        // var pages=allSections[keys][ids][i][2];
        // var p=element('p',parap);
        // var q=element('p',quote+" ("+pages+")");
        // x.appendChild(p,q);
        x.appendChild(element('p',allSections[keys][ids][i].join()));
      }
    }  
  }
}

function getLit() {

  getBib(function(){
    getLitRev(function () {
    
    welcome();
    displayLit(sections[1]+"-a");
    makeBibTex(sections[2]+"-a");

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


    // console.log(dictionary)

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
