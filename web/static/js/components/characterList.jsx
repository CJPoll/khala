import React from 'react';
import _ from 'lodash';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const CharacterList = React.createClass({
	renderCharacters(characters) {
		if (characters.length > 0) {
			return _.map(characters, (character) => {
				const key = 'character_' + character.id;
				let onClick = null;
				if (this.props.onClick) {
					onClick = this.props.onClick.bind(this, character);
				} else {
					onClick = function() {};
				}

				return <ListItem key={key} onTouchTap={onClick}> {character.fullName} </ListItem>;
			});
		} else {
			const defaultMessage = 'By Merlin\'s beard - go make some characters!';
			return <ListItem> {defaultMessage} </ListItem>;
		}
	},

	render() {
		return (
			<List>
				{this.renderCharacters(this.props.characters)}
			</List>
		);
	}
});

export default CharacterList;

