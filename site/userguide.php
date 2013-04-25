<!DOCTYPE html>

<html lang="de">
  	<?php include("header.php")?>
  	<body>
  	
		<!-- Navigation -->
		<div id="header">
		  	<?php include("js/terrific/Header/header.php")?>
		</div>
    	
    	<!-- Container -->
    	<div class="container">
	    	<div class="container-fluid">
		    	<div class="row-fluid">
		    	
		    		<!-- Sidebar -->
			    	<div class="span3">
				    	<div class="sidebar-nav" id="sidebar">
					    	<ul class="nav nav-list bs-docs-sidenav affix">
						    	<li class="sidebar"><a href="#" class="installing">Installing SeaPal</a></li>
								<li class="sidebar"><a href="#start" class="starting">Starting SeaPal</a></li>
								<li class="sidebar"><a href="#map_select" class="map">Map Selection</a></li>
								<li><a href="../img/screenshots/SeaPal-Legend-IBN-Map.pdf">Legend of IBN Maps</a></li>
					        </ul>
					    </div>
					</div><!-- Sidebar -->

					<!-- Content -->
					<div class="span9">
						<div class="post" id="installing">  	
							<h2>Installing SeaPal</h2>
							<div class="entry">
								<p>
									Installing SeaPal on the iPad or iPhone is simple and straight forward. Just search for SeaPal in the App Store, select it and install it. SeaPal comes free of charge, so it is very easy to give it a test drive. During the installation you will see the icon of the SeaPal application show up on your screen. Now you are ready to role.
								</p>
							</div>
						</div>
						<div class="post" id="starting">
							<br><br>
							<h2 id="start">Starting SeaPal</h2>
							<div class="entry">
								<p>
									 Tap on the SeaPal application icon to start SeaPal. If you have GPS on your mobile device, the app will ask you if it is ok to access your current position. This of course makes a lot of sense in a navigational app, so please do approve that.
								</p>
								<p>
									The application will then open with the map view. If no maps are loaded, you most likely have no internet connection. For initial setup an internet connection is important. You can set it up for offline operation later. If the displayed location is somewhere in the Pacific close to Ghana, you have not turned your GPS on. You can do so in your settings
								</p>
								<p>
									The map is centered at your current location. You can now pan and zoom by swiping with your finger or pinching with two fingers.
								</p>
								
							</div>
							<figure>
									<img src="http://seapal.info/images/SeaPal-InitialPosition.jpg" class="img-rounded" alt="SeaPal-InitialPosition" width="580" height="435"/>
									<figcaption>Map view with current position, initial view. </figcaption>
								</figure>
						</div>
						<div class="post" id="map">
							<br><br>
							<h2 id="map_select">Map Selection</h2>
							<div class="entry">
								<p>
									The map view initially shows maps from Google Maps. This is convenient because it downloads fast and is familiar to most. It is excellent for overview and orientation, but it is not very good for navigational purposes. These maps were created primarily for navigation with cars and not with sailors in mind. The shore line and especially harbors can be very imprecise. So you should know how to switch to different map views. For this, tap on the menu button at the top left.
								</p>
								<figure>
									<img src="http://seapal.info/images/SeaPal-Gothenborg-Menu.jpg" class="img-rounded" alt="SeaPal-Gothenborg-Menu" width="580" height="435"/>
									<figcaption>Menu selected.</figcaption>
								</figure>
								<p>
									From this menu, you can select several map views
								</p>
								<ul>
									<li>Google Maps</li>
									<li>Google Satellite view</li>
									<li>Open Sea Maps</li>
									<li>Offline Maps</li>
								</ul>
								<p>
									The Google Satellite view is excellent for near shore or in-harbor manovering. Mind you though, this view shows excellent physical detail of the shore and can also give you some indication on the underwater surface from shades of blue. But you do not have sea signals or depth information.
								</p>
								<figure>
									<img src="http://seapal.info/images/SeaPal-SatelliteView.jpg" class="img-rounded" alt="SeaPal-SatelliteView" width="580" height="435"/>
									<figcaption>Satellite view</figcaption>
								</figure>
								<p>
									The OpenSeaMap view is very good for navigation. It is also provided free of charge from the Open Street Map project, but was created for sailing and navigation. It contains sea signals and has more details on shore line. However, it does not have depth information, which can be very vital if you are not familiar with the area. Also, this map view loads slower and uses more calculation power on the mobile device. So you might find you iPad a little slower with this view on. The accuracy is not guaranteed, information is collected by an open community and can be incorrect. Also keep in mind that this is a vector map, the level of detail increases when zooming in. This means some details will not be visible when zoomed out.
								</p>
								<figure>
									<img src="http://seapal.info/images/SeaPal-Southampton-OSM.jpg" class="img-rounded" alt="SeaPal-Southampton-OSM" width="580" height="435"/>
									<figcaption>OpenSeaMap Map view</figcaption>
								</figure>
								<p>
									The biggest problem with all of the above is that they are only available online. That is you need to have an internet connection to view them. If you have a cellular built into your device with 3G or 4G connection, this might be good enough for you if you only sail close to shore or in-shore. However, we recommend to download offline maps prior to departure.
								</p>
								<p>
									Offline maps are excellent for navigation. They are always available (as long as your battery does not run out), have excellent sea signal information and show water depth. You can purchase offline maps for selected areas from the AddOn view. The first supported area is the Lake Constance for which maps are provided by IBN. Other areas should follow soon.
								</p>
								<figure>
									<img src="http://seapal.info/images/SeaPal-Konstanz-IBN.jpg" class="img-rounded" alt="SeaPal-Konstanz-IBN" width="580" height="435"/>
									<figcaption>Offline map from IBN</figcaption>
								</figure>
								<br><br>
							</div>
						</div>
				    </div><!-- Content -->
				</div>
	    	</div>	
		</div><!-- Container -->
		
		<div id="footer">
			<?php include ("js/terrific/Footer/footer.php")?>
		</div>
	    
  </body>
</html>
