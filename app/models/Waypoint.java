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
	private long ID;

	@Column(name = "Name")
	private String Name;
	@Column(name = "HeadSail")
	private String HeadSail;
	@Column(name = "Lat")
	private String Lat;
	@Column(name = "Lng")
	private String Lng;
	@Column(name = "Dest")
	private String Dest;
	@Column(name = "DTM")
	private String DTM;
	@Column(name = "COG")
	private String COG;
	@Column(name = "SOG")
	private String SOG;
	@Column(name = "Maneuver")
	private String Maneuver;
	@Column(name = "BTM")
	private String BTM;
	@Column(name = "WindStrength")
	private int WindStrength;
	@Column(name = "WindDirection")
	private String WindDirection;
	@Column(name = "AirPressure")
	private int AirPressure;
	@Column(name = "Temperature")
	private int Temperature;
	@Column(name = "Clouds")
	private String Clouds;
	@Column(name = "Rain")
	private String Rain;
	@Column(name = "WaveHeight")
	private int WaveHeight;
	@Column(name = "WaveDirection")
	private String WaveDirection;
	@Column(name = "DateTime")
	private String DateTime;


	public static Finder<Long, Waypoint> find = new Finder<Long, Waypoint>(
			Long.class, Waypoint.class);


	/**
	 * @return the iD
	 */
	public long getID() {
		return ID;
	}


	/**
	 * @param iD the iD to set
	 */
	public void setID(long iD) {
		ID = iD;
	}


	/**
	 * @return the name
	 */
	public String getName() {
		return Name;
	}


	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		Name = name;
	}


	/**
	 * @return the headSail
	 */
	public String getHeadSail() {
		return HeadSail;
	}


	/**
	 * @param headSail the headSail to set
	 */
	public void setHeadSail(String headSail) {
		HeadSail = headSail;
	}


	/**
	 * @return the lat
	 */
	public String getLat() {
		return Lat;
	}


	/**
	 * @param lat the lat to set
	 */
	public void setLat(String lat) {
		Lat = lat;
	}


	/**
	 * @return the lng
	 */
	public String getLng() {
		return Lng;
	}


	/**
	 * @param lng the lng to set
	 */
	public void setLng(String lng) {
		Lng = lng;
	}


	/**
	 * @return the dest
	 */
	public String getDest() {
		return Dest;
	}


	/**
	 * @param dest the dest to set
	 */
	public void setDest(String dest) {
		Dest = dest;
	}


	/**
	 * @return the dTM
	 */
	public String getDTM() {
		return DTM;
	}


	/**
	 * @param dTM the dTM to set
	 */
	public void setDTM(String dTM) {
		DTM = dTM;
	}


	/**
	 * @return the cOG
	 */
	public String getCOG() {
		return COG;
	}


	/**
	 * @param cOG the cOG to set
	 */
	public void setCOG(String cOG) {
		COG = cOG;
	}


	/**
	 * @return the sOG
	 */
	public String getSOG() {
		return SOG;
	}


	/**
	 * @param sOG the sOG to set
	 */
	public void setSOG(String sOG) {
		SOG = sOG;
	}


	/**
	 * @return the maneuver
	 */
	public String getManeuver() {
		return Maneuver;
	}


	/**
	 * @param maneuver the maneuver to set
	 */
	public void setManeuver(String maneuver) {
		Maneuver = maneuver;
	}


	/**
	 * @return the bTM
	 */
	public String getBTM() {
		return BTM;
	}


	/**
	 * @param bTM the bTM to set
	 */
	public void setBTM(String bTM) {
		BTM = bTM;
	}


	/**
	 * @return the windStrength
	 */
	public int getWindStrength() {
		return WindStrength;
	}


	/**
	 * @param windStrength the windStrength to set
	 */
	public void setWindStrength(int windStrength) {
		WindStrength = windStrength;
	}


	/**
	 * @return the windDirection
	 */
	public String getWindDirection() {
		return WindDirection;
	}


	/**
	 * @param windDirection the windDirection to set
	 */
	public void setWindDirection(String windDirection) {
		WindDirection = windDirection;
	}


	/**
	 * @return the airPressure
	 */
	public int getAirPressure() {
		return AirPressure;
	}


	/**
	 * @param airPressure the airPressure to set
	 */
	public void setAirPressure(int airPressure) {
		AirPressure = airPressure;
	}


	/**
	 * @return the temperature
	 */
	public int getTemperature() {
		return Temperature;
	}


	/**
	 * @param temperature the temperature to set
	 */
	public void setTemperature(int temperature) {
		Temperature = temperature;
	}


	/**
	 * @return the clouds
	 */
	public String getClouds() {
		return Clouds;
	}


	/**
	 * @param clouds the clouds to set
	 */
	public void setClouds(String clouds) {
		Clouds = clouds;
	}


	/**
	 * @return the rain
	 */
	public String getRain() {
		return Rain;
	}


	/**
	 * @param rain the rain to set
	 */
	public void setRain(String rain) {
		Rain = rain;
	}


	/**
	 * @return the waveHeight
	 */
	public int getWaveHeight() {
		return WaveHeight;
	}


	/**
	 * @param waveHeight the waveHeight to set
	 */
	public void setWaveHeight(int waveHeight) {
		WaveHeight = waveHeight;
	}


	/**
	 * @return the waveDirection
	 */
	public String getWaveDirection() {
		return WaveDirection;
	}


	/**
	 * @param waveDirection the waveDirection to set
	 */
	public void setWaveDirection(String waveDirection) {
		WaveDirection = waveDirection;
	}


	/**
	 * @return the dateTime
	 */
	public String getDateTime() {
		return DateTime;
	}


	/**
	 * @param dateTime the dateTime to set
	 */
	public void setDateTime(String dateTime) {
		DateTime = dateTime;
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
