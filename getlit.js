function getLit(x, sheet)
{
  loadJSON(sheet, function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
    //var estam = e.gsx$timestamp.$t;
      var ekeyw = e.gsx$keyword.$t;
      if (keyword.localeCompare(ekeyw)) {
        keychange=1;
        keyword=ekeyw;
        keywords.push(keyword);
      } else {
        keychange=0;
      }
      var ebook = e.gsx$booktitle.$t;
      var eauth = e.gsx$author.$t;
      var epage = e.gsx$page.$t;
      var equot = e.gsx$quickquote.$t;
      var epara = e.gsx$paraphrase.$t;
    //var nevent = "<h3>"+ekeyw+"</h3><p>"+equot+" ("+eauth+","+ebook+","+epage+")</p>";
      var open = "<div id=\""+linkify(ekeyw)+"\"><h4>"+ekeyw+"</h4>";
      var intro = "<p>"+epara+" ("+eauth+", "+epage+")</p>";
      var nevent = "<blockquote>\""+equot+" \"("+eauth+", "+epage+")</blockquote>";
      //var nevent = "<p>"+epara+" ("+eauth+", "+epage+")</p>";
      var close = "</div>";
      if(keychange){
        x.append([open,intro,nevent, close]);
      }
      else{
        x.append([intro,nevent])
      }
    }
  makeMenu($("#menu"));
  });
}

function getBib(x,sheet)
{
  loadJSON(sheet, function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var eauth = e.gsx$author.$t;
      var ename = e.gsx$name.$t;
      var ebook = e.gsx$booktitle.$t;
      var eyear = e.gsx$year.$t;
      var epubl = e.gsx$publisher.$t;
      var edito = e.gsx$editor.$t;
      var ejour = e.gsx$journal.$t;
      var evolu = e.gsx$volume.$t;
      var enumb = e.gsx$number.$t;
      if (edito) {
        var editor = eauth+", "+ename+" in "+edito+" (Ed.) ";
      } else {
        var editor = eauth+", "+ename;
      }
      if (evolu) {
        var vol = " Vol. ";
      } else {
        var vol = "";
      }
      if (enumb) {
        var num = " No. ";
      } else {
        var num = "";
      }
      x.append("<p>"+editor+". <i>"+ebook+"</i>. "+eyear+". <i>"+ejour+"</i>"+vol+evolu+num+enumb+"</p>");
    }
  });
}