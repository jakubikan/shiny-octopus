(function($) {
  Tc.Module.Header = Tc.Module.extend({
    on: function(callback) {
    	var self = this;
    	console.log(window.location);
    	phpfilesplit = window.location.pathname.split("/");
    	phpfile = phpfilesplit[phpfilesplit.length - 1];
    	console.log(phpfile);
    	$("a[href*='"+phpfile+"']",self.$ctx).parents("li").addClass("active");
    	
    	
    	
    	
    	
    	
        callback();
    },
    after: function() { 
		$("#header +").css("padding-top",$(".mod-header").height() + "px");
	
    }
  });
})(Tc.$);