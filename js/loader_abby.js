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
        welcome();
        loadJSON(fil, "GET", function(response)  {
          var f = JSON.parse(response);
          var entry = f.feed.entry;
          for (var i in entry) {
            var e = entry[i];
            // var qid = e.gsx$timestamp.$t;
            var qid = i;
            abbyQuote[qid] = {
              "quote"         : e.gsx$quote.$t,
              "paraphrase"    : e.gsx$paraphrase.$t,
              "id"            : e.gsx$quoteid.$t,
              "probabilities" : {}
            };
            var probs = (e.gsx$probs.$t).split(' ');
            for (var j=0; j<=probs.length-1; j++)
              abbyQuote[qid]["probabilities"][iKey[j].toString()]=probs[j];
          }
        });
      });
    });
  });

  
  setTimeout(function() {
    consoleLine();
    for (var i in quoteOrder) {

      s=findMatch(abbyQuote[quoteOrder[i]]["id"]);
      x.appendChild(element('h5',s));
      x.appendChild(element('p',abbyQuote[quoteOrder[i]]["paraphrase"]));
    }
  }, quoteTimeout);

}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
