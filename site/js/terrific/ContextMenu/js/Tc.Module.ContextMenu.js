(function($) {
	Tc.Module.ContextMenu = Tc.Module.extend({
		currentWorkingObject:null, 
		on : function(callback) {
			var self = this;
			callback();
		},
		after : function() {
		},
		
		onCloseContextMenu: function() {
			var self = this;
			self.closeContextMenu.call(this, self);
		},

		closeContextMenu : function(self){
			$(".dropdown-menu", self.$ctx).parent().removeClass("open")

		},

		onContextRequest : function(event) {
			var self = this;
			console.log("Context requested");
			
			self.fire("closeContextMenu", null, ["context"], function(){});
			
			self.currentWorkingObject = event.obj;
			
			map = event.obj.map;
			canvas = map.getDiv();
			position = $(canvas).position();
			$(".dropdown-menu", self.$ctx).dropdown("toggle");
			$(".dropdown-menu", self.$ctx).css({
				display : "visible",
				"left" : event.event.pixel.x + position.left,
				"top" : event.event.pixel.y + position.top,
			});
			$("[data-id='position']", self.$ctx)
				.html( 	"Lat: " + event.koords.latDMS + 
						" Lng: " + event.koords.lngDMS);

		},

	});
})(Tc.$);