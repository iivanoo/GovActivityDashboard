(function($) {
    $(function() {
        $.fn.reset = function () {
            $(this).each (function() { this.reset(); });
        };

        $('#filter-box').on('submit', function(e) {
            var localDomain = $('input', e.target).val();
            if ($(".tag-cloud > div").size() !== 0) {
              $(".tag-cloud > div").remove();
            }
            if (localDomain && $(".tag-cloud > div").size() === 0) {
                var tag = $("<div class='tag'><span>" + localDomain + "</span><a href='#del'>x</a></div>");
                tag.on('click', 'a', function(e) {
                    tag.remove();
                    domain = undefined;
                    updateData();
                });
                $('.tag-cloud', this).append(tag);
                $('input', e).reset();
                domain = localDomain;
                updateData();
            }
            return false; // e.preventDefault();
        });
    });
})(jQuery);

function getFilteredDomain() {
    return domain;
}

function isFilteredByDomain() {
    return (domain === undefined);
}

function getFilteredCountry() {
    return country;
}

function isFilteredByCountry() {
    return (country === undefined);
}

function getStartDate() {
    var start = document.getElementById('timeSliderStart').value;
    var year = parseInt(start.split('/')[1]) + 2000;
    var month = parseInt(start.split('/')[0] - 1);
    return new Date(year, month, 1, 0, 0, 0, 0);
}

function getEndDate() {
    var stop = document.getElementById('timeSliderStop').value;
    var year = parseInt(stop.split('/')[1]) + 2000;
    var month = parseInt(stop.split('/')[0]);
    return new Date(year, month, 1, 0, 0, 0, 0);
}

var domain;
var country;
var startDate = new Date(2011, 0, 1, 0, 0, 0, 0);
var endDate = new Date(2011, 7, 1, 0, 0, 0, 0);
var herdictData;

function updateData() {
    display_loading_screen();
    domain = getFilteredDomain();
    startDate = getStartDate();
    endDate = getEndDate();
    // country is managed in map.js
    /*console.log(domain);
    console.log(country);
    console.log(startDate);
    console.log(endDate);*/ 
    updateHerdictData();
}

function updateUI() {
    // qui ci va il codice per aggiornare le varie parti dinamiche
    //console.log(herdictData.length);
    drawMap();
    drawGtrChart();
    drawTreemap();
    drawStackedAreaChart();
    drawInsights();
    //loadNews();
    // sleep(2000);
    hide_loading_screen();
}

function loadData() {
    herdictData = herdictByDate(new Date(2011, 0, 1, 0, 0, 0, 1).format("yyyy.mm.dd"), new Date(2011, 7, 1, 0, 0, 0, 1).format("yyyy.mm.dd"));
}

function updateHerdictData() {
    if(domain == undefined) {
        if(country == undefined) {
            herdictData = herdictByDate(startDate.format("yyyy.mm.dd"), endDate.format("yyyy.mm.dd"));
        } else {
            herdictData = herdictCountryByDate(country, startDate.format("yyyy.mm.dd"), endDate.format("yyyy.mm.dd"));  
        }
    } else {
        if(country == undefined) {
            herdictData = herdictDomainByDate(domain, startDate.format("yyyy.mm.dd"), endDate.format("yyyy.mm.dd"));
        } else {
            herdictData = herdictCountryDomainByDate(country, domain, startDate.format("yyyy.mm.dd"), endDate.format("yyyy.mm.dd"));
        }
    }
}

function display_loading_screen() {
  document.getElementById("loading_screen").style.display = 'block';
}

function hide_loading_screen() {
  document.getElementById("loading_screen").style.display = 'none';
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}




