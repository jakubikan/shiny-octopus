<?php		
	//Datenbank Konstanten
	$DBNAME = "seapal";
	$WEATHERTABLENAME = "Weather";
	$connection = mysql_connect("localhost","root","");
	if (!$connection) {
		die('Could not connenct: '. mysql_error());
	}
	if (!mysql_query("CREATE DATABASE IF NOT EXISTS ".$DBNAME,$connection)) {
		die("Error creating Database: ".mysql_error());
	}
	//Create table
	mysql_select_db("seapal",$connection);
	
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

	$sql = "INSERT INTO ".$WEATHERTABLENAME." VALUES(	0,
														$_POST[windStrength],
														$_POST[temp],
														'$_POST[windDirection]',
														'$_POST[clouds]',
														$_POST[airPressure],
														'$_POST[rain]',
														$_POST[waveHeight],
														'$_POST[waveDirection]',
														'$_POST[trackDateTime]'
													);";
	if(!mysql_query($sql)){
		die("Error: ".mysql_error());
	}else{
		echo "Eintrag eingefügt";
	}
?>