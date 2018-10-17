function removeChilds(x) {
  while (x.firstChild) {
      x.removeChild(x.firstChild);
  } 
  if(!x.firstChild) return 1
}

function makeID(x){
  return x.replace(/ /g,'_').toLowerCase().slice(0,7);
}

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

function pdRandom(range,offset){
  offset = offset || 0;
  return Math.floor(Math.random() * range) + offset;
}

function getUniqueCategories(x){
  var cats = new Array();
  for (var i in x){
    let st = new String(x[i]);
    cats.push(st.replace(/\W/g,' '));
  }
  return unique(unique(cats));
}

function unique(array) {
    return $.grep(array, function(el, index) {
        return index == $.inArray(el, array);
    });
}
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
function img(src,width,titl,id) {
  let tag = document.createElement('img');
  let div = document.createElement('div');
  let anc = anchor(src);
  if (id)    tag.setAttribute('id',id);
  if (src)   tag.setAttribute('src', src);
  if (width) tag.setAttribute('width', width);
  if (titl)  tag.setAttribute('title', titl);
  div.setAttribute('style',"width:inherit;overflow:hidden;border-radius:15px;");
  anc.appendChild(tag);
  div.appendChild(anc);
  return div;      
}
function makeDropdown(id,target,list, onchange,label) {
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

  var thelist = list.sort();
  
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

function getBib() {
    loadJSON(bib,"GET", function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;

    for (var i in entry)
    {
      var e = entry[i];
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

      var quote = new Array();

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

function stats(x) {
  let val = x.value;
  let ind = x.id;
  let i = slidersID.indexOf(ind);
  slidersVals[i]=val;
  // console.log("Change Value of "+ind+" at ["+i+"] to: "+val);
  let sv = slidersVals.join(' ');
  document.getElementById(formNames[2]).value = sv;
  // console.log(sv)
};
function isLetter(str) {
 return str.length === 1 && str.match(/[a-z]/i);
}
// function tagText(postData) {
//   var url = "https://text-processing.com/api/tag/";
//   var method = "POST";
//   // var postData = "Some data";

//   // You REALLY want shouldBeAsync = true.
//   // Otherwise, it'll block ALL execution waiting for server response.
//   var shouldBeAsync = true;

//   var request = new XMLHttpRequest();

//   // Before we send anything, we first have to say what we will do when the
//   // server responds. This seems backwards (say how we'll respond before we send
//   // the request? huh?), but that's how Javascript works.
//   // This function attached to the XMLHttpRequest "onload" property specifies how
//   // the HTTP response will be handled. 
//   request.onload = function () {

//      // Because of javascript's fabulous closure concept, the XMLHttpRequest "request"
//      // object declared above is available in this function even though this function
//      // executes long after the request is sent and long after this function is
//      // instantiated. This fact is CRUCIAL to the workings of XHR in ordinary
//      // applications.

//      // You can get all kinds of information about the HTTP response.
//      var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
//      var data = request.responseText; // Returned data, e.g., an HTML document.
//      if (status==200) {
//       console.log(data);
//      }
//   }

//   request.open(method, url, shouldBeAsync);

//   request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   // Or... request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//   // Or... whatever

//   // Actually sends the request to the server.
//   request.send(postData);
// }