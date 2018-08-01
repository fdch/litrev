var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";

var https = "https://spreadsheets.google.com/feeds/list/";
var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";
var altjson = "/public/values?alt=json";

var formhttps = "https://docs.google.com/forms/d/e/";
var formW = "1FAIpQLSeYVfH2-GpPXjdQc5wtf1tWBV3JV3idptzmgem4YuXwZEdLBQ";
var formID = "1FAIpQLScijqg1IlmAWLsBgQ7jaUxEcCPUQqZroXG-9ZxXV4BvOKzbKg";

var formURL = formhttps+formID+"/viewform";
var formWurl = formhttps+formW+"/viewform";

var lit = https + spreadsheetID + "1" + altjson;
var bib = https + spreadsheetID + "3" + altjson;

var keyword="blank", keychange=0;
var keywords=[],booktitles=[],fullquotes=[];

var sections = [
	'menu', 'content', 'biblio', 
	"Menu", "Quotes", "Bibliography"
];