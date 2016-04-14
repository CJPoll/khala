import React from 'react';
import _ from 'lodash';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const CampaignList = React.createClass({
	props: {
		onClick: React.PropTypes.func
	},

	renderCampaigns(campaigns) {
		let onClick = function() {};

		if (this.props.onClick !== undefined) {
			onClick = this.props.onClick;
		}

		if (campaigns === null || campaigns === undefined) {
			return [];
		}

		return _.map(campaigns, (campaign) => {
			return <ListItem key={'campaign_' + campaign.campaign.id} onTouchTap={onClick.bind(this, campaign.campaign)}>
				{campaign.campaign.name}
			</ListItem>;
		});
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

