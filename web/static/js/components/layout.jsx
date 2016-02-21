import React from 'react';
import Reflux from 'reflux';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

import LogoutButton from 'logoutButton';
import LoginButton from 'loginButton';

import SessionStore from 'sessionStore';
import SessionActions from 'sessionActions';
import NotificationStore from 'notificationStore';

import RegistrationForm from 'registrationForm';
import Snackbar from 'material-ui/lib/snackbar';

const Layout = React.createClass({
	mixins: [
		Reflux.listenTo(SessionStore, 'onSessionChange'),
		Reflux.listenTo(NotificationStore, 'onNotification')
	],

	getInitialState() {
		return {
			loggingIn: false,
			loggedIn: SessionStore.isLoggedIn(),
			notification: null
		};
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

	handleLogout() {
		const token = SessionStore.token();
		SessionActions.logout(token);
	},

	render() {
		let rightIcon;
		if (this.state.loggedIn) {
			rightIcon = <LogoutButton />
		} else {
			rightIcon = <LoginButton loggingIn={this.state.loggingIn} />;
		}

		return (
			<div>
				<AppBar iconElementLeft={<IconButton> </IconButton>}
								title="Khala"
								iconElementRight={rightIcon}
				/>
				{this.props.children}
				<Snackbar
					open={this.state.notification !== null}
					message={this.state.notification}
					autoHideDuration={4000}
					onRequestClose={this.onNotificationClose}
				/>
			</div>
		);
	}
});

export default Layout;
