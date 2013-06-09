<?php 
	include("dbconnect.php");
	$DBNAME = "seapal";
	$WEATHERTABLENAME = "Weather";
	$connection = ConnectDatabase();
	if (!mysql_query("CREATE DATABASE IF NOT EXISTS ".$DBNAME,$connection)) {
		die("Error creating Database: ".mysql_error());
	}
	//Create table
	SelectDB($connection);
	
	$sql = "CREATE TABLE IF NOT EXISTS ".$WEATHERTABLENAME."(	ID INT NOT NULL AUTO_INCREMENT, 
																PRIMARY KEY(ID),
																Windstrength double,
																Temperature double,
																WindDirection varchar(255),
																Clouds varchar(255), 
																AirPressure double,
																Rain varchar(255), 
																WaveHeight double, 
																WaveDirection varchar(255),
																DateTime varchar(255)
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
				$sql = "INSERT INTO ".$WEATHERTABLENAME." VALUES(	0,
																	".$data['windstrength'].",
																	".$data['temperature'].",
																	'".$data['winddirection']."',
																	'".$data['clouds']."',
																	".$data['airpressure'].",
																	'".$data['rain']."',
																	".$data['waveheight'].",
																	'".$data['wavedirection']."',
																	'".$data['dateandtime']."'
																);";
																									
				if(!mysql_query($sql)){
					die("Error: ".mysql_error()."    ");
				}
				$sql2 = "SELECT MAX(ID) FROM ".$WEATHERTABLENAME.";";
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
				$sql = "UPDATE ".$WEATHERTABLENAME." SET WindStrength=".$data['windstrength'].",
														 Temperature=".$data['temperature'].",
														 WindDirection='".$data['winddirection']."',
														 Clouds='".$data['clouds']."',
														 AirPressure=".$data['airpressure'].",
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
				$sql = "SELECT * FROM ".$WEATHERTABLENAME." WHERE
															ID = ".$data['id'].";";
																									
				$resultArray = mysql_query($sql);
				$row = mysql_fetch_row($resultArray);
				$result = $row;																		
				if(!$result){
					die("Error: ".mysql_error()."    ");
				}				
				mysql_free_result($resultArray);
			}
			
			break;
		case('select'):
			$data = $_POST['data'];
			if(($data) != "\n"){
				
				
				$iter = 0;
				$sql = "SELECT ID, DateTime FROM ".$WEATHERTABLENAME." ";
				$resultArray = mysql_query($sql);
				while ($row = mysql_fetch_array($resultArray)) {
					$result[$iter] = $row;
					$iter++;
				}
				if(!$result){
					die("Error: ".mysql_error()."    ");
				}
				mysql_free_result($resultArray);
			}
			
			break;
	}	
	echo json_encode($result);
?>