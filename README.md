# muber-ui
Municipal transportation API. Data provided by (c) http://www.nextbus.com and it's associates
Live [Demo](https://muber.herokuapp.com/)

## Break Down:
Muber is built across three different repositories:

* [muber](https://github.com/t4ks/muber) - Muber's RESTful API
* [muber-ui](https://github.com/t4ks/muber-ui) - Muber's web UI - You are currently here!
* [rest-engine](https://github.com/t4ks/rest-engine) - a wrapper/micro framework that makes it simple to spin up a RESTful service,
    built on top of [Restify](https://www.npmjs.com/package/restify)

### Functional Spec:
* Option one of coding challenge: "Create a service that gives real-time departure time for public transportation (use freely available public API). The app should geolocalize the user."
* This client makes RESTful http requests to an instance of [api-muber](https://github.com/t4ks/muber)
* Displays results; gives users an option to change query radius between 0-10 mile radius by tenths (i.e. 0.2 miles)

### Tech Spec:
* Served using [node-http-server](https://www.npmjs.com/package/node-http-server)
* Built using good ol' fashioned [jQuery](https://jquery.com/) & [jQuery mobile](https://jquerymobile.com/)
* I choose a simple front end to spend more time on the backend. I was also more familiar with jQuery than other options.
