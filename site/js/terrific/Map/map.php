<div class="mod mod-map" data-connectors="crossmenu,markermenu,routemenu">
	<div class="row-fluid well">
		<div class="span9" >
        	<div class="control-group">
                <div id="latlng" class="row-fluid">
                    <div id="lat">Latitude</div>
                    <div id="long">Longitude</div>
                    <button id="weatherBtn">Click for current weather data</button>
                </div>
           	</div>
			<!-- Tracking will einfach nich
			<div id="tracking">
				<button type="button" id="trackingButton" doTrack="false">Track</button>
				<div id="track"></div>
			</div>-->
			<div id="map-canvas">
			</div>
			<?php include("js/terrific/ContextMenuCross/contextmenucross.php")?>
			<?php include("js/terrific/ContextMenuMarker/contextmenumarker.php")?>
			<?php include("js/terrific/ContextMenuRoute/contextmenuroute.php")?>
			<div id="CrossHair">
				FadenKreuz
				<div id="crossLat">fga</div>
				<div id="crossLong">adf</div>
			</div>
			<div>
				Entfernung:
				<div id="distanceToCrosshair"></div>
			</div>
		</div>
		<div class="span1"></div>
	</div>
</div>