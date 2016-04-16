const URL = {
	session: {
		create: '/api/v1/sessions',
		delete: '/api/v1/sessions'
	},

	user: {
		create: '/api/v1/users'
	},

	page: {
		campaign: {
			new: '/campaigns/new',
			index: '/campaigns',
			show: function(campaignId) {
				return '/campaigns/' + campaignId;
			}
		},
		character: {
			index: '/characters'
		},
		characterGenerator: '/chargen',
		home: '/',
		dashboard: '/campaigns',
		sessionFor: function(sessionId) {
			return 'campaigns/' + sessionId + '/session';
		}
	},

	campaign: {
		create: '/api/v1/campaigns',
		index: '/api/v1/campaigns',
		show(campaignId) {
			return '/api/v1/campaigns/' + campaignId;
		},
		invite(campaignId) {
			return '/api/v1/campaigns/' + campaignId + '/players'
		}
	},

	character: {
		create: '/api/v1/characters',
		index: '/api/v1/characters'
	}
};

export default URL;
