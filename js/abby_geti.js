/*

  LITREV ABBY LOADER FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)

  
*/
var iKey=[];
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
    for (var i in entry)
    {
      var e = entry[i];
      var equot = e.gsx$quote.$t;
      var epara = e.gsx$paraphrase.$t;
      var eqid = e.gsx$quoteid.$t;
      var eprob = (e.gsx$probs.$t).split(' ');
      mikey=[];
      if (epara) {
        for (var j=0; j<=eprob.length-1; j++) {
          mikey.push(element('span', iKey[j] + ': ' + eprob[j] + '. '));
        }
        x.appendChild(element('p', epara));
        for (let m in mikey) x.appendChild(mikey[m]);
      }
    }
  });
  welcome();
}
/*


  END LOADER FILE

  
*/