import Reflux from 'reflux';
import SessionActions from 'sessionActions';
import NotificationActions from 'notificationActions';
import NavigationActions from 'navigationActions';
import URL from 'url';

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
		NavigationActions.changeUrl(URL.page.home);
		this.trigger(this.state);
	},

	onSubmitLoginCompleted(token) {
		localStorage.setItem('token', token);
		this.state.token = token;
		this.state.loggingIn = false;
		NavigationActions.changeUrl(URL.page.dashboard);
		this.trigger(this.state);
	},

	onSubmitLoginFailed() {
		NotificationActions.notify('Invalid credentials');
	},

	onLogoutFailed(data) {
		NotificationActions.notify(data.errors[0]);
	},

	isLoggedIn() {
		return this.state.token !== '';
	},

	token() {
		return this.state.token;
	}
});

export default SessionStore;
