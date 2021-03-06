<div class="mod mod-waypoint">
	<h2 align="center">Waypoint information</h2>
	<div class="container-fluid">
        <form class="form-horizontal" method='post'>
            <div class="row well">
                <div class="span6">
                    <div class="control-group">
                        <div class="row-fluid"> 
                            <label class="control-label">Choose existing entry: </label> 
                            <select
                            class="input-medium-xlarge" data-id="entry" name="entry" tabindex='1'>                            
                            </select>
                            <img  data-id="loadgif" src="../../../../img/animation/ajax-loader.gif"/>
                            <a href="javascript:void(0);"><img data-id="delEntryIcon" src="../../../../img/animation/delete_icon.gif" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row well">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label">Name</label> <input
                            class="input-medium form-input" type="text" data-id="name" autofocus tabindex='1'/>
                    </div>
                    <div class="control-group">
                        <label class="control-label">COG</label> <input class="input-medium form-input"
                            type="text" data-id="cog" tabindex='4'/>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Maneuver</label> 
                        	<select
                            name="maneuver" data-id="maneuver" class="form-select input-medium-large" tabindex='7'>
                            	<option selected>-Please select-</option>
                                <option>Option1</option>
                                <option>Option2</option>
                                <option>Option3</option>
                            </select>
                    </div>
                    <div class="control-group">
                        <label class="control-label">DTM</label> <input class="input-medium form-input"
                            type="text" data-id="dtm" tabindex='9'/>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label">Latitude</label> <input
                            class="input-medium form-input" type="text" data-id="lat" tabindex='2'/>
                    </div>                    
                    <div class="control-group">
                        <label class="control-label">SOG</label> <input class="input-medium form-input"
                            type="text" data-id="sog" tabindex='5'/>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Head sail</label> 
                        <select
                            name="vorsegel" data-id="headSail" class="form-select input-medium-large" tabindex='8'>
                            <option selected>-Please select-</option>
                            <option>Option1</option>
                            <option>Option2</option>
                            <option>Option3</option>
                        </select>
                    </div>                    
                    <div class="control-group">
                        <label class="control-label">BTM</label> <input class="input-medium form-input"
                            type="text" data-id="btm" tabindex='10'/>
                    </div>                    
                </div>
                <div class="span4">        			
                    <div class="control-group">
                        <label class="control-label">Longitude</label> <input
                            class="input-medium form-input" type="text" data-id="lng" tabindex='3'/>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Destination</label> 
                        	<select
                            name="fahrtziel" data-id="dest" class="form-select input-medium-large" tabindex='6'>
                            	<option selected>-Please select-</option>
                                <option>Bregenz</option>
                                <option>Fischbach</option>
                                <option>Friedrichshafen</option>
                                <option>Hagnau</option>
                                <option>Haltnau</option>
                                <option>Schloss Helmsdorf</option>
                                <option>Immenstaad</option>
                                <option>Kirchberg</option>
                                <option>Konstanz</option>
                                <option>Kressbronn</option>
                                <option>Langenargen</option>
                                <option>Lindau</option>
                                <option>Lochau</option>
                                <option>Meersburg</option>
                                <option>Nonnenhorn</option>
                                <option>Wasserburg</option>
                            </select>
                    </div>
                </div>
            </div>
        </form>
    </div>
	<div class="container-fluid">
        <form class="form-horizontal">
            <div class="row well">
                <div class="span4">
                    <div class="control-group">
                      <div class="row-fluid"> 
                            <label class="control-label">Wind Strength</label> 
                            <input data-id="windStrength" class="input-medium-short form-input"  type="number"
                                name="windStrength" autofocus tabindex="11" data-validation="windstrength" />
                          m/s
                      </div>
                        <span class="help-block fade row-fluid offset3">Please insert a number</span>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Wind Direction</label> 
                        <select
                            class="input-medium form-select" data-id="windDirection" name="windDirection" tabindex='14'>
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
                            <input class="input-medium-short form-input" type="number" data-id="airPressure"
                                name="airPressure" tabindex='17' data-validation="airpreasure" />
                            <span>hPa</span>
                        </div>
                        <span class="help-block fade row-fluid offset3">Please insert a number</span>
                    </div>
                </div>
                <div class="span4">            	
                    <div class="control-group">
                        <div class="row-fluid">
                            <label class="control-label">Temperature</label> 
                            <input class="input-medium-short form-input" data-id="temp" type="text" name="temp" tabindex="12" data-validation="temperature"/>
                            <span>°C</span>
                        </div>
                        <span class="help-block fade row-fluid offset3">Please insert a number between -273.15 and 273.15</span>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Clouds</label> <select
                            class="input-medium high-select form-select" data-id="clouds" name="clouds" tabindex='15'>
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
                            class="input-medium form-select" name="rain" data-id="rain" tabindex='18'>
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
                            <input class="input-medium-short form-input" type="text" data-id="waveHeight"
                                name="waveHeight"  tabindex='13' data-validation="meters"/> 
                                <span>m</span>
                        </div>
                        <span class="help-block fade row-fluid offset2">Please insert a number</span>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Wave Direction</label> <select
                            class="input-medium form-select"  data-id="waveDirection" tabindex='16'
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
                            <input type="text" class="input-medium-large form-input" name="trackDateTime"
                                data-id="trackDateTime" tabindex='19'>						
                        </div>
                    </div>
    
                </div>
            </div>
        </form>
    </div>
	<div class="container" align="center">
		<div class="row">
			<div class="span4" data-id="appNotes">
				<h4>Notes</h4>
				<textarea class="waypt-formelement" tabindex='20'></textarea>
			</div>
			<div class="span4" data-id="markerMap">
				<h4>Map</h4>
				<img src="../img/icons/marker_map.png" data-id="appInfoPhoto" />
			</div>
			<div class="span4" data-id="appPhotos">
				<h4>Photos</h4>
				<img src="../img/icons/no_image.jpg" data-id="appInfoPhoto" />
			</div>
		</div>
	</div>
</div>
