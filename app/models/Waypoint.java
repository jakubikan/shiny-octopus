package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import play.db.ebean.*;

@Entity
public class Waypoint extends Model {

	@Id
	@Column(name = "ID")
	private long id;

	@Column(name = "Name")
	private String name;
	@Column(name = "HeadSail")
	private String headSail;
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
	private int windStrength;
	@Column(name = "WindDirection")
	private String windDirection;

	@Column(name = "AirPressure")
	private int airPressure;
	@Column(name = "Temperature")
	private int temperature;
	@Column(name = "Clouds")
	private String clouds;
	@Column(name = "Rain")
	private String rain;

	@Column(name = "WaveHeight")
	private int waveHeight;
	@Column(name = "WaveDirection")
	private String waveDirection;
	@Column(name = "DateTime")
	private String dateTime;


	public static Finder<Long, Waypoint> find = new Finder<Long, Waypoint>(
			Long.class, Waypoint.class);

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
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
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the headSail
	 */
	public String getHeadSail() {
		return headSail;
	}

	/**
	 * @param headSail
	 *            the headSail to set
	 */
	public void setHeadSail(String headSail) {
		this.headSail = headSail;
	}

	/**
	 * @return the lat
	 */
	public String getLat() {
		return lat;
	}

	/**
	 * @param lat
	 *            the lat to set
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
	 * @param lng
	 *            the lng to set
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
	 * @param dest
	 *            the dest to set
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
	 * @param dtm
	 *            the dtm to set
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
	 * @param cog
	 *            the cog to set
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
	 * @param sog
	 *            the sog to set
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
	 * @param maneuver
	 *            the maneuver to set
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
	 * @param btm
	 *            the btm to set
	 */
	public void setBtm(String btm) {
		this.btm = btm;
	}

	/**
	 * @return the windStrength
	 */
	public int getWindStrength() {
		return windStrength;
	}
	/**
	 * @param windStrength the windStrength to set
	 */
	public void setWindStrength(int windStrength) {
		this.windStrength = windStrength;
	}
	/**
	 * @return the windDirection
	 */
	public String getWindDirection() {
		return windDirection;
	}
	/**
	 * @param windDirection the windDirection to set
	 */
	public void setWindDirection(String windDirection) {
		this.windDirection = windDirection;
	}
	/**
	 * @return the airPressure
	 */
	public int getAirPressure() {
		return airPressure;
	}
	/**
	 * @param airPressure the airPressure to set
	 */
	public void setAirPressure(int airPressure) {
		this.airPressure = airPressure;
	}
	/**
	 * @return the temperature
	 */
	public int getTemperature() {
		return temperature;
	}
	/**
	 * @param temperature the temperature to set
	 */
	public void setTemperature(int temperature) {
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
	 * @return the waveHeight
	 */
	public int getWaveHeight() {
		return waveHeight;
	}
	/**
	 * @param waveHeight the waveHeight to set
	 */
	public void setWaveHeight(int waveHeight) {
		this.waveHeight = waveHeight;
	}
	/**
	 * @return the waveDirection
	 */
	public String getWaveDirection() {
		return waveDirection;
	}
	/**
	 * @param waveDirection the waveDirection to set
	 */
	public void setWaveDirection(String waveDirection) {
		this.waveDirection = waveDirection;
	}
	/**
	 * @return the dateTime
	 */
	public String getDateTime() {
		return dateTime;
	}
	/**
	 * @param dateTime the dateTime to set
	 */
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}


}
