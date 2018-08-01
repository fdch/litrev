function loadAll(sheets) {
  loading = 1;
  //works
  loadJSON(sheets[0], function(response) {
    var f, e, i, entry;
    f = JSON.parse(response);
    entry = f.feed.entry;
    allEntries={};
    // allCategories=[], allTitles=[],allWorkId=[];
    for (i in entry) {
      e = entry[i];

      var time = new Date(e.gsx$timestamp.$t);
      var id   = e.gsx$id.$t;
      var nEid  = time.getMinutes()+"_"+time.getSeconds()+"_"+id;

      allEntries[nEid]={};

      allEntries[nEid]["nTime"] = time.toDateString();
      allEntries[nEid]["nKeyw"] = e.gsx$keyword.$t;
      allEntries[nEid]["nQuot"] = e.gsx$quickquote.$t;
      allEntries[nEid]["nPara"] = e.gsx$paraphrase.$t;
      allEntries[nEid]["nPage"] = e.gsx$page.$t;
      allEntries[nEid]["nTitl"] = e.gsx$booktitle.$t;
      allEntries[nEid]["nAuth"] = e.gsx$author.$t;
      allEntries[nEid]["nName"] = e.gsx$name.$t;
      allEntries[nEid]["nYear"] = e.gsx$year.$t;
      allEntries[nEid]["nPubl"] = e.gsx$publisher.$t;
      allEntries[nEid]["nEdit"] = e.gsx$editor.$t;
      allEntries[nEid]["nJour"] = e.gsx$journal.$t;
      allEntries[nEid]["nVolu"] = e.gsx$volume.$t;
      allEntries[nEid]["nNumb"] = e.gsx$number.$t;
      allEntries[nEid]["nIddd"] = id;

      // for (let j in categ) allCategories.push(categ[j]);
      allTitles.push(title);
      allWorkId.push(nwid);
      if(vide)allVideos.push(title,vide);
      if(audi)allAudios.push(title,audi);
      // makeCateg(categ);
    }
    uCategories = getUniqueCategories(allCategories);
  });

  loading = 0;
  loaded = 1; //set it as loaded if it is loaded asynchronously

  return 1; //actually not checking if stuf loaded...
}