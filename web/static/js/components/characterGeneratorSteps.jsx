import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CharacterGeneratorNamePage from 'characterGeneratorNamePage';
import CharacterGeneratorStatsPage from 'characterGeneratorStatsPage';

const CharacterGeneratorSteps = React.createClass({
	render() {
		const campaigns = this.props.campaigns;

		return (
			<Tabs>
				<Tab label="Name" >
					<CharacterGeneratorNamePage campaigns={campaigns}/>
				</Tab>
				<Tab label="Stats" >
					<CharacterGeneratorStatsPage />
				</Tab>
			</Tabs>
		);
	}
});

export default CharacterGeneratorSteps;

