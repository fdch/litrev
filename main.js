$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  var keywords=[];
  getLit($("#content"), lit);
  getBib($("#biblio"), bib);
});