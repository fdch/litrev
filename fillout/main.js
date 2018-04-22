$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append(containers);
  getBib($("#biblio"), bib);
  getLit($("#content"), lit, currentForm, keys);
});