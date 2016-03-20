const URL = {
	session: {
		create: '/api/v1/sessions',
		delete: '/api/v1/sessions'
	},

	user: {
		create: '/api/v1/users'
	},

	page: {
		character: {
			index: '/characters'
		},
		characterGenerator: '/chargen',
		home: '/',
		dashboard: '/characters',
		session: '/session'
	},

	character: {
		create: '/api/v1/characters',
		index: '/api/v1/characters'
	}
};

export default URL;
