import Reflux from 'reflux';
import CharactersActions from 'charactersActions';
import CharacterModel from 'models/character';
import _ from 'lodash';

const CharactersStore = Reflux.createStore({
	listenables: [CharactersActions],

	init() {
		this.state = {
			characters: []
		};
	},

	getInitialState() {
		CharactersActions.index();
		return this.state;
	},

	onIndexCompleted(response) {
		const characters = _.map(response.characters, (character) => new CharacterModel(character));
		this.state.characters = characters;
		this.trigger(this.state);
	}
});

export default CharactersStore;
