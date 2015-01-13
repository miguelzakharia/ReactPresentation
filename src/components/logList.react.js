"use strict";

var React = require("react");
var LogItem = require("./logItem.react.js");
var moment = require('moment');

function truncate(tooLong, maxLength){
	var trimmed = tooLong.substring(0, Math.min(maxLength, tooLong.length));
	if(trimmed.length < tooLong.length){ 
		trimmed = trimmed + '...';
	}
	return trimmed;
}

var LogList = React.createClass({
	componentDidMount: function() {
		console.log("LogList: mounted");
  	},

  	componentWillUnmount: function(){
  		console.log("LogList: unmounted");
  	},

	render: function(){
		// console.log("LogList.render: this.props.data = %o", this.props.data);

		if(typeof this.props.data === "undefined" || this.props.data.length < 1){
			return (<div>No logs</div>);
		}

		var logItems = this.props.data.map(function(logItem){
			var maxMessageLength = 57;

			return (
				<LogItem key={logItem.id}
						    message={truncate(logItem.message, maxMessageLength)}
						    datetimestamp={moment(logItem.dateTimeStampLocal).format('M/D/YY h:mm:ss.SSS a')}
						    classInfo={logItem.class} 
						    sessionId={logItem.sessionId}
						    methodId={logItem.methodId}
						    parameters={logItem.parameters}/>
			);
		});

		return (
			<div>{logItems}</div>
		);
	}	
});

module.exports = LogList;