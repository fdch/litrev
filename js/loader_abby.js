/*

  LITREV ABBY LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)


*/
var iKey=[];
var abbyQuote={};
function getLit(x)
{
  // getBib();
  loadJSON(keys, "GET", function(response) 
  { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var k = (e.gsx$keywords.$t).replace(/ /g,'_').toLowerCase();
      iKey[i]=k;
    }
  });
  loadJSON(fil, "GET", function(response) 
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry) {
      var e = entry[i];
      var qid = e.gsx$timestamp.$t;
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
  welcome();





  
  setTimeout(function() {
    // console.log("| Testing multisort");
    consoleLine();
    for (var key in abbyQuote) {
      // console.log(abbyQuote[key]["paraphrase"]);
      x.appendChild(element('p',abbyQuote[key]["paraphrase"]));
    }
      // for (var mikey in abbyQuote["probabilities"]) {
        // console.log(abbyQuote[key]["probabilities"][mikey]);
        // consoleLine();
        // var ranking = helper.arr.multisort(abbyQuote, [abbyQuote[key]["probabilities"][mikey]]);
        // console.log(ranking);
        // consoleLine();
      // }
      // x.appendChild(element('p',abbyQuote[key]["paraphrase"]));
  }, quoteTimeout);
}
/*


  END LOADER FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
