/*

  LITREV ABBY MAIN FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)

  
*/
function main() {

	url = url+"/abby";

	headTag = document.getElementsByTagName('header')[0];
	hstuff.push(
		element("h1", 'Abby',	'titl', "window.open(\'"+url+"\',\'_top\')"),
		element("h2", 'An Annotated Bibliography',	'stit', "window.open(\'"+url+"\',\'_top\')"),
	);
	for (let i in hstuff) headTag.appendChild(hstuff[i]);
	mainTag = document.getElementsByTagName('main')[0];

  	getLit(mainTag);
}
/*


  END MAIN FILE

  
*/