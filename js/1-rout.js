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
  var f = widthFactor;
  if (pw >= maxW) {return maxW*f;} else {return pw*f;}
}

function resized(){
  w = width();
  h = height();
}
function loadJSON(x,callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', x, true);
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
function anchor(link,text,target){
  let tag = document.createElement('a');

  tag.setAttribute('href',link);
  tag.setAttribute('alt' ,link.length>44?link.slice(0, 44)+ " ...":link);
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