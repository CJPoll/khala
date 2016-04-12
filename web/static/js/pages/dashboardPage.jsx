import React from 'react';
import requireLogin from 'requireLogin';

const DashboardPage = React.createClass({
	mixins: [requireLogin],


	render() {
		return (
			<div>
				<h2>Dashboard</h2>
			</div>
		);
	}
});

export default DashboardPage;

