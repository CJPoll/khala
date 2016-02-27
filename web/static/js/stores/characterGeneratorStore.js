import Reflux from 'reflux';

const CharacterGeneratorStore = Reflux.createStore({
	init() {
		this.state = {};
	}
});

export default CharacterGeneratorStore;
