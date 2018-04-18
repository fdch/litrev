$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);

$( "#theform" ).submit( function(event)
{
    alert("you did something");
    event.preventDefault();

    
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
  getBib($("#biblio"), bib);
  getLit($("#content"), lit);
});