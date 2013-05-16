(function($) {
  Tc.Module.Appmenu = Tc.Module.extend({
    on: function(callback) {
    	var self = this;
    	
    	
    	// Adding active class per javascript to the header
    	
        callback();
    },
    after: function() { 
    	var self = this;
		$("+", self.$ctx).css("padding-top",$(".mod-header").height() + "px");
	
    }
  });
})(Tc.$);