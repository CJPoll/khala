import React from 'react';
import Reflux from 'reflux';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import CharactersStore from 'charactersStore';
import CharactersActions from 'charactersActions';
import NavigationActions from 'navigationActions';
import URL from 'url';
import requireLogin from 'requireLogin';
import CharacterList from 'characterList';

const CharacterIndexPage = React.createClass({
	mixins: [requireLogin, Reflux.connect(CharactersStore, 'characters')],

	init() {
		CharactersActions.index();
	},

	newCharacter() {
		NavigationActions.changeUrl(URL.page.characterGenerator);
	},

	render() {
		return (
			<div>
				<h2> Characters </h2>
				<CharacterList characters={this.state.characters.characters} />
				<FloatingActionButton style={{marginRight: '20', float: 'right'}} onClick={this.newCharacter}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
});

export default CharacterIndexPage;

