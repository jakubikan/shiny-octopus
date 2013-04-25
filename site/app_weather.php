<!DOCTYPE html>
<?php
	include("php/dbconnect.php");
	$con = ConnectAndSelectDB();
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
			<?php include("js/terrific/Weather/weather.php")?>
		</div><!-- Container -->
		
		<div id="footer">
			<?php include ("js/terrific/Footer/footer.php") ?>
		</div>
		
	</body>
</html>