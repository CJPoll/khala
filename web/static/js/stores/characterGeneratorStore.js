import Reflux from 'reflux';
import CharacterGeneratorActions from 'characterGeneratorActions';
import _ from 'lodash';

const CharacterGeneratorStore = Reflux.createStore({
	listenables: CharacterGeneratorActions,

	minStatValue: 6,
	maxStatValue: 14,
	startingPointCount: 60,

	init() {
		this.state = {
			pointsRemaining: 60 - (6 * this.minStatValue),
			stats: {
				'Power': this.minStatValue,
				'Physical': this.minStatValue,
				'Skill': this.minStatValue,
				'Mental': this.minStatValue,
				'Resilience': this.minStatValue,
				'Social': this.minStatValue
			}
		};
	},

	onIncreaseStat(stat) {
		if (this.canRaise(stat)) {
			this.increment(stat);
			this.trigger(this.state);
		}
	},

	onDecreaseStat(stat) {
		if (this.canLower(stat)) {
			this.decrement(stat);
			this.trigger(this.state);
		}
	},

	canRaise(stat) {
		return this.notMax(stat) && this.hasPointsRemaining();
	},

	canLower(stat) {
		return this.notMin(stat);
	},

	hasPointsRemaining() {
		return this.pointsRemaining() > 0;
	},

	notMin(stat) {
		return this.valueOf(stat) > this.minStatValue;
	},

	notMax(stat) {
		return this.valueOf(stat) < this.maxStatValue;
	},

	increment(stat) {
		this.state.stats[stat] += 1;
		this.updatePointsRemaining();
	},

	decrement(stat) {
		this.state.stats[stat] -= 1;
		this.updatePointsRemaining();
	},

	updatePointsRemaining() {
		const values = _.map(['Power', 'Social', 'Skill', 'Physical', 'Resilience', 'Mental'], this.valueOf);
		const sum = _.reduce(values, (value, acc) => value + acc, 0);
		this.state.pointsRemaining = this.startingPointCount - sum;
	},

	valueOf(stat) {
		return this.state.stats[stat];
	},
	
	pointsRemaining() {
		return this.state.pointsRemaining;
	}
});

export default CharacterGeneratorStore;
