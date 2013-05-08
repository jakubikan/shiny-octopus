(function($) {
  Tc.Module.Weather = Tc.Module.extend({
    on: function(callback) {
    	var self  = this;
<<<<<<< HEAD
    	
    	
		$("form",self.$ctx).data("errors", true);
		
=======
    			
		function leftPad(number, targetLength) {
 	   		var output = number + '';
    		while (output.length < targetLength) {
				output = '0' + output;
			}
			return output;
		}	
			
>>>>>>> Added: autofill date field with current date and time
    	$("input", self.$ctx).blur(function() {
    		type = $(this).data("validation");
    		result = self.validateField($(this), type, self);
    		
    		if (result){
    			
    			// Control-group
    			$(this).parent()
    			.removeClass("error")
    			.addClass("success");
    			
    			// elements e.g span
    			$(this).parent().children()
    			.removeClass("text-error")
    			.addClass("text-success");
    			
    			$(this).parents("form").data("errors", false);
    			
    			
    			$(this).siblings(".help-block").fadeOut("slow");
    			
    		} else {
    			
    			// Control-group
    			$(this).parent()
    			.removeClass("success")
    			.addClass("error");
    			
    			// elements e.g span
    			$(this).parent().children()
    			.removeClass("text-success")
    			.addClass("text-error");
    			
    			
    			$(this).parents("form").data("errors", true);
    			
    			$(this).siblings(".help-block").fadeIn("slow");
    		}
    	});
    	
<<<<<<< HEAD
=======
		
		var date = new Date();
		var dateDay;
		switch(date.getDay()) {
			case 0: dateDay = "Mon";
					break;
			case 1: dateDay = "Tue";
					break;
			case 2: dateDay = "Wed";
					break;
			case 3: dateDay = "Thu";
					break;
			case 4: dateDay = "Fri";
					break;
			case 5: dateDay = "Sat";
					break;
			case 6: dateDay = "Sun";
					break;
		}
		var dateMonth;
		switch(date.getMonth()) {
			case 0: dateMonth = "Jan";
					break;
			case 1: dateMonth = "Feb";
					break;
			case 2: dateMonth = "Mar";
					break;
			case 3: dateMonth = "Apr";
					break;
			case 4: dateMonth = "May";
					break;
			case 5: dateMonth = "Jun";
					break;
			case 6: dateMonth = "Jul";
					break;
			case 7: dateMonth = "Aug";
					break;
			case 8: dateMonth = "Sep";
					break;
			case 9: dateMonth = "Oct";
					break;
			case 10: dateMonth = "Nov";
					 break;
			case 11: dateMonth = "Dec";
					 break;
		}
		var dateHours = leftPad(date.getHours(), 2);		
		var dateMinutes = leftPad(date.getMinutes(), 2);
		
		var dateText = dateDay+", "+dateMonth+" "+date.getDate()+" "+date.getFullYear()+", "+dateHours+":"+dateMinutes;
		$(document).find("#trackDateTime").val(dateText);
    	
		
>>>>>>> Added: autofill date field with current date and time
        callback();
    },
    after: function() { 
	
    },
    
    /*
     * type can be: windstrength, temperature, meters, airpreasure, datetime
     */
    validateField : function (element, type, context) {
    	if($.type(context[type]) === "function") {
    		return context[type].call(context, element);
    	}
    	return false;
    	
    	
    },
    
    windstrength: function (element) {
    	var self = this;
    
    	return self.numberValidation(element.val());
    	
    },
    temperature: function (element) {
    	var self = this;
    	val = element.val()
    	if(self.numberValidation(val)) {
    		floatVal = parseFloat(val);
    		if (floatVal <= 273.15 && floatVal >= -273.15) {
    			return true;
    		} else {
    			return false;
    		}
    	}
    },
    meters: function (element) {
    	var self = this;
    	return self.numberValidation(element.val());
    	
    },
    airpreasure: function (element) {
    	var self = this;
    	return self.numberValidation(element.val());
    },
    
    numberValidation: function(string) {
    	pattern = new RegExp("^[0-9.]+$");
    	return pattern.test(string);
    	
    }
    
    
  });
})(Tc.$);