package controllers;


import play.*;
import play.api.mvc.Rendering;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {
  
    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }
    public static Result show(String page) {
    	response().setContentType("text/html");
    	return null;
    }
    
  
}
