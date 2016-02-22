import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

const AvatarExampleSimple = () => (
	<IconMenu
		iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
		anchorOrigin={{horizontal: 'left', vertical: 'top'}}
		targetOrigin={{horizontal: 'left', vertical: 'top'}}
	>
		<MenuItem primaryText="Refresh" />
		<MenuItem primaryText="Send feedback" />
		<MenuItem primaryText="Settings" />
		<MenuItem primaryText="Help" />
		<MenuItem primaryText="Sign out" />
	</IconMenu>
);

export default AvatarExampleSimple;
