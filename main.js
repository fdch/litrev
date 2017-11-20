$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  getLit($("#content"),https + spreadsheetID + "1" + altjson);
  getBib($("#biblio"),https + spreadsheetID + "2" + altjson);
});