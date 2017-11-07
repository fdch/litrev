var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";
var logoimage = ["img/logo", 200, 200];
var meta = "";
var w,h;

var titleData = "<h1 onclick=\"location.href='"+ url + "'\">"+ title +"</h1><h2 onclick=\"location.href='" + url + "'\">" + subtitle + "</h2><div id=menu></div><div id=content></div>";

function replaceContent(x) {
  document.getElementById('content').innerHTML = x;
}

//https://spreadsheets.google.com/feeds/list/1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/1/public/values?alt=json
//
 var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE";

 // Make sure it is public or set to Anyone with link can view 
 var eFormUrl = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";

//var eFormUrl = "https://sheets.googleapis.com/v4/spreadsheets/1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE?key=AIzaSyAVRpELjB1AatwXQ2wIhCkFqs2WyKzgixU"


function loadJSON(x,callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', x, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

function getLit(x) {
  replaceContent(x);
  //makeMenu($("#menuEvents"), eventMenu.length, eventMenu, "button");
  loadJSON(eFormUrl, function(response) {
    //$("body").append("<article></article>");
    //var today = new Date();
    //var eclass = "new";
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry) {
      var e = entry[i];
    //var estam = e.gsx$timestamp.$t;
      var ekeyw = e.gsx$keyword.$t;
      var ebook = e.gsx$booktitle.$t;
      var eauth = e.gsx$author.$t;
      var epage = e.gsx$page.$t;
      var equot = e.gsx$quickquote.$t;
      var nevent = "<h3>"+ekeyw+"</h3><p>"+equot+" ("+eauth+","+ebook+","+epage+")</p>";
      $("body").append(nevent);
    }
  });
}


$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  //Place elements
  //$("head").append(meta);
  $("body").append([titleData]);
  getLit($("body"));
  
});



