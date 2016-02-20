import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle';
import SessionActions from 'sessionActions';
import SessionStore from 'sessionStore';

const LogoutButton = React.createClass({
	handleLogout() {
		const token = SessionStore.token();
		SessionActions.logout(token);
	},

	render() {
		return <FlatButton	onClick={this.handleLogout}
												label="Log Out" style={{margin: 6}}
												icon={ <ActionAccountCircle /> } />;
	}
});

export default LogoutButton;
