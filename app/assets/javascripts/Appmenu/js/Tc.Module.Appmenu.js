(function($) {
  Tc.Module.Appmenu = Tc.Module.extend({
	offset: 10,
    on: function(callback) {
    	var self = this;
    	
    	
    	// Adding active class per javascript to the header
    	
        callback();
    },
    after: function() { 
    	var self = this;
		$("+", self.$ctx).css("padding-top",self.$ctx.height() + self.offset + "px");
	
    }
  });
})(Tc.$);