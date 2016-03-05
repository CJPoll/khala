import React from 'react';
import Clearfix from 'clearfix';

const Row = React.createClass({
	render() {
		return (
			<Clearfix>
				<div {...this.props}>
					{this.props.children}
				</div>
			</Clearfix>
		);
	}
});

export default Row;

