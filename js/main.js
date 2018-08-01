function main() {

	// $("body").append([titleData, containers]);
	var headTag = document.getElementsByTagName('header')[0];
	var hstuff = new Array(0)

	hstuff.push(
		element("h1", title,    'titl', "window.open(\'"+url     +"\')"),
		element("h2", subtitle, 'stit', "window.open(\'"+url     +"\')"),
		element("h3", "Quote",  'quot', "window.open(\'"+formURL +"\')"),
		element("h4", "Writer", 'writ', "window.open(\'"+formWurl+"\')")
	);

	for (let i in hstuff) headTag.appendChild(hstuff[i]);

	var mainTag = document.getElementsByTagName('main')[0];

	var sections = [
	'menu', 'content', 'biblio', 
	"Menu", "Quotes", "Bibliography"
	];

	for (let i=0; i<sections.length/2; i++) {
		let sec = element('section','',sections[i]);
		/////////header
		let sech = element('header','',sections[i]+"-h");
		sech.appendChild(element('h5',sections[i+sections.length/2]));
		sec.appendChild(sech);
		/////////article
		sec.appendChild(element('article','',sections[i]+"-a"));

		mainTag.appendChild(sec);
	}


  getBib(document.getElementById(sections[2]+"-a"));
  getLit(document.getElementById(sections[1]+"-a"));
  // makeTests($("header"), navmenu);
}
