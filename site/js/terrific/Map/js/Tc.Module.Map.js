(function($) {
  Tc.Module.Map = Tc.Module.extend({
    on: function(callback) {
    	var self = this;
    	    	
        callback();
    },
    after: function() { 
    	var self = this;
	
    }
  });
})(Tc.$);