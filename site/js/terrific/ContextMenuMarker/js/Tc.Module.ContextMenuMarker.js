(function($) {
	/*
	 * Because of DRY Principal -> Extends ContextMenu 
	 * on, open and close functions see Tc.Module.ContextMenu
	 */
	Tc.Module.ContextMenuMarker= Tc.Module.ContextMenu.extend({
		currentWorkingObject:null, 
		on : function(callback) {
			var self = this;
			self.sandbox.subscribe(1, self);

			callback();
		},
		after : function() {
			var self = this;
			$("[data-id='remove-marker']",self.$ctx).on("click",function(e) {
				self.fire("removeMarker",self.currentWorkingObject,function(){});
				e.stopImmediatePropagation();
				self.closeContextMenu.call(this,self);
			});
			
			$("[data-id='calculate-distance']",self.$ctx).bind("click",function(e) {
				self.fire("calculateDistance",self.currentWorkingObject,function(){});
				e.stopImmediatePropagation();
				self.closeContextMenu.call(this,self);
			});
			
			$("[data-id='make-route']",self.$ctx).bind("click",function(e) {
				self.fire("makeRoute",null,function(){});
				e.stopImmediatePropagation();
				self.closeContextMenu.call(this,self);			
			});

		},
		
	});
})(Tc.$);