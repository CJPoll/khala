import React from 'react';

const PointsRemaining = React.createClass({
	style: {
		padding: '10px',
		overflow: 'auto',
		fontSize: '100%'
	},

	render() {
		return (
			<div style={this.style}>
				Remaining: {this.props.value}
			</div>
		);
	}
});

export default PointsRemaining;

