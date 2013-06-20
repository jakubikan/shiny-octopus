package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Version;

import play.db.ebean.*;

@Entity
public class Waypoint extends Model {

	@Id
	@Column(name = "ID")
	private long id;

	@Version
	private Date timestamp;

	@Column(name = "Name")
	private String name;
	@Column(name = "HeadSail")
	private String headsail;
	@Column(name = "Lat")
	private String lat;
	@Column(name = "Lng")
	private String lng;
	@Column(name = "Dest")
	private String dest;
	@Column(name = "DTM")
	private String dtm;
	@Column(name = "COG")
	private String cog;
	@Column(name = "SOG")
	private String sog;
	@Column(name = "Maneuver")
	private String maneuver;
	@Column(name = "BTM")
	private String btm;
	@Column(name = "WindStrength")
	private float windstrength;
	@Column(name = "WindDirection")
	private String winddirection;
	@Column(name = "AirPressure")
	private float airpressure;
	@Column(name = "Temperature")
	private float temperature;
	@Column(name = "Clouds")
	private String clouds;
	@Column(name = "Rain")
	private String rain;
	@Column(name = "WaveHeight")
	private float waveheight;
	@Column(name = "WaveDirection")
	private String wavedirection;
	@Column(name = "DateTime")
	private String datetime;


	public static Finder<Long, Waypoint> find = new Finder<Long, Waypoint>(
			Long.class, Waypoint.class);


	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}


	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}


	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}


	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}


	/**
	 * @return the headsail
	 */
	public String getHeadsail() {
		return headsail;
	}


	/**
	 * @param headsail the headsail to set
	 */
	public void setHeadsail(String headsail) {
		this.headsail = headsail;
	}


	/**
	 * @return the lat
	 */
	public String getLat() {
		return lat;
	}


	/**
	 * @param lat the lat to set
	 */
	public void setLat(String lat) {
		this.lat = lat;
	}


	/**
	 * @return the lng
	 */
	public String getLng() {
		return lng;
	}


	/**
	 * @param lng the lng to set
	 */
	public void setLng(String lng) {
		this.lng = lng;
	}


	/**
	 * @return the dest
	 */
	public String getDest() {
		return dest;
	}


	/**
	 * @param dest the dest to set
	 */
	public void setDest(String dest) {
		this.dest = dest;
	}


	/**
	 * @return the dtm
	 */
	public String getDtm() {
		return dtm;
	}


	/**
	 * @param dtm the dtm to set
	 */
	public void setDtm(String dtm) {
		this.dtm = dtm;
	}


	/**
	 * @return the cog
	 */
	public String getCog() {
		return cog;
	}


	/**
	 * @param cog the cog to set
	 */
	public void setCog(String cog) {
		this.cog = cog;
	}


	/**
	 * @return the sog
	 */
	public String getSog() {
		return sog;
	}


	/**
	 * @param sog the sog to set
	 */
	public void setSog(String sog) {
		this.sog = sog;
	}


	/**
	 * @return the maneuver
	 */
	public String getManeuver() {
		return maneuver;
	}


	/**
	 * @param maneuver the maneuver to set
	 */
	public void setManeuver(String maneuver) {
		this.maneuver = maneuver;
	}


	/**
	 * @return the btm
	 */
	public String getBtm() {
		return btm;
	}


	/**
	 * @param btm the btm to set
	 */
	public void setBtm(String btm) {
		this.btm = btm;
	}


	/**
	 * @return the windstrength
	 */
	public float getWindstrength() {
		return windstrength;
	}


	/**
	 * @param windstrength the windstrength to set
	 */
	public void setWindstrength(float windstrength) {
		this.windstrength = windstrength;
	}


	/**
	 * @return the winddirection
	 */
	public String getWinddirection() {
		return winddirection;
	}


	/**
	 * @param winddirection the winddirection to set
	 */
	public void setWinddirection(String winddirection) {
		this.winddirection = winddirection;
	}


	/**
	 * @return the airpressure
	 */
	public float getAirpressure() {
		return airpressure;
	}


	/**
	 * @param airpressure the airpressure to set
	 */
	public void setAirpressure(float airpressure) {
		this.airpressure = airpressure;
	}


	/**
	 * @return the temperature
	 */
	public float getTemperature() {
		return temperature;
	}


	/**
	 * @param temperature the temperature to set
	 */
	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}


	/**
	 * @return the clouds
	 */
	public String getClouds() {
		return clouds;
	}


	/**
	 * @param clouds the clouds to set
	 */
	public void setClouds(String clouds) {
		this.clouds = clouds;
	}


	/**
	 * @return the rain
	 */
	public String getRain() {
		return rain;
	}


	/**
	 * @param rain the rain to set
	 */
	public void setRain(String rain) {
		this.rain = rain;
	}


	/**
	 * @return the waveheight
	 */
	public float getWaveheight() {
		return waveheight;
	}


	/**
	 * @param waveheight the waveheight to set
	 */
	public void setWaveheight(float waveheight) {
		this.waveheight = waveheight;
	}


	/**
	 * @return the wavedirection
	 */
	public String getWavedirection() {
		return wavedirection;
	}


	/**
	 * @param wavedirection the wavedirection to set
	 */
	public void setWavedirection(String wavedirection) {
		this.wavedirection = wavedirection;
	}


	/**
	 * @return the datetime
	 */
	public String getDatetime() {
		return datetime;
	}


	/**
	 * @param datetime the datetime to set
	 */
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}


	/**
	 * @return the find
	 */
	public static Finder<Long, Waypoint> getFind() {
		return find;
	}


	/**
	 * @param find the find to set
	 */
	public static void setFind(Finder<Long, Waypoint> find) {
		Waypoint.find = find;
	}





}
