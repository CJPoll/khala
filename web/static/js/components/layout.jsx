import React from 'react';
import Reflux from 'reflux';
import AppBar from 'material-ui/lib/app-bar';

import AppMenu from 'appMenu';
import LoginButton from 'loginButton';
import SideNav from 'sideNav';
import Menu from 'material-ui/lib/svg-icons/navigation/menu';
import Snackbar from 'material-ui/lib/snackbar';
import IconButton from 'material-ui/lib/icon-button';

import NavigationStore from 'navigationStore';
import NavigationActions from 'navigationActions';
import SessionStore from 'sessionStore';
import NotificationStore from 'notificationStore';

const Layout = React.createClass({
	mixins: [
		Reflux.listenTo(SessionStore, 'onSessionChange'),
		Reflux.listenTo(NotificationStore, 'onNotification'),
		Reflux.listenTo(NavigationStore, 'onNavigationChange')
	],

	getInitialState() {
		return {
			loggingIn: false,
			loggedIn: SessionStore.isLoggedIn(),
			notification: null,
			sideNavOpen: false
		};
	},

	onNavigationChange(navigationState) {
		this.setState({
			sideNavOpen: navigationState.sideNavOpen
		});
	},

	onNotification(notification) {
		this.setState({
			notification: notification
		});
	},

	onNotificationClose() {
		this.setState({
			notification: null
		});
	},

	onSessionChange(sessionState) {
		this.setState({
			loggingIn: sessionState.loggingIn,
			loggedIn: SessionStore.isLoggedIn()
		});
	},

	menuClick() {
		NavigationActions.toggleSideNav();
	},

	render() {
		let rightIcon;
		if (this.state.loggedIn) {
			rightIcon = <AppMenu />;
		} else {
			rightIcon = <LoginButton loggingIn={this.state.loggingIn} />;
		}

		return (
			<div>
				<AppBar
					title="Khala"
					iconElementLeft={<IconButton onClick={this.menuClick}><Menu /></IconButton>}
					iconElementRight={rightIcon}
				/>
				{this.props.children}
				<SideNav open={this.state.sideNavOpen} />
				<Snackbar
					open={this.state.notification !== null}
					message={this.state.notification || ''}
					autoHideDuration={4000}
					onRequestClose={this.onNotificationClose}
				/>
			</div>
		);
	}
});

export default Layout;
