import React from 'react';

const PointTotal = React.createClass({
	style: {
		padding: '10px',
		overflow: 'auto',
		fontSize: '100%'
	},

	render() {
		return (
			<div style={this.style}>
				Total: {this.props.value}
			</div>
		);
	}
});

export default PointTotal;

