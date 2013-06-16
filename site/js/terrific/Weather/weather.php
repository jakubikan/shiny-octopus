<!-- Content -->
<div class="mod mod-weather">
	<h2 align="center">Weather information</h2>
	<div class="container-fluid">
        <form method="post" class="form-horizontal">
            <div class="row well">
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
            <div class="row well">
                <div class="span4">
                    <div class="control-group">
                        <div class="row-fluid"> 
                            <label class="control-label">Wind Strength</label> 
                            <input id="windStrength" class="input-medium-short form-input"  type="number"
                                name="windStrength" autofocus tabindex="2" data-validation="windstrength" />
                            <span>knots</span>
                        </div>
                        <span class="help-block fade row-fluid offset3">Please insert a number</span>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Wind Direction</label> 
                        <select
                            class="input-medium form-select" id="windDirection" name="windDirection" tabindex='5'>
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
                            <input class="input-medium-short form-input" type="number" id="airPressure"
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
                            <input class="input-medium-short form-input" id="temp" type="text" name="temp" tabindex="3" data-validation="temperature"/>
                            <span>°C</span>
                        </div>
                        <!--<span class="help-block fade row-fluid offset3">Please insert a number between -273.15 and 273.15</span>-->
                    </div>
                  <div class="control-group">
                        <label class="control-label">Clouds</label> <select
                            class="input-medium high-select form-select" id="clouds" name="clouds" tabindex='6'>
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
                            class="input-medium form-select" name="rain" id="rain" tabindex='9'>
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
                            <input class="input-medium-short form-input" type="text" id="waveHeight"
                                name="waveHeight"  tabindex='4' data-validation="meters"/> 
                                <span>m</span>
                        </div>
                        <span class="help-block fade row-fluid offset2">Please insert a number</span>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Wave Direction</label> <select
                            class="input-medium form-select"  id="waveDirection" tabindex='7'
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
                            <input type="datetime-local" class="input-medium-large form-input" name="trackDateTime"
                                id="trackDateTime" tabindex='10'>						
                        </div>
                    </div>
    
                </div>
            </div>
        </form>
    </div>
</div>
<!-- Content -->
