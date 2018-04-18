var keyword="blank";
var keychange=0;
var keywords=[];
var booktitles=[];
var allForms=[];
var allBibs=[];
var alleID=[];
var backbut= "<a href=\"#menu\" alt=\"back to menu\">&#8679</a>";


function getBib(x,sheet)
{
  loadJSON(sheet, function(response)
  {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var eauth = e.gsx$lastname.$t;
      var ename = e.gsx$firstname.$t;
      var ebook = e.gsx$title.$t;
      var eyear = e.gsx$year.$t;
      var epubl = e.gsx$publisher.$t;
      var edito = e.gsx$editor.$t;
      var ejour = e.gsx$journal.$t;
      var evolu = e.gsx$volume.$t;
      var enumb = e.gsx$number.$t;
      var eslas = e.gsx$secondlastname.$t;
      var esfir = e.gsx$secondfirstname.$t;
      var quote = eauth+", ";
      quote += ename+". ";
      quote += "<i>"+ebook+"</i>.";
      if (edito) {
        quote += ", in ";
        quote += "<i>"+ejour+"</i>. ";
        quote += edito+" (Ed.) ";
        if (evolu) quote += " Vol. "+evolu;
        if (enumb) quote += " No. "+enumb;
      }
      quote += " "+eyear+". ";
      quote += epubl+". ";
      booktitles.push(ebook);
      allBibs.push("<p id=eID"+i+"><span>["+i+"] </span>"+quote+"</p>");
    }
  });
}

// function getFormData($form){
//     var unindexed_array = $form.serializeArray();
//     var indexed_array = {};

//     $.map(unindexed_array, function(n, i){
//         indexed_array[n['name']] = n['value'];
//     });

//     return indexed_array;
// }

/*

function pushForm(e,x){   

var obj = $(x).serializeObject();

var jqxhr = $.ajax({
    url: updateParaphrases,
    method: "GET",
    dataType: "json",
    data: obj
  }).success(
    alert("Pushed form "+x+" with object: "+obj)
  );

//alert("Pushed form "+x+" with object: "+obj);
///e.preventDefault();
//
}
*/






// function pushForm(e,x)
// { 
//   var formData = $(x).serializeArray();
//   e.preventDefault();
//   var jqxhr = $.ajax({
//     url: updateParaphrases,
//     method: "GET",
//     dataType: "json",
//     data: formData,

//     success: function() { 
//       alert(formData); 
//      }
//   });
// }
function getCurrentNum(sheet) {
  var num = 0;
  loadJSON(sheet, function(response) { 
    var f  =  JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry){
      var e = entry[i];
      num = e.gsx$currentnumber.$t;
    }
    return num;
  })
}



function getLit(x, sheet, current)
{
  loadJSON(sheet, function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];

      var ebook = e.gsx$booktitle.$t;
      var eauth = e.gsx$author.$t;
      var equot = e.gsx$quickquote.$t;
      var epara = e.gsx$paraphrase.$t;
      var eqid = e.gsx$id.$t;

      var eID = jQuery.inArray( ebook, booktitles );
      var ta_defs = "type=\"message\" rows=\"15\" cols=\"55\"";
      var quoteref = "<a href=\"#eID"+eID+"\" title=\""+ebook+". "+eauth+".\">["+eID+"]</a>";
      //var uniqueForm = "#eID"+eID+eqid;
      //var uniqueSubmit = "#eIDsubmit"+eID+eqid;
      var uniqueForm = "theform";
      var uniqueSubmit = "thesubmit";

      var form = "\
      <form id=\""+uniqueForm+"\" action=\""+formAction+"\">\
      <div>\
      <textarea name=\""+formNames[0]+"\" id=\"quoteLabel\" "+ta_defs+">"+equot+"\</textarea>\
      </div><div>\
      <textarea name=\""+formNames[1]+"\" id=\"paraphraseLabel\" "+ta_defs+" >"+epara+"</textarea>\
      </div><div>\
      <input type=\"submit\" id=\""+uniqueSubmit+"\"value=\"Submit\">\
      </div>\
      </form>";
      
      /*
      onclick=\"alert($(\'"+uniqueForm+"\').serialize());event.preventDefault();\"
      
      </div><div>\
      <input name=\"quoteIdName\" id=\"quoteID\" type=\"text\" cols=\"3\" rows=\"1\" value=\""+eqid+"\"/>\


      var formScript = "<script>\
$(\'"+uniqueForm+"\').submit(function(e){\
  var myObj = JSON.stringify($(\'"+uniqueForm+"\'));\
  e.preventDefault();\
  var jqxhr = $.ajax({\
    url: updateParaphrases,\
    method: \'GET\',\
    dataType: \'json\',\
    data: myObj,\
    success: function() { \
        alert(\'Pushed form "+uniqueForm+" with object: \'+ myObj)\
    }\
  });\
});</script>";
      */

      /*
 (source: "+quoteref+", id="+eqid+")

<form action="/action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 
      */
      //var nevent = "<blockquote>\""+equot+" \""+quoteref+"</blockquote>";
      //var close = "</div>";
     // if (keychange) x.append([open,form,close]);
      //else           x.append([form]);
      allForms.push(form);
      alleID.push(eID);
    }
  //makeMenu($("#menu"));
  x.append(allForms[current]);
  x.append(allBibs[alleID[current]]);
  });
}


/*
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
*/
