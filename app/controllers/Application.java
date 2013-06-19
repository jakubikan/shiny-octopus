package controllers;


import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Set;

import org.reflections.Reflections;

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
		Class c = null;
		try {
			c = Class.forName("views.html." + page);
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}	
		
		Method m = null;
		Html content = null;
		
		if (c != null) {
		
			try {
				m = c.getDeclaredMethod("render", String.class);
				content = (Html) m.invoke(null, page);
			} catch (NoSuchMethodException e) {
			} catch (IllegalAccessException e) {
			} catch (IllegalArgumentException e) {
			} catch (InvocationTargetException e) {
			}
			
			try {
				m = c.getDeclaredMethod("render");
				content = (Html) m.invoke(null);
			} catch (NoSuchMethodException e) {
			} catch (IllegalAccessException e) {
			} catch (IllegalArgumentException e) {
			} catch (InvocationTargetException e) {
			}
		}
			
		if (content == null) {
			return redirect("/");
			
		}
		return ok(content);
		
		
		
    }
    public static Result app(String site) {
    	return ok(views.html.app.render(site));
    }
  
}
