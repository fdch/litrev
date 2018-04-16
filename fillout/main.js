$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  getBib($("#biblio"), bib);
  getLit($("#content"), lit);
  //makeTests($("header"), navmenu);
  $(".forms").on('click', function(e) {
    e.preventDefault();
    var formID = $(this).attr(id)+"f";
    $(formID).submit(function( event ) {
  		alert( "Handler for .submit() called: " + formID );
  		event.preventDefault();
  		});
	});
    //var formSerialized = $(formID+"f").serializeObject();
    //alert("Excellent, you clicked: "+ formID);
  //});
});