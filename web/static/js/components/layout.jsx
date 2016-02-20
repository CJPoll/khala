import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle';
import Colors from 'material-ui/lib/styles/colors';

import SessionActions from 'sessionActions';

const XStyle = {
	color: 'white',
	fill: 'white'
};

const Layout = React.createClass({
	render() {
		return (
			<div>
				<AppBar iconElementLeft={<IconButton> </IconButton>}
								title="Khala"
								iconElementRight={
									<RaisedButton onClick={SessionActions.clickLogin} label="Log In" style={{margin: 6}} icon={
										<ActionAccountCircle />
									} />
								}
				/>
				{this.props.children}
			</div>
		);
	}
});

export default Layout;
