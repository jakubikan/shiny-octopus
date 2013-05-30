(function($) {
  Tc.Module.Appmenu = Tc.Module.extend({
	offset: 30,
    on: function(callback) {
    	var self = this;
    	
    	
    	// Adding active class per javascript to the header
    	
        callback();
    },
    after: function() { 
    	var self = this;
		self.$ctx.parent().css("padding-bottom", self.$ctx.height()+  "px");
	
    }
  });
})(Tc.$);