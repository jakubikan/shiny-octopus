(function($) {
  Tc.Module.Header = Tc.Module.extend({
    on: function(callback) {
    	var self = this;
    	
    	
    	// Adding active class per javascript to the header
    	phpfilesplit = window.location.pathname.split("/");
    	phpfile = phpfilesplit[phpfilesplit.length - 1];
    	$("a[href*='"+phpfile+"']",self.$ctx).parents("li").addClass("active");
    	
        callback();
    },
    after: function() { 
		$("#header +").css("padding-top",$(".mod-header").height() + "px");
	
    }
  });
})(Tc.$);