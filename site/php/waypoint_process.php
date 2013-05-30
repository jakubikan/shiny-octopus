<?php 
	$action = $_POST['action'];
	$result;
	switch($action) {
		case('update'): ;
		
		case('send'):
		$message = $_POST['message'];
		if(($message) != "\n"){
			fwrite(fopen('chat.txt', 'a'), $message); 
		}
		
		break;
		
	}
	
	switch($_SERVER['REQUEST_METHOD']) 
	{
		case 'GET':
			break;
		case 'POST':	
			break;
	}
	
	echo json_encode($result);
?>