<div class="mod mod-map" data-connectors="crossmenu,markermenu,routemenu">
	<h2 align="center">Map</h2>
	<div class="container-fluid">
		<div class="row well">
			<div class="span2" >
				<div id="centerKoordsDisplay">
					Center:
	            	<div id="centerKoordsDisplayLat">Latitude</div>
	            	<div id="centerKoordsDisplayLng">Longitude</div>
	        	</div>
				<button id="weatherBtn">Weather</button>
	        	<div id="crossKoordsDisplay">
					Crosshair:
					<div id="crossKoordsDisplayLat"></div>
					<div id="crossKoordsDisplayLng"></div>
				</div>
				<div id="distanceDisplay">
					Crosshair distance:
					<div id="distanceDisplayValue"></div>
				</div>
				<div id="CurWeather" align="center">		
					<div align="left"><b>Current Weather:</b></div>
					<div id="CurWeatherDisplay"></div><!--
					<div id="CurWeatherWTitle">Wind:</div>
					<div id="CurWeatherWSpeed">Speed: 20 m/s</div>
					<div id="CurWeatherWDirection">Direction: NE (45°)</div>	
					<img src="http://openweathermap.org/img/w/10d.png" id="CurWeatherIcon"/>
					<div id="CurWeatherTemp">20 °C</div>
					<div id="CurWeatherDescription">moderate rain</div>
					<div id="CurWeatherPressure">101 hPa</div>
					<div id="CurWeatherHumidity">Humidity: 50%</div>
					<div id="CurWeatherClouds">Clouds: 40 %</div>
					<!JS hat probleme mit der syntax des JSON Objects hier
					<div id="CurWeatherPTitle">Precipitation:</div>
					<div id="CurWeatherPRain">Rain: 3 mm/3h</div>
					<div id="CurWeatherPSnow">Snow: 3 mm/3h</div>
					-->
				</div>
				<div id="weatherForecast" align="center">
					<div align="left"><b>Weather Forecast</b></div>
					<div id="forecastSwipe" class="swipe">
						<div class='swipe-wrap'>

						</div>
					</div>
					<button id="prevForecastItem" align="left">Prev</button>
					<button id="nextForecastItem" align="right">Next</button>
					<div id="forecastSlidePosition"></div>
				</div>

				<!-- Tracking will einfach nich
				<div id="tracking">
					<button type="button" id="trackingButton" doTrack="false">Track</button>
					<div id="track"></div>
				</div>-->
				
			</div>
			<?php include("js/terrific/ContextMenuCross/contextmenucross.php") ?>
			<?php include("js/terrific/ContextMenuMarker/contextmenumarker.php") ?>
			<?php include("js/terrific/ContextMenuRoute/contextmenuroute.php") ?>
				
			<div id="map-canvas"></div>
			
		</div>

	</div>
</div>