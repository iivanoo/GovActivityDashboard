var areachart;
var dataByMonths;

function drawStackedAreaChart() {

	dataByMonths = new google.visualization.DataTable();
	dataByMonths.addColumn('string', 'Month');

	//for (var i = topSiteData.getNumberOfRows() -1 ; i > 0; i--) {
	for (var i = 1; i < topSiteData.getNumberOfRows(); i++) {
		var currTopSite = topSiteData.getValue(i, 0);
		dataByMonths.addColumn('number', currTopSite);
	}

	var monDiff = DateDiff('m', startDate, endDate, 0);
	dataByMonths.addRows(monDiff);

	var tempDate = startDate;
	for (var i = 0; i < monDiff; i++) {
		dataByMonths.setCell(i, 0, yearMonthDate(tempDate));
		tempDate = DateAdd('m', 1, tempDate);
	}

	for (var i = 0; i < dataByMonths.getNumberOfRows(); i++) {
		for (var j = 1; j<dataByMonths.getNumberOfColumns(); j++) {
			dataByMonths.setCell(i, j, 0);
		}
	}

	//for (var i = 1; i < topSiteData.getNumberOfRows(); i++) {
	for (var i = topSiteData.getNumberOfRows() -1 ; i > 0; i--) {
		var currDomain = topSiteData.getValue(i, 0);
		var lastSiteVisit = null;

		for (var j = 0; j < herdictData.length; j++) {
			var domain = getDomain("http:\/\/"+herdictData[j][1]);
			if ((domain == currDomain) && 
					((lastSiteVisit == null) || (lastSiteVisit != convertFromUnixTimeStamp(herdictData[j][0])))) {

				var d = new Date(herdictData[j][0] *1000);
				var row = DateDiff('m', startDate, d , 0);
				if (row > 0) {
					row = row - 1;
				}
				//console.log(row + "    "+ i+ "     "+dataByMonths.getValue(row , i));
				dataByMonths.setCell(row, i, dataByMonths.getValue(row , i) + 1);
				lastSiteVisit = convertFromUnixTimeStamp(herdictData[j][0]);
			}
		}            
	}

	// Create and draw the visualization.
	areachart = new google.visualization.AreaChart(document.getElementById('stackedAreaChart'));
	areachart.draw(dataByMonths, {
		width: parseInt(document.getElementById('time-slider').offsetWidth / 2),
		title : 'Unavailable domains over time',
		isStacked: true,
		//height: 400,
		vAxis: {title: "Number of days domain unavailable"},
		hAxis: {title: "Months"},
		//legend: 'none'
	});

//	google.visualization.events.addListener(areachart, 'select', function() {
//		var sel = areachart.getSelection();
//		if (sel != null && sel[0] != null) {
//			treemap.setSelection([{row:sel[0].column}]);
//			//console.log(sel[0]);
//		}
//	});
}


function yearMonthDate(date) {
	return date.getFullYear() + '.' + (date.getMonth() +1);
}

