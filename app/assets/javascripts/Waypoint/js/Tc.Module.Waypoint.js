(function($) {
  Tc.Module.Waypoint = Tc.Module.extend({
	
	DUMMY_SELECT: '-Please select-',
	selectSelector: {selector : "#entry"},
	map: {},
	$entry: null,
	formID : null,
	formData : {
		id: null,													
		windstrength: null,
		winddirection: null,
	  	airpressure: null,
	  	temperature: null,
	  	clouds: null,
	  	rain: null,
	  	waveheight: null,
	  	wavedirection: null,
	  	datetime: null,

	  	// waypoint data
	  	name: null,		
	  	lat: null,
	  	lng: null, 
	  	cog: null,
	  	sog: null,
	  	dest: null,
	  	maneuver: null,
	  	headsail: null,
	  	dtm: null,
	  	btm: null
	},
	firstWeatherFetch: true,
	
	
    on: function(callback) {
    	var self = this;
		self.$entry = $("[data-id='entry']", self.$ctx);
		$("[data-id='loadgif']", self.$ctx).height(self.$entry.height());
		$("[data-od='delEntryIcon']", self.$ctx).height(self.$entry.height());


		self.hideDel(self);
		self.fillSelect(self);
		self.clearFields(self);
        callback();
    },
    after: function() { 
    	var self = this;
		// automated form submit after key is released on form input elements.
		$('.form-input', self.$ctx).keydown(function(e) {
				self.processFormData.call(this, self, e);
		});	

		// automated form submit after select entry has been selected.
		$('.form-select', self.$ctx).keydown(function(e) { 
				self.processFormData.call(this, self, e);
		});
		
		$("[data-id='delEntryIcon']", self.$ctx).on('click', function() {
			entry = self.$entry.find(':selected').text();
			if (entry != null) {
				self.deleteEntry(self, {id: self.map[entry]});
			}
			
		});
		
		$("[data-id='entry']", self.$ctx).on('change', function() {
			entry = self.$entry.find(':selected').text();

			if (entry == '-New Entry-') { 
				self.clearAll(self); 
			}
			else {
				self.fetchWeatherData (self, {id : self.map[entry]});	
			}
		});	
	
	
    },
    
    processFormData: function(self, e) {
			if (e.keyCode == 13 || e.keyCode == 9) { // Enter or TAB is
				inputs = self.$ctx.find('.form-input');
				selects = self.$ctx.find('.form-select');

				self.formData = {
					id: self.formID,													

					windstrength: self.getDOMElement(inputs, "windStrength").value || 0,
					airpressure: self.getDOMElement(inputs, 'airPressure').value || 0,
					temperature: self.getDOMElement(inputs, 'temp').value || 0,
					waveheight: self.getDOMElement(inputs, 'waveHeight').value || 0,
					datetime: self.getDOMElement(inputs, 'trackDateTime').value || "null",
					
					
					clouds: self.getDOMElement(selects, 'clouds').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'clouds').value,

					rain: self.getDOMElement(selects, 'rain').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'rain').value,

					winddirection: self.getDOMElement(selects, 'windDirection').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'windDirection').value,
					wavedirection: self.getDOMElement(selects, 'waveDirection').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'waveDirection').value,
							
							
					
					// waypoint data
					name: self.getDOMElement(inputs, 'name').value || "null",		
					lat: self.getDOMElement(inputs, 'lat').value || "null",
					lng: self.getDOMElement(inputs, 'lng').value || "null", 
					cog: self.getDOMElement(inputs, 'cog').value || "null",
					sog: self.getDOMElement(inputs, 'sog').value || "null",
					dtm: self.getDOMElement(inputs, 'dtm').value || "null",
					btm: self.getDOMElement(inputs, 'btm').value || "null",
					
					
					dest: self.getDOMElement(selects, 'dest').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'dest').value,

					maneuver: self.getDOMElement(selects, 'maneuver').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'maneuver').value,

					headsail: self.getDOMElement(selects, 'headSail').value === self.DUMMY_SELECT ? 
						"null" : self.getDOMElement(selects, 'headSail').value
				};
						  
				// send
				if (self.formID == null) {
					self.sendWeatherForm(self,self.formData);
					self.fillSelect(self);
				}
				else {
					// Create regexes for check of lat, lng and date&time to
					// fetch weather data from openweathermap.
					// SRC for this:
					// http://txt2re.com/index-javascript.php3?s=Sun,%20Jun%2016%202013,%2022:51:39&5&-47&6&22&17&23&4&-48&24&2;
					var dblTester = new RegExp("(\\d+)(\\.)(\\d+)", ["i"]);
					var re1='((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))';	// Day
																																			// Of
																																			// Week
																																			// 1
					var re2='(,)';	// Any Single Character 1
					var re3='.*?';	// Non-greedy match on filler
					var re4='((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))';	// Month
																																														// 1
					var re5='(\\s+)';	// White Space 1
					var re6='((?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])';	// Day
																				// 1
					var re7='(\\s+)';	// White Space 2
					var re8='((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])';	// Year
																							// 1
					var re9='(,)';	// Any Single Character 2
					var re10='(\\s+)';	// White Space 3
					var re11='((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';	// HourMinuteSec
																																	// 1
					
					var dateTimeTester = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11,["i"]);
					var weatherPreviouslySet = self.formData.windstrength != 0 || 
						self.formData.winddirection != "null" || 
						self.formData.airpressure !=0 || 
						self.formData.temperature !=0 || 
						self.formData.clouds != "null" || 
						self.formData.rain != "null" || 
						self.formData.waveheight != 0 || 
						self.formData.wavedirection != "null"; 
	
					if (!weatherPreviouslySet && 
						self.firstWeatherFetch &&
						dblTester.exec($("[data-id='lat']",self.$ctx).val()) != null &&
						dblTester.exec($("[data-id='lng']",self.$ctx).val()) != null &&
						dateTimeTester.exec($("[data-id='trackDateTime']",self.$ctx).val()) != null) 
					{

						data = {
							lat: $("[data-id='lat']",self.$ctx).val(),
							lng: $("[data-id='lng']",self.$ctx).val(),
							date: $("[data-id='trackDateTime']",self.$ctx).val()
						};

						self.fetchWeatherFromSite(self,data);
					} else  {
						self.updateSentData(self, self.formData);
					}
				}
				if (e.keyCode == 13) { // Enter is pressed.
					self.clearAll(self);
				}			
			}
    },

	showGif: function (self) { $("[data-id='loadgif']").show(); },
	
	hideGif: function (self) { $("[data-id='loadgif']").hide(); },
	
	showDel: function (self) { $("[data-id='delEntryIcon']").show(); },
	
	hideDel: function (self) { $("[data-id='delEntryIcon']").hide(); },

	getDOMElement: function (array, id) {
		found_element =  $.grep(array,function(element, indexinArray){
			return $(element).data("id") == id;
		});
		return found_element[0];
	},
		
	setFieldData: function (self, formData) {
		inputs = self.$ctx.find('input');
		selects = self.$ctx.find('select');
		// Weather data
		self.formID = formData.id;

		self.getDOMElement(inputs, "windStrength").value = typeof formData.windstrength != 'undefined' && formData.windstrength != 0 ? formData.windstrength : "";
		self.getDOMElement(inputs, "airPressure").value = typeof formData.airpressure != 'undefined' && formData.airpressure != 0 ? formData.airpressure : "";
		self.getDOMElement(inputs, "temp").value = typeof formData.temperature != 'undefined' && formData.temperature != 0 ? formData.temperature : "";
		self.getDOMElement(inputs, "waveHeight").value = typeof formData.waveheight != 'undefined' && formData.waveheight != 0 ? formData.waveheight : "";
		self.getDOMElement(inputs, "trackDateTime").value = typeof formData.datetime != 'undefined' && formData.datetime != 0 ? formData.datetime : "";

		self.getDOMElement(selects, "windDirection").value = typeof formData.winddirection != 'undefined' && formData.winddirection != 'null' ? formData.winddirection : self.DUMMY_SELECT;
		self.getDOMElement(selects, "clouds").value = typeof formData.clouds != 'undefined' && formData.clouds != 'null' ? formData.clouds : self.DUMMY_SELECT;
		self.getDOMElement(selects, "rain").value = typeof formData.rain != 'undefined' && formData.rain != 'null' ? formData.rain : self.DUMMY_SELECT;
		self.getDOMElement(selects, "waveDirection").value = typeof formData.wavedirection != 'undefined' && formData.wavedirection != 'null' ? formData.wavedirection : self.DUMMY_SELECT;
	
		// Waypoint data
		self.getDOMElement(inputs, "name").value = typeof formData.name != 'undefined' && formData.name != 'null' ? formData.name : "";
		self.getDOMElement(inputs, "lat").value = typeof formData.lat != 'undefined' && formData.lat != 'null' ? formData.lat : "";
		self.getDOMElement(inputs, "lng").value = typeof formData.lng != 'undefined' && formData.lng != 'null' ? formData.lng : "";
		self.getDOMElement(inputs, "dtm").value = typeof formData.dtm != 'undefined' && formData.dtm != 'null' ? formData.dtm : "";
		self.getDOMElement(inputs, "cog").value = typeof formData.cog != 'undefined' && formData.cog != 'null' ? formData.cog : "";
		self.getDOMElement(inputs, "sog").value = typeof formData.sog != 'undefined' && formData.sog != 'null' ? formData.sog : "";
		self.getDOMElement(inputs, "btm").value = typeof formData.btm != 'undefined' && formData.btm != 'null' ? formData.btm : "";
		
		
		self.getDOMElement(selects, "headSail").value = typeof formData.headsail != 'undefined' && formData.headsail != 'null' ? formData.headsail : self.DUMMY_SELECT;
		self.getDOMElement(selects, "dest").value = typeof formData.dest != 'undefined' && formData.dest != 'null' ? formData.dest : self.DUMMY_SELECT;
		self.getDOMElement(selects, "maneuver").value = typeof formData.maneuver != 'undefined' && formData.maneuver != 'null' ? formData.maneuver : self.DUMMY_SELECT;
			
	},
	
	leftPad: function (number, targetLength) {
   		output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
	},
	
	clearFields: function (self) {
		inputs = self.$ctx.find('input');
		selects = self.$ctx.find('select');
		inputs.each(function(index, element) {
			$(this).val("");
		});
		selects.each(function(index, element) {
			$(this).val(self.DUMMY_SELECT);
		});
		date = new Date();
		dateHours = self.leftPad(date.getHours(), 2);		
		dateMinutes = self.leftPad(date.getMinutes(), 2);
		dateSeconds = self.leftPad(date.getSeconds(), 2);
		
		// Format: Fri, May 16 2013, 11:01
		dateText = $.datepicker.formatDate("D, M d yy", date);		
		$("[data-id='trackDateTime']").val(dateText  +", "+dateHours+":"+dateMinutes+":"+dateSeconds);
	},
	
	clearAll: function (self){
		var self = this;
		self.clearFields();
		self.formID = null;
		self.$entry.value = '-New Entry-';
		self.firstWeatherFetch = true;
		self.hideDel();
	},
	
	updateCurrSelected: function (self) {
		self.$entry.val(self.formData != null && self.formData.datetime != null ? 
										   self.formData.datetime : '-New Entry-');	
	},
	
	makeAjaxProcessPost: function (self, action, id, before_ajax, success_function, options) {
		before_ajax();
		settings = {
			url:  "/api/waypoint/" + action  + (id ? "/" + id : ""),
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				success_function.call(this,data);
			},
			error: function(a,b,c) {
				console.log(a,b,c);
				
			}
		};
		
		$.extend(true, settings, options);

		$.ajax(settings);
	},
	
	sendWeatherForm: function (self, data) {
		self.makeAjaxProcessPost(self, 
			"create", data.id, 
			function(){
				self.showGif(self);
			},
			function(data) {
				self.formID = data;
				self.hideGif(self);
				self.fillSelect(self);
				if (self.$entry.val() != '-New Entry-') {
					self.showDel(self);										
				}
			}, {type: "POST", data: JSON.stringify(data)}
		);
	},
	
	
	fetchWeatherData: function (self, index) {
		self.makeAjaxProcessPost(self, 
				"fetch", index.id, 
				function() {
					self.showGif(); 
				}, 
				//Success function
				function(data){
					self.formData.name = data["name"];
					self.formData.headsail = data["headsail"];
					self.formData.lat = data["lat"];
					self.formData.lng = data["lng"];
					self.formData.dest = data["dest"];
					self.formData.dtm = data["dtm"];
					self.formData.cog = data["cog"];
					self.formData.sog = data["sog"];
					self.formData.maneuver = data["maneuver"];
					self.formData.btm = data["btm"];										
					self.formData.id = data["id"];
					self.formData.windstrength = data["windstrength"];
					self.formData.winddirection = data["winddirection"];
					self.formData.airpressure = data["airpressure"];
					self.formData.temperature = data["temperature"];
					self.formData.clouds = data["clouds"];
					self.formData.rain = data["rain"];
					self.formData.waveheight = data["waveheight"];
					self.formData.wavedirection = data["wavedirection"];
					self.formData.datetime = data["datetime"];
					
					//$.extend(true, self.formData, data);

					self.setFieldData(self, self.formData);
					self.hideGif(self);
					if (self.$entry.val() != '-New Entry-') {
						self.showDel(self);
					}
			}, {type: "GET", contentType:""});		
	},
	
	updateSentData: function (self, data) {
		self.makeAjaxProcessPost(self, "update", data.id, 
			function() {
				self.showGif();
			},
			function(data) {
				self.hideGif();
				if (self.$entry.val() != '-New Entry-') {
					self.showDel();
				}
			}, {type: "POST", data: JSON.stringify(data)}
		)
	},
	
	deleteEntry: function (self, index) {
		self.makeAjaxProcessPost(self, "delete", index,
			function() {
				self.hideDel(self); 
				self.showGif(self);
			},
			function(data) {
				self.hideGif(self);
				self.fillSelect(self);
			}, {type: "GET", contentType:""}
		);
	},
	
	fillSelect: function (self) {
		self.makeAjaxProcessPost(self, "all", 0,
			function() {
				self.hideDel(self); 
				self.showGif(self);
			},
			function(data) {
				i=0;
				self.$entry.empty();
				self.$entry.append("<option>-New Entry-</option>");
				for (o in data) {
					if (self.map[data[o]] == null) {
						self.map[data[o]['datetime']] = data[o]['id'];
					}
					self.$entry.append("<option>"+data[o]['datetime']+"</option>");
					self.hideGif();
					if (self.$entry.val() != '-New Entry-')  {
						self.showDel(self);
					}
				}
				self.updateCurrSelected(self);
			}, {type: "GET", data: self.selectSelector}
		);
	},
	
	fetchWeatherFromSite: function (self, data){
		$.ajax({
			type: "POST",
			url: "http://openweathermap.org/data/2.1/find/city?lat="+data['lat']+"&lon="+data['lng']+"&cnt=1", 
			dataType: "jsonp",
			success: function(data) {
				if (data['cod'] == 200) {
					self.formData.windstrength = data['list'][0]['wind']['speed'];
					self.formData.winddirection = self.getDirectionFromDegrees(data['list'][0]['wind']['deg']);
					self.formData.airpressure = data['list'][0]['main']['pressure'];
					self.formData.temperature = data['list'][0]['main']['temp'] - 273.15;
					self.formData.clouds = self.getCloudiness(data['list'][0]['clouds']['all']);
					self.formData.rain = self.getRainByCode(data['list'][0]['weather'][0]['id']);
					self.setFieldData(self, self.formData);
					self.updateSentData(self, self.formData);
				}
			}
	    });
	},
	
	getDirectionFromDegrees: function (self, degrees) {
		if (degrees > 337.5 && degrees <= 359.9 || degrees >= 0 && degrees <= 22.5) return "North";
		else if (degrees > 22.5 && degrees <= 67.5)  return "North-East";
		else if (degrees > 67.5 && degrees <= 112.5) return "East";
		else if (degrees > 112.5 && degrees <= 157.5) return "South-East";
		else if (degrees > 157.5 && degrees <= 202.5) return "South";
		else if (degrees > 205.5 && degrees <= 247.5) return "South-West";
		else if (degrees > 247.5 && degrees <= 292.5) return "West";
		else if (degrees > 292.5 && degrees <= 337.5) return "North-West";
		else return self.DUMMY_SELECT;
	},
	
	getCloudiness: function (self, percentage) {
		if (percentage < 20) return "Sunny";
		else if (percentage < 40) return "Partly Cloudy";
		else if (percentage < 60) return "Cloudy";
		else if (percentage < 80) return "Rain";
		else if (percentage < 90) return "Snow";
		else if (percentage < 100) return "Thunder / Storm";
		else return self.DUMMY_SELECT;
	},
	
	getRainByCode: function (self, code){
		switch(code) {
			case 300:
			case 301:	
			case 302:
				return "0 - 2 mm/sqm";
				break;
			case 310: 
			case 311:
			case 312:
				return "2 - 4 mm/sqm";
				break;
			case 500:
			case 321:
				return "4 - 8 mm/sqm";
				break;
			case 501:
			case 502:
			case 503:
				return "8 - 15 mm/sqm";
				break;
			case 504:
			case 511:
			case 520:
				return "15 - 25 mm/sqm";
				break;
			case 521:
			case 522:
				return ">25 mm/sqm";
				break;
			default: return self.DUMMY_SELECT;
		}		
	}
  });
})(Tc.$);