(function($) {
  Tc.Module.Weather = Tc.Module.extend({
    on: function(callback) {
    	var self  = this;
    	
    	
		$("form",self.$ctx).data("errors", true);
    			
    	$("input", self.$ctx).blur(function() {
    		self.onBlur.call(this, self);
    	});
    	
		
		var date = new Date();
		var dateHours = self.leftPad(date.getHours(), 2);		
		var dateMinutes = self.leftPad(date.getMinutes(), 2);
		
		// Fri, May 16 2013, 11:01
		dateText = $.datepicker.formatDate("D, M d yy", date);
		
		$(document).find("#trackDateTime").val(dateText  +", "+dateHours+":"+dateMinutes);
    	
		
        callback();
    },
    after: function() { 
	
    },
    
    
    onBlur: function(self) {
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
	},
	
	leftPad : function(number, targetLength) {
   		var output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
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