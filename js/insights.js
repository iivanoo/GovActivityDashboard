function drawInsights() {
     var domainText;
     if(domain !== undefined) {
       domainText = '"' + domain + '"';
     } else {
       domainText = 'Internet';
     }
     var countryText = '';
     if(country !== undefined) {
       countryText = ' in ' + getCountryCode(country);
     }
     $('#insights-box-header > h3').remove();
     $('#insights-box-header').append('<h3 style="color:#404040;">Search trends on ' + domainText + ' Censorship' + countryText + '</h3>');
     $('#insights-box > iframe').remove();    
     createInsight('censorship');
     createStaticInsight('censorship');
     //createInsight('unavailable');
}

function createInsight(term) {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://iivanoo.kodingen.com/workaround.php?';
    if(country !== undefined) {
        iframe.src = iframe.src + 'nation=' + country.toUpperCase();
    } else {
        iframe.src = iframe.src + 'nation=empty';
    }
    var domainText = 'Internet';
    if(domain !== undefined) {
        domainText = domain;
    }
    iframe.src = iframe.src + '&keyword=' + domainText + ' ' + term + '&width=' + 360
    iframe.src = iframe.src + '&time=' + formatInsightDate();
    window.v = iframe;
    iframe.height = 380;
    iframe.width = 400;
    iframe.frameBorder = "0";
    $('#insights-box').append(iframe); 
}

function createStaticInsight(term) {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://iivanoo.kodingen.com/workaround.php?';
    if(country !== undefined) {
        iframe.src = iframe.src + 'nation=' + country.toUpperCase();
    } else {
        iframe.src = iframe.src + 'nation=empty';
    }
 /*   var domainText = 'Internet';
    if(domain !== undefined) {
        domainText = domain;
    }
 */
    iframe.src = iframe.src + '&keyword='  + term + '&width=' + 360
    iframe.src = iframe.src + '&time=' + formatInsightDate();
    window.v = iframe;
    iframe.height = 380;
    iframe.width = 400;
    iframe.frameBorder = "0";
    $('#insights-box').append(iframe); 
}


function formatInsightDate() {
	var monDiff = DateDiff('m', startDate, endDate, 0);
	return (startDate.getMonth() +1) + '%2F' + startDate.getFullYear() + '%20' + monDiff + 'm';
}


