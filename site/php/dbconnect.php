<?php 
	function ConnectDatabase(){
		$con = mysql_connect("localhost","root","muhkuh123");
		if(!$con){
			die("Could not connect to DB: ".mysql_error());
		}
		return $con;
	}
	function SelectDB($connection){
		if(!mysql_select_db("seapal",$connection)){
			die("Could not select DB: ".mysql_error());
		}
	}
	function ConnectAndSelectDB(){
		$con = ConnectDatabase();
		SelectDB($con);
		return $con;
	}
?>