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
function comp(a,b) {
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
  var s = string,t,u,v;
  t=s.replace(/<|\>|\[|\]|\'|\"|\/|[ ]b[ ]/g,'');
  u=t.replace(/\(|\)|\{|\}|[0-9]|[00-99]|[000-999]/g,'');
  v=u.replace(/[ ]i[ ]|[ ]ul[ ]|[ ]li[ ]|[ ]ul[ ]|\,|\./g,'');
  return v;
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
function getBib() {
    loadJSON(bib,"GET", function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;

    for (var i in entry)
    {
      var e     = entry[i];
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

      var quote = [];

      var eidnice = "["+i+"]";

      quote.push(eidnice," ", eauth,", ",ename);

      if(eslas) quote.push(", & ", eslas,", ", esfir);
      
      quote.push(". ",ebook,". ");

      if (edito) {
        quote.push(", in ",ejour,". ",edito," (Ed.) ");
        if (evolu) quote.push("Vol. ", evolu);
        if (enumb) quote.push("No. ", enumb);
      }
      
      quote.push(eyear,". ", epubl, ".");

      booktitles.push(ebook);
      fullquotes.push(quote.join(''));
    }
    return booktitles.length?0:consoleLog(booktitles.length),1;
  });
}
///////////////////////////////////////////////////////////////////////////////
//  CONSOLE LOGGING
///////////////////////////////////////////////////////////////////////////////
consoleLog = function(msg) {//See https://stackoverflow.com/a/27074218/470749
    var e = new Error();
    if (!e.stack)
        try {
            // IE requires the Error to actually be thrown or else the 
            // Error's 'stack' property is undefined.
            throw e;
        } catch (e) {
            if (!e.stack) {
                //return 0; // IE < 10, likely
            }
        }
    var stack = e.stack.toString().split(/\r\n|\n/);
    if (msg === '') {
        msg = '""';
    }
    console.log(msg, '          [' + stack[1] + ']');
}
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
