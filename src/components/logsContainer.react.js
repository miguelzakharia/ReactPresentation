"use strict";

var React = require("react");
var Router = require("react-router");
var LogHeader = require("./logHeader.react.js");
var LogList = require("./logList.react.js");
var AppStore = require("../AppStore");

function getLogState(){
	return {
		allLogs: AppStore.getLogData()
	};
}

var LogsContainer = React.createClass({
	mixins: [Router.state],
	
	getInitialState: function() {
		return getLogState();
	},

	componentDidMount: function() {
		// console.log("LogsContainer: mounted");
		AppStore.addChangeListener(this._onChange);
		AppStore.getLogsForDate("today");
	},
	
	componentWillUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

	render: function(){
		return (
			<div>
				<LogHeader />
				<LogList data={this.state.allLogs} />
			</div>
		);
	},

	/**
	 * Event handler for 'change' events coming from the AppStore
	 */
	_onChange: function() {
		console.log("LogsContainer._onChange: fired");
		this.setState(getLogState());
	}
});

module.exports = LogsContainer;