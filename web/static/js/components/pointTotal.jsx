import React from 'react';
import Paper from 'material-ui/lib/paper';
import _ from 'lodash';

const PointTotal = React.createClass({
	style: {
		padding: '10px',
		overflow: 'auto',
		fontSize: '100%'
	},

	render() {
		const total = _.reduce(this.props.value, (acc, stat) => stat.statValue + acc, 0);
		return (
			<div style={this.style}>
				Total: {total}
			</div>
		);
	}
});

export default PointTotal;

