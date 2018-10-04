var allKeys={}, iKey=[];

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
      allKeys[k]={};
    }
  });
  loadJSON(fil, "GET", function(response) 
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var equot = e.gsx$quote.$t;
      var epara = e.gsx$paraphrase.$t;
      var eqid = e.gsx$quoteid.$t;
      var eprob = e.gsx$probs.$t;
      if (epara) {
        for (var j=0; j<=eprob.length; j++) {
          allKeys[iKey[j]]={};
          allKeys[iKey[j]][i]=eprob[j];
        }
        x.appendChild(element('p', epara));
      }
    }
    console.log(allKeys;
    // x.appendChild(element('p', allKeys.join('</p><p>')));
  });
}