/*

  LITREV FILLOUT MAIN FILE

  
  THIS FILE IS PART OF FDCH.GITHUB.IO/LITREV
  FOR ANY INFORMATION CONTACT FCH226@NYU.EDU


  FEDE CAMARA HALAC (FDCH)


*/
function main() {

	url = url+"/fillout";

	headTag = document.getElementsByTagName('header')[0];
	
	hstuff.push(
		element("h1", title+" (fillout)",'titl', "window.open(\'"+url     +"\',\'_top\')"),
		element("h2", subtitle,          'stit', "window.open(\'"+url     +"\',\'_top\')"),
	);

	for (let i in hstuff) headTag.appendChild(hstuff[i]);

	mainTag = document.getElementsByTagName('main')[0];
	sliDiv = element('div', '', 'sliDiv');
  	getLit(mainTag, headTag);

}
/*


  END MAIN FILE


*/