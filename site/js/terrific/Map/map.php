<div class="mod mod-map" data-connectors="crossmenu,markermenu,routemenu">
	<h2 align="center">Map</h2>
	<div class="container-fluid">
		<div class="row well">
			<div class="span2 no-left-margin" >
				<div id="centerCoordsDisplay">
					<div class="weather-title"><span>Center Coordinates</span></div>
	            	<div id="centerKoordsDisplayLat">Latitude</div>
	            	<div id="centerKoordsDisplayLng">Longitude</div>
					<button id="weatherBtn">Get weather...</button>
	        	</div>
	        	<div id="crossKoordsDisplay">
					<div class="weather-title"><span>Crosshair</span></div>
					  <div id="crossKoordsDisplayLat"></div>
					<div id="crossKoordsDisplayLng"></div>
				</div>
				<div id="distanceDisplay">
					<div class="weather-title"><span>Crosshair distance</span></div>
					  <div id="distanceDisplayValue"></div>
				</div>
				<div id="CurWeather">		
					<div class="weather-title"><span>Current Weather</span></div>
					<div id="CurWeatherDisplay"></div>
				</div>
				<div id="weatherForecast">
					<div class="weather-title"><span>Weather Forecast</span></div>
					<div id="forecastSwipe" class="swipe">
						<div class='swipe-wrap'>

						</div>
						<div>
							<button id="prevForecastItem"><img id="prevForecastItemImg" alt="<"/></button>
							<div id="forecastSlidePosition"></div>
							<button id="nextForecastItem"><img id="nextForecastItemImg" alt=">"/></button>
						</div>
					</div>
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