var treemap;
var hashSiteCont;
var hashSiteDate;
var topSiteData;
var resultDefaultValue = 10;

function drawTreemap() {

	hashSiteCont = new HashMap();
	hashSiteDate = new HashMap();

	for (var i = 0; i < herdictData.length; i++) {

		var domain = getDomain("http:\/\/"+herdictData[i][1]);
		if (domain != null) {
			var curr_date = convertFromUnixTimeStamp(herdictData[i][0]);

			if (hashSiteDate.get(domain) == null) {
				hashSiteDate.put(domain, curr_date);
				hashSiteCont.put(domain, 1);
			}
			else {		
				if (curr_date != hashSiteDate.get(domain)) {
					var contKey = hashSiteCont.get(domain);
					hashSiteDate.put(domain, curr_date);
					hashSiteCont.put(domain, contKey + 1);
				}
			}
		}
	}

	var domainArray = hashSiteCont.getKeys();
	var contArray = hashSiteCont.values(); 

	topSiteData = new google.visualization.DataTable();
	topSiteData.addColumn('string', 'Domain');
	topSiteData.addColumn('string', 'Parent');
	topSiteData.addColumn('number', 'days domain down');
	topSiteData.addColumn('number', 'category (color)');
	var parent = 'Unavailable domains by category';
	topSiteData.addRow([parent ,null,0,0]);

	var tableRows;
	if (domainArray.length >= resultDefaultValue) tableRows = resultDefaultValue;
	else tableRows = domainArray.length;

	for (var i = 0; i < tableRows; i++) {
		var max = -1;
		var pos = -1;
		for (var j = 0; j < contArray.length; j++) {
			if (contArray[j] > max) {
				max = contArray[j];
				pos = j;
			}
		}
		//console.log(domainArray[pos] + "    " + contArray[pos]);

		var color;
		switch(getCategory(domainArray[pos])){
			case "tool": {color = 3; break; }
			//case "search_engine":  {color = 2; break; }
			case "social":	 {color = 1; break; }
			case "politic":	 {color = 2; break; }
			default :  {color = null; }
		}

		topSiteData.addRow([domainArray[pos], 
		                    parent, 
		                    contArray[pos], 
		                    color,  
		                    ]);
		contArray[pos] = -1;
	}

	// Create and draw the visualization.
    treemap = new google.visualization.TreeMap(document.getElementById('treemap'));
	if (topSiteData.getNumberOfRows() <= 1) {
		topSiteData.addRow(["No results!", parent, 1, 0 ]);
	}
	
	treemap.draw(topSiteData, {
		width: parseInt(document.getElementById('time-slider').offsetWidth / 2),
		minColor: '#FF9966',
		midColor: '#6666CC',
		maxColor: '#009966',
		noColor: '#A8A8A8',
		headerHeight: 25,
		fontColor: 'black',
		//showScale: true
	});

	//add listener: when click a node, select the point on the area chart
	google.visualization.events.addListener(treemap, 'select', function() {
		var sel = treemap.getSelection();
		if (sel != null && sel[0] != null) {
			var array = new Array();
			for (var i =0; i<dataByMonths.getNumberOfRows(); i++) {
				array[i] = {row:i, column:sel[0].row};
			}
			areachart.setSelection(array);
		}
	});
}

//take the url's domain
function getDomain(url) {
	var domain = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/);
	if (domain != null){
		return domain[2];
	}
	else return null;
}

//find the domain's category
function getCategory (domain) {

	if (domain.startsWith("google")) return "tool";
	else if (domain.startsWith("youtube")) return "tool";
	else if (domain.startsWith("twitter")) return "social";
	else if (domain.startsWith("facebook")) return "social";
	else if (domain.startsWith("hotmail")) return "tool";

	for (var i = herdictData.length -1; i >= 0; i--) {
		currTag = herdictData[i][3];
		currTag = currTag.toLowerCase();

		if (domain == getDomain("http:\/\/"+herdictData[i][1]) && currTag != "") {
			if (currTag.indexOf("social") != -1) 
				return "social";
			else if (currTag.indexOf("politic") != -1) 
				return "politic";
			else if (currTag.indexOf("tool") != -1 || currTag.indexOf("internet") != -1) 
				return "tool";
			else return "other";
		}
	}
	return "other";	
}

String.prototype.startsWith = function(str) 
{return (this.match("^"+str)==str)}

