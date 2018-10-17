///////////////////////////////////////////////////////////////////////////////
//	GLOBAL VARIABLES FOR ALL LITREV FILES
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
//	Main Website Data
///////////////////////////////////////////////////////////////////////////////
var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";



///////////////////////////////////////////////////////////////////////////////
//	SHEET DATA
///////////////////////////////////////////////////////////////////////////////

//	The sheet ID where all data is stored
var spreadsheetID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";

//	Sheet address paraphernalia
var https = "https://spreadsheets.google.com/feeds/list/";
var altjson = "/public/values?alt=json";

//	The full URL for all Sheet Tabs (on the main sheet)
var lit 		= https + spreadsheetID + "1" + altjson;
var currentForm = https + spreadsheetID + "2" + altjson;
var bib 		= https + spreadsheetID + "3" + altjson;
var keys 		= https + spreadsheetID + "4" + altjson;
var fil 		= https + spreadsheetID + "5" + altjson;

///////////////////////////////////////////////////////////////////////////////
//	FORM DATA
///////////////////////////////////////////////////////////////////////////////
//	The form ID to input quotes, and the form ID to make the formAction
var formID = "1FAIpQLScijqg1IlmAWLsBgQ7jaUxEcCPUQqZroXG-9ZxXV4BvOKzbKg";
var formResponse = "1FAIpQLSdJiLSpbJxsObKJOk0CcM_xTMfMSstLCv2kIDuJXLOh_CKC_Q";

//	Form address paraphernalia
var formhttps = "https://docs.google.com/forms/d/e/";

//	The full URL for both Forms
var formURL = formhttps+formID+"/viewform";
var formAction= formhttps+formResponse+"/formResponse";

//	These are the fields on the formAction form to Submit a Fillout
var formNames = [
	"entry.176426125",
	"entry.1679910861",
	"entry.619862762",
	"entry.1644345852"
];

///////////////////////////////////////////////////////////////////////////////
//	GLOBAL TAGS
///////////////////////////////////////////////////////////////////////////////

//	The <header>, <main>, and the stuff that goes in the header.
var headTag, 
	mainTag, 
	hstuff = [];

///////////////////////////////////////////////////////////////////////////////
//	OBJECTS
///////////////////////////////////////////////////////////////////////////////


var booktitles 			= [],	//	getBib book title
	fullquotes 			= [],	//	getBib book author
	sliders    			= [],	//	sliders
	slidersVals			= [],	//	
	slidersID  			= [],
	alleqID    			= [],
	filQuoteID 			= [],
	remainQuotes		= [],
	allFormObjects		= {};
	
var cForm, num, sliDiv;

//	Timeout to prevent incorrect loading
var quoteTimeout=5000;
// This is the upper limit of the Datamuse Query. A random number from 0-maxQuery
// is selected out of the pool of maxQuery words obtained from the request.
var maxQuery=10;










// var updateParaphrases = "\
// https://script.google.com/macros/s/\
// AKfycbwkysTS68G1h9qx_YCJ98pQsG3ietAkS-BOaNfp6W4tVxQrQBlu\
// /exec";



