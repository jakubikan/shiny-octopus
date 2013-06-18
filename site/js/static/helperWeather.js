$(document).ready(function() {
	var DUMMY_SELECT = '-Please select-';
	var formID = null;
	var formData = {ID: null,													
					windstrength: null,
					winddirection: null,
				  	airpressure: null,
				  	temperature: null,
				  	clouds: null,
				  	rain: null,
				  	waveheight: null,
				  	wavedirection: null,
				  	dateandtime: null,

				  	// waypoint data
				  	name: null,		
				  	latitude: null,
				  	longitude: null, 
				  	cog: null,
				  	sog: null,
				  	destination: null,
				  	maneuver: null,
				  	headsail: null,
				  	dtm: null,
				  	btm: null
				};
	var selectSelector = {selector : '#entry'};
	var waypointForm;		// true if the requests have to be sent to waypoint-process.php, 
							// false if they will be sent to weather-process.php
	var map = {};
	var firstWeatherFetch = true;

	if ( $("#lat").length > 0 && $('#lng').length > 0) waypointForm = true;
 	else waypointForm = false;
	
	$('#loadgif').height($('#entry').height());
	$('#delEntryIcon').height($('#entry').height());
	hideDel();
	fillSelect();
	clearFields();
			
/*
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
      
        var target = this.hash,
        $target = $(target);
      
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-$(".mod-header").height()
        }, 900, 'swing', function () {
        });
		
    });	
*/		
	function showGif() { $('#loadgif').show(); }
	
	function hideGif() { $('#loadgif').hide(); }
	
	function showDel() { $('#delEntryIcon').show(); }
	
	function hideDel() { $('#delEntryIcon').hide(); }

	function getDOMElement(array, id) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].id.indexOf(id) != -1) return array[i];
		}
	}
		
	function setFieldData(formData) {
		var inputs = $(document).find('input');
		var selects = $(document).find('select');
		if (waypointForm) {
			// Weather data
			formID = formData.ID;
			getDOMElement(inputs, "windStrength").value = typeof formData.windstrength != 'undefined' && formData.windstrength != 0 ? formData.windstrength : "";
			getDOMElement(selects, "windDirection").value = typeof formData.winddirection != 'undefined' && formData.winddirection != 'null' ? formData.winddirection : DUMMY_SELECT;
			getDOMElement(inputs, "airPressure").value = typeof formData.airpressure != 'undefined' && formData.airpressure != 0 ? formData.airpressure : "";
			getDOMElement(inputs, "temp").value = typeof formData.temperature != 'undefined' && formData.temperature != 0 ? formData.temperature : "";
			getDOMElement(selects, "clouds").value = typeof formData.clouds != 'undefined' && formData.clouds != 'null' ? formData.clouds : DUMMY_SELECT;
			getDOMElement(selects, "rain").value = typeof formData.rain != 'undefined' && formData.rain != 'null' ? formData.rain : DUMMY_SELECT;
			getDOMElement(inputs, "waveHeight").value = typeof formData.waveheight != 'undefined' && formData.waveheight != 0 ? formData.waveheight : "";
			getDOMElement(selects, "waveDirection").value = typeof formData.wavedirection != 'undefined' && formData.wavedirection != 'null' ? formData.wavedirection : DUMMY_SELECT;
			getDOMElement(inputs, "trackDateTime").value = typeof formData.dateandtime != 'undefined' && formData.dateandtime != 0 ? formData.dateandtime : "";
		
			// Waypoint data
			getDOMElement(inputs, "name").value = typeof formData.name != 'undefined' && formData.name != 'null' ? formData.name : "";
			getDOMElement(selects, "headSail").value = typeof formData.headsail != 'undefined' && formData.headsail != 'null' ? formData.headsail : DUMMY_SELECT;
			getDOMElement(inputs, "lat").value = typeof formData.latitude != 'undefined' && formData.latitude != 'null' ? formData.latitude : "";
			getDOMElement(inputs, "lng").value = typeof formData.longitude != 'undefined' && formData.longitude != 'null' ? formData.longitude : "";
			getDOMElement(selects, "dest").value = typeof formData.destination != 'undefined' && formData.destination != 'null' ? formData.destination : DUMMY_SELECT;
			getDOMElement(inputs, "dtm").value = typeof formData.dtm != 'undefined' && formData.dtm != 'null' ? formData.dtm : "";
			getDOMElement(inputs, "cog").value = typeof formData.cog != 'undefined' && formData.cog != 'null' ? formData.cog : "";
			getDOMElement(inputs, "sog").value = typeof formData.sog != 'undefined' && formData.sog != 'null' ? formData.sog : "";
			getDOMElement(selects, "maneuver").value = typeof formData.maneuver != 'undefined' && formData.maneuver != 'null' ? formData.maneuver : DUMMY_SELECT;
			getDOMElement(inputs, "btm").value = typeof formData.btm != 'undefined' && formData.btm != 'null' ? formData.btm : "";
			
		} else {
			formID = formData.ID;
			getDOMElement(inputs, "windStrength").value = typeof formData.windstrength != 'undefined' && formData.windstrength != 0 ? formData.windstrength : "";
			getDOMElement(selects, "windDirection").value = typeof formData.winddirection != 'undefined' && formData.winddirection != 'null' ? formData.winddirection : DUMMY_SELECT;
			getDOMElement(inputs, "airPressure").value = typeof formData.airpressure != 'undefined' && formData.airpressure != 0 ? formData.airpressure : "";
			getDOMElement(inputs, "temp").value = typeof formData.temperature != 'undefined' && formData.temperature != 0 ? formData.temperature : "";
			getDOMElement(selects, "clouds").value = typeof formData.clouds != 'undefined' && formData.clouds != 'null' ? formData.clouds : DUMMY_SELECT;
			getDOMElement(selects, "rain").value = typeof formData.rain != 'undefined' && formData.rain != 'null' ? formData.rain : DUMMY_SELECT;
			getDOMElement(inputs, "waveHeight").value = typeof formData.waveheight!= 'undefined' && formData.waveheight != 0 ? formData.waveheight : "";
			getDOMElement(selects, "waveDirection").value = typeof formData.wavedirection != 'undefined' && formData.wavedirection != 'null' ? formData.wavedirection : DUMMY_SELECT;
			getDOMElement(inputs, "trackDateTime").value = typeof formData.dateandtime != 'undefined' && formData.dateandtime != 0 ? formData.dateandtime : "";
		}
	}
	
	function leftPad(number, targetLength) {
   		var output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
	}
	
	function clearFields() {
		var inputs = $(document).find('input');
		var selects = $(document).find('select');
		inputs.each(function(index, element) {
			$(this).val("");
		});
		selects.each(function(index, element) {
			$(this).val(DUMMY_SELECT);
		});
		var date = new Date();
		var dateHours = leftPad(date.getHours(), 2);		
		var dateMinutes = leftPad(date.getMinutes(), 2);
		var dateSeconds = leftPad(date.getSeconds(), 2);
		
		// Format: Fri, May 16 2013, 11:01
		dateText = $.datepicker.formatDate("D, M d yy", date);		
		$("#trackDateTime").val(dateText  +", "+dateHours+":"+dateMinutes+":"+dateSeconds);
	}
	
	function clearAll(){
		clearFields();
		formID = null;
		$('#entry').value = '-New Entry-';
		firstWeatherFetch = true;
		hideDel();
	}
	
	function updateCurrSelected() {
		$('#entry').val(formData != null && formData.dateandtime != null ? 
										   formData.dateandtime : '-New Entry-');	
	}
	
	// automated form submit after key is released on form input elements.
	$('.form-input').keydown(function(e) { 
	
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(document).find('.form-input');
			var selects = $(document).find('.form-select');
			if (waypointForm) {
			formData={// weather data
					  ID: formID,													
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === DUMMY_SELECT ? 
											"null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === DUMMY_SELECT ? 
										  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null",

					  // waypoint data
					  name: getDOMElement(inputs, 'name').value || "null",		
					  latitude: getDOMElement(inputs, 'lat').value || "null",
					  longitude: getDOMElement(inputs, 'lng').value || "null", 
					  cog: getDOMElement(inputs, 'cog').value || "null",
					  sog: getDOMElement(inputs, 'sog').value || "null",
					  destination: getDOMElement(selects, 'dest').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'dest').value,
					  maneuver: getDOMElement(selects, 'maneuver').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'maneuver').value,
					  headsail: getDOMElement(selects, 'headSail').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'headSail').value,
					  dtm: getDOMElement(inputs, 'dtm').value || "null",
					  btm: getDOMElement(inputs, 'btm').value || "null"
				  	  };
			} else {
			formData={ID: formID,
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === DUMMY_SELECT ? 
					  							   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === DUMMY_SELECT ? 
			  							    "null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === DUMMY_SELECT ? 
			  							  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === DUMMY_SELECT ? 
			  							    	   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null"
					  };
			}
					  
			// send 
			if (formID == null) {
				sendWeatherForm(formData);
				fillSelect();
			}
			else {
				// Create regexes for check of lat, lng and date&time to fetch weather data from openweathermap.
				// SRC for this: http://txt2re.com/index-javascript.php3?s=Sun,%20Jun%2016%202013,%2022:51:39&5&-47&6&22&17&23&4&-48&24&2;
				var dblTester = new RegExp("(\\d+)(\\.)(\\d+)", ["i"]);
				var re1='((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))';	// Day Of Week 1
				var re2='(,)';	// Any Single Character 1
				var re3='.*?';	// Non-greedy match on filler
				var re4='((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))';	// Month 1
				var re5='(\\s+)';	// White Space 1
				var re6='((?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])';	// Day 1
				var re7='(\\s+)';	// White Space 2
				var re8='((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])';	// Year 1
				var re9='(,)';	// Any Single Character 2
				var re10='(\\s+)';	// White Space 3
				var re11='((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';	// HourMinuteSec 1
				
				var dateTimeTester = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11,["i"]);
				var weatherPreviouslySet = formData.windstrength!=0|| formData.winddirection!="null" || formData.airpressure!=0 || formData.temperature!=0 || formData.clouds!="null" || formData.rain!="null" || formData.waveheight!=0 || formData.wavedirection!="null";
				if (!weatherPreviouslySet && 
					firstWeatherFetch &&
					dblTester.exec($('#lat').val()) != null &&
					dblTester.exec($('#lng').val()) != null &&
					dateTimeTester.exec($('#trackDateTime').val()) != null) {
					data={lat: $('#lat').val(),
						  lng: $('#lng').val(),
						  date: $('#trackDateTime').val()};
					fetchWeatherFromSite(data);
				} else updateSentData(formData);
			}
			if (e.keyCode == 13) { //Enter is pressed.
				clearAll();
			}			
		}
	});	
	
	// automated form submit after select entry has been selected.
	$('.form-select').keydown(function(e) { 
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(document).find('input');
			var selects = $(document).find('select');
			if (waypointForm) {
			formData={// weather data
					  ID: formID,													
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === DUMMY_SELECT ? 
											"null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === DUMMY_SELECT ? 
										  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null",

					  // waypoint data
					  name: getDOMElement(inputs, 'name').value || "null",		
					  latitude: getDOMElement(inputs, 'lat').value || "null",
					  longitude: getDOMElement(inputs, 'lng').value || "null", 
					  cog: getDOMElement(inputs, 'cog').value || "null",
					  sog: getDOMElement(inputs, 'sog').value || "null",
					  destination: getDOMElement(selects, 'dest').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'dest').value,
					  maneuver: getDOMElement(selects, 'maneuver').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'maneuver').value,
					  headsail: getDOMElement(selects, 'headSail').value === DUMMY_SELECT ? 
												   "null" : getDOMElement(selects, 'headSail').value,
					  dtm: getDOMElement(inputs, 'dtm').value || "null",
					  btm: getDOMElement(inputs, 'btm').value || "null"
				  	  };
			} else {
			formData={ID: formID,
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === DUMMY_SELECT ? 
					  							   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === DUMMY_SELECT ? 
			  							    "null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === DUMMY_SELECT ? 
			  							  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === DUMMY_SELECT ? 
			  							    	   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null"
					  };
			}
					  					
			// send 
			if (formID == null) sendWeatherForm(formData);
			else updateSentData(formData);	
			if (e.keyCode == 13) { //Enter is pressed.
				clearAll();
			}
		}
	});
	
	$('#delEntryIcon').on('click', function() {
		var entry = $('#entry').val();
		if (entry != null) deleteEntry({ID: map[entry]});
		
	});
	
	$(document).find('#entry').on('change', function() {
		var entry = $(this).find(':selected').text();
		if (entry == '-New Entry-') { clearAll(); }
		else fetchWeatherData ({ID : map[entry]});	
	});	
	
	function sendWeatherForm(data) {
		showGif();
		$.ajax({
			type: "POST",
			url: waypointForm ? "php/waypoint_process.php" : "php/weather_process.php",
			data: { 
				'action': 'send',
				'data': data
			},
			dataType: "json", 
			success: function(data) {
				formID = data;
				hideGif();
				fillSelect();
				if ($('#entry').val() != '-New Entry-') showDel();										
			}
		});
	}
	
	function fetchWeatherData(index) {
		showGif();
		$.ajax({
			type: "POST",
			url: waypointForm ? "php/waypoint_process.php" : "php/weather_process.php",
			data: { 
				'action': 'fetch',
				'data': index
			},
			dataType: "json",
			success: function(data){
				if (waypointForm) {
					formData.name = data[0];
					formData.headsail = data[1];
					formData.latitude = data[2];
					formData.longitude = data[3];
					formData.destination = data[4];
					formData.dtm = data[5];
					formData.cog = data[6];
					formData.sog = data[7];
					formData.maneuver = data[8];
					formData.btm = data[9];										
					formData.ID = data[10];
					formData.windstrength = data[11];
					formData.winddirection = data[12];
					formData.airpressure = data[13];
					formData.temperature = data[14];
					formData.clouds = data[15];
					formData.rain = data[16];
					formData.waveheight = data[17];
					formData.wavedirection = data[18];
					formData.dateandtime = data[19];
				} else {
					formData.ID = data[0];
					formData.windstrength = data[1];
					formData.temperature = data[2];
					formData.winddirection = data[3];
					formData.clouds = data[4];
					formData.airpressure = data[5];
					formData.rain = data[6];
					formData.waveheight = data[7];
					formData.wavedirection = data[8];
					formData.dateandtime = data[9];
				}
				setFieldData(formData);
				hideGif();
				if ($('#entry').val() != '-New Entry-') showDel();
			}
		});		
	}
	
	function updateSentData(data) {
		showGif();
		$.ajax({
			type: "POST",
			url: waypointForm ? "php/waypoint_process.php" : "php/weather_process.php",
			data: { 
				'action': 'update',
				'data': data
			},
			dataType: "json",
			success: function(data) {
				hideGif();
				if ($('#entry').val() != '-New Entry-') showDel();
			}
		});	
	}
	
	function deleteEntry(index) {
		hideDel(); showGif();
		$.ajax({
			type: "POST",
			url: waypointForm ? "php/waypoint_process.php" : "php/weather_process.php",
			data: { 
				'action': 'delete',
				'data': index
			},
			dataType: "json",
			success: function(data) {
				hideGif();
				fillSelect();
			}
		});	
	}
	
	function fillSelect() {
		hideDel(); showGif();
		$.ajax({
			type: "POST",
			url: waypointForm ? "php/waypoint_process.php" : "php/weather_process.php",
			data: { 
				'action': 'select',
				'data': selectSelector
			},
			dataType: "json",
			success: function(data) {
				i=0;
				$(document).find('#entry').empty();
				$(document).find('#entry').append("<option>-New Entry-</option>");
				for (o in data) {
					if (map[data[o]] == null) {
						map[data[o]['DateTime']] = data[o]['ID'];
					}
					$(document).find('#entry').append("<option>"+data[o]['DateTime']+"</option>");
					hideGif();
					if ($('#entry').val() != '-New Entry-') showDel();
				}
				updateCurrSelected();
			}
		});		
	}
	
	function fetchWeatherFromSite(data){
		$.ajax({
			type: "POST",
			url: "http://openweathermap.org/data/2.1/find/city?lat="+data['lat']+"&lon="+data['lng']+"&cnt=1", 
			dataType: "jsonp",
			success: function(data) {
				if (data['cod'] == 200) {
					formData.windstrength = data['list'][0]['wind']['speed'];
					formData.winddirection = getDirectionFromDegrees(data['list'][0]['wind']['deg']);
					formData.airpressure = data['list'][0]['main']['pressure'];
					formData.temperature = data['list'][0]['main']['temp'] - 273.15;
					formData.clouds = getCloudiness(data['list'][0]['clouds']['all']);
					formData.rain = getRainByCode(data['list'][0]['weather'][0]['id']);
					setFieldData(formData);
					updateSentData(formData);
				}
			}
	    });
	}
	
	function getDirectionFromDegrees(degrees) {
		if (degrees > 337.5 && degrees <= 359.9 || degrees >= 0 && degrees <= 22.5) return "North";
		else if (degrees > 22.5 && degrees <= 67.5)  return "North-East";
		else if (degrees > 67.5 && degrees <= 112.5) return "East";
		else if (degrees > 112.5 && degrees <= 157.5) return "South-East";
		else if (degrees > 157.5 && degrees <= 202.5) return "South";
		else if (degrees > 205.5 && degrees <= 247.5) return "South-West";
		else if (degrees > 247.5 && degrees <= 292.5) return "West";
		else if (degrees > 292.5 && degrees <= 337.5) return "North-West";
		else return DUMMY_SELECT;
	}
	
	function getCloudiness(percentage) {
		if (percentage < 20) return "Sunny";
		else if (percentage < 40) return "Partly Cloudy";
		else if (percentage < 60) return "Cloudy";
		else if (percentage < 80) return "Rain";
		else if (percentage < 90) return "Snow";
		else if (percentage < 100) return "Thunder / Storm";
		else return DUMMY_SELECT;
	}
	
	function getRainByCode(code){
		switch(code) {
			case 300:
			case 301:	
			case 302:
				return "0 - 2 mm/sqm";
				break;
			case 310: 
			case 311:
			case 312:
				return "2 - 4 mm/sqm";
				break;
			case 500:
			case 321:
				return "4 - 8 mm/sqm";
				break;
			case 501:
			case 502:
			case 503:
				return "8 - 15 mm/sqm";
				break;
			case 504:
			case 511:
			case 520:
				return "15 - 25 mm/sqm";
				break;
			case 521:
			case 522:
				return ">25 mm/sqm";
				break;
			default: return DUMMY_SELECT;
		}		
	}
});