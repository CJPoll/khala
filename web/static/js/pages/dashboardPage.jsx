import React from 'react';
import AbilityList from 'abilityList';
import requireLogin from 'requireLogin';

const DashboardPage = React.createClass({
	mixins: [requireLogin],

	render() {
		return (
			<div>
				<h2>Dashboard</h2>
				<AbilityList label="Strengths" listItems={['Strengh', 'Constitution']} />
			</div>
		);
	}
});

export default DashboardPage;

