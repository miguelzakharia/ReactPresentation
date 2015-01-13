"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var App = module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <header>
	        <nav className="navbar navbar-static-top">
	          <ul className="nav navbar-nav">
	            <li><Link to="logs">Logs</Link></li>
	            <li><Link to="userSession">User Session</Link></li>
	          </ul>
	        </nav>
        </header>

        <div className="container">
        	<RouteHandler/>
        </div>
      </div>
    );
  }
});