function linkify(x)
{
  return(x.replace(/ /g,"_").toLowerCase());
}

function makeHref(x)
{
  return("<a href=\"#"+linkify(x)+"\">"+x+" </a>");
}

function makeMenu(x)
{
  x.append("<nav><ul>");
  for (var k in keywords)
  {
    x.append("<li style=display:inline>"+makeHref(keywords[k])+" | </li>");
  }
  x.append("</ul></nav>");
}

function makeTests(x,y)
{
  x.append("<nav>");
  for (i in y)
  {
    x.append("<a href=\""+y[i]+"\">"+y[i]+"</a>");
  }
  x.append("</nav>");
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