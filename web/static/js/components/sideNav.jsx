import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationActions from 'navigationActions';
import URL from 'url';

const SideNav = React.createClass({
	propTypes: {
		open: React.PropTypes.bool.isRequired
	},

	handleRequestChange() {
		NavigationActions.toggleSideNav();
	},

	goToCharacterGenerator() {
		NavigationActions.changeUrl(URL.page.characterGenerator);
		NavigationActions.toggleSideNav();
	},

	goToCharacterIndex() {
		NavigationActions.changeUrl(URL.page.character.index);
		NavigationActions.toggleSideNav();
	},

	render() {
		return (
			<LeftNav open={this.props.open}
				docked={false}
				onRequestChange={this.handleRequestChange}
			>
				<MenuItem onClick={this.goToCharacterIndex}>My Characters</MenuItem>
				<MenuItem onClick={this.goToCharacterGenerator}>Character Generator</MenuItem>
			</LeftNav>
		);
	}
});

export default SideNav;

