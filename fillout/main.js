$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  getBib($("#biblio"), bib);
  getLit($("#content"), lit);

$('#theform').submit(function(e){
    alert("you did something");
    e.preventDefault();
    // var x = $(this).closest('form').serializeObject();;
    // e.preventDefault();
    // var jqxhr = $.ajax({
    //   url: updateParaphrases,
    //   method: "GET",
    //   dataType: "json",
    //   data: x,

    //   success: function() { 
    //       alert("Posted this: "+ x)
    //   }
    // });
});
});