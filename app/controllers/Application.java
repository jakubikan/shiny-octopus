package controllers;


import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;

import play.*;
import play.api.mvc.Rendering;
import play.api.templates.Html;
import play.libs.Classpath;
import play.mvc.*;

import views.html.*;
import views.html.terrific.*;

public class Application extends Controller {
  
    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }
    public static Result show(String page) {
    	FileInputStream pagefile;
    	String content = null;
		try {
			pagefile = new FileInputStream("app/views/" + page + ".scala.html");
			content = IOUtils.toString(pagefile);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	
    	return ok(main.render(page, Html.apply(content)));
    }
    public static Result app(String site) {
    	return ok(views.html.app.render(site));
    }
  
}
