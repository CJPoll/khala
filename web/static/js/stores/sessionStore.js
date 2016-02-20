import Reflux from 'reflux';
import _ from 'lodash';
import SessionActions from 'sessionActions';

const SessionStore = Reflux.createStore({
	listenables: SessionActions,

	init() {
		this.state = {
			token: localStorage.getItem('token') || '',
			loggingIn: false
		};
	},

	onClickLogin() {
		this.state.loggingIn = true;
		this.trigger(this.state);
	},

	onCancelLogin() {
		this.state.loggingIn = false;
		this.trigger(this.state);
	},

	onLogoutCompleted() {
		localStorage.removeItem('token', undefined);
		this.state.token = '';
		this.trigger(this.state);
	},

	onSubmitLoginCompleted(token) {
		localStorage.setItem('token', token);
		this.state.token = token;
		this.state.loggingIn = false
		this.trigger(this.state);
	},

	onSubmitLoginFailed(errors) {
		_.each(errors, (error) => console.error(error));
	},

	onLogoutFailed(data) {
		console.error(data.errors);
	},

	isLoggedIn() {
		return this.state.token !== '';
	},

	token() {
		return this.state.token;
	}
});

export default SessionStore;
