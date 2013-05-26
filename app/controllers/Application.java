package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {
  
    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }
    public static Result show(String page) {
    	return ok(page, "Your page hase been rendered");
    }
    
  
}
