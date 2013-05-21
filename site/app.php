<!DOCTYPE html>
<?php
include("php/dbconnect.php");
$con = ConnectAndSelectDB();
global $site;
$site = $_GET["site"] || "weather"
?>
<html lang="de">
<?php include("head_tag.php")?>
<body>

	<!-- Navigation -->
	<div id="header">
		<?php include("js/terrific/Header/header.php")?>
	</div>


	<!-- Container -->
	<div class="container-fluid">
		<?php include ("js/terrific/Appmenu/appmenu.php"); ?>
		<?php 
		switch ($site) {
			case "weather":
				include ("js/terrific/Weather/weather.php");
				break;
			case "waypoint":
				include ("js/terrific/Waypoint/waypoint.php");
				break;
			case "map":
				include ("js/terrific/Map/map.php");
				break;
		};
		
		
		?>
		

	</div>
	<!-- Container -->

	<div id="footer">
		<?php include ("js/terrific/Footer/footer.php") ?>
	</div>

</body>
</html>
