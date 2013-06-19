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
		JsonNode  b = request().body().asJson();
		Waypoint json = Json.fromJson(b, Waypoint.class);

		if (json == null) {
			return badRequest();
			
		}

		json.save();
		return ok(Json.toJson(json));

	}

	public static Result update(long id) {
		Waypoint result = Waypoint.find.byId(id);
		JsonNode  b = request().body().asJson();
		Waypoint json = Json.fromJson(b, Waypoint.class);
		if (json == null || result == null) {
			return badRequest();
			
		}
		result.update(json);
		return ok(Json.toJson(result));


	}
	public static Result delete(long id) {
		Waypoint result = Waypoint.find.byId(id);
		if (result == null) {
			return badRequest();
		}
		result.delete();
		return ok(Json.toJson(result));

	}
	
	public static Result all() {
		JsonNode result = Json.toJson(Waypoint.find.all());
		if (result == null) {
			return badRequest();
		}
		return ok(result);
		
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
