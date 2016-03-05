import React from 'react';
import Paper from 'material-ui/lib/paper';

const PointsRemaining = React.createClass({
	style: {
		padding: '10px',
		overflow: 'auto'
	},

	render() {
		return (
			<Paper zDepth={1} style={this.style}>
				<div style={{fontSize: '100%'}}>
					Points Remaining: {this.props.value} 
				</div>
			</Paper>
		);
	}
});

export default PointsRemaining;

