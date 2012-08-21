$(function(){
				addSliderMonths();
				$('select#timeSliderStart, select#timeSliderStop').selectToUISlider({
					labels: 12,
                    sliderOptions: { 
                        animate: true, 
                        change:function(event) { 
                            updateData();
                        }
                    }
				}).hide();
			});

function addSliderMonths(){
				var months = new Array(13);
				   months[0]  = "January";
				   months[1]  = "February";
				   months[2]  = "March";
				   months[3]  = "April";
				   months[4]  = "May";
				   months[5]  = "June";
				   months[6]  = "July";
				   months[7]  = "August";
				   months[8]  = "September";
				   months[9]  = "October";
				   months[10] = "November";
				   months[11] = "December";
				
				var startSelect = document.getElementById('timeSliderStart');
				var stopSelect = document.getElementById('timeSliderStop');
				var d = new Date();
				var currentMonth = d.getMonth();
				var currentYear = d.getFullYear();
				var optgroup;
				var option;
				for (i=2009;i<=currentYear;i++){
					optgroup = document.createElement('optgroup');
					optgroup.label = i;
					startSelect.appendChild(optgroup);
					for(j=1;j<=12;j++){
						if((i == currentYear) && (j == currentMonth + 2)) {
							break;
						}
						option = document.createElement('option');
						option.value = j + '/' + (i - 2000);
						option.appendChild(document.createTextNode(months[j - 1] + ' ' + i));
						optgroup.appendChild(option);
					}
					optgroup = document.createElement('optgroup');
					optgroup.label = i;
					stopSelect.appendChild(optgroup);
					for(j=1;j<=12;j++){
						if((i == currentYear) && (j == currentMonth + 2)) {
							break;
						}
						option = document.createElement('option');
						option.value = j + '/' + (i - 2000);
						option.appendChild(document.createTextNode(months[j - 1] + ' '  + i));
						optgroup.appendChild(option);
					}
				}
				startSelect.selectedIndex = 24;
				stopSelect.selectedIndex = 30;
			}