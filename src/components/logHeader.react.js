"use strict";

var React = require("react");
var AppActions = require("../actions/AppActions");

var LogHeader = React.createClass({
	handleChange: function(event){
		AppActions.dateRangeChanged(event.target.value);
	},

	render: function(){
		return (
			<div className="title">
				Logs for 
				<select ref="dateRangeSelector" autofocus className="form-control log-header-select" defaultValue="today" onChange={this.handleChange}>
					<option value="today">today</option>
					<option value="yesterday">yesterday</option>
					<option value="week">this week</option>
					<option value="month">this month</option>
				</select>
			</div>
		);
	}
});

module.exports = LogHeader;