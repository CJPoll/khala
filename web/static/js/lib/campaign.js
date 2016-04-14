import URL from 'url';
import axios from 'axios';
import SessionStore from 'sessionStore';

const Campaign = {
	index() {
		const token = SessionStore.token();
		return axios.get(URL.campaign.index, {params: {token: token}});
	},

	create(name) {
		const token = SessionStore.token();

		return axios.post(URL.campaign.create, {
			token: token,
			campaign: {
				name: name
			}
		});
	},

	show(campaignId) {
		const token = SessionStore.token();

		return axios.get(URL.campaign.show(campaignId) + '?token=' + token);
	}
};

export default Campaign;
