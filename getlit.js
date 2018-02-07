var keyword="blank";
var keychange=0;
var keywords=[];
var booktitles=[];

function getBib(x,sheet)
{
  loadJSON(sheet, function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var eauth = e.gsx$lastname.$t;
      var ename = e.gsx$firstname.$t;
      var ebook = e.gsx$title.$t;
      var eyear = e.gsx$year.$t;
      var epubl = e.gsx$publisher.$t;
      var edito = e.gsx$editor.$t;
      var ejour = e.gsx$journal.$t;
      var evolu = e.gsx$volume.$t;
      var enumb = e.gsx$number.$t;
      var eslas = e.gsx$secondlastname.$t;
      var esfir = e.gsx$secondfirstname.$t;
      var quote = eauth+", ";
      quote += ename+". ";
      quote += "<i>"+ebook+"</i>.";
      if (edito) {
        quote += ", in ";
        quote += "<i>"+ejour+"</i>. ";
        quote += edito+" (Ed.) ";
        if (evolu) quote += " Vol. "+evolu;
        if (enumb) quote += " No. "+enumb;
      }
      quote += " "+eyear+". ";
      quote += epubl+". ";
      booktitles.push(ebook);
      x.append("<p id=eID"+i+"><span>["+i+"]</span>"+quote+"</p>");
    }
  });
}

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
      } else keychange=0;
      var ebook = e.gsx$booktitle.$t;
      //var eauth = e.gsx$author.$t;
      var epage = e.gsx$page.$t;
      var equot = e.gsx$quickquote.$t;
      var epara = e.gsx$paraphrase.$t;
      //var eyear = e.gsx$year.$t;
    //var nevent = "<h3>"+ekeyw+"</h3><p>"+equot+" ("+eauth+","+ebook+","+epage+")</p>";
      //var quoteref = "("+eauth+" "+eyear+":"+epage+")";
      for (var eID in booktitles.length) {
        if (ebook.localeCompare(booktitles[eID])) {
          var quoteref = "<a href=\"#eID"+eID+"\">["+eID+"]</a>";
          break;
        } else {
          eID++;
          continue;
      }
      }

      var quoteref;
      var open = "<div id=\""+linkify(ekeyw)+"\"><h4>"+ekeyw+"</h4>";
      var intro = "<p>"+epara+"</p>";
      var nevent = "<blockquote>\""+equot+" \""+quoteref+"</blockquote>";
      //var nevent = "<p>"+epara+" ("+eauth+", "+epage+")</p>";
      var close = "</div>";
      if (keychange) x.append([open,intro,nevent, close]);
      else           x.append([intro,nevent])
    }
  makeMenu($("#menu"));
  });
}

