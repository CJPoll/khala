import React from 'react';
import AbilityList from 'abilityList';

const DashboardPage = React.createClass({
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

