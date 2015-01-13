var React = require("react");
var Router = require("react-router");
var routes = require("./app.routes.js");

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});