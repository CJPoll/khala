import React from 'react';
import Reflux from 'reflux';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import CharactersStore from 'charactersStore';
import _ from 'lodash';
import CharactersActions from 'charactersActions';
import NavigationActions from 'navigationActions';
import URL from 'url';

const CharacterIndexPage = React.createClass({
	mixins: [Reflux.connect(CharactersStore, 'characters')],

	init() {
		CharactersActions.index();
	},

	newCharacter() {
		NavigationActions.changeUrl(URL.page.characterGenerator);
	},

	renderCharacters() {
		return _.map(this.state.characters.characters, (character) => <ListItem key={'character_' + character.id}> {character.fullName} </ListItem>);
	},

	render() {
		return (
			<div>
				<h2> Characters </h2>
				<List>
					{this.renderCharacters()}
				</List>
				<FloatingActionButton style={{marginRight: '20', float: 'right'}} onClick={this.newCharacter}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
});

export default CharacterIndexPage;

