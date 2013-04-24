
<!-- Content -->
<div id="mod mod-weather">
	<br />
	<h2 align="center">Weather information</h2>
	<br />
	<div class="container-fluid">
		<form action="insert.php" method="post" class="form-horizontal">
			<div class="row well" style="margin-left: 15%;">
				<div class="span4">
					<div class="control-group">
						<label class="control-label">Wind Strength</label> <input
							id="windStrength" class="input-medium-short" type="number"
							name="windStrength" autofocus /> knots
					</div>
					<div class="control-group">
						<label class="control-label">Wind Direction</label> <select
							class="input-medium" id="windDirection" name="windDirection">
							<option disabled selected>-Please select-</option>
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
						<label class="control-label">Air Pressure</label> <input
							class="input-medium" type="number" id="airPressure"
							name="airPressure" /> hPa
					</div>
				</div>
				<div class="span4">
					<div class="control-group">
						<label class="control-label">Temperature</label> <input
							class="input-medium" id="temp" type="text" name="temp" />
					</div>
					<div class="control-group">
						<label class="control-label">Clouds</label> <select
							class="input-medium high-select" id="clouds" name="clouds">
							<option disabled selected>-Please select-</option>
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
							class="input-medium" name="rain" id="rain">
							<option disabled selected>-Please select-</option>
							<option>0 - 2 mm/sqm</option>
							<option>2 - 4 mm/sqm</option>
							<option>4 - 8 mm/sqm</option>
							<option>8 - 15 mm/sqm</option>
							<option>15 - 25 mm/sqm</option>
							<option>>25 mm/sqm</option>
						</select>
					</div>
				</div>
				<div class="span4">
					<div class="control-group">
						<label class="control-label">Wave Height</label> <input
							class="input-medium" type="text" id="waveHeight"
							name="waveHeight" /> m
					</div>
					<div class="control-group">
						<label class="control-label">Wave Direction</label> <select
							class="input-medium" type="text" id="waveDirection"
							name="waveDirection">
							<option disabled selected>-Please select-</option>
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
						<label class="control-label">Date and time of tracking</label> <input
							type="datetime-local" class="input-medium" name="trackDateTime"
							id="trackDateTime">
					</div>

				</div>
				<div class="span8">
					<div class="row">
						<div class="span2"></div>
						<div class="span1">
							<div class="btn-group">
								<button type="submit" id="submitBtn" class="btn btn-primary">Submit</button>
							</div>
						</div>
					</div>
				</div>

			</div>
		</form>
	</div>
	<br />
	<div id="dbTable">
		<table>
			<?php
			$result = mysql_query("Select * FROM weather");
			while($row = mysql_fetch_array($result)){
				    			echo "<tr>";
				    			echo 	"<td>".$row['Windstrength']." Knots</td>
				<td>".$row['Temperature']." </td>
					<td>".$row['WindDirection']."</td>
					<td>".$row['Clouds']."</td>
					<td>".$row['AirPressure']." hPa</td>
					<td>".$row['Rain']."</td>
					<td>".$row['WaveHeight']." m</td>
					<td>".$row['WaveDirection']."</td>
					<td>".$row['DateTime']."</td>";
    			echo "</tr>";
    		} ?>
		</table>
	</div>
	<br />

</div>
<!-- Content -->
