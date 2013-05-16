<!DOCTYPE html>
<?php
include("php/dbconnect.php");
$con = ConnectAndSelectDB();
global $site;
$site = $_GET["site"];
if (!$site) {
	$site = "weather";
}
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
		<div class="app-menu navbar">
			<div class="navbar-inner">
				<ul class="nav">
					<li class="<?php echo strcmp($site, "weather") == 0 ? 'active': 'weather'?>">
						<a href="?site=weather">Wetter</a>
					</li>
					<li class="<?php echo strcmp($site, "waypoint") == 0 ? 'active': 'waypoint'?>">
						<a href="?site=waypoint">Wegpunkt</a>
					</li>
					<li class="<?php echo strcmp($site, "map") == 0 ? 'active': 'map'?>">
						<a href="?site=map">Map</a>
					</li>
				</ul>
			</div>
			
		</div>
		
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
