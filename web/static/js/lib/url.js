const URL = {
	session: {
		create: '/api/v1/sessions',
		delete: '/api/v1/sessions'
	},

	user: {
		create: '/api/v1/users'
	},

	page: {
		characterGenerator: '/chargen',
		home: '/',
		dashboard: '/chargen'
	},

	character: {
		create: '/api/v1/characters',
		index: '/characters'
	}
};

export default URL;
