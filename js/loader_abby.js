/*

  LITREV ABBY LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)


*/

function findMatch(s) {
  var i,keys,ids;
  for (keys in allSections) {
    for (ids in allSections[keys]){
      for (i=0; i<allSections[keys][ids].length; i++){
        if(!s.localeCompare(allSections[keys][ids][i][3])){
          return keys+" \\cite{"+ids+"}("+allSections[keys][ids][i][2]+")";
        }
      }
    }
  }
  return 0;   
}


function displayAbby(x) {
  getBib(function(){
    filliKeys(function(){
      getLitRev(function () {
        fillAbbyQuotes(function() {
          welcome();
          consoleLine();
          for (var i in quoteOrder) {
            s=findMatch(abbyQuote[quoteOrder[i]]["id"]);
            x.appendChild(element('h5',s));
            x.appendChild(element('p',abbyQuote[quoteOrder[i]]["paraphrase"]));
          };
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
