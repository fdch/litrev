$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  getBib($("#biblio"), bib);
  var currentFormNumber = getCurrentNum(currentForm);
  alert("current form number: " +currentFormNumber);
  getLit($("#content"), lit, currentFormNumber);
});