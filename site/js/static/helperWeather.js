$(document).ready(function() {
	var formID = null;
	var formData;
	var selectSelector = {selector : '#entry'};
	var waypointForm;		// true if the requests have to be sent to waypoint-process.php, 
							// false if they will be sent to weather-process.php
	var map = {};

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
			formID = formData[10];
			getDOMElement(inputs, "windStrength").value = formData[11] != 0 ? formData[11] : "";
			getDOMElement(selects, "windDirection").value = formData[12] != 'null' ? formData[12] : "-Please select-";
			getDOMElement(inputs, "airPressure").value = formData[13] != 0 ? formData[13] : "";
			getDOMElement(inputs, "temp").value = formData[14] != 0 ? formData[14] : "";
			getDOMElement(selects, "clouds").value = formData[15] != 'null' ? formData[15] : "-Please select-";
			getDOMElement(selects, "rain").value = formData[16] != 'null' ? formData[16] : "-Please select-";
			getDOMElement(inputs, "waveHeight").value = formData[17] != 0 ? formData[17] : "";
			getDOMElement(selects, "waveDirection").value = formData[18] != 'null' ? formData[18] : "-Please select-";
			getDOMElement(inputs, "trackDateTime").value = formData[19] != 0 ? formData[19] : "";
		
			// Waypoint data
			getDOMElement(inputs, "name").value = formData[0] != 'null' ? formData[0] : "";
			getDOMElement(selects, "headSail").value = formData[1] != 'null' ? formData[1] : "-Please select-";
			getDOMElement(inputs, "lat").value = formData[2] != 'null' ? formData[2] : "";
			getDOMElement(inputs, "lng").value = formData[3] != 'null' ? formData[3] : "";
			getDOMElement(selects, "dest").value = formData[4] != 'null' ? formData[4] : "-Please select-";
			getDOMElement(inputs, "dtm").value = formData[5] != 'null' ? formData[5] : "";
			getDOMElement(inputs, "cog").value = formData[6] != 'null' ? formData[6] : "";
			getDOMElement(inputs, "sog").value = formData[7] != 'null' ? formData[7] : "";
			getDOMElement(selects, "maneuver").value = formData[8] != 'null' ? formData[8] : "-Please select-";
			getDOMElement(inputs, "btm").value = formData[9] != 'null' ? formData[9] : "";
			
		} else {
			formID = formData[0];
			getDOMElement(inputs, "windStrength").value = formData[1] != 0 ? formData[1] : "";
			getDOMElement(selects, "windDirection").value = formData[3] != 'null' ? formData[3] : "-Please select-";
			getDOMElement(inputs, "airPressure").value = formData[5] != 0 ? formData[5] : "";
			getDOMElement(inputs, "temp").value = formData[2] != 0 ? formData[2] : "";
			getDOMElement(selects, "clouds").value = formData[4] != 'null' ? formData[4] : "-Please select-";
			getDOMElement(selects, "rain").value = formData[6] != 'null' ? formData[6] : "-Please select-";
			getDOMElement(inputs, "waveHeight").value = formData[7] != 0 ? formData[7] : "";
			getDOMElement(selects, "waveDirection").value = formData[8] != 'null' ? formData[8] : "-Please select-";
			getDOMElement(inputs, "trackDateTime").value = formData[9] != 0 ? formData[9] : "";
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
			$(this).val("-Please select-");
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
	}
	
	function updateCurrSelected() {
		$('#entry').val(formData != null && formData.dateandtime != null ? 
										   formData.dateandtime : '-New Entry-');	
	}
	
	// automated form submit after key is released on form input elements.
	$('.form-input').keyup(function(e) { 
	
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(document).find('input');
			var selects = $(document).find('select');
			if (waypointForm) {
			formData={// weather data
					  ID: formID,													
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === '-Please select-' ? 
											"null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === '-Please select-' ? 
										  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null",

					  // waypoint data
					  name: getDOMElement(inputs, 'name').value || "null",		
					  latitude: getDOMElement(inputs, 'lat').value || "null",
					  longitude: getDOMElement(inputs, 'lng').value || "null", 
					  cog: getDOMElement(inputs, 'cog').value || "null",
					  sog: getDOMElement(inputs, 'sog').value || "null",
					  destination: getDOMElement(selects, 'dest').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'dest').value,
					  maneuver: getDOMElement(selects, 'maneuver').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'maneuver').value,
					  headsail: getDOMElement(selects, 'headSail').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'headSail').value,
					  dtm: getDOMElement(inputs, 'dtm').value || "null",
					  btm: getDOMElement(inputs, 'btm').value || "null"
				  	  };
			} else {
			formData={ID: formID,
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === '-Please select-' ? 
					  							   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === '-Please select-' ? 
			  							    "null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === '-Please select-' ? 
			  							  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === '-Please select-' ? 
			  							    	   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null"
					  };
			}
					  
			// send 
			if (formID == null) {
				sendWeatherForm(formData);
				fillSelect();
			}
			else updateSentData(formData);
			if (e.keyCode == 13) { //Enter is pressed.
				clearAll();
			}			
		}
	});	
	
	// automated form submit after select entry has been selected.
	$('.form-select').keyup(function(e) { 
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(document).find('input');
			var selects = $(document).find('select');
			if (waypointForm) {
			formData={// weather data
					  ID: formID,													
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === '-Please select-' ? 
											"null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === '-Please select-' ? 
										  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'waveDirection').value,
					  dateandtime: getDOMElement(inputs, 'trackDateTime').value || "null",

					  // waypoint data
					  name: getDOMElement(inputs, 'name').value || "null",		
					  latitude: getDOMElement(inputs, 'lat').value || "null",
					  longitude: getDOMElement(inputs, 'lng').value || "null", 
					  cog: getDOMElement(inputs, 'cog').value || "null",
					  sog: getDOMElement(inputs, 'sog').value || "null",
					  destination: getDOMElement(selects, 'dest').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'dest').value,
					  maneuver: getDOMElement(selects, 'maneuver').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'maneuver').value,
					  headsail: getDOMElement(selects, 'headSail').value === '-Please select-' ? 
												   "null" : getDOMElement(selects, 'headSail').value,
					  dtm: getDOMElement(inputs, 'dtm').value || "null",
					  btm: getDOMElement(inputs, 'btm').value || "null"
				  	  };
			} else {
			formData={ID: formID,
					  windstrength: getDOMElement(inputs, "windStrength").value || 0,
					  winddirection: getDOMElement(selects, 'windDirection').value === '-Please select-' ? 
					  							   "null" : getDOMElement(selects, 'windDirection').value,
					  airpressure: getDOMElement(inputs, 'airPressure').value || 0,
					  temperature: getDOMElement(inputs, 'temp').value || 0,
					  clouds: getDOMElement(selects, 'clouds').value === '-Please select-' ? 
			  							    "null" : getDOMElement(selects, 'clouds').value,
					  rain: getDOMElement(selects, 'rain').value === '-Please select-' ? 
			  							  "null" : getDOMElement(selects, 'rain').value,
					  waveheight: getDOMElement(inputs, 'waveHeight').value || 0,
					  wavedirection: getDOMElement(selects, 'waveDirection').value === '-Please select-' ? 
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
				formData = data;
				setFieldData(data);
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
});