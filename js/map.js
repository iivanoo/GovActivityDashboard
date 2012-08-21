var geochart;
var data;
var politicalDatastore;
var politicalData;

function drawMap() {
    var checkedValue = $('input[name=mapType]').filter(':checked').attr('id');
    if(checkedValue == "herdict") {
        drawHerdictMap();
    } else {
        drawPoliticalMap();
    }
}

function drawHerdictMap() {
      data = getHerdictData(); 
      var options = {width: parseInt(document.getElementById('time-slider').offsetWidth),
  			colors: ['#FF0000']
			};
      var container = document.getElementById('map_canvas');
      geochart = new google.visualization.GeoChart(container);
      geochart.draw(data, options);
      google.visualization.events.addListener(geochart, 'select', selectHandler);
};
  
function getHerdictData() {
    var localHerdictData = new google.visualization.DataTable();
    localHerdictData.addColumn('string', 'Country');
    localHerdictData.addColumn('number', 'Unreachable resources');
    
    var countryDomainMap = new HashMap();
    var currentDomain;
    var currentCountry;
    for (i = 0; i < herdictData.length; i++) {
        currentDomain = getDomain("http:\/\/"+herdictData[i][1]);
        currentCountry = herdictData[i][2];
        if(currentDomain !== null) {
            if(countryDomainMap.get(currentCountry) == null) {
                countryDomainMap.put(currentCountry, currentDomain.toLowerCase());
            } else {
                if(countryDomainMap.get(currentCountry).indexOf(currentDomain.toLowerCase()) == -1) {
                    countryDomainMap.put(currentCountry, countryDomainMap.get(currentCountry) + "," + currentDomain.toLowerCase());
                }
            }
        }
    }
    var countries = countryDomainMap.getKeys();
    var domains = countryDomainMap.values();
    for(i = 0; i< countries.length; i++) {
       localHerdictData.addRow([countries[i], domains[i].split(",").length]); 
    }
    return localHerdictData;
}

function drawPoliticalMap() {
    if(politicalDatastore == undefined) {
        getPoliticalData();
    } else {
        var options = {width: parseInt(document.getElementById('time-slider').offsetWidth),
    			colors: ['#BF133B', '#2C7836', '#395A85'],
    			legend: 'none'
        };
        var container = document.getElementById('map_canvas');
        geochart = new google.visualization.GeoChart(container);
        geochart.draw(politicalData, options);
        google.visualization.events.addListener(geochart, 'select', selectHandler);
    }
}

function getPoliticalData() {
    politicalData = new google.visualization.DataTable();
    politicalData.addColumn('string', 'Country');
    politicalData.addColumn('number', 'Largest government party orientation');
    if(politicalDatastore == undefined) {
        politicalHashmap = new HashMap();
        politicalHashmap.put('Left', 1);
        politicalHashmap.put('Center', 2);
        politicalHashmap.put('Right', 3);
        politicalHashmap.put('Unknown', 4);
        d3.csv('../data/dpi.csv', function(dpiCsv) {
        politicalDatastore = dpiCsv;
        filterPoliticalData();
        var options = {width: parseInt(document.getElementById('time-slider').offsetWidth),
        		colors: ['#BF133B', '#2C7836', '#395A85'],
        		legend: 'none'
        };
        var container = document.getElementById('map_canvas');
        geochart = new google.visualization.GeoChart(container);
        geochart.draw(politicalData, options);
        google.visualization.events.addListener(geochart, 'select', selectHandler);
        });
    } else {
        filterPoliticalData();  
    }
}

var politicalHashmap;

function filterPoliticalData() {
    if (endDate == undefined) {
        endDate = new Date(2011, 7, 1);
    }
    politicalData.removeRows(0, politicalData.getNumberOfRows() - 1);
    for(i=0; i<politicalDatastore.length; i++) {
        if((politicalDatastore[i]["YEAR"] == endDate.getFullYear()) && (politicalDatastore[i]["GOV"] != 'Unknown')) {
            politicalData.addRow([politicalDatastore[i]["COUNTRY"].toUpperCase(), 
                {v:politicalHashmap.get(politicalDatastore[i]["GOV"]), f:politicalDatastore[i]["GOV"]}]);
        }
    }
    /* politicalData.addRow(['AR', {v:2, f:'RIGHT'}]);*/
    data = politicalData;
}
  
function selectHandler(e) {
  var item = geochart.getSelection()[0];
  selectedCountry = data.getFormattedValue(item.row, 0);
  if ($(".country-cloud > div").size() !== 0) {
    $(".country-cloud > div").remove();
  }
  var countryTag = $("<div class='country'><span>"+ selectedCountry +"</span><a href='#del'>x</a></div>");
  countryTag.on('click', 'a', function(e) {
      countryTag.remove();
      country = undefined;
      updateData();
  });
  $('.country-cloud').append(countryTag);
  country = selectedCountry;
  updateData();
}

