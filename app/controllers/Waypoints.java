package controllers;

import java.util.List;

import javax.persistence.OptimisticLockException;
import javax.sql.DataSource;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;



import play.db.ebean.Transactional;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.terrific.waypoint;

import models.*;

public class Waypoints extends Controller {
	
	@Transactional
	public static Result create() {
		

		JsonNode  b = request().body().asJson();
		System.out.println(b);
		Waypoint json = Json.fromJson(b, Waypoint.class);

		if (json == null) {
			return badRequest();
			
		}

		json.save();
		return ok(Json.toJson(json));

	}

	
	
	@Transactional
	public static Result update(long id) {
		JsonNode  b = request().body().asJson();
		Waypoint json = Json.fromJson(b, Waypoint.class);
		if (json == null) {
			return badRequest();
			
		}
		json.update();
		return ok(Json.toJson(json));


	}

	@Transactional
	public static Result delete(long id) {
		int count = 0;
		try {
			for (int i = 0; i < 10; i++) {
				Waypoint result = Waypoint.find.ref(id);
				result.delete();
			}
		} catch (OptimisticLockException e){
			count++;

			
		}
		if (count < 10) {
			return ok();
			
		} else {
			return badRequest();
			
		}

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
