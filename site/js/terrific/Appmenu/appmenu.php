<div class="mod mod-appmenu navbar">
	<?php 
		global $site;
		$site = $_GET["site"];
		if (!$site) {
			$site = "weather";
		}
	?>
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