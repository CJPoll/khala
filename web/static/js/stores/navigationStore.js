import Reflux from 'reflux';
import NavigationActions from 'navigationActions';
import { browserHistory } from 'react-router';

const NavigationStore = Reflux.createStore({
	listenables: NavigationActions,

	init() {
		this.state = {
			sideNavOpen: false
		};
	},

	onChangeUrl(url) {
		browserHistory.push(url);
	},

	onToggleSideNav() {
		this.state.sideNavOpen = !this.state.sideNavOpen;
		this.trigger(this.state);
	}
});

export default NavigationStore;
