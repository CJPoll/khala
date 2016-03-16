import Reflux from 'reflux';
import CharacterGeneratorActions from 'characterGeneratorActions';
import CharacterGeneratorStats from 'characterGeneratorStats';

const stats = [
	'Physical',
	'Power',
	'Mental',
	'Finesse',
	'Social',
	'Resilience'
];

const minStatValue = 5;
const maxStatValue = 20;
const targetStartValue = 12;
const startingPointCount = (targetStartValue * stats.length) + 3;

const CharacterGeneratorStore = Reflux.createStore({
	listenables: CharacterGeneratorActions,

	stats: stats,
	minStatValue: minStatValue,
	maxStatValue: maxStatValue,
	startingPointCount: startingPointCount,
	compositeStats: {
		Strength: ['Physical', 'Power'],
		Dexterity: ['Physical', 'Finesse'],
		Constitution: ['Physical', 'Resilience'],

		Intelligence: ['Mental', 'Power'],
		Cunning: ['Mental', 'Finesse'],
		Focus: ['Mental', 'Resilience'],

		Charisma: ['Social', 'Power'],
		Eloquence: ['Social', 'Finesse'],
		Composure: ['Social', 'Resilience']
	},

	init() {
		const stats = new CharacterGeneratorStats(
			this.stats,
			this.compositeStats,
			this.minStatValue,
			this.maxStatValue,
			this.startingPointCount);

		const fullName = '';
		const nickName = '';

		this.state = {
			stats: stats,
			fullName: fullName,
			nickname: nickName,
			validCharacter() {
				return this.stats.validStats() && this.fullName !== '' && this.fullName !== null && this.fullName !== undefined;
			}
		};
	},

	onIncreaseStat(stat) {
		const stats = this.state.stats;

		if (stats.canRaise(stat)) {
			stats.increment(stat);
			this.trigger(this.state);
		}
	},

	onDecreaseStat(stat) {
		const stats = this.state.stats;

		if (stats.canLower(stat)) {
			stats.decrement(stat);
			this.trigger(this.state);
		}
	},

	onChangeFullName(fullName) {
		this.state.fullName = fullName;
		this.trigger(this.state);
	},

	onChangeNickname(nickname) {
		this.state.nickname = nickname;
		this.trigger(this.state);
	}
});

export default CharacterGeneratorStore;
