var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";

var https = "https://spreadsheets.google.com/feeds/list/";
var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";
var altjson = "/public/values?alt=json";

var formhttps = "https://docs.google.com/forms/d/e/";
var formID = "1FAIpQLScijqg1IlmAWLsBgQ7jaUxEcCPUQqZroXG-9ZxXV4BvOKzbKg";

var formURL = formhttps+formID+"/viewform";

var lit 		= https + spreadsheetID + "1" + altjson;
var currentForm = https + spreadsheetID + "2" + altjson;
var bib 		= https + spreadsheetID + "3" + altjson;
var keys 		= https + spreadsheetID + "4" + altjson;
var fil 		= https + spreadsheetID + "5" + altjson;

var sections = [
	'menu', 'content', 'biblio', 
	"Menu", "Quotes", "Bibliography"
];

var updateParaphrases = "\
https://script.google.com/macros/s/\
AKfycbwkysTS68G1h9qx_YCJ98pQsG3ietAkS-BOaNfp6W4tVxQrQBlu\
/exec";

var formResponse = "1FAIpQLSdJiLSpbJxsObKJOk0CcM_xTMfMSstLCv2kIDuJXLOh_CKC_Q";
var formAction= formhttps+formResponse+"/formResponse";

var formNames = [
	"entry.176426125",
	"entry.1679910861",
	"entry.619862762",
	"entry.1644345852"
];

var headTag,mainTag,hstuff=[];
var booktitles=[],fullquotes=[],alleqID=[];
var sliders=[],slidersVals=[],slidersID=[],filQuoteID=[],remainQuotes=[];
var allFormObjects={};
var sliDiv = element('div', '', 'sliDiv');
var cForm, num;

var quoteTimeout=5000;
var maxQuery=10;