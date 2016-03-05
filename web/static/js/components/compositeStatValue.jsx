import React from 'react';
import Paper from 'material-ui/lib/paper';

const CompositeStatValue = React.createClass({
	render() {
		return (
			<Paper style={{padding: '10px', fontSize: '150%'}}>
				<span style={{textAline: 'left'}}>
				{this.props.statName}:
				</span>
				<span style={{float: 'right'}}>
					{' ' + this.props.statValue}
				</span>
			</Paper>
		);
	}
});

export default CompositeStatValue;
