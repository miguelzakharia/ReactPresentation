"use strict";

var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var logHandler = require("./components/logsContainer.react.js");

module.exports = (
    <Route handler={require("./components/app.react.js")} path="/">
    	<DefaultRoute handler={logHandler}/>
    	
    	<Route name="logs" handler={logHandler}/>
    	<Route name="userSession" handler={require("./components/logsContainer.react.js")}/>
    </Route>
);