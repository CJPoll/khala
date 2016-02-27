import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CharacterGeneratorNamePage from 'characterGeneratorNamePage';
import CharacterGeneratorStatsPage from 'characterGeneratorStatsPage';

const CharacterGeneratorSteps = React.createClass({
	render() {
		return (
			<Tabs>
				<Tab label="Name" >
					<CharacterGeneratorNamePage />
				</Tab>
				<Tab label="Stats" >
					<CharacterGeneratorStatsPage />
				</Tab>
				<Tab label="Inventory" />
			</Tabs>
		);
	}
});

export default CharacterGeneratorSteps;

