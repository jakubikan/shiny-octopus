<div class="mod mod-waypoint">
	<h2 align="center">Waypoint information</h2>
	<form class="form-horizontal" method='post'>
		<div class="row-fluid well">
        	<div class="span6">
           	 	<div class="control-group">
                	<div class="row-fluid"> 
						<label class="control-label">Choose existing entry: </label> 
						<select
						class="input-medium-xlarge" id="entry" name="entry" tabindex='1'>                            
						</select>
                        <img id="loadgif" src="../../../../img/animation/ajax-loader.gif"/>
                        <img id="delEntryIcon" src="../../../../img/animation/delete_icon.gif"/>
					</div>
                </div>
            </div>
        </div>
        <div class="row-fluid well">
			<div class="span4">
				<div class="control-group">
					<label class="control-label">Name</label> <input
						class="input-medium waypt-formelement" type="text" id="name" />
				</div>
				<div class="control-group">
					<label class="control-label">Time</label> <input
						class="input-medium waypt-formelement" type="date" id="wdate" />
				</div>
				<div class="control-group">
					<label class="control-label">Date</label> <input
						class="input-medium waypt-formelement" type="date" id="wtime" />
				</div>
				<div class="control-group">
					<label class="control-label">Head sail</label> <select
						name="vorsegel" id="vorsegel" class="waypt-formelement"></select>
				</div>
			</div>
			<div class="span4">
				<div class="control-group">
					<label class="control-label">Latitude</label> <input
						class="input-medium waypt-formelement" type="text" id="lat" />
				</div>
				<div class="control-group">
					<label class="control-label">Longitude</label> <input
						class="input-medium waypt-formelement" type="text" id="lng" />
				</div>
				<div class="control-group">
					<label class="control-label">Destination</label> <select
						name="fahrtziel" id="marker" class="waypt-formelement"></select>
				</div>
				<div class="control-group">
					<label class="control-label">DTM</label> <input class="input-medium waypt-formelement"
						type="text" id="dtm" />
				</div>
			</div>
			<div class="span4">
				<div class="control-group">
					<label class="control-label">COG</label> <input class="input-medium waypt-formelement"
						type="text" id="cog" />
				</div>
				<div class="control-group">
					<label class="control-label">SOG</label> <input class="input-medium waypt-formelement"
						type="text" id="sog" />
				</div>
	
				<div class="control-group">
					<label class="control-label">Maneuver</label> <select
						name="manoever" id="manoever" class="waypt-formelement"></select>
				</div>
				<div class="control-group">
					<label class="control-label">BTM</label> <input class="input-medium waypt-formelement"
						type="text" id="btm" />
				</div>
			</div>
		</div>
	</form>
    <form class="form-horizontal">
    	<div class="row-fluid well">
			<div class="span4">
				<div class="control-group">
					<div class="row-fluid"> 
						<label class="control-label">Wind Strength</label> 
						<input id="windStrength" class="input-medium-short weather-form-input"  type="number"
							name="windStrength" autofocus tabindex="2" data-validation="windstrength" />
						<span>knots</span>
					</div>
					<span class="help-block fade row-fluid offset3">Please insert a number</span>
				</div>
				<div class="control-group">
					<label class="control-label">Wind Direction</label> 
					<select
						class="input-medium weather-form-select" id="windDirection" name="windDirection" tabindex='5'>
						<option selected>-Please select-</option>
						<option>North</option>
						<option>North-East</option>
						<option>East</option>
						<option>South-East</option>
						<option>South</option>
						<option>South-West</option>
						<option>West</option>
						<option>North-West</option>
					</select>
				</div>
				<div class="control-group">
					<div class="row-fluid">
						<label class="control-label">Air Pressure</label> 
						<input class="input-medium-short weather-form-input" type="number" id="airPressure"
							name="airPressure" tabindex='8' data-validation="airpreasure" />
						<span>hPa</span>
					</div>
					<span class="help-block fade row-fluid offset3">Please insert a number</span>
				</div>
			</div>
			<div class="span4">            	
				<div class="control-group">
					<div class="row-fluid">
						<label class="control-label">Temperature</label> 
						<input class="input-medium-short weather-form-input" id="temp" type="text" name="temp" tabindex="3" data-validation="temperature"/>
						<span>°C</span>
					</div>
					<!--<span class="help-block fade row-fluid offset3">Please insert a number between -273.15 and 273.15</span>-->
				</div>
			  	<div class="control-group">
					<label class="control-label">Clouds</label> <select
						class="input-medium high-select weather-form-select" id="clouds" name="clouds" tabindex='6'>
						<option selected>-Please select-</option>
						<option id="select-sunny">Sunny</option>
						<option id="select-partlycloudy">Partly cloudy</option>
						<option id="select-cloudy">Cloudy</option>
						<option id="select-rain">Rain</option>
						<option id="select-snow">Snow</option>
						<option id="select-thunder">Thunder / Storm</option>
					</select>
				</div>
			  	<div class="control-group">
					<label class="control-label">Rain</label> <select
						class="input-medium weather-form-select" name="rain" id="rain" tabindex='9'>
						<option selected>-Please select-</option>
						<option>0 - 2 mm/sqm</option>
						<option>2 - 4 mm/sqm</option>
						<option>4 - 8 mm/sqm</option>
						<option>8 - 15 mm/sqm</option>
						<option>15 - 25 mm/sqm</option>
						<option>25 mm/sqm</option>
					</select>
				</div>
			</div>
			<div class="span4">
				<div class="control-group">
					<div class="row-fluid">
						<label class="control-label">Wave Height</label> 
						<input class="input-medium-short weather-form-input" type="text" id="waveHeight"
							name="waveHeight"  tabindex='4' data-validation="meters"/> 
							<span>m</span>
					</div>
					<span class="help-block fade row-fluid offset2">Please insert a number</span>
				</div>
				<div class="control-group">
					<label class="control-label">Wave Direction</label> <select
						class="input-medium weather-form-select"  id="waveDirection" tabindex='7'
						name="waveDirection">
						<option selected>-Please select-</option>
						<option>North</option>
						<option>North-East</option>
						<option>East</option>
						<option>South-East</option>
						<option>South</option>
						<option>South-West</option>
						<option>West</option>
						<option>North-West</option>
					</select>
				</div>

				<div class="control-group">
					<div class="row-fluid"> 
						<label class="control-label">Date and time of tracking</label> 
						<input type="datetime-local" class="input-medium-large weather-form-input" name="trackDateTime"
							id="trackDateTime" tabindex='10'>						
					</div>
				</div>

			</div>
		</div>
    </form>
	<div class="container" align="center">
		<div class="row">
			<div class="span4" id="appNotes">
				<h4>Notes</h4>
				<textarea class="waypt-formelement"></textarea>
			</div>
			<div class="span4" id="markerMap">
				<h4>Map</h4>
				<img src="../img/icons/marker_map.png" id="appInfoPhoto" />
			</div>
			<div class="span4" id="appPhotos">
				<h4>Photos</h4>
				<img src="../img/icons/no_image.jpg" id="appInfoPhoto" />
			</div>
		</div>
	</div>
</div>
