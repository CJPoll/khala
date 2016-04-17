import React from 'react';
import Reflux from 'reflux';

import CharacterGeneratorSteps from 'characterGeneratorSteps';
import CampaignsStore from 'campaignsStore';
import CampaignsActions from 'campaignsActions';
import requireLogin from 'requireLogin';

const CharacterGeneratorPage = React.createClass({
	mixins: [
		requireLogin,
		Reflux.connect(CampaignsStore, 'campaignsState')
	],

	componentWillMount() {
		CampaignsActions.index();
	},

	render() {
		const campaigns = this.state.campaignsState.campaigns;

		return (
			<div>
				<CharacterGeneratorSteps campaigns={campaigns}/>
			</div>
		);
	}
});

export default CharacterGeneratorPage;

