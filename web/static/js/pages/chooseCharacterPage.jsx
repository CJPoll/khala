import React from 'react';
import Reflux from 'reflux';

import GameSessionActions from 'gameSessionActions';

import CharactersStore from 'charactersStore';
import CharactersActions from 'charactersActions';
import NavigationActions from 'navigationActions';
import URL from 'url';

import CharacterList from 'characterList';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

/**
 * @return { undefined }
 * @param { Character } character A Character model object as returned from API
 */
function onSelectCharacter(character) {
	GameSessionActions.characterChosen(character);
}

const ChooseCharacterPage = React.createClass({
	mixins: [Reflux.connect(CharactersStore, 'charactersState')],

	componentWillMount() {
		CharactersActions.index();
	},


	newCharacter() {
		NavigationActions.changeUrl(URL.page.characterGenerator);
	},


	render() {
		return (
			<div>
				<h1> Session! </h1>
				<CharacterList
					characters={this.state.charactersState.characters}
					onClick={onSelectCharacter} />
				<FloatingActionButton style={{marginRight: '20', float: 'right'}} onClick={this.newCharacter}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
});

export default ChooseCharacterPage;
