var React = require("react");
var Navigation = require("react-router").Navigation;

var LogItem = React.createClass({
	mixins: [Navigation],
	getInitialState: function(){
		return {
			isVisible: false
		};
	},

	handleDetailsClick: function(){
		this.setState({isVisible: !this.state.isVisible});
	},

	render: function(){
		var detailStyle = {};
		if(!this.state.isVisible){
			detailStyle.display = "none"
		}

		return (
			<div className="card container-fluid">
				<div className="row">
					<div className="col-md-7"><strong>{this.props.message}</strong></div>
					<div className="col-md-5 rightAlign">{this.props.datetimestamp}</div>
				</div>
				<div className="row">
					<div className="col-md-7">{this.props.classInfo}</div>
					<div className="col-md-5 rightAlign">
						<button onClick={this.handleDetailsClick}>Details</button>
					</div>
				</div>
				<div className="row" style={detailStyle}>
					<div className="col-md-12">
						<pre>{JSON.stringify(JSON.parse(this.props.parameters), undefined, 2)}</pre>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = LogItem;