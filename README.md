GovActivityDashboard
====================

A LIVE DEPLOYMENT of the GovActivityDashboard can be found [here](http://iivanoo.kodingen.com).

Gov Activity Dashboard is a dashboard that allows the user to interactively get two kinds of information:

1. *WHO* is doing censorship. That is, how active are governments in performing some kind of censorship on the Internet
2. the *EFFECTS* of censorship on the people. That is, how people "react" to censorship. It helps to answer this question: "is people from a specific country" aware of being censored"?

Information about the first point is provided by means of three kinds of interactive charts:

+ each country in the central geographical map is coloured depending on how many days and how many websites are unavailable over time;
+ the treemap shows the top 10 censored websites in a given time window. The area of a rectangle in the treemap is directly proportional to the number of days the website is not available. The color of each rectangle in the treemap is set depending on the category of the website (categories can be: social, internet tool, political, other);
+ the stacked area chart shows the top 10 websites not available month-by-month. The x-coordinate represents the months within the time window, whereas the y-coordinate represents the total number of days that a website was not available in a specific month.

Information about the second point (that is, people reaction) is shown by means of two representations:

+ a line chart representing how the keyword "internet censorship" has been searched on the Google Search engine. More specifically, it says how "trendy" is that keyword over time. By doing this, our dashboard is able to show, depending on the day, if people is currently aware of being censored. We can assume this because a typical human behavior when some relevant phenomenon is happening, he/she tries to get more informed on a the phenomenon itself (internet censoriship in our case). So, more "trendy" is internet censorship in a specific time window, more "aware" may be people of being censored;
+ world news related to internet censorship and a specific country are shown. This is because journalists are usually the first people getting informed about censorship-related issues, and they may be an interesting test for checking whether actually internet censorship is known in a given period in a specific country. UPDATE: since the REST API of Digg is no longer available, this part of the project is currently not active.
Users can filter all the data described above (1) by domain, (2) by country, and (3) by a reference time window.

Used Sources
------------

+ [Herdict](http://www.herdict.org/) for getting websites availability over time and by country (persisted in the cloud as a Google Fusion Table)
+ [Google Transparency Report](http://www.google.com/transparencyreport/) to get information about governmental activity with respect to censorship
+ [Google Search Insights](http://www.google.com/insights/search/) to get information on whether people is aware of being censored
+ [Digg](http://www.digg.com) to get world news related to censorship in various countries. It is accessed via a REST service. UPDATE: the Digg REST service is no longer available.
+ [Database of Political Institutions](http://econ.worldbank.org/WBSITE/EXTERNAL/EXTDEC/EXTRESEARCH/0,,contentMDK:20649465~pagePK:64214825~piPK:64214943~theSitePK:469382,00.html), 2010, by T.Beck, P.E.Keefer and G.R.Clarke to get information about the government orientation (that is, center, left, or right-wing) in a country, year by year

Used Javascript libraries
-------------------------

+ *d3.js* for rendering pie charts
+ *Google Chart API* for rendering the Geographical map, the treemap chart and the stacked area chart
+ *jQuery*
+ *DateFormat* by Steven Levithan
+ *HashMap* by Giorgio Stefanoni
+ *selectToUISlider* by Scott Jehl
+ *jsDate* by Rob Eberhardt (Slingshot Solutions)
+ *Sliding panel* by Jon Phillips (SpyreStudios)