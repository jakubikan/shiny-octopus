<div class="mod mod-waypoint">
	<form class="form-horizontal well" id="waypt-form">
		<div class="row-fluid">
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
