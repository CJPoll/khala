import React from 'react';

const Row = React.createClass({
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

export default Row;

