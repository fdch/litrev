var keyword="blank";
var keychange=0;
var keywords=[];
var booktitles=[];
var fullquotes=[];
var backbut= "<a href=\"#menu\" alt=\"back to menu\">&#8679</a>";
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
      x.append("<p id=eID"+i+"><span>["+i+"] </span>"+quote+"</p>");
      fullquotes.push(quote);
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
      var epage = e.gsx$page.$t;
      var eauth = e.gsx$author.$t;
      var equot = e.gsx$quickquote.$t;
      var epara = e.gsx$paraphrase.$t;
      var eID = jQuery.inArray( ebook, booktitles );
      var quoteref = fullquotes(eID)+" (p. "+epage+") <a href=\"#eID"+eID+"\" title=\""+ebook+". "+eauth+".\">["+eID+"]</a>";
      var open = "<div id=\""+linkify(ekeyw)+"\"><h4>"+ekeyw+" "+backbut+"</h4>";
      var intro = "<p>"+epara+"</p>";
      var nevent = "<blockquote>\""+equot+" \""+quoteref+"</blockquote>";
      var close = "</div>";
      if (keychange) x.append([open,intro,nevent, close]);
      else           x.append([intro,nevent])
    }
  makeMenu($("#menu"));
  });
}

