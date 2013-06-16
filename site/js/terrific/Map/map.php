<div class="mod mod-map" data-connectors="crossmenu,markermenu,routemenu">
	<h2 align="center">Le Karte</h2>
	<div class="container-fluid">
		<div class="row well">
			<div class="span3" >
				<div id="centerKoordsDisplay">
					Center:
	            	<div id="centerKoordsDisplayLat">Latitude</div>
	            	<div id="centerKoordsDisplayLng">Longitude</div>
	        	</div>
				<button id="weatherBtn">Current weather</button>
	        	<div id="crossKoordsDisplay">
					<div id="crossKoordsDisplayTitle"></div>
					<div id="crossKoordsDisplayLat"></div>
					<div id="crossKoordsDisplayLng"></div>
				</div>
				<div id="distanceDisplay">
					<div id="distanceDisplayTitle"></div>
					<div id="distanceDisplayValue"></div>
				</div>
				<div id="CurWeather" align="center">
					<div id="CurWeatherTitle" align="left">Current Weather:</div>
					<img src="http://openweathermap.org/img/w/10d.png" id="CurWeatherIcon">
					<div id="CurWeatherTemp">20 °C</div>
					<div id="CurWeatherPressure">101 hPa</div>
					<div id="CurWeatherWTitle">Wind:</div>
					<div id="CurWeatherWSpeed">20 m/s</div>
					<div id="CurWeatherWDirection">NE (45°)</div>
					<div id="CurWeatherHumidity">50 %</div>
					<div id="CurWeatherClouds">40 %</div>
				</div>


				<!-- Tracking will einfach nich
				<div id="tracking">
					<button type="button" id="trackingButton" doTrack="false">Track</button>
					<div id="track"></div>
				</div>-->
				
			</div>
			<?php include("js/terrific/ContextMenuCross/contextmenucross.php")?>
			<?php include("js/terrific/ContextMenuMarker/contextmenumarker.php")?>
			<?php include("js/terrific/ContextMenuRoute/contextmenuroute.php")?>
				
			<div id="map-canvas"></div>
		</div>
	</div>
</div>