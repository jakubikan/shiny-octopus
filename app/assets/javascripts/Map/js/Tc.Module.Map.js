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
	doTrack: true,
	Server: null,
	
	mapOptions : {
		disableDoubleClickZoom: true,
		center: new google.maps.LatLng(47.667272, 9.171036),
		zoom: 18,
		mapTypeId: "OSM",
		mapTypeControl: false,
		/*mapTypeControlOptions: {
			mapTypeIds: mapTypeIds
		},*/
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.SMALL
		}		
	},
	  
    on: function(callback) {
    	var self = this;
    	$canvas = $("#map-canvas", self.$ctx);
		self.map = new google.maps.Map($canvas[0], self.mapOptions);
		
		self.sandbox.subscribe(1, self);
		
		self.overlay = new google.maps.OverlayView();
		self.overlay.draw = function() {};
		self.overlay.setMap(self.map);
		
		
		
		$canvas.height(750);
		//self.$ctx.height($canvas.width()/2);
		
		
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
		/*
		self.map.overlayMapTypes.push(new google.maps.ImageMapType({getTileUrl: function(coord, zoom) {
                    return "http://tiles.openseamap.org/seamark/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenSeaMap",
                maxZoom: 18 }));
*/
		
		self.map.overlayMapTypes.push(new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
			return "http://tiles.openseamap.org/seamark/" + zoom +
			"/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "OpenSeaMap",
			maxZoom: 18
		}));

		self.map.overlayMapTypes.push(new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
			return "http://www.openportguide.org/tiles/actual/air_temperature/5/" + zoom +
			"/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "Temp",
			maxZoom: 18
		}));

		self.map.overlayMapTypes.push(new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
			return "http://www.openportguide.org/tiles/actual/wind_vector/7/" + zoom +
			"/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "Wind",
			maxZoom: 18
		}));

		self.Server = new FancyWebSocket('ws://127.0.0.1:9300');
		$("#weatherForecast",self.$ctx).hide();
		$("#crossKoordsDisplay",self.$ctx).hide();
		$("#distanceDisplay",self.$ctx).hide();
		$("#CurWeather",self.$ctx).hide();

		/*

		*/
		// Registering LongClick Handler, see /site/js/static/helper.js
		//new LongClick(self.map, 1000);
		
		//new LongClick(self.crosshair, 1000);
		
    	    	
        callback();
    },
    after: function() { 
    	var self = this;
    	
		// Center Changed
		google.maps.event.addListener(self.map, 'center_changed', function(event) {
			self.centerChanged.call(this, self);
		});
		self.centerChanged.call(self.map, self);
		
		// Right Click Event Listener
		
		google.maps.event.addListener(self.map, 'rightclick', function(event) {
				self.drawCrosshairOrMarker.call(this, self, event);
		});
		
		// Map Click Listener
		google.maps.event.addListener(self.map, 'click', function(event){
			//self.onMapClick.call(this, self, event);
	    	//self.fire('lngLatChanged',  event, function() { });

		//	self.connectToBoatServer.call(this,self,47.667272, 9.171036);
		});
		
		
		google.maps.event.addListener(self.map, 'mousedown', function(event){
		
		});


		$('#weatherBtn').on('click', function() {
			url = 'http://openweathermap.org/data/2.5/weather?lat='+self.map.center.lat()+
					"&lon="+self.map.center.lng()+"&units=metric&lang=en";
			$.ajax({
				type: "POST",
				url: url,
				dataType: "jsonp",
				success: function(data) {
					self.showCurrentWeather(self,data);
				}
			});	
			self.getForecast(self);
		});
		
		$('#trackingButton',self.$ctx).bind("click",function(e){
			doTrackTag = $('#trackingButton',self.$ctx);
			doTrack = doTrackTag.attr("doTrack");
			if(doTrack == "false"){
				self.Server.connect();
				doTrackTag.html("Stop Tracking");
				doTrackTag.attr("doTrack",true);
				self.sendBoatPosition.call(this,self);
			}else{
				self.Server.disconnect();
				doTrackTag.html("Track");
				doTrackTag.attr("doTrack",false);
			}

		});
		self.Server.bind('open',function(){
			$('#track',self.$ctx).html("Connection to boat server established");
		});

		self.Server.bind('message',function(lng){
			self.updateBoatPosition.call(this,self,lng);
		});

		self.Server.bind('close',function(){
			$('#track',self.$ctx).html("Connection to boat server closed");
		});


		/*
		google.maps.event.addListener(self.map, 'longpress', function(event){
			self.loadContextMenu.call(this,self,event);
		});
		*/

	
    },

    getForecast : function(self){
    	url = 'http://openweathermap.org/data/2.5/forecast?lat='+self.map.center.lat()+
					"&lon="+self.map.center.lng()+"&units=metric&lang=en";
			$.ajax({
				type: "POST",
				url: url,
				dataType: "jsonp",
				success: function(data) {
					forecastContent = "";
					for (var i = 0; i < data.list.length; i++) {
						forecastContent = forecastContent +
											"<div>"+
											self.div(data.list[i].dt_txt)+
											self.createWeatherString(self,data.list[i])+
											"</div>";
					};
					$("#forecastSwipe",self.$ctx).children().first().html(forecastContent);
					$("#weatherForecast",self.$ctx).show();
					window.mySwipe = new Swipe(document.getElementById('forecastSwipe'), {
					  callback: function(){
					  	$("#forecastSlidePosition").html(1+mySwipe.getPos()+"/"+mySwipe.getNumSlides());
					  }
					});
					$("#forecastSlidePosition").html(1+mySwipe.getPos()+"/"+mySwipe.getNumSlides());
					$("#prevForecastItem").on("click",function(){
						mySwipe.prev();
					});
					$("#nextForecastItem").on("click",function(){
						mySwipe.next();
					});

					/*
					$("#forecastSwipe",self.$ctx).html(
						"<h4 align=\"left\">Weather Forecast:</h4>"+
						"<div id=\"forcastSwiper\">"+
						forecastContent
					);
*/
				}
			});	
    },

    showCurrentWeather : function(self,data){
    	/*
    						<div id="CurWeatherTitle">Current Weather:</div>
					<div id="CurWeatherWTitle">Wind:</div>
					<div id="CurWeatherWSpeed">Speed: 20 m/s</div>
					<div id="CurWeatherWDirection">Direction: NE (45°)</div>	
					<img src="http://openweathermap.org/img/w/10d.png" id="CurWeatherIcon"/>
					<div id="CurWeatherTemp">20 °C</div>
					<div id="CurWeatherDescription">moderate rain</div>
					<div id="CurWeatherPressure">101 hPa</div>
					<div id="CurWeatherHumidity">Humidity: 50%</div>
					<div id="CurWeatherClouds">Clouds: 40 %</div>
				*/
		$("#CurWeatherDisplay",self.$ctx).html(
			self.createWeatherString(self,data)
		);
		$("#CurWeather",self.$ctx).show();
		/*
    	$("#CurWeatherWSpeed",self.$ctx).html("Speed: "+data.wind.speed+" m/s");
    	$("#CurWeatherWDirection",self.$ctx).html("Direction: "+data.wind.deg+"°"); //Erweitern auf Windrichtungen
    	$("#CurWeatherTemp",self.$ctx).html(data.main.temp+"°C");
    	$("#CurWeatherHumidity",self.$ctx).html("Humidity: "+data.main.humidity+"%");
    	$("#CurWeatherPressure",self.$ctx).html("Pressure: "+data.main.pressure+" hPa");
    	$("#CurWeatherClouds",self.$ctx).html("Clouds: "+data.clouds.all+" %");
    	//$("#CurWeatherPRain",self.$ctx).html("Rain: "+data.rain.3h+" mm/3h"); //mit dem variablen Namen 3h gibts Probleme
    	//$("#CurWeatherPSnow",self.$ctx).html("Snow: "+data.snow.3h+" mm/3h"); //Optional
    	$("#CurWeatherDescription",self.$ctx).html(data.weather[0].description); //Optional
    	$("#CurWeatherIcon",self.$ctx).attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png"); //Optional
    	*/
    },

    createWeatherString : function(self,data){
    	wSpeed = self.div("Speed: "+data.wind.speed+" m/s");
    	wDirection = self.div("Direction: "+data.wind.deg+"°");    	
    	temp = self.div(data.main.temp+"°C");
    	humidity = self.div("Humidity: "+data.main.humidity+"%");
    	pressure = self.div("Pressure: "+data.main.pressure+" hPa");
    	clouds = self.div("Clouds: "+data.clouds.all+" %");
    	description = "";
    	if(data.weather[0].description){
    		description = self.div(data.weather[0].description);
    	}
    	icon = "";
    	if(data.weather[0].icon){
    		icon = "<img src=\"http://openweathermap.org/img/w/"+data.weather[0].icon+".png\"/>";
    	}
    	return icon+
    			"<div>Wind: </div>"+    			
    			wSpeed+
    			wDirection+    			
    			temp+
    			description+
    			pressure+
    			humidity+
    			clouds;
    	//$("#CurWeatherPRain",self.$ctx).html("Rain: "+data.rain.3h+" mm/3h"); //mit dem variablen Namen 3h gibts Probleme
    	//$("#CurWeatherPSnow",self.$ctx).html("Snow: "+data.snow.3h+" mm/3h"); //Optional
    },

    div : function(value){
    	return "<div>"+value+"</div>";
    },

    sendBoatPosition : function(self){
    	latlng = self.map.getCenter();
    	self.Server.send( 'message','test' );
    },

    updateBoatPosition : function(self,lng){
    	center = self.map.getCenter();
    	center.lng = lng;
    	self.map.setCenter(center);
    	self.drawNewMarkerAt.call(self,center);
    	self.sendBoatPosition.call(self);
    },

    connectToBoatServer : function(mapModule){
    	center = mapModule.map.getCenter();
    	lat = center.lat();
    	lng = center.lng();
    	$.ajax({
    	  type : 'get',
    	  url : './js/terrific/Map/cometServer.php',
    	  dataType : 'json', 
    	  data : {
    	  	'lat' : lat,
    		'lng' : lng
    	  },
    	  success : function(response) {
    	  	if(mapModule.doTrack){
    	  		newCenter = google.maps.LatLng(response.lat,response.lng);
    	  		mapModule.map.setCenter(newCenter);
    	  	};	  	
    	  },
    	  complete : function(response) {
    	    // send a new ajax request when this request is finished
    	    if (!self.noerror) {
    	      // if a connection problem occurs, try to reconnect each 5 seconds
    	      setTimeout(function(){ mapModule.connectToBoatServer.call(this,mapModule); }, 5000);           
    	    }else {
    	      // persistent connection
    	      mapModule.connectToBoatServer,call(this,mapModule);
    	    }
    	    noerror = false; 
    	  }
    	});
    },

    drawCrosshairOrMarker : function(self, event){
    	if(self.crosshair==null){
    		self.crosshair = new google.maps.Marker({
				position: event.latLng,	
				map: self.map,
				icon: {
						anchor: new google.maps.Point(20, 20),
						url: "/assets/images/icons/crosshair_red.png"	//TODO: für Play: "/assets/images/icons/crosshair_red.png"
				},
				raiseOnDrag: false,
				draggable: true
			});

    		google.maps.event.addListener(self.crosshair, 'rightclick', function(event){
    			projection = self.overlay.getProjection();
    			event.pixel = projection.fromLatLngToContainerPixel(event.latLng);
    			radPosition = this.getPosition();
    			position = self.convertDMS(radPosition.lat(),radPosition.lng());
    			self.fire('contextRequest',{event:event,obj:self,koords:position},["crossmenu"],function(){}); //REFAK: CROSS
			});
			google.maps.event.addListener(self.crosshair, 'drag', function(event){
				self.crosshairDragged(self);
			});
			self.crosshairDragged(self);
			$("#crossKoordsDisplay",self.$ctx).show();
    	} else {
    		self.setMarkerDrawRoute.call(this,self,event);
    	}
    },

    crosshairDragged : function(self){
    	degLatLngs = self.crosshair.getPosition();
    	latLngs = self.convertDMS(degLatLngs.lat(), degLatLngs.lng());
    	$("#crossKoordsDisplayLat",self.$ctx).html("LAT: "+latLngs.latDMS);
    	$("#crossKoordsDisplayLng",self.$ctx).html("LNG: "+latLngs.lngDMS);
    },

    onSwitchCrossToMarker : function(self){
    	self.drawNewMarkerAt.call(self,this.crosshair.getPosition());
    	this.crosshair.setMap(null);
    	this.crosshair = null;
    	$("#crossKoordsDisplay",self.$ctx).hide();

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
			radPosition = this.getPosition();
			position = self.convertDMS(radPosition.lat(),radPosition.lng());
			//self.loadContextMenu.call(this,self,event);*/	
			//self.removeMarker.call(this,self);
			//self.drawRoute.call(this,self);
			//self.distanceToCrosshair.call(this,self);			
			self.fire('contextRequest',{event:event,obj:this,koords:position}, ["markermenu"],function(){}); //REFAK: MARKER
		});

		self.markers.push(marker);
		
		// Marker Draged listener
		/*google.maps.event.addListener(marker, 'dragend', function(event) {
			self.onMarkerDragged.call(this, self, event);
		});*/
		
		return marker;
    },
    onCalculateDistance : function(marker){
    	if(this.crosshair ==null)
    		return;
    	distance = google.maps.geometry.spherical.computeDistanceBetween (this.crosshair.getPosition(), marker.getPosition());    	
    	$("#distanceDisplayValue",this.$ctx).html(distance.toFixed(2)+ " meter");
    	$("#distanceDisplay").show();
    },
    onMakeRoute : function(){
    	var self = this;
    	if(this.markers.length > 1){
    		points = [];
    		for (var i = 0; i < this.markers.length; i++) {
    			points.push(this.markers[i].getPosition());
    			this.markers[i].setMap(null);
    		};
    		route = new google.maps.Polyline({
				path: points,
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 2,
				draggable: true,
				editable: true
			});	
			google.maps.event.addListener(route, 'rightclick', function(event){
				projection = self.overlay.getProjection();
				event.pixel = projection.fromLatLngToContainerPixel(event.latLng);
				radPosition = this.getPath().getAt(1);
				position = self.convertDMS(radPosition.lat(),radPosition.lng());
				//Ich muss dieses gesamte modul Mitgeben damit ich nach dem Klicken auf ein Kontext eintrag
				//inner halb eines terrific events zugriff auf die Funktionen hier kriege
				obj = {route:this,self:self,map:self.map};
				self.fire('contextRequest',{event:event,obj:obj,koords:position},["routemenu"],function(){}); //REFAK: ROUTE
			});
			/*
			google.maps.event.addListener(route, 'dblclick', function(event){
				this.setMap(null);
				this.getPath().forEach(function(item, index){
					this.drawNewMarkerAt(item);
				});

			});
*/
			route.setMap(this.map);
			this.routes.push(route);
			this.markers=[];


    	}
    },

    onSwitchRouteToMarkers : function(obj){
    	obj.route.getPath().forEach(function(item, index){
    		obj.self.drawNewMarkerAt.call(obj.self,item);
    	});
    	obj.self.onRemoveRoute.call(obj.self,obj);
    },

    onRemoveRoute : function(obj){
    	obj.route.setMap(null);
    	idx = this.routes.indexOf(obj.route);
    	this.routes.splice(idx,1);
    },

    onRemoveMarker : function(marker){
    		marker.setMap(null);
			index = this.markers.indexOf(marker);
			this.markers.splice(index,1);
    },
    
    onMarkerAdd : function(event) {
    	var self = this;
    	console.log("on-marker-add");
		self.setMarkerDrawRoute.call(this, self, event);
    	
    },
    
    centerChanged : function(self) {
		center = this.center;
		dms = self.convertDMS(center.lat(), center.lng());
		$("#centerKoordsDisplayLat",self.$ctx).html("LAT: "+dms.latDMS);
		$("#centerKoordsDisplayLng",self.$ctx).html("LNG: "+dms.lngDMS);
    },
    
    /*
    drawRoute : function (self, points) {
		if (!points[0]) {
			throw "Irgendwass war da falsch";
			
		}
		
		route = new google.maps.Polyline({
			path: points,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2,
			draggable: true,
			editable: true
		});					
		
		return route
    },
    */
    
	setMarkerDrawRoute : function(self, event) {
		self.drawNewMarkerAt(event.latLng);
		/*self.latLngs.push(event.latLng);
		if (self.markers.length > 1) {
			points = [
				event.latLng,
				self.latLngs[self.latLngs.length - 2],
            ];
			console.log(points);
			route = self.drawRoute(self, points);
			self.routes.push(route);					
			route.setMap(self.map);
		}*/
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
	}
	
  });
})(Tc.$);