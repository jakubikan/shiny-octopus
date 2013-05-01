(function($) {
  Tc.Module.Map = Tc.Module.extend({
    on: function(callback) {
    	var self = this;
    	// Selector to select from the module context.
    	$(".class", self.$ctx);
    	
    	
        callback();
    },
    after: function() { 
    	var self = this;
	
    }
  });
})(Tc.$);