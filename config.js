var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";
var https = "https://spreadsheets.google.com/feeds/list/";
var altjson = "/public/values?alt=json";
var w, h;
var navmenu = ["tests",""];
var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";
var formID = "1FAIpQLScijqg1IlmAWLsBgQ7jaUxEcCPUQqZroXG-9ZxXV4BvOKzbKg";
var formURL = "https://docs.google.com/forms/d/e/"+formID+"/viewform";
var titleData = "\
<header>\
<h1 onclick=\"location.href='"+ url + "'\">"+ title +"</h1>\
<h2 onclick=\"location.href='" + url + "'\">" + subtitle + "</h2>\
<h3>Go to live form <a href=\""+formURL+"\">here</a></h3>\
<nav>\
<a href=\""+navmenu[0]+"\">"+navmenu[0]+"</a>\
</nav>\
</header>";
var containers = "\
<div id=menu></div>\
<h3>Quotes</h3>\
<div id=content></div>\
<h3>Bibliography</h3>\
<div id=biblio></div>";
var lit = https + spreadsheetID + "2" + altjson;
var bib = https + spreadsheetID + "3" + altjson;