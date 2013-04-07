(function($) {
  Tc.Module.Header = Tc.Module.extend({
    on: function(callback) {
        callback();
    },
    after: function() { 
		$(".headerfix").css("padding-top",$(".mod-header").height() + "px");
	
    }
  });
})(Tc.$);