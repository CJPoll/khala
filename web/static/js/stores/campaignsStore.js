import Reflux from 'reflux';
import CampaignsActions from 'campaignsActions';
import Campaign from 'campaign';
import NotificationActions from 'notificationActions';
import NavigationActions from 'navigationActions';
import URL from 'url';

const CampaignsStore = Reflux.createStore({
	listenables: [CampaignsActions],

	init() {
		this.state = [];
	},

	getInitialState() {
		return this.state;
	},

	onIndex() {
		Campaign.index()
		.then((response) => {
			this.state = response.data.campaigns;
			this.trigger(this.state);
		});
	},

	onCreate(name) {
		Campaign.create(name)
		.then(() => {
			NotificationActions.notify(name + ' created');
			NavigationActions.changeUrl(URL.page.campaign.index);
		});
	}
});

export default CampaignsStore;
