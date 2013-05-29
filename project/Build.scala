import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "shiny-octopus"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    javaCore,
    javaJdbc,
    javaEbean
  )

  val main = PlayProject(appName, appVersion, appDependencies, mainLang = JAVA).settings(
  	    	requireJs += "main.js"	
  )

}
