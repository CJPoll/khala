import Reflux from 'reflux';
import CharacterGeneratorActions from 'characterGeneratorActions';

const CharacterGeneratorStore = Reflux.createStore({
	listenables: CharacterGeneratorActions,

	minStatValue: 6,
	maxStatValue: 14,
	startingPointCount: 60,

	init() {
		this.state = {
			stats: {
				'Power': this.minStatValue,
				'Social': this.minStatValue,
				'Skill': this.minStatValue,
				'Physical': this.minStatValue,
				'Resilience': this.minStatValue,
				'Mental': this.minStatValue
			}
		};
	},

	onIncreaseStat(stat) {
		if (this.canRaise(stat)) {
			this.state.stats[stat] += 1;
			this.trigger(this.state);
		}
	},

	onDecreaseStat(stat) {
		if (this.canLower(stat)) {
			this.state.stats[stat] -= 1;
			this.trigger(this.state);
		}
	},

	canRaise(stat) {
		return this.state.stats[stat] < this.maxStatValue;
	},

	canLower(stat) {
		return this.state.stats[stat] > this.minStatValue;
	}
});

export default CharacterGeneratorStore;
