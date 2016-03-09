import React from 'react';

import SessionActions from 'sessionActions';
import SessionStore from 'sessionStore';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

const AppMenu = React.createClass({
	handleLogout() {
		const token = SessionStore.token();
		SessionActions.logout(token);
	},

	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>

				<MenuItem primaryText="Sign out" onClick={this.handleLogout} />
			</IconMenu>
		);
	}
});

export default AppMenu;
