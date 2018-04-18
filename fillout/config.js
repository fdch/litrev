var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";
var https = "https://spreadsheets.google.com/feeds/list/";
var altjson = "/public/values?alt=json";
var w, h;
var updateParaphrases = "https://script.google.com/macros/s/AKfycbwkysTS68G1h9qx_YCJ98pQsG3ietAkS-BOaNfp6W4tVxQrQBlu/exec";
var navmenu = ["tests","tests2"];
var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";
var formID = "1FAIpQLScijqg1IlmAWLsBgQ7jaUxEcCPUQqZroXG-9ZxXV4BvOKzbKg";
var formURL = "https://docs.google.com/forms/d/e/"+formID+"/viewform";
var formAction= "https://docs.google.com/forms/d/e/1FAIpQLSdJiLSpbJxsObKJOk0CcM_xTMfMSstLCv2kIDuJXLOh_CKC_Q/formResponse";
var formNames = ["entry.176426125","entry.1679910861"];
var titleData = "\
<header>\
<h1 onclick=\"location.href='"+ url + "'\">"+ title +"</h1>\
<h2 onclick=\"location.href='" + url + "'\">" + subtitle + "</h2>\
<h3>Go to live form <a href=\""+formURL+"\">here</a><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSeYVfH2-GpPXjdQc5wtf1tWBV3JV3idptzmgem4YuXwZEdLBQ/viewform\"> .</a></h3>\
</header>";
var containers = "\
<div id=menu></div>\
<div id=content></div>";
var lit = https + spreadsheetID + "1" + altjson;
var bib = https + spreadsheetID + "3" + altjson;
var currentForm = https + spreadsheetID + "2" + altjson;