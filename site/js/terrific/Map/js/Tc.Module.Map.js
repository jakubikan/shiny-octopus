(function($) {
  Tc.Module.Map = Tc.Module.extend({
	  
	latLngs : [],
	markers : [],
	routes : [],
	latDMS: null,
	lngDMS: null,
	crosshair: null,
	map : null,
	overlay: null,
	longClickStoped: false,
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
		
		self.sandbox.subscribe(1, self);
		
		self.overlay = new google.maps.OverlayView();
		self.overlay.draw = function() {};
		self.overlay.setMap(self.map);
		
		
		
		$canvas.height($canvas.width()/2);
		self.$ctx.height($canvas.width()/2);
		
		
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
		
		
		self.crosshair = new google.maps.Marker({
			position: self.map.getCenter(),	
			map: self.map,
			icon: {
				anchor: new google.maps.Point(20, 20),
				url: "../img/icons/crosshair_red.png"	//TODO: für Play: "/assets/images/icons/crosshair_red.png"
			},
			raiseOnDrag: false,
			draggable: true
		});
		
		// Registering LongClick Handler, see /site/js/static/helper.js
		new LongClick(self.map, 1000);
		
		//new LongClick(self.crosshair, 1000);
		
    	    	
        callback();
    },
    after: function() { 
    	var self = this;
    	
		// Center Changed
		google.maps.event.addListener(self.map, 'center_changed', function(event) {
			self.centerChanged.call(this, self);
		});
		
		
		// Right Click Event Listener
		
		google.maps.event.addListener(self.map, 'rightclick', function(event) {
				self.setMarkerDrawRoute.call(this, self, event);
		});
		
		// Map Click Listener
		google.maps.event.addListener(self.map, 'click', function(event){
			//self.onMapClick.call(this, self, event);
	    	//self.fire('lngLatChanged',  event, function() { });
		});
		
		
		google.maps.event.addListener(self.map, 'mousedown', function(event){
		});
		
		/*
		google.maps.event.addListener(self.map, 'longpress', function(event){
			self.loadContextMenu.call(this,self,event);
		});
		*/
		
		google.maps.event.addListener(self.crosshair, 'rightclick', function(event){
			projection = self.overlay.getProjection();
			event.pixel = projection.fromLatLngToContainerPixel(event.latLng);
			self.loadContextMenu.call(this,self,event);
		});
	
    },
    
    loadContextMenu : function(self, event) {
    	self.fire('lngLatChanged',  event, function() { });
    	self.fire('contextRequest',  event, function() { });
    	
    },
    
    drawNewMarkerAt : function (latLng) {
    	var self = this; 
		marker = new google.maps.Marker({
			position: latLng,	
			map: self.map,
			title: "Route marker #"+self.markers.length,
			draggable: true
		});				

		google.maps.event.addListener(marker, 'rightclick', function(event){
			projection = self.overlay.getProjection();
			event.pixel = projection.fromLatLngToContainerPixel(event.latLng);
			self.loadContextMenu.call(this,self,event);
		});
		self.markers.push(marker);
		
		// Marker Draged listener
		google.maps.event.addListener(marker, 'dragend', function(event) {
			self.onMarkerDragged.call(this, self, event);
		});
		
		return marker;
    },
    
    onMarkerAdd : function(event) {
    	var self = this;
    	console.log("on-marker-add");
		self.setMarkerDrawRoute.call(this, self, event);
    	
    },
    
    centerChanged : function(self) {
		center = this.center;
		dms = self.convertDMS(center.lat(), center.lng());
		$("#lat",self.$ctx).html(dms.latDMS+" Lat");
		$("#long",self.$ctx).html(dms.lngDMS+" Long");
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
    
    
	setMarkerDrawRoute : function(self, event) {
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
		//console.log(self.crosshair);
		//self.crosshair.position = event.latLng;
		//self.crosshair.setMap(self.map);
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
	},
	
  });
})(Tc.$);