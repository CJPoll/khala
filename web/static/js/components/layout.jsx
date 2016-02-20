import React from 'react';
import Reflux from 'reflux';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import LogoutButton from 'logoutButton';

import LoginButton from 'loginButton';

import SessionStore from 'sessionStore';
import SessionActions from 'sessionActions';

const Layout = React.createClass({
	mixins: [Reflux.listenTo(SessionStore, 'onSessionChange')],

	getInitialState() {
		return {
			loggingIn: false,
			loggedIn: SessionStore.isLoggedIn()
		};
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
			</div>
		);
	}
});

export default Layout;
