(function($) {
  Tc.Module.Map = Tc.Module.extend({
	  
	latLngs : [],
	markers : [],
	routes : [],
	latDMS: null,
	lngDMS: null,
	crosshair: null,
	map : null,
	mapOptions : {
		disableDoubleClickZoom: true,
		center: new google.maps.LatLng(47.667272, 9.171036),
		zoom: 18,
		mapTypeId: "OSM",
		mapTypeControl: false,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.SMALL
		},					
	},
	  
    on: function(callback) {
    	var self = this;
    	$canvas = $("#map-canvas", self.$ctx);
		self.map = new google.maps.Map($canvas[0], self.mapOptions);
		
		
		// Open Street Map
		self.map.mapTypes.set("OSM", new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
				return "http://tile.openstreetmap.org/" + zoom +
				"/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "OpenStreetMap",
			maxZoom: 18
		}));
		
		// Open Sea Map
		self.map.overlayMapTypes.push(new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
			return "http://tile.openseamap.org/seamark/" + zoom +
			"/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "OpenSeaMap",
			maxZoom: 18
		}));
		
    	    	
        callback();
    },
    after: function() { 
    	var self = this;
    	
		// Center Changed
		google.maps.event.addListener(self.map, 'center_changed', function() {
			self.centerChanged.call(this, self);
		});
		
		
		// Right Click Event Listener
		google.maps.event.addListener(self.map, 'rightclick', function(event) {
			self.onRightClick.call(this, self, event);
		});
		
		// Map Click Listener
		google.maps.event.addListener(self.map, 'click', function(event){
			self.onMapClick.call(this, self, event);
		});
	
    },
    
    drawNewMarkerAt : function (latLng) {
    	var self = this; 
		marker = new google.maps.Marker({
			position: latLng,	
			map: self.map,
			title: "Route marker #"+self.markers.length,
			draggable: true
		});				
		self.markers.push(marker);
		
		// Marker Draged listener
		google.maps.event.addListener(marker, 'dragend', function(event) {
			self.onMarkerDragged.call(this, self, event);
		});
		
		return marker;
    },
    
    
    centerChanged : function(self) {
		center = this.center;
		dms = self.convertDMS(center.lat(), center.lng());
		$("#lat",self.$ctx).val(dms.latDMS);
		$("#long",self.$ctx).val(dms.lngDMS);
    },
    
    
    drawRoute : function (self, points) {
		if (!points[0]) {
			throw "Irgendwass war da falsch";
			
		}
		
		route = new google.maps.Polyline({
			path: points,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2
		});					
		
		return route
    },
    
    
	onRightClick : function(self, event) {
		self.drawNewMarkerAt(event.latLng);
		self.latLngs.push(event.latLng);
		if (self.markers.length > 1) {
			points = [
				event.latLng,
				self.latLngs[self.latLngs.length - 2],
            ];
			console.log(points);
			route = self.drawRoute(self, points);
			self.routes.push(route);					
			route.setMap(self.map);
		}
	},
	
	onMarkerDragged : function(self, event) {
		var index = parseInt(this.getTitle().split("#")[1]);
		var mapRef = this.getMap();
		
		self.latLngs[index] = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
		self.markers[index].setPosition(self.latLngs[index]);
		
		
		if (self.routes[index-1] != null) {
			self.routes[index-1].setMap(null);
		}
		if (self.routes[index] != null) {							
			self.routes[index].setMap(null);
		}
		
		if (self.latLngs[index-1] != null) {
			
			points = [
				self.latLngs[index-1],
				self.latLngs[index]
			];
			
			console.log(points);
			route = self.drawRoute(self, points);
			
			self.routes[index-1] = route;					
			route.setMap(mapRef);
		}
		if (self.latLngs[index+1] != null) {
			
			points = [
				self.latLngs[index],
				self.latLngs[index+1]
			];
			route = self.drawRoute(self, points);
			
			self.routes[index] = route;
			route.setMap(mapRef);
		}
	},
	
	onMapClick : function (self, event) {
		if (self.crosshair != null) {
			self.crosshair.setMap(null);	
		}
		self.crosshair = new google.maps.Marker({
			position: event.latLng,	
			map: self.map,
			draggable: true,
			icon: {
				anchor: new google.maps.Point(20, 20),
				url: "../img/icons/crosshair_red.png"
			},
			raiseOnDrag: true
		});
	},
    
	convertDMS :function(lat, lng) {
		lat = Math.abs(lat);
		var latDeg = Math.floor(lat);
		var latMin = Math.floor((lat-latDeg) * 60);
		var latSec = (Math.round((((lat - latDeg) - (latMin/60)) * 60 * 60) * 100) / 100 );
		if (lat<0) {
		  	latDir = "S";
		}
		else {
		  	latDir ="N";
		}
		lng = Math.abs(lng);
		var lngDeg = Math.floor(lng);
	  	var lngMin = Math.floor((lng-lngDeg)*60);
		var lngSec = (Math.round((((lng - lngDeg) - (lngMin / 60 )) * 60 * 60) * 100 ) / 100);
		if (lng<0) {
		  	lngDir = "W";
		}
		else {
		  	lngDir ="E";
		}					
		
		
		return {
			latDMS : latDeg+"\xB0 "+latMin+"."+latSec+"' "+latDir,
			lngDMS :  lngDeg+"\xB0 "+lngMin+"."+lngSec+"' "+lngDir
		};
	}
  });
})(Tc.$);