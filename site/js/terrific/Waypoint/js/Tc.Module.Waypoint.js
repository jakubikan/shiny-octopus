(function($) {
  Tc.Module.Waypoint = Tc.Module.extend({
    on: function(callback) {
		$('.waypt-formelement').onblur(function() { // set onsubmit event to the form
		  var data = $('#waypt-form').serialize(); // serialize all the data in the form 
		  $.ajax({
			url: '../waypoint-process.php', // php script to return json encoded string
			data: data,  // serialized data to send to server
			dataType:'json', // set receiving type - JSON in case of a question
			type:'POST', // set sending HTTP Request type
			async:false, 
			success: function(data) { // callback method for further manipulations             
				console.log("Successfully sent form data to server!");
			},
			error: function(data) { // if error occured
				console.error("Error sending form data to server! See Waypoint.js module");
			}
		  });
		  return false;
		});

        callback();
    },
    after: function() { 
	
    }
  });
})(Tc.$);