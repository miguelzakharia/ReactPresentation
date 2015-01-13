"use strict";

var React = require("react");
var LogHeader = require("./logHeader.react.js");
var LogList = require("./logList.react.js");
var AppStore = require("../AppStore");

function getLogState(){
	return {
		allLogs: AppStore.getLogData()
	};
}

var LogsContainer = React.createClass({	
	getInitialState: function() {
		return getLogState();
	},

	componentDidMount: function() {
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
		this.setState(getLogState());
	}
});

module.exports = LogsContainer;