import React from 'react';
import Reflux from 'reflux';
import requireLogin from 'requireLogin';

import NavigationActions from 'navigationActions';
import CampaignsActions from 'campaignsActions';
import CampaignsStore from 'campaignsStore';

import CampaignList from 'campaignList';
import URL from 'url';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

/**
 * @return { undefined }
 * @param { Campaign } campaign A campaign object as returned by the API
 */
function onSelectCampaign(campaign) {
	NavigationActions.changeUrl(URL.page.campaign.show(campaign.id));
}

const CampaignIndexPage = React.createClass({
	mixins: [requireLogin, Reflux.connect(CampaignsStore, 'campaignState')],

	componentWillMount() {
		CampaignsActions.index();
	},

	newCampaign() {
		NavigationActions.changeUrl(URL.page.campaign.new);
	},

	render() {
		const campaigns = this.state.campaignState.campaigns;

		return (
			<div>
				<h1> Campaigns </h1>

				<CampaignList campaigns={campaigns} onClick={onSelectCampaign} />

				<FloatingActionButton style={{marginRight: '20', float: 'right'}} onClick={this.newCampaign}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
});

export default CampaignIndexPage;

