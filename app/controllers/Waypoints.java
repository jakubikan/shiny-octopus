package controllers;

import java.util.List;

import javax.sql.DataSource;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;



import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.terrific.waypoint;

import models.*;

public class Waypoints extends Controller {
	
	public static Result create() {
		return TODO;
	}

	public static Result update(long id) {
		return TODO;

	}
	public static Result delete(long id) {
		return TODO;
	}
	
	public static Result all() {
		return null;
		
	}


	@BodyParser.Of(BodyParser.Json.class)
	public static Result fetchWaypoint(long id) {
		JsonNode result = Json.toJson(Waypoint.find.byId(id));
		if (result == null) {
			return badRequest();
		}
		return ok(result);
	}

}
