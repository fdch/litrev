var url = "https://fdch.github.io/litrev";
var repo = "https://github.com/fdch/litrev";
var email = "fch226@nyu.edu";
var title = "Literature Review";
var subtitle = "Towards The Holy Mountain of the Dissertation";
var logoimage = ["img/logo", 200, 200];
var meta = "";
var w,h;

var titleData = "<h1 onclick=\"location.href='"+ url + "'\">"+ title +"</h1><h2 onclick=\"location.href='" + url + "'\">" + subtitle + "</h2><div id=logo><img src='" + logoimage[0] + "' width="+ logoimage[1] +" height="+ logoimage[2] +"/></div><div id=menu></div><div id=content></div>";

function replaceContent(x) {
  document.getElementById('content').innerHTML = x;
}

function getLit(x) {
  replaceContent(x);
  //makeMenu($("#menuEvents"), eventMenu.length, eventMenu, "button");
  eFormUrl = "https://spreadsheets.google.com/feeds/list/1jMniwPCuLlYMUC9INNGqcOV9HFXJ8y6LjYZpEWLxtTM/o1nbw6e/public/values?alt=json";
  
  loadJSON(eFormUrl, function(response) {
    $("#loadEvents").append("<article></article>");
    var today = new Date();
    var eclass = "new";
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry) {
      var e = entry[i];
      var estam = e.gsx$timestamp.$t;
      var edate = new Date(e.gsx$dateandtime.$t);
      var etime = edate.toTimeString();
      var etitl = e.gsx$title.$t;
      var eauth = e.gsx$author.$t;
      var edesc = e.gsx$description.$t;
      var eloca = e.gsx$location.$t;
      var eiurl = e.gsx$imageurl.$t;
      if (today.getTime() > edate.getTime()) {
        eclass = "old";
      } else {
        eclass = "new";
      }
      var nevent = "<div class="+eclass+">\
  <h2>"+etitl+"</h2>\
  <h3>"+eauth+"</h3>\
  <h4>"+edate.toDateString()+"</h4>\
  <a href=\""+eiurl+"\"><img width="+w+" src=\""+eiurl+"\" title=\""+eauth+"\"/></a>\
  <p>"+edesc+"</p>\
  <h5>"+eloca+"</h5>\
  <h6>"+etime+"</h6>\
  <span>Event created on: "+estam+"</>\
  </div>";
      $("#loadEvents article").prepend(nevent);
    }
  });
}


$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  //Place elements
  //$("head").append(meta);
  $("body").append([titleData]);
  getLit($("body"));
  
});



