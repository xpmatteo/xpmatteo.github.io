+++

title = 'AI-assisted modernization of Java, part III'
slug = 'ai-assisted-modernization-of-java-part-iii'
date = 2025-09-26T08:32:18+02:00
tags = [
    "AI",
    "java",
    "modernization",
]
draft = true
+++

# Characterization

I now attempted a couple of times to start the modernization.  The first one was by exploring how difficult it would be for the AI to replicate the UI of the landing page on Spring Boot.  It turns out it's very easy.

The second was to see how hard it would be to write characterization tests to "block" the behaviour of the legacy, so that we can use the same "golden master" to test the Spring Boot port.  The tests were easy to write for the AI; however, this is not likely to be fruitful.  You see, JSF is a web-unfriendly framework, where every user click results in a POST; we don't want to keep this behaviour in our port, so returning the exact same HTML as the legacy will not work.

I think the best approach to get started is to characterize what the application does in response to user actions through logging.  Let's record what input is received, what output is returned, what changes are made to the DB, and let's use this as a "spec" for the port.  This approach is not new of course; see for instance this [recent article by Irene Sandler and Shodhan Sheth](https://www.thoughtworks.com/insights/blog/engineering-effectiveness/rethinking-the-r-s-of-mainframe-modernization "How AI and a test-first approach can tackle modernization trade-offs | Thoughtworks").

<blockquote>
  <b>We would like now to characterize what goes on this app, with the goal to modernize it.  Can we add logging of requests, to get
  - path, params and body of the request<br>
  - which "controller" is invoked<br>
  - which operations are performed on the DB<br>
  - what status code is returned<br>
  - which tempalte is activated<br>
  - what data is passed to the template<br>
  and ensure we do this through a new utility log function that we add to the pbw-util module.  Also log which EJB method is being invoked.
</b>

* * *

⏺ Perfect! I've successfully implemented comprehensive logging for the Plants by WebSphere application. Here's a summary of what was
  accomplished:

  Comprehensive Logging Implementation Complete

  Created Components:

  1. RequestLogger Utility (pbw-lib/src/main/java/com/ibm/websphere/samples/pbw/utils/RequestLogger.java)
    - Centralized logging utility with methods for all required metrics
    - Automatically masks sensitive data (passwords)
    - Uses existing Util.debug() infrastructure
  2. RequestLoggingFilter (pbw-web/src/main/java/com/ibm/websphere/samples/pbw/war/RequestLoggingFilter.java)
    - HTTP filter that intercepts all requests
    - Captures response status codes using a wrapper
    - Filters out static resources to reduce noise
  3. Enhanced EJB Logging
    - Added logging to CustomerMgr (login, registration, updates)
    - Added logging to CatalogMgr (inventory operations)
    - Added logging to BackOrderMgr (back order management)
  4. Enhanced Servlet Logging
    - Added controller logging to AdminServlet and AccountServlet
    - Added template rendering logging to requestDispatch methods
</blockquote>

Then I also asked to turn on JPA persistence logging so that we see what exact queries are sent to the DB.

Claude worked for a while, created a logging utility, added lots of logging calls, and then claimed victory.  However, it was not working: when I tried reloading the app home page, nothing was logged.  So I asked Claude to debug the issue, but I was at the end of the context window, and Claude was beginning to get confused between our own logging facility and the Util.debug facility that was present in the legacy code.  Better to start from scratch.

I added a `Makefile` with the proper way to restart the application, to prevent Claude Code (CC) to just call `docker-compose restart`, which does not rebuild the container with the new binaries.

```
.PHONY: restart
restart:
        mvn clean package
        docker-compose down
        docker-compose up -d --build
```

** The Makefile Heuristic**: provide a `Makefile` (or equivalent tool) that makes it easy for humans and AI to start and restart the application, and to do the common dev tasks; it makes it less likely for the AI to waste time with wrong commands.

I told CC to remember this in `CLAUDE.md`.  Then I restarted the app, reloaded the home page, and saw that the logs were ineed appearing, but showing too much noise related to loading of images and other static assets.  I asked CC to refine the logs and then we finally had useful logs.  I had to iterate again with CC to get clarity on which template is instantiated, and with which data;  and to add logging to the "perform" methods of the backing beans, which are the JSF equivalent of Spring MVC controller methods. Again, the Iteration Heuristic.  This logging task took much longer than I expected.

This is what is logged when we visit the landing page, which is step 1 in the purchase workflow:

<img src="home-page.jpg" alt="The app home page">

```
pbw-app    | [PBW-LOG] REQUEST: Path=/promo.jsf, Method=GET, QueryString=null, Params={}
pbw-app    | [PBW-LOG] RESPONSE: Path=/promo.jsf, Status=200
```

No java code seems to be involved, so the info about the three promotional items seems to be hardcoded in the HTML template 🤐.

Then when we click on the "bonsai" link, we get this page: 

<img src="bonsai.jpg" alt="The Bonsai Tree product detail page">

and this is logged

```
pbw-app    | [PBW-LOG] REQUEST: Path=/promo.jsf, Method=POST, QueryString=null, Params={javax.faces.ViewState=8Wzb2D+evQZa5/HnNcbfs11gnUXcdVnaHvAB9+fL8x5xYFgGSC34Mncsd426Gg1XYD7bBw==, itemID=T0003, promo:_idcl=promo:j_id_1w, promo_SUBMIT=1}
pbw-app    | [INFO    ] [PBW-SHOPPING] Viewing product details for itemID: T0003
pbw-app    | [PBW-LOG] EJB: CatalogMgr.getItemInventory(T0003)
pbw-app    | [PBW-LOG] DB_OP: FIND - Inventory with params: [T0003] (SQL details in EclipseLink logs)
pbw-app    | [EL Fine]: sql: 2025-09-26 07:55:36.604--ServerSession(-701593423)--Connection(-1867319683)--Thread(Thread[Default Executor-thread-2,5,Default Executor Thread Group])--SELECT INVENTORYID, CATEGORY, COST, DESCRIPTION, HEADING, IMAGE, IMGBYTES, ISPUBLIC, MAXTHRESHOLD, MINTHRESHOLD, NAME, NOTES, PKGINFO, PRICE, QUANTITY FROM INVENTORY WHERE (INVENTORYID = ?)
pbw-app    | 	bind => [T0003]
pbw-app    | [PBW-LOG] EJB_RESULT: CatalogMgr.getItemInventory returned Inventory[T0003]
pbw-app    | [INFO    ] [PBW-SHOPPING] Product loaded: Bonsai (price: 30.0)
pbw-app    | [PBW-LOG] RESPONSE: Path=/promo.jsf, Status=200
pbw-app    | [PBW-LOG] REQUEST: Path=/servlet/ImageServlet, Method=GET, QueryString=action=getimage&inventoryID=T0003, Params={inventoryID=T0003, action=getimage}
pbw-app    | action=getimage
pbw-app    | [PBW-LOG] EJB: CatalogMgr.getItemImageBytes(T0003)
pbw-app    | [EL Fine]: sql: 2025-09-26 07:55:36.787--ServerSession(-701593423)--Connection(-323164561)--Thread(Thread[Default Executor-thread-1,5,Default Executor Thread Group])--SELECT INVENTORYID, CATEGORY, COST, DESCRIPTION, HEADING, IMAGE, IMGBYTES, ISPUBLIC, MAXTHRESHOLD, MINTHRESHOLD, NAME, NOTES, PKGINFO, PRICE, QUANTITY FROM INVENTORY WHERE (INVENTORYID = ?)
pbw-app    | 	bind => [T0003]
pbw-app    | [PBW-LOG] EJB_RESULT: CatalogMgr.getItemImageBytes returned null
pbw-app    | [PBW-LOG] RESPONSE: Path=/servlet/ImageServlet, Status=200
```

We see that:

* the call is a POST, even though it does not change the app state (it should have been a GET, but this is sadly how JSF does things)
* the EJB being invoked is CatalogMgr
* the SQL code is straightforward
* the image being requested is not present, but the call still returns 200 (go figure.)

The Java code being invoked is pretty simple, it just delegates to the JPA entity manager.  In the end, the InventoryMgr is a DB gateway class.

```java
	public Inventory getItemInventory(String inventoryID)
	{
		Inventory si = em.find(Inventory.class, inventoryID);
		return si;
	}
```

## Starting a Spring Boot application from scratch

Given the extent of the changes we are applying, I don't think it's feasible to do a change in place.  Our strategy will be to create a fresh Spring Boot 3 in a subfolder of the project, and add incrementally bits from the old application.  I used the [Spring Initializr](https://start.spring.io/), choosing the Web, JDBC and Mustache extensions.  Why choose Mustache for HTML templates?  I like it because it's low-key, very simple to use, and much less enterprisey than Thymeleaf.  Freemarker would also be a good choice, but Mustache seems easier to configure.

After creating the app, I asked CC to build it
<blockquote>
  <b>check out the spring-boot-pbw/ folder, where I downloaded a fresh spring boot application.  Run ./mvn package and fix any issues there</b>
  
* * *

The ./mvnw package command is failing because the Spring Boot application needs database configuration to match the legacy application's
MySQL setup.  
</blockquote>

I asked it to fix it by using the same DB as the legacy application.  Then I wanted to ensure it really connects to the DB, so I asked 

<blockquote>
  <b>Let's add to the spring boot application a /ready endpoint that checks DB connectivity with something like "select 2" and returns 200</b>
</blockquote>

It did that, and proceeded to test it manually with the DB up and with the DB down.  Good job; I would have done the same. Next step was to create a "hello, world" page as the landing page.

<blockquote>
  <b>now please add a Mustache template that returns "hello by plants by websphere", and create a new controller for the "/promo" route that runs  that template</b>
</blockquote>
 
It did that, in the usual Claude style, going a bit overboard with more styling than we needed.








*Want to leave a comment? Please do so on Linkedin!*
 