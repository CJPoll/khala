import React from 'react';
import Reflux from 'reflux';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import CharactersStore from 'charactersStore';
import _ from 'lodash';
import CharactersActions from 'charactersActions';

const CharacterIndexPage = React.createClass({
	mixins: [Reflux.connect(CharactersStore, 'characters')],

	init() {
		CharactersActions.index();
	},

	renderCharacters() {
		return _.map(this.state.characters.characters, (character) => <ListItem key={'character_' + character.id}> {character.fullName} </ListItem>);
	},

	render() {
		return (
			<List>
				{this.renderCharacters()}
			</List>
		);
	}
});

export default CharacterIndexPage;

