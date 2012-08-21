/* retrieve news from DIGG 

THIS SCRIPT IS KEPT ONLY FOR HISTORICAL REASONS, IT IS NO LONGER USED SINCE THE DIGG REST SERVICE IS NO LONGER AVAILABLE
source: http://www.programmableweb.com/api/digg/
*/

function loadNews()
{
  if ($("#news > div").size() !== 0) {
    $("#news > div").remove();
  }
  getNews(startDate, endDate);
}

function getNews(dateStart, dateEnd)
{
     var queryString = "censorship";
     if(domain !== undefined) {
        queryString = queryString + ' ' + domain;
     } else {
        queryString = queryString + ' internet';
}
     if(country !== undefined) {
        queryString = queryString + ' ' + getCountryCode(country);
     }
      
      var start = Math.round((dateStart).getTime() / 1000);
      var end = Math.round((dateEnd).getTime() / 1000);

      //alert('http://services.digg.com/2.0/search.search?min_date='+ start +'&max_date='+ end +'&query=' + queryString +'&topic=world_news&count=10&type=javascript&callback=?')
      $.ajax({
      type: 'GET',
      url: 'http://services.digg.com/2.0/search.search?min_date='+ start +'&max_date='+ end +'&query=' + queryString + '&topic=world_news&count=10&type=javascript&callback=?',
      dataType: 'jsonp',
      success: display,
      error: function(jqXHR, textStatus, errorThrown){ alert(textStatus); }
    });
      
}

function display(jsonData)
{
      var c = jsonData.count;

      var d = document.getElementById("news");
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
      $('#news-header > h3').remove();
      $('#news-header').append('<h3 style="color:#404040;">World News about ' + domainText + ' Censorship' + countryText + '</h3>');

      for (i=0; i<c; i++)
      {

    /*if ( jsonData.status == "upcoming")
	  continue;*/

	var thediv = document.createElement("div");

	thediv.setAttribute("class","digg");

	if (jsonData.stories[i].thumbnail != undefined )
	{
	  var img  = document.createElement("img");

	  img.setAttribute("src", jsonData.stories[i].thumbnail.src);
      img.setAttribute("class", "diggImage");

	  thediv.appendChild(img);
	}

	thediv.innerHTML += jsonData.stories[i].description.substring(0,180);
    if ( jsonData.stories[i].shorturl != undefined)
    {
        var link = document.createElement("a")
        link.setAttribute("href", jsonData.stories[i].shorturl.short_url)
        link.innerHTML = "..."
        thediv.appendChild(link);
    }
	d.appendChild(thediv);
      }
    $('#insights-box').height($('#news').height());
    $('#news').height(800);
}