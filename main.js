$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  var lit = https + spreadsheetID + "1" + altjson;
  var bib = https + spreadsheetID + "2" + altjson;
  getLit($("#content"), lit);
  getBib($("#biblio"), bib);
});