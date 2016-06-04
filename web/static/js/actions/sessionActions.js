import Reflux from 'reflux';
import session from 'session';

const SessionActions = Reflux.createActions({
	clickLogin: {},
	cancelLogin: {},
	submitLogin: {children: ['completed', 'failed']},
	logout: {children: ['completed', 'failed']}
});

SessionActions.submitLogin.listen(function(email, password) {
	session.create(email, password)
	.then((response) => this.completed(response.data))
	.catch((response) => this.failed(response.data.errors));
});

SessionActions.logout.listen(function(token) {
	session.delete(token)
	.then((response) => {
		this.completed(response.data);
	})
	.catch((response) => this.failed(response.data.errors));
});

export default SessionActions;
