(function($) {
  Tc.Module.Weather = Tc.Module.extend({
    on: function(callback) {
    	var self  = this;
    	
    	
		$("form",self.$ctx).data("errors", true);
		
    	$("input", self.$ctx).blur(function() {
    		type = $(this).data("validation");
    		result = self.validateField($(this), type, self);
    		
    		if (result){
    			
    			// Controll-group
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
    			
    			// Controll-group
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