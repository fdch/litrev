var keyword="blank";
var keychange=0;
var keywords=[];

function linkify(x)
{
  return(x.replace(/ /g,"_").toLowerCase());
}

function makeHref(x)
{
  return("<a href=\"#"+x.replace(/ /g,"_").toLowerCase()+"\">"+x+" </a>");
}

function makeMenu(x)
{
  x.append("<nav><ul>");
  for (var k in keywords)
  {
    x.append("<li>"+makeHref(keywords[k])+"</li>");
  }
  x.append("</ul></nav>");
}

function loadJSON(x,callback)
{
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