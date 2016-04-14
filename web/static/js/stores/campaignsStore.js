import Reflux from 'reflux';
import _ from 'lodash';

import CampaignsActions from 'campaignsActions';
import NotificationActions from 'notificationActions';
import NavigationActions from 'navigationActions';

import Campaign from 'campaign';
import URL from 'url';

const CampaignsStore = Reflux.createStore({
	listenables: [CampaignsActions],

	init() {
		this.state = {
			campaigns: [],
			selected: null,
			noSuchCampaign: false,
			current() {
				if (this.selected === null || this.selected === undefined) {
					return null;
				}

				return this.campaigns[this.selected];
			}
		};
	},

	getInitialState() {
		return this.state;
	},

	onIndex() {
		Campaign.index()
		.then((response) => {
			this.state.campaigns = response.data.campaigns;
			this.state.selected = null;
			this.trigger(this.state);
		});
	},

	onCreate(name) {
		Campaign.create(name)
		.then(() => {
			NotificationActions.notify(name + ' created');
			NavigationActions.changeUrl(URL.page.campaign.index);
		});
	},

	onShow(id) {
		Campaign.show(id)
		.then(this.onShowCompleted)
		.catch(this.onShowFailed);
	},

	onShowCompleted(response) {
		const campaign = response.data;
		const campaignId = campaign.campaign.id;
		const campaignIndex = _.findIndex(this.state.campaigns, {campaign: {id: campaignId}});

		if (campaignIndex === -1 /* Didn't find element */) {
			this.state.campaigns.push(response.data);
			this.state.selected = this.state.campaigns.length - 1;
		} else {
			this.state.campaigns[campaignIndex] = campaign;
			this.state.selected = campaignIndex;
		}

		this.state.noSuchCampaign = false;
		this.trigger(this.state);
	},

	onShowFailed(response) {
		if (response.status === 401) {
			this.state.noSuchCampaign = true;
		}

		this.trigger(this.state);
	}
});

export default CampaignsStore;
