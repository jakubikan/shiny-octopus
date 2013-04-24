<div class="mod mod-waypoint">
	<h2>Wegpunkt</h2>
	<form class="form-horizontal row well">

		<div class="span5">
			<div class="control-group">
				<label class="control-label">Name</label> <input
					class="input-medium" type="text" id="name" />
			</div>
			<div class="control-group">
				<label class="control-label">Time</label> <input
					class="input-medium" type="date" id="wdate" />
			</div>
			<div class="control-group">
				<label class="control-label">Date</label> <input
					class="input-medium" type="date" id="wtime" />
			</div>
		</div>

		<div class="span5">
			<div class="control-group">
				<label class="control-label">Latitude</label> <input
					class="input-medium" type="text" id="lat" />
			</div>
			<div class="control-group">
				<label class="control-label">Longitude</label> <input
					class="input-medium" type="text" id="lng" />
			</div>
			<div class="control-group">
				<label class="control-label">Fahrt nach</label> <select
					name="fahrtziel" id="marker"></select>
			</div>
		</div>

		<div class="span5">
			<div class="control-group">
				<label class="control-label">COG</label> <input class="input-medium"
					type="text" id="cog" />
			</div>
			<div class="control-group">
				<label class="control-label">SOG</label> <input class="input-medium"
					type="text" id="sog" />
			</div>

			<div class="control-group">
				<label class="control-label">Manoever</label> <select
					name="manoever" id="manoever"></select>
			</div>
		</div>

		<div class="span5">
			<div class="control-group">
				<label class="control-label">BTM</label> <input class="input-medium"
					type="text" id="btm" />
			</div>
			<div class="control-group">
				<label class="control-label">DTM</label> <input class="input-medium"
					type="text" id="dtm" />
			</div>
			<div class="control-group">
				<label class="control-label">Vorsegel</label> <select
					name="vorsegel" id="vorsegel"></select>
			</div>
		</div>
	</form>
	<div class="container" align="center">
		<div class="row">
			<div class="span4" id="appNotes">
				<h4>Notes</h4>
				<textarea></textarea>
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
