import React from 'react';
import CompositeStatValue from 'compositeStatValue';

const DashboardPage = React.createClass({
	render() {
		return (
			<div>
				<h2>Dashboard</h2>
				<CompositeStatValue statName="Power" statValue={'Over 9000!'} />
			</div>
		);
	}
});

export default DashboardPage;

