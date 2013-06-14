(function($) {
	Tc.Module.ContextMenuRoute = Tc.Module.ContextMenu.extend({
		after : function() {
			var self = this;
			$("[data-id='remove-route']",self.$ctx).bind("click",function(e) {
				self.fire("removeRoute",self.currentWorkingObject,function(){});	
				e.stopImmediatePropagation();
				self.closeContextMenu.call(this,self);		
			});
			$("[data-id='route-marker-switch']",self.$ctx).bind("click",function(e) {
				self.fire("switchRouteToMarkers",self.currentWorkingObject,function(){});		
				e.stopImmediatePropagation();
				self.closeContextMenu.call(this,self);	
			});
		},

	});
})(Tc.$);