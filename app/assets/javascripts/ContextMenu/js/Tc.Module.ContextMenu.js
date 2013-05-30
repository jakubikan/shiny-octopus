(function($) {
	Tc.Module.ContextMenu = Tc.Module.extend({
		on : function(callback) {
			var self = this;
			self.sandbox.subscribe(1, self);

			callback();
		},
		after : function() {
			var self = this;
			
			$("[data-id='add-marker']",self.$ctx).bind("click",function(e) {
				lat = self.$ctx.data("lat");
				lng = self.$ctx.data("lng");
				
				$.extend(e, {latLng: new google.maps.LatLng(lat, lng) })
				self.addMarker.call(this, self, e);
				
				$('.dropdown-menu', self.$ctx).addClass("fade");
				
				
				
			});
			
			$("[data-id='calculate-distance']",self.$ctx).bind("click",function(e) {
				lat = self.$ctx.data("lat");
				lng = self.$ctx.data("lng");
				
				$.extend(e, {latLng: new google.maps.LatLng(lat, lng) })
				
				
				$('.dropdown-menu', self.$ctx).addClass("fade");
				
				
				
			});
			
			$("[data-id='make-goal']",self.$ctx).bind("click",function(e) {
				lat = self.$ctx.data("lat");
				lng = self.$ctx.data("lng");
				
				$.extend(e, {latLng: new google.maps.LatLng(lat, lng) })
				
			$('.dropdown-menu', self.$ctx).addClass("fade");
				
				
			});
			
			

		},

		onContextRequest : function(event) {
			var self = this;
			console.log("Context requested");
			
			
			$(".dropdown-menu", self.$ctx).removeClass("fade");
			$(".dropdown-menu", self.$ctx).dropdown("toggle");
			$(".dropdown-menu", self.$ctx).css({
				"display" : "visible",
				"left" : event.pixel.x,
				"top" : event.pixel.y
			});
			$("[data-id='position']", self.$ctx)
				.html( 	"Lat: " + self.$ctx.data("lat") + 
						" Lng: " + self.$ctx.data("lng"));

		},

		onHideContext : function(event) {
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
		
		makeGoal : function(event) {
			
		},
		
		calculateDistance : function(event) {
			
		}
	});
})(Tc.$);