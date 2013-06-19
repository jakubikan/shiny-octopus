require([
         "helper",
         "helper2",
         "Appmenu/js/Tc.Module.Appmenu", 
         "ContextMenu/js/Tc.Module.ContextMenu", 
         "Footer/js/Tc.Module.Footer", 
         "Header/js/Tc.Module.Header", 

         "Map/js/Tc.Module.Map", 
         "Waypoint/js/Tc.Module.Waypoint", 
         "Weather/js/Tc.Module.Weather",
                  "ContextMenuCross/js/Tc.Module.ContextMenuCross", 
         "ContextMenuMarker/js/Tc.Module.ContextMenuMarker", 
         "ContextMenuRoute/js/Tc.Module.ContextMenuRoute"

], function(l) {
	(function($) {
	    $(document).ready(function() {
	        var $page = $('body'),
	            application = new Tc.Application($page);
	
	        application.registerModules();
	        application.start();
			
	    });
	    
	})(Tc.$);
});


