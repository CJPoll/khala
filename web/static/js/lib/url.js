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
			index: '/campaigns'
		},
		character: {
			index: '/characters'
		},
		characterGenerator: '/chargen',
		home: '/',
		dashboard: '/characters',
		session: '/session',
		sessionFor: function(sessionId) {
			return '/sessions/' + sessionId;
		}
	},

	campaign: {
		create: '/api/v1/campaigns',
		index: '/api/v1/campaigns'
	},

	character: {
		create: '/api/v1/characters',
		index: '/api/v1/characters'
	}
};

export default URL;
