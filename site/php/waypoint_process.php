<?php 
	include("dbconnect.php");
	$DBNAME = "seapal";
	$WAYPOINTTABLENAME = "waypoint";
	$connection = ConnectDatabase();
	if (!mysql_query("CREATE DATABASE IF NOT EXISTS ".$DBNAME,$connection)) {
		die("Error creating Database: ".mysql_error());
	}
	//Create table
	SelectDB($connection);
	
	$sql = "CREATE TABLE IF NOT EXISTS ".$WAYPOINTTABLENAME."(	Name varchar(255),
																HeadSail varchar(255),
																Latitude varchar(255),
																Longitude varchar(255),
																Destination varchar(255),
																DTM varchar(255),
																COG varchar(255),																
																SOG varchar(255),
																Manoever varchar(255),
																BTM varchar(255),
																ID INT NOT NULL AUTO_INCREMENT, 
																PRIMARY KEY(ID),
																Windstrength double,
																WindDirection varchar(255), 
																AirPressure double,
																Temperature double,
																Clouds varchar(255),
																Rain varchar(255), 
																WaveHeight double, 
																WaveDirection varchar(255)
															);";
	if(!mysql_query($sql)){
		die( "Error creating Table: ".mysql_error());
	}
	
	$action = $_POST['action'];
	$result = array();
	switch($action) {		
		case('send'):
			$data = $_POST['data'];
			if(($data) != "\n"){
				$sql = "INSERT INTO ".$WAYPOINTTABLENAME." VALUES(	'".$data['name']."',
																	'".$data['headsail']."',
																	'".$data['latitude']."',
																	'".$data['longitude']."',
																	'".$data['destination']."',
																	'".$data['dtm']."',
																	'".$data['cog']."',
																	'".$data['sog']."',
																	'".$data['maneuver']."',
																	'".$data['btm']."',
																	0,
																	".$data['windstrength'].",
																	'".$data['winddirection']."',
																	".$data['airpressure'].",
																	".$data['temperature'].",
																	'".$data['clouds']."',
																	'".$data['rain']."',
																	".$data['waveheight'].",
																	'".$data['wavedirection']."',
																	'".$data['dateandtime']."'
																);";
																									
				if(!mysql_query($sql)){
					die("Error: ".mysql_error()."    ");
				}
				$sql2 = "SELECT MAX(ID) FROM ".$WAYPOINTTABLENAME.";";
				$resultArray = mysql_query($sql2);
				$row = mysql_fetch_row($resultArray);
				$result = $row[0];
				if(!($result >= 0)) {
					die("Error: ".mysql_error()."    ");
				}
				mysql_free_result($resultArray);
			}
			break;
		case('update'):
			$data = $_POST['data'];
			if(($data) != "\n"){
				$sql = "UPDATE ".$WAYPOINTTABLENAME." SET 	Name='".$data['name']."',
															Headsail='".$data['headsail']."',
															Lat='".$data['latitude']."',
															Lng='".$data['longitude']."',
															Dest='".$data['destination']."',
															DTM='".$data['dtm']."',
															COG='".$data['cog']."',
															SOG='".$data['sog']."',
															Maneuver='".$data['maneuver']."',
															BTM='".$data['btm']."',
															WindStrength=".$data['windstrength'].",
														 	WindDirection='".$data['winddirection']."',
														 	AirPressure=".$data['airpressure'].",
														 	Temperature=".$data['temperature'].",
														 	Clouds='".$data['clouds']."',
														 	Rain='".$data['rain']."',
														 	WaveHeight=".$data['waveheight'].",
														 	WaveDirection='".$data['wavedirection']."',
															DateTime='".$data['dateandtime']."' 
														 	WHERE ID = ".$data['ID'].";";
																									
				$result = mysql_query($sql);																		
				if(!$result){
					die("Error: ".mysql_error()."    ");
				}
			}
			break;
		case('fetch'):
			$data = $_POST['data'];
			if(($data) != "\n"){
				$sql = "SELECT * FROM ".$WAYPOINTTABLENAME." WHERE
															ID = ".$data['ID'].";";
																									
				$resultArray = mysql_query($sql);
				$row = mysql_fetch_row($resultArray);
				$result = $row;																		
				if(!$result){
					echo "No entry!";
				}				
				mysql_free_result($resultArray);
			}
			
			break;
		case('select'):
			$data = $_POST['data'];
			if(($data) != "\n"){
				$iter = 0;
				$sql = "SELECT ID, DateTime FROM ".$WAYPOINTTABLENAME." ";
				$resultArray = mysql_query($sql);
				while ($row = mysql_fetch_array($resultArray)) {
					$result[$iter] = $row;
					$iter++;
				}
				if(!$result){
					echo "No Entry!";
				}
				mysql_free_result($resultArray);
			}
			break;
		case ('delete'):
			$data = $_POST['data'];
			if(($data) != "\n"){
				$sql = "DELETE FROM ".$WAYPOINTTABLENAME." WHERE ID = ".$data['ID'].";";
				$result = mysql_query($sql);
			}
			break;
	}	
	echo json_encode($result);
?>