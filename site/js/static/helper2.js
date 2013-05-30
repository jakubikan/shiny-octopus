$(document).ready(function() {
   	var formID = null;
   
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
	
	
	// automated form submit after key is released on form input elements.
	$('.weather-form-input').keyup(function(e) { 
	
		if (e.keyCode == 13 || e.keyCode == 9) { //Enter or TAB is pressed.
			var inputs = $(this).siblings('input');
			var selects = $(this).siblings('select');
			var data={'windstrength':inputs.find('#windStrength').val(),
					  'winddirection':selects.find('#windDirection').val(),
					  'airpressure':inputs.find('#airPressure').val(),
					  'temperature':inputs.find('#temp').val(),
					  'clouds':selects.find('#clouds').val(),
					  'rain':selects.find('#rain').val(),
					  'waveheight':inputs.find('#waveHeight').val(),
					  'wavedirection':selects.find('#waveDirection').val(),
					  'dateandtime':inputs.find('#trackDateTime').val()
					  }
					
			// send 
			if (formID == null) sendWeatherForm(data);
			else updateSentData(data);
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
	
	
	// audomated form submit after select entry has been selected.
	$('.weather-form-select').change(function(e) { 
	
		var inputs = $(this).siblings('input');
		var selects = $(this).siblings('select');
		var data={'windstrength':inputs.find('#windStrength').val(),
				  'winddirection':selects.find('#windDirection').val(),
				  'airpressure':inputs.find('#airPressure').val(),
				  'temperature':inputs.find('#temp').val(),
				  'clouds':selects.find('#clouds').val(),
				  'rain':selects.find('#rain').val(),
				  'waveheight':inputs.find('#waveHeight').val(),
				  'wavedirection':selects.find('#waveDirection').val(),
				  'dateandtime':inputs.find('#trackDateTime').val()
				  }
				
		// send 
		sendWeatherForm(data);
	});
	
	function sendWeatherForm(formData) {
		$.ajax({
			type: "POST",
			url: "../../php/weather_process.php",
			data: { 
				'action': 'send',
				'formData': formData
			},
			dataType: "json",
			success: function(id){
				formID = id;
			}
		});
	}
	
	function fetchWeatherData(index) {
		$.ajax({
			type: "POST",
			url: "../../php/weather_process.php",
			data: { 
				'action': 'fetch',
				'formData': formData
			},
			dataType: "json",
			success: function(data){
//				updateChat();
			}
		});		
	}
	
	function updateSentData(formData) {
		$.ajax({
			type: "POST",
			url: "../../php/weather_process.php",
			data: { 
				'action': 'fetch',
				'formData': formData
			},
			dataType: "json",
			success: function(data){
				
			}
		});	
	}
});