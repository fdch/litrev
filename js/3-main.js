function main() {

	headTag = document.getElementsByTagName('header')[0];
	hstuff.push(
		element("h1", title,          'titl', "window.open(\'"+url     +"\',\'_top\')"),
		element("h2", subtitle,       'stit', "window.open(\'"+url     +"\',\'_top\')"),
		element("h3", "Quotes Form",  'quot', "window.open(\'"+formURL +"\',\'_top\')"),
	);
	for (let i in hstuff) headTag.appendChild(hstuff[i]);
	mainTag = document.getElementsByTagName('main')[0];


	var sections = [
		'menu', 'content', 'biblio', 
		"Menu", "Quotes", "Bibliography"
	];

	for (let i=0; i<sections.length/2; i++) {
		let sec = element('section','',sections[i]);
		/////////header
		let sech = element('header','',sections[i]+"-h");
		sech.appendChild(element('h4',sections[i+sections.length/2]));
		sec.appendChild(sech);
		/////////article
		sec.appendChild(element('article','',sections[i]+"-a"));

		mainTag.appendChild(sec);
	}

  	getLit();

}
