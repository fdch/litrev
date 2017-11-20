var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";
var https = "https://spreadsheets.google.com/feeds/list/";
var altjson = "/public/values?alt=json";
var w, h;
var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";
var titleData = "\
<header>\
<h1 onclick=\"location.href='"+ url + "'\">"+ title +"</h1>\
<h2 onclick=\"location.href='" + url + "'\">" + subtitle + "</h2>\
</header>";
var containers = "\
<div id=menu></div>\
<h3>Quotes</h3>\
<div id=content></div>\
<h3>Bibliography</h3>\
<div id=biblio></div>";
var keyword="blank";
var keychange=0;
var keywords=[];