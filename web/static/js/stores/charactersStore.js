import Reflux from 'reflux';
import CharactersActions from 'charactersActions';

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
		this.state.characters = response.characters;
		this.trigger(this.state);
	}
});

export default CharactersStore;
