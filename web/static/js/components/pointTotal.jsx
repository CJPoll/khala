import React from 'react';
import Paper from 'material-ui/lib/paper';
import _ from 'lodash';

const PointTotal = React.createClass({
	style: {
		padding: '10px',
		overflow: 'auto'
	},

	render() {
		const total = _.reduce(this.props.value, (acc, stat) => stat.statValue + acc, 0);
		return (
			<Paper zDepth={1} style={this.style}>
				<div style={{fontSize: '100%'}}>
					Total: {total}
				</div>
			</Paper>
		);
	}
});

export default PointTotal;

