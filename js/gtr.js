// in this variable we can put the country code of the country being selected in the geomap

function drawGtrChart() {
	getGoogleContentCsv('../data/Google_Transparency_Report/google-content-removal-requests.csv', '../data/Google_Transparency_Report/google-user-data-requests.csv', 'Content Removal Requests', 'Data Requests');
}

function getGoogleContentCsv(contentRemovalCsvFile, userDataCsvFile, contentRemovalSumField, userDataSumField) {
	d3.csv(contentRemovalCsvFile, function(removalCsv) {
		d3.csv(userDataCsvFile, function(userDataCsv) {
			var removals = getValues(removalCsv, contentRemovalSumField, country);
			var userData = getValues(userDataCsv, userDataSumField, country);
			visualizeData(removals, userData);
	})
	});
}



function visualizeData(removals, userData) {
  var w = document.getElementById('time-slider').offsetWidth;
  var h = 180;
  var r = 50;
  
  var topValue = 0;
  for(i=0; i<removals.length; i++) {
	  if(parseInt(removals[i].requests + userData[i].requests) > topValue) {
		  topValue = parseInt(removals[i].requests + userData[i].requests);
	  }
  }
  var sliderElements = document.getElementsByClassName('ui-slider-label-show');
  var lastDate = sliderElements[sliderElements.length -1].firstChild.nodeValue;
  var yearEnd = parseInt(lastDate.split('/')[1]) + 2000;
  var monthEnd = parseInt(lastDate.split('/')[0]);
  var numMonths = monthDiff(new Date(2009, 0, 1), new Date(yearEnd, monthEnd, 1));
  
  if(document.getElementById('charts') != undefined) {
	  d3.select(document.getElementById('charts')).remove();
  }
  var vis = d3.select(document.getElementById('gtrChart'))
  .append("svg:svg")
  .attr("width", w)
  .attr("id", "charts")
  .attr("height", h)
  .append("svg:g")
  .attr("transform", "translate(" + r + "," + r + ")")
  
  var data;
  var monthSpan = parseInt(w / numMonths);
  var posX;
  for(i=0; i<removals.length; i++) {
	  posX = (monthSpan * (((parseInt(removals[i].semester.split('/')[0]))) + (12 * (removals[i].semester.split('/')[2] - 2009))));
	  data = [removals[i].requests, userData[i].requests];
      if(data[0] !== 0 && data[1] !== 0) {
	    bakepie("gtrPie" + removals[i].semester, data, posX, 100, ((removals[i].requests + userData[i].requests) / topValue) * 50);
      } else {
        bakeNoGtrLabel("gtrLabel", posX, 100);
      }
  }
}

function bakeNoGtrLabel(classname, x, y) {
    d3.select("#charts").append("svg:text")
    .text("No Data Available")
    .attr("class", classname)
    .attr("x", x)
    .attr("y", y)
    .attr("dy", -3)
    .attr("text-anchor", "middle");
}

function bakepie(classname, data, x, y, r) { 
    var color = d3.scale.category20()
    var arc = d3.svg.arc().outerRadius(r)
    var donut = d3.layout.pie();

    var pie = d3.select("#charts")
        .append("svg:g")
            .data([data.sort(d3.descending)])
            .attr("class", classname);

    var arcs = pie.selectAll("g.arc")
       .data(donut)
     .enter().append("svg:g")
       .attr("class", "arc")
       .attr("transform", "translate(" + x + "," + y + ")");


    var paths = arcs.append("svg:path")
       .attr("fill", function(d, i) { return color(i); });
    
    var tweenPie = function (b) {
     b.innerRadius = 0;
     var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
     return function(t) {
       return arc(i(t));
     };
    }
    
    paths.transition()
       .attrTween("d", tweenPie);

    arcs.append("svg:text")
    .attr("transform", function(d, i) {
    	d.innerRadius = 0;
    	d.outerRadius = r;
    	return "translate(" + arc.centroid(d) + ")"; 
    })
    .attr("text-anchor", "middle")
    .text(function(d, i) { return data[i]; });
    
    arcs.append("svg:title")
    .text(function(d, i) { return "semester end: " + classname.replace("gtrPie", ""); });

}
	
function getValues(csv, field, country) {
	var currentSemester = csv[0]["Period Ending"];
	var semesterIndex = 0;
	var result = new Array();
	result[semesterIndex] = new googleData();
	result[semesterIndex].semester = currentSemester;
	for (i=0; i<csv.length; i++) { 
		if(currentSemester != csv[i]["Period Ending"]) {
			currentSemester = csv[i]["Period Ending"];
			semesterIndex++;
			result[semesterIndex] = new googleData();
			result[semesterIndex].semester = currentSemester;
		}
		if(!isNaN(csv[i][field])) {
			if(country == undefined || ((country != undefined) && (csv[i]["Country Code"] == country))) {
				result[semesterIndex].requests = parseInt(result[semesterIndex].requests) + parseInt(csv[i][field]);
			}
		}
	}
	return result;
}

function getCountrySpecificValues(array, country) {
	var result = new Array();
	for(i=0; i<array.length; i++) {
		result.push(array[i]);
	}
	return result;
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months;
}

function googleData() {
	  this.semester = 0;
	  this.requests = 0;
}
