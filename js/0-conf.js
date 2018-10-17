/*

	LITREV CONFIGURATION FILE

	
	THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
	FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


	FEDE CAMARA HALAC (FDCH)
*/


///////////////////////////////////////////////////////////////////////////////
//	EDITABLE STUFF
///////////////////////////////////////////////////////////////////////////////


/*

	Timeout in milliseconds to prevent incorrect loading

*/

var quoteTimeout 	=	5000;

/*

	This is the upper limit of the Datamuse Query.
	A random number from 0-maxQuery is selected 
	out of the pool of maxQuery words obtained from the request.

*/

var maxQuery 		=	10;

/*


	GLOBAL VARIABLES THAT YOU WILL PROBABLY NEVER EDIT


*/
///////////////////////////////////////////////////////////////////////////////
//	WEBSITE DATA
///////////////////////////////////////////////////////////////////////////////
var url			= "https://fdch.github.io/litrev";
var repo		= "https://github.com/fdch/litrev";
var email		= "fch226@nyu.edu";
var title		= "Literature Review";
var subtitle	= "Towards The Holy Mountain of the Dissertation";
///////////////////////////////////////////////////////////////////////////////
//	SHEET DATA
///////////////////////////////////////////////////////////////////////////////
//	The sheet ID where all data is stored
var ssID = "1tMkdssQlN_wbGS1SjfORS7AOBspKvvun7_AvzxctMrE/";
//	Sheet address paraphernalia
var https 		= "https://spreadsheets.google.com/feeds/list/";
var altjson 	= "/public/values?alt=json";
//	The full URL for all Sheet Tabs (on the main sheet)
var lit 		= https + ssID + "1" + altjson;
var currentForm = https + ssID + "2" + altjson;
var bib 		= https + ssID + "3" + altjson;
var keys 		= https + ssID + "4" + altjson;
var fil 		= https + ssID + "5" + altjson;
///////////////////////////////////////////////////////////////////////////////
//	FORM DATA
///////////////////////////////////////////////////////////////////////////////
//	The form ID to input quotes, and the form ID to make the formAction
var formID 		= "1FAIpQLScijqg1IlmAWLsBgQ7jaUxEcCPUQqZroXG-9ZxXV4BvOKzbKg";
var formRe 		= "1FAIpQLSdJiLSpbJxsObKJOk0CcM_xTMfMSstLCv2kIDuJXLOh_CKC_Q";
//	Form address paraphernalia
var formhttps 	= "https://docs.google.com/forms/d/e/";
//	The full URL for both Forms
var formURL 	= formhttps	+ formID + "/viewform";
var formAction	= formhttps	+ formRe + "/formResponse";
//	These are the fields on the formAction form to Submit a Fillout
var formNames 	= [ "entry.176426125" ,
					"entry.1679910861",
					"entry.619862762" ,
					"entry.1644345852"];
///////////////////////////////////////////////////////////////////////////////
//	GLOBAL HTML ELEMENT TAGS
///////////////////////////////////////////////////////////////////////////////
var headTag				,	//	<header>
	mainTag				,	//	<main>
	hstuff 			= [];	//	the stuff that goes in the header
///////////////////////////////////////////////////////////////////////////////
//	DATA OBJECTS
///////////////////////////////////////////////////////////////////////////////
var booktitles		= [],	//	getBib book title
	fullquotes 		= [],	//	getBib book author
	sliders    		= [],	//	array for sliders
	slidersVals		= [],	//	keep all values of sliders
	slidersID  		= [],	//	keep all ids of sliders
	alleqID    		= [],	//	all Unique Timestamp ID of quotes
	filQuoteID 		= [],	//	all Filled Quotes Timestamps
	remainQuotes	= [],	//	The remaining, unfilled quotes
	allFormObjects	= {};	//	All Form Objects (id, form, author, etc)	
var cForm, num, sliDiv;
var dMuse 			= "https://api.datamuse.com/words?ml=";