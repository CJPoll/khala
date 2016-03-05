import React from 'react';

const Clearfix = React.createClass({
	render() {
		const beforeStyle = {
			display: 'table'
		};

		const afterStyle = {
			display: 'table',
			clear: 'both'
		};

		return (
			<div {...this.props}>
				<div style={beforeStyle}/>
					{this.props.children}
				<div style={afterStyle}/>
			</div>
		);
	}
});

export default Clearfix;
