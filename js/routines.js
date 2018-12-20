/*

  LITREV ROUTINES FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)


*/
///////////////////////////////////////////////////////////////////////////////
//  HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
function isLetter(str) {
 return str.length === 1 && str.match(/[a-z]/i);
}
function makeID(x){
  return x.replace(/ /g,'_').toLowerCase().slice(0,7);
}
function pdRandom(range,offset){
  offset = offset || 0;
  return Math.floor(Math.random() * range) + offset;
}
function comp(first,second) {
  var a = first, b = second;
  if (a === undefined || a === null) return 1;
  if (b === undefined || b === null) return 1;
  return a.localeCompare(b,'en', {
    sensitivity: 'base', usage: 'search', ignorePunctuation: 'true'
  });
}
function removeChilds(x) {
  while (x.firstChild) {
      x.removeChild(x.firstChild);
  } 
  if(!x.firstChild) return 1;
}
function selectText(x) {
    var containerid = x.id;
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}
///////////////////////////////////////////////////////////////////////////////
//  XMLHTTPREQUEST INTO JSON
///////////////////////////////////////////////////////////////////////////////
function loadJSON(theUrl,method,callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open(method, theUrl, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}
///////////////////////////////////////////////////////////////////////////////
//  REMOVE UNWANTED HTML CHARS
///////////////////////////////////////////////////////////////////////////////
function purgeHTML(string) {
 //  Trim the string for unwanted HTML chars
  var s = string.replace(/(<([^>]+)>)/ig,"");
  var s = s.replace(/[^a-z]/,"");
  // t=s.replace(/<|\>|\[|\]|\'|\"|\/|[ ]b[ ]/g,'');
  // u=t.replace(/\(|\)|\{|\}|[0-9]|[00-99]|[000-999]/g,'');
  // v=u.replace(/[ ]i[ ]|[ ]ul[ ]|[ ]li[ ]|[ ]ul[ ]|\,|\./g,'');
  // return v;
  return s;
}
///////////////////////////////////////////////////////////////////////////////
//  WORD FREQUENCY
///////////////////////////////////////////////////////////////////////////////
function wordFreq(x) {
    var words = x;
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}
///////////////////////////////////////////////////////////////////////////////
//  HTML ELEMENT TAGS
///////////////////////////////////////////////////////////////////////////////
function anchor(link,text,target,title){
  let tag = document.createElement('a');
  let ti;
  if (!title) ti = link.length>44?link.slice(0, 44)+ " ...":link;
  else ti = title;

  tag.setAttribute('href',link);
  tag.setAttribute('title' ,ti);
  tag.setAttribute('rel', 'nofollow');
  tag.setAttribute('target', target?target:"_top");

  tag.appendChild(document.createTextNode(text?text:''));

  return tag;
}
function element(tag,text,id,onclick,width) {
  let elem = document.createElement(tag);
  let node = document.createTextNode(text?text:'');
  elem.setAttribute('id',id?id:'');
  elem.setAttribute('onclick',onclick?onclick:'');
  // elem.setAttribute('width',width?width:'inherit');
  elem.setAttribute('style',"width:"+(width?width+"px;":'inherit;'));
  elem.appendChild(node);
  return elem;
}
function makeDropdown(id,target,list, onchange,label) {
  var thelist = list;
  if (label) {
    let labelTag = document.createElement('label');
    labelTag.setAttribute('for',id);
    let labelText = document.createTextNode(id+": ");
    labelTag.appendChild(labelText);
    target.appendChild(labelTag);
  }
  let selectTag = document.createElement('select');
  selectTag.setAttribute('id',id);
  selectTag.setAttribute('name',id);
  selectTag.setAttribute('onchange', onchange);
  if(thelist.length){
    for (let i in thelist) {
      let val = thelist[i];
      let elemTxt = document.createTextNode(val);
      let elemTag = document.createElement('option');
      elemTag.setAttribute('value', val);
      elemTag.appendChild(elemTxt);
      selectTag.appendChild(elemTag);
    }
    target.appendChild(selectTag);
    return selectTag;
  } else {
    console.error({thelist});
    return 0;
  }
}
function makeInput(target,tag,obj) {
  // console.log(tgt);
  var t = document.createElement(tag);
  for (var key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(!key.localeCompare('label') && obj[key]) {
        let lt = document.createTextNode( obj[key] );
        let l = document.createElement('label');
        l.appendChild(lt);
        l.setAttribute("for",obj[key]);
        if(target) target.appendChild(l);        
      }
      else if (!key.localeCompare('text') && obj[key]) {
        let txt = document.createTextNode( obj[key] );
        //let l = document.createElement('label');
        //l.appendChild(lt);
        //l.setAttribute("for",obj[key]);
        t.appendChild(txt); 
      }
      else {
        t.setAttribute(key, obj[key]);
      }
      // console.log (key+": "+obj[key]); 
    }
  }
  if(target) target.appendChild(t);
  return t;
}
///////////////////////////////////////////////////////////////////////////////
//  PAGE DIMENSIONS
///////////////////////////////////////////////////////////////////////////////
function width(){
   return window.innerWidth 
       || document.documentElement.clientWidth 
       || document.body.clientWidth 
       || 0;
}
function height(){
   return window.innerHeight 
       || document.documentElement.clientHeight 
       || document.body.clientHeight 
       || 0;
}
function articleWidth(maxW){
  var pw  = width();
  if (pw >= maxW) {return maxW;} else {return pw;}
}
function resized(){
  w = width();
  h = height();
}
///////////////////////////////////////////////////////////////////////////////
//  GET BIBLIOGRAPHY
///////////////////////////////////////////////////////////////////////////////
function getBib(callback) {
  loadJSON(bib,"GET", function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    if (entry.length) {
      for (var i in entry) {
        var e     = entry[i];
        var ebook = e.gsx$title.$t;
        booktitles.push(ebook);
        fullquotes[i] = { 
          "author"      : { "name"      : e.gsx$firstname.$t,
                            "lastname"  : e.gsx$lastname.$t},
          "secondauthor": { "name"      : e.gsx$secondfirstname.$t,
                            "lastname"  : e.gsx$secondlastname.$t},
          "title"       : ebook,
          "year"        : e.gsx$year.$t,
          "editor"      : e.gsx$editor.$t,
          "publisher"   : e.gsx$publisher.$t,
          "journal"     : e.gsx$journal.$t,
          "volume"      : e.gsx$volume.$t,
          "number"      : e.gsx$number.$t,
          "type"      : e.gsx$type.$t
        }
      }
    }
    callback();
    return booktitles.length?0:console.error({booktitles}),1;
  });
}
function displayBib(elementID) {
  var eid = elementID;
  console.log("| Displaying Bibliography in \'"+eid+"\'");
  consoleLine();
  for (var key in fullquotes) {
    // console.log(key);
    // console.log(fullquotes[key]);

    var name      = fullquotes[key]["author"]["name"];
    var last      = fullquotes[key]["author"]["lastname"];
    var sname     = fullquotes[key]["secondauthor"]["name"];
    var slast     = fullquotes[key]["secondauthor"]["lastname"];
    var title     = fullquotes[key]["title"];
    var year      = fullquotes[key]["year"];
    var editor    = fullquotes[key]["editor"];
    var publisher = fullquotes[key]["publisher"];
    var journal   = fullquotes[key]["journal"];
    var volume    = fullquotes[key]["volume"];
    var number    = fullquotes[key]["number"];
    var id        = (last.slice(0,3)+year.slice(2)).replace(/ /g,'');

    if (!last.localeCompare("zzzzzz")) continue;

    var fullbib = "";

    if  (id)        fullbib+="\\bibitem{"+id+"} ";
    if  (name)      fullbib+=name.slice(0,1)+". "+last;
    if  (sname)     fullbib+=", "+sname.slice(0,1)+". "+slast;
    if  (title)     fullbib+=", \\emph{"+title+"}, ";
    if  (editor)    fullbib+="in "+editor+" (Ed.) ";
    if  (publisher) fullbib+=publisher+", ";
    if  (journal)   fullbib+="in "+journal+", ";
    if  (volume)    fullbib+="Vol. "+volume+", ";
    if  (number)    fullbib+="Num. "+number+", ";
    if  (year)      fullbib+=year+".";

    // if (!fullbib.localeCompare("")) {
    // console.log(fullbib);
    document.getElementById(eid).appendChild(element('p',fullbib,id.replace(/:/,'')));
    // }
  }
}

function getFilledQuotesID(callback) {
  loadJSON(fil, "GET", function(response) { 
    // Get all quoteIDS from filled out sheet and make
    // an array of DATE objects to account for the
    // unwanted quotes, because they are already filled out.
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      var quotid = e.gsx$quoteid.$t;
      filQuoteID.push(quotid);
      // console.log('length:  '+filQuoteID.length);
      // console.log('lastitem:'+filQuoteID[filQuoteID.length-1]);
    }
    //Post the array to console to check
    // console.log(filQuoteID);
  });
  callback();
}

function filterQuotes(callback){
  remainQuotes = alleqID.filter(f => !filQuoteID.includes(f));
  
  callback(function(){remainQuotes.sort( function(a,b) {
    return (new Date(a)).getTime() - (new Date(b)).getTime();
  });});
}


function filliKeys(callback) {
  loadJSON(keys, "GET", function(response)  { 
  var f  =  JSON.parse(response);
  var entry = f.feed.entry;
  for (var i in entry) {
    var e = entry[i];
    var k = (e.gsx$keywords.$t).replace(/ /g,'_').toLowerCase();
    iKey[i]=k;
  }
  });
  callback();
}

function fillSections(e,callback) {
  var section,entry=e;
  ///////////////////////////////////////////////////////////////////////////
  //  BEGIN ENTRY LOOP
  ///////////////////////////////////////////////////////////////////////////
  for (var i in entry) {
    var e = entry[i];
    var estam   = e.gsx$timestamp.$t;
    var ekeyw   = e.gsx$keyword.$t;
    var ek      = ekeyw.replace(/ /g,"_").toLowerCase();
    var eauth   = e.gsx$author.$t;
    var thequote= e.gsx$quickquote.$t;
    var paraphra= e.gsx$paraphrase.$t;
    var btitl   = e.gsx$booktitle.$t;
    var page    = e.gsx$page.$t;
    var id      = (eauth.slice(0,3)+(e.gsx$year.$t).slice(2)+":"+btitl.slice(0,3)).replace(/ /g,'');

    //  If object does not have the key, create it
    if (!(ek in allSections)) allSections[ek]={};
      
    //  If object does not have the key, create it
    if (!(id in allSections[ek])) allSections[ek][id]=[];

    allSections[ek][id].push([paraphra,thequote,page,estam]);
    
  }
  ///////////////////////////////////////////////////////////////////////////
  //  END ENTRY LOOP
  ///////////////////////////////////////////////////////////////////////////
  callback();
}

///////////////////////////////////////////////////////////////////////////////
//  GET LITERATURE REVIEW
///////////////////////////////////////////////////////////////////////////////
function getLitRev(callback) {
  loadJSON(lit, "GET", function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    fillSections(entry,callback);
  });
}

function sauth(s,a) {
  if (s && a) 
    return " and "+s+" {"+a+"}";
  else
    return "";
}


function makeBibTex(elementID) {
  var eid = elementID;
  console.log("| Making BibTex in \'"+eid+"\'");
  consoleLine();
  for (var key in fullquotes) {
    // console.log(key);
    // console.log(fullquotes[key]);

    var name      = fullquotes[key]["author"]["name"];
    var last      = fullquotes[key]["author"]["lastname"];
    var sname     = fullquotes[key]["secondauthor"]["name"];
    var slast     = fullquotes[key]["secondauthor"]["lastname"];
    var title     = fullquotes[key]["title"];
    var year      = fullquotes[key]["year"];
    var editor    = fullquotes[key]["editor"];
    var publisher = fullquotes[key]["publisher"];
    var journal   = fullquotes[key]["journal"];
    var volume    = fullquotes[key]["volume"];
    var number    = fullquotes[key]["number"];
    var type      = fullquotes[key]["type"];
    var id        = (last.slice(0,3)+year.slice(2)+":"+title.slice(0,3)).replace(/ /,'');

    if (!last.localeCompare("zzzzzz")) continue;

    switch(type) {
      case "article":
        bibquote="\
        @Article{"+id+",\
         author= \""+name+" {"+last+"} "+sauth(sname,slast)+"\",\
         title = \""+title+"\",\
         journal = \""+journal+"\",\
         year  = \""+year+"\",\
         publisher = \""+publisher+"\",\
         volume = \""+volume+"\",\
         number = \""+number+"\"\
        }\
        ";
        break;
      case "inbook":
      case "incollection":
        bibquote="\
        @Article{"+id+",\
         author= \""+name+" {"+last+"} "+sauth(sname,slast)+"\",\
         title = \""+title+"\",\
         journal = \""+journal+"\",\
         publisher = \""+publisher+"\",\
         year  = \""+year+"\"\
        }\
        ";
        break;
      case "phdthesis":
        bibquote="\
        @phdthesis{"+id+",\
         author= \""+name+" {"+last+"} "+sauth(sname,slast)+"\",\
         title = \""+title+"\",\
         publisher = \""+publisher+"\",\
         year  = \""+year+"\"\
        }\
        ";
        break;
      case "inproceedings":
      case "unpublished":
      case "manual":
      default:
        bibquote="\
        @Book{"+id+",\
         author= \""+name+" {"+last+"} "+sauth(sname,slast)+"\",\
         title = \""+title+"\",\
         publisher = \""+publisher+"\",\
         year  = \""+year+"\"\
        }\
        ";
    } 
    // if (!fullbib.localeCompare("")) {
    // console.log(fullbib);
    document.getElementById(eid).appendChild(element('p',bibquote,id.replace(/:/,'')));
    // }
  }
}


///////////////////////////////////////////////////////////////////////////////
//  CONSOLE LOGGING
///////////////////////////////////////////////////////////////////////////////
function consoleLine() {
  console.log("|-----------------------------------------------|");
}
function welcome() {
  consoleLine();
  console.log("| "+title+"                             |");
  consoleLine();
  console.log("| "+subtitle+" |");
  consoleLine();
  console.log("| quoteTimeout  : "+quoteTimeout/1000+" seconds");
  console.log("| maxQuery      : "+maxQuery         +" words");
  console.log("| confidence    : "+confidence       +" %");
}
/*


  END ROUTINES FILE


*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
