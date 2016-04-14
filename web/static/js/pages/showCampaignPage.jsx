import React from 'react';
import Reflux from 'reflux';
import requireLogin from 'requireLogin';

import CampaignsStore from 'campaignsStore';
import CampaignsActions from 'campaignsActions';
import JoinSessionButton from 'joinSessionButton';

const ShowCampaignPage = React.createClass({
	mixins: [
		requireLogin,
		Reflux.connect(CampaignsStore, 'campaignState')
	],

	componentWillMount() {
		const id = this.props.params.campaignId;
		CampaignsActions.show(id);
	},

	renderNoSuchCampaign() {
		return (
			<div>
				<h1> Ruh Roh! </h1>
				<p>
					Looks like you found a broken link. This campaign might have
					been deleted, or you aren't a member of it. Or maybe it just never
					existed... who knows?
				</p>
			</div>
		);
	},

	joinSessionButton(campaign) {
		if (campaign) {
			return <JoinSessionButton campaign={campaign.campaign} />;
		}
	},

	render() {
		if (this.state.campaignState.noSuchCampaign) {
			return this.renderNoSuchCampaign();
		}

		const current = this.state.campaignState.current();
		let name = 'Loading';
		if (current) {
			name = current.campaign.name;
		}

		return (
			<div>
				<h1>
					{name}
				</h1>

				{this.joinSessionButton(current)}
			</div>
		);
	}
});

export default ShowCampaignPage;
