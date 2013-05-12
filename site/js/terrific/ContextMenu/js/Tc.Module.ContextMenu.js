(function($) {
  Tc.Module.ContextMenu = Tc.Module.extend({
    on: function(callback) {
    	var self = this;
        self.sandbox.subscribe(1, self);
    	
    	
        callback();
    },
    after: function() { 
    	
    },
    
    onContextRequest: function () {
    	var self = this;
    	$('.dropdown-menu').dropdown("toggle");
    	console.log("fire event received");
    }
    
    
  });
})(Tc.$);