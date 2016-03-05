import Reflux from 'reflux';
import CharacterGeneratorActions from 'characterGeneratorActions';

const CharacterGeneratorStore = Reflux.createStore({
	listenables: CharacterGeneratorActions,

	init() {
		this.state = {
			stats: {
				'Power': 0,
				'Social': 0,
				'Skill': 0,
				'Physical': 0,
				'Resilience': 0,
				'Mental': 0
			}
		};
	},

	onDecreaseStat(stat) {
		this.state.stats[stat] -= 1;
		this.trigger(this.state);
	},

	onIncreaseStat(stat) {
		this.state.stats[stat] += 1;
		this.trigger(this.state);
	}
});

export default CharacterGeneratorStore;
