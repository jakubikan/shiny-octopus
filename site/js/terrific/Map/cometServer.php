<?php
	//TODO: eingehende x y werte zufällig verändern
	$lat = $_GET['lat'];
	$lng = (double)$_GET['lng'];
	sleep(1);
	$lng = $lng + 0.001
	// return a json array
	$response = array();
	$response['lat'] = $lat;
	$response['lng'] = $lng;
	echo json_encode($response);
	
?>