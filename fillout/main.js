$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);

	function pushForm(e,x)
	{ 
	  var $form = $(e.target);
	  e.preventDefault();
	  var jqxhr = $.ajax({
	    url: updateParaphrases,
	    method: "GET",
	    dataType: "json",
	    data: $form.serializeObject(),

	    success: function() { 
	        alert("Pushed form "+x+" with object: "+ $form.serializeObject())
	    }
	  });
	}
  getBib($("#biblio"), bib);
  getLit($("#content"), lit);
});