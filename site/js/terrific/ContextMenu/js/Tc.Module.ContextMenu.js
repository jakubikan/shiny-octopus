(function($) {
	Tc.Module.ContextMenu = Tc.Module.extend({
		currentWorkingObject:null, 
		on : function(callback) {
			var self = this;
			self.sandbox.subscribe(1, self);

			callback();
		},
		after : function() {
			var self = this;
			//REFAK: MARKER
			$("[data-id='remove-marker']",self.$ctx).on("click",function(e) {
				/*
				lat = self.$ctx.data("lat");
				lng = self.$ctx.data("lng");
				
				$.extend(e, {latLng: new google.maps.LatLng(lat, lng) })
				self.addMarker.call(this, self, e);
				*/
				self.fire("removeMarker",self.currentWorkingObject,function(){});
				
				self.closeContextMenu.call(this,self);
				
				
				
			});
			
			$("[data-id='calculate-distance']",self.$ctx).bind("click",function(e) {
				/*lat = self.$ctx.data("lat");
				lng = self.$ctx.data("lng");
				
				$.extend(e, {latLng: new google.maps.LatLng(lat, lng) })
				*/
				self.fire("calculateDistance",self.currentWorkingObject,function(){});
				
				self.closeContextMenu.call(this,self);
				
				
				
			});
			
			$("[data-id='make-route']",self.$ctx).bind("click",function(e) {
				/*lat = self.$ctx.data("lat");
				lng = self.$ctx.data("lng");
				
				$.extend(e, {latLng: new google.maps.LatLng(lat, lng) })
				*/
				self.fire("makeRoute",null,function(){});
				self.closeContextMenu.call(this,self);			
			});
			//REFAK: MARKER END
			//REFAK: ROUTE
			$("[data-id='remove-route']",self.$ctx).bind("click",function(e) {

				self.fire("removeRoute",self.currentWorkingObject,function(){});	
				self.closeContextMenu.call(this,self);		
				
			});
			$("[data-id='route-marker-switch']",self.$ctx).bind("click",function(e) {

				self.fire("switchRouteToMarkers",self.currentWorkingObject,function(){});		
				self.closeContextMenu.call(this,self);	
				
			});
			//REFAK: ROUTE END
			//REFAK: CROSS
			$("[data-id='cross-marker-switch']",self.$ctx).bind("click",function(e) {

				self.fire("switchCrossToMarker",self.currentWorkingObject,function(){});		
				self.closeContextMenu.call(this,self);	
				
			});
			//REFAK: CROSS END
			
			

		},

		closeContextMenu : function(self){
			$('.dropdown-menu', self.$ctx).addClass("hide");
			$(".dropdown-menu", self.$ctx).toggleClass("open",false);

		},

		onContextRequest : function(event) {
			var self = this;
			console.log("Context requested");
			
			self.currentWorkingObject = event.obj;
			
			map = event.obj.map;
			canvas = map.getDiv();
			position = $(canvas).position();

			$(".dropdown-menu", self.$ctx).removeClass("hide");
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