import SessionStore from 'sessionStore';
import NavigationActions from 'navigationActions';
import URL from 'url';

const requireLogin = {
	componentWillMount() {
		if (!SessionStore.isLoggedIn()) {
			NavigationActions.changeUrl(URL.page.home);
		}
	}

};

export default requireLogin;
