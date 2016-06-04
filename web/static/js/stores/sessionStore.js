import Reflux from 'reflux';
import SessionActions from 'sessionActions';
import NotificationActions from 'notificationActions';
import NavigationActions from 'navigationActions';
import URL from 'url';

const SessionStore = Reflux.createStore({
	listenables: SessionActions,

	init() {
		this.state = {
			token: sessionStorage.getItem('token') || '',
			loggingIn: false,
			userName: sessionStorage.getItem('userName') || null
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
		sessionStorage.removeItem('token', undefined);
		this.state.token = '';
		NavigationActions.changeUrl(URL.page.home);
		this.trigger(this.state);
	},

	onSubmitLoginCompleted(response) {
		this.state.token = response.token;
		this.state.userName = response.user_name;

		sessionStorage.setItem('token', this.state.token);
		sessionStorage.setItem('userName', this.state.userName);

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
	},

	userName() {
		return this.state.userName;
	}
});

export default SessionStore;
