import React from 'react';
import _ from 'lodash';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const CampaignList = React.createClass({
	renderCampaigns(campaigns) {
		return _.map(campaigns, (campaign) => <ListItem key={'campaign_' + campaign.campaign.id}> {campaign.campaign.name} </ListItem>);
	},

	render() {
		const campaigns = this.props.campaigns;

		return (
			<List>
				{this.renderCampaigns(campaigns)}
			</List>
		);
	}
});

export default CampaignList;

