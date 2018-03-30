$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  getBib($("#biblio"), bib);
  getLit($("#content"), lit);
  makeTests($("header"), navmenu);
});