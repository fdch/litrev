function main() {

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

  	getLit();
  	var h = document.getElementById(sections[0]+"-a");
  	var nav = element('nav');
  	h.appendChild(nav);
  	for (let i=0; i<keywords.length;i++){
  		let an = anchor(allekeyw[i],keywords[i]);
  		nav.appendChild(an);
  	}

}
