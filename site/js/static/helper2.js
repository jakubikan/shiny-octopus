$(document).ready(function() {
   	var formID = null;
	var formData;
   
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
      
        var target = this.hash,
        $target = $(target);
      
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-$(".mod-header").height()
        }, 900, 'swing', function () {
            //window.location.hash = target;
        });
		
    });
	
	function setId(data) {
		formID = data;
		console.log("helper2.js formId is: " + formID);
	}
		
	function getDOMElement(array, id) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].id.indexOf(id) != -1) return array[i];
		}
	}
	
	// automated form submit after key is released on form input elements.
	$('.weather-form-input').keyup(function(e) { 
	
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(this).closest('.well').find('input');
			var selects = $(this).closest('.well').find('select');
			formData={windstrength: getDOMElement(inputs, "windStrength").value || 0,
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
				inputs.each(function(index, element) {
                	$(this).val("");
				});
				selects.each(function(index, element) {
					$(this).val("");
				});
				formID = null;
			}			
		}
	});
	
	
	// automated form submit after select entry has been selected.
	$('.weather-form-select').keyup(function(e) { 
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(this).closest('.well').find('input');
			var selects = $(this).closest('.well').find('select');
			formData={windstrength: getDOMElement(inputs, "windStrength").value || 0,
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
				inputs.each(function(index, element) {
                	$(this).val("");
				});
				selects.each(function(index, element) {
					$(this).val("");
				});
				formID = null;
			}
		}
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
				setId(data);
			}
		});
	}
	
//	sendWeatherForm(formData).done(setId);
	
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
//				updateChat();
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
			success: function(data){
				
			}
		});	
	}
});