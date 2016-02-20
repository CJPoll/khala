import Reflux from 'reflux';
import SessionActions from 'sessionActions';

const SessionStore = Reflux.createStore({
	listenables: SessionActions,

	init() {
		this.token = null;
		this.loggingIn = false;
	},

	onClickLogin() {
		this.loggingIn = true;
	}
});

export default SessionStore;
