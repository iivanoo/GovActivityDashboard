var fusionTableId = 2232735;

function herdictDomainByDate(domain,dateStart,dateEnd)
{
  var query = "SELECT reportDate,url,country_shortName,tag FROM " + fusionTableId + " WHERE reportType = '1' AND url LIKE '%" + domain + "%' AND reportDate >= '" + convertToUnixTimeStamp(dateStart) + "' AND reportDate <= '" + convertToUnixTimeStamp(dateEnd) + "'";
  herdictGet(query);
}

function herdictByDate(dateStart,dateEnd)
{
  var query = "SELECT reportDate,url,country_shortName,tag FROM " + fusionTableId + " WHERE reportType = '1' AND reportDate >= '" + convertToUnixTimeStamp(dateStart) + "' AND reportDate <= '" + convertToUnixTimeStamp(dateEnd) + "'";
herdictGet(query);
}

function herdictCountryByDate(country,dateStart,dateEnd)
{
    var query = "SELECT reportDate,url,country_shortName,tag FROM " + fusionTableId + " WHERE reportType = '1' AND country_shortName = '" + country + "' AND reportDate >= '" + convertToUnixTimeStamp(dateStart) + "' AND reportDate <= '" + convertToUnixTimeStamp(dateEnd) + "'";
herdictGet(query);
}

function herdictCountryDomainByDate(country, domain, dateStart, dateEnd)
{
    var query = "SELECT reportDate,url,country_shortName,tag FROM " + fusionTableId + " WHERE reportType = '1' AND country_shortName = '" + country + "' AND url LIKE '%" + domain + "%' AND reportDate >= '" + convertToUnixTimeStamp(dateStart) + "' AND reportDate <= '" + convertToUnixTimeStamp(dateEnd) + "'";
    herdictGet(query);
}

function herdictGet(query)
{
    var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
    var queryUrlTail = '&jsonCallback=?'; // ? could be a function name
    var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);
    var jqxhr = $.get(queryurl, dataHandler, "jsonp");
}

function dataHandler(d) {
    // get the actual data out of the JSON object
    herdictData = d.table.rows;
    updateUI();
}

// format of the input date: yyyy.mm.dd
function convertToUnixTimeStamp(date) {
    var localDate = new Date(parseInt(date.split('.')[0]), parseInt(date.split('.')[1] - 1), parseInt(date.split('.')[2]), 0, 0, 0, 1);
    return Math.round(localDate.getTime() / 1000);
}

// format of the resultin date: yyyy.mm.dd
function convertFromUnixTimeStamp(timestamp) {
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + '.' + month + '.' + day;
}
