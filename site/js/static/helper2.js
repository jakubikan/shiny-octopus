$(document).ready(function() {
	var formID = null;
	var formData;
	var selectSelector = {selector : '#entry'};
	var map = {};

	fillSelect();
   
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
      
        var target = this.hash,
        $target = $(target);
      
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-$(".mod-header").height()
        }, 900, 'swing', function () {
        });
		
    });	
		
	function getDOMElement(array, id) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].id.indexOf(id) != -1) return array[i];
		}
	}
		
	function setFieldData(formData) {
		console.log("Fetched data: "+formData);
		
		var inputs = $(document).find('input');
		var selects = $(document).find('select');
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
		
		// Format: Fri, May 16 2013, 11:01
		dateText = $.datepicker.formatDate("D, M d yy", date);		
		$(document).find("#trackDateTime").val(dateText  +", "+dateHours+":"+dateMinutes);
	}
	
	function clearAll(){
		clearFields();
		formID = null;
		$(document).find('#entry').val('-New Entry-');
	}
	
	function updateCurrSelected() {
		$(document).find('#entry').value = formData != null && formData.dateandtime != null ? 
										   formData.dateandtime : '-New Entry-';	
	}
	
	// automated form submit after key is released on form input elements.
	$('.weather-form-input').keyup(function(e) { 
	
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(this).closest('.well').find('input');
			var selects = $(this).closest('.well').find('select');
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
	$('.weather-form-select').keyup(function(e) { 
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(this).closest('.well').find('input');
			var selects = $(this).closest('.well').find('select');
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
					  					
			// send 
			if (formID == null) sendWeatherForm(formData);
			else updateSentData(formData);
			if (e.keyCode == 13) { //Enter is pressed.
				clearAll();
			}
		}
	});
	
	$(document).find('#entry').on('change', function() {
		var entry = $(this).find(':selected').text();
		if (entry == '-New Entry-') { clearAll(); }
		else fetchWeatherData({"id" : map[entry]});	
	});	
	
	function sendWeatherForm(data) {
		$.ajax({
			type: "POST",
			url: "php/weather_process.php",
			data: { 
				'action': 'send',
				'data': data
			},
			dataType: "json", 
			success: function(data) {
				formID = data;
			}
		});
	}
	
	function fetchWeatherData(index) {
		$.ajax({
			type: "POST",
			url: "php/weather_process.php",
			data: { 
				'action': 'fetch',
				'data': index
			},
			dataType: "json",
			success: function(data){
				formData = data;
				setFieldData(data);
			}
		});		
	}
	
	function updateSentData(data) {
		$.ajax({
			type: "POST",
			url: "php/weather_process.php",
			data: { 
				'action': 'update',
				'data': data
			},
			dataType: "json",
		});	
	}
	
	function fillSelect() {
		$.ajax({
			type: "POST",
			url: "php/weather_process.php",
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
					if (map[data[o]] != data[o]['ID']) {
						map[data[o]['DateTime']] = data[o]['ID'] + " #";
					}
					$(document).find('#entry').append("<option>"+data[o]['DateTime']+"</option>");
				}
				updateCurrSelected();
			}
		});
		
	}
});