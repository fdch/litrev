function main() {

	url = url+"/abby";

	var headTag = document.getElementsByTagName('header')[0];
	var hstuff = new Array(0)

	hstuff.push(
		element("h1", title,	'titl', "window.open(\'"+url+"\',\'_top\')"),
		element("h2", subtitle,	'stit', "window.open(\'"+url+"\',\'_top\')"),
	);

	for (let i in hstuff) headTag.appendChild(hstuff[i]);

	var mainTag = document.getElementsByTagName('main')[0];

  	getLit(mainTag);

}
