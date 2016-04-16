import React from 'react';
import Reflux from 'reflux';
import requireLogin from 'requireLogin';

import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import Row from 'row';
import CampaignsStore from 'campaignsStore';
import CampaignsActions from 'campaignsActions';
import JoinSessionButton from 'joinSessionButton';
import PlayerList from 'playerList';

const ShowCampaignPage = React.createClass({
	mixins: [
		requireLogin,
		Reflux.connect(CampaignsStore, 'campaignState')
	],

	componentWillMount() {
		const id = this.props.params.campaignId;
		CampaignsActions.show(id);
	},

	invitePlayer(e) {
		const email = this.refs.email.getValue();
		this.refs.email.setValue('');
		const campaign = this.state.campaignState.current();
		CampaignsActions.invite(email, campaign);
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
			return (
				<JoinSessionButton campaign={campaign} />
			);
		}
	},

	renderLoading() {
		return (
			<div>
				<h1>
					Loading
				</h1>
			</div>
		);
	},

	render() {
		if (this.state.campaignState.noSuchCampaign) {
			return this.renderNoSuchCampaign();
		}

		const campaign = this.state.campaignState.current();

		if (campaign === null) {
			return this.renderLoading();
		}

		const name = campaign.name;
		const players = campaign.players;

		return (
			<div>
				<h1>
					{name}
				</h1>

				<Row>
					<TextField hintText="Player Email" ref="email"/>
				</Row>
				<RaisedButton label="Invite Player" secondary={true} onClick={this.invitePlayer} />
				<JoinSessionButton campaign={campaign} />

				<PlayerList players={players} />
			</div>
		);
	}
});

export default ShowCampaignPage;
