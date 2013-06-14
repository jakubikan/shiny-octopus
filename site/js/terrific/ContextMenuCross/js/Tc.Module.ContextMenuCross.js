(function($) {

	/*
	 * Because of DRY Principal -> Extends ContextMenu 
	 * on, open and close functions see Tc.Module.ContextMenu
	 */
	Tc.Module.ContextMenuCross= Tc.Module.ContextMenu.extend({
		after : function() {
			var self = this;
			$("[data-id='cross-marker-switch']",self.$ctx).bind("click",function(e) {
				self.fire("switchCrossToMarker",self.currentWorkingObject,function(){});		
				self.closeContextMenu.call(this,self);	
				
			});
		},
	});
})(Tc.$);