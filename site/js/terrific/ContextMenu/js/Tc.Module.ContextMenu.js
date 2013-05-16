(function($) {
	Tc.Module.ContextMenu = Tc.Module.extend({
		on : function(callback) {
			var self = this;
			self.sandbox.subscribe(1, self);

			callback();
		},
		after : function() {

		},

		onContextRequest : function(event) {
			var self = this;
			$('.dropdown-menu', self.$ctx).removeClass("fade");
			$('.dropdown-menu', self.$ctx).dropdown("toggle");
			$(".dropdown-menu", self.$ctx).css({
				"left" : event.pixel.x,
				"top" : event.pixel.y,
			});
			$("[data-id='position']", self.$ctx).html(
					"Lat: " + self.$ctx.data("lat") + " Lng: "
							+ self.$ctx.data("lng"));
			console.log(event);

		},

		onHideContext : function(event) {
			console.log("hiding");
			$('.dropdown-menu', self.$ctx).addClass("fade");
		},

		onLngLatChanged : function(event) {
			var self = this;
			self.$ctx.data("lat", event.latLng.lat());
			self.$ctx.data("lng", event.latLng.lng());
		},
		
		addMarker : function(self, event) {
			self.fire("markerAdd", event, function() {} );
			
		},
		
		makeGoal : function() {
			
		},
		
		calculateDistance : function() {
			
		}
	});
})(Tc.$);