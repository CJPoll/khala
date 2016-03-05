import _ from 'lodash';

const CharacterGeneratorStats = function(stats, composites, startingValue, maxValue, maxPoints) {
	this.statNames = stats;
	this.stats = {};
	_.each(stats, (stat) => this.stats[stat] = startingValue);
	this.maxValue = maxValue;
	this.minValue = startingValue;
	this.maxPoints = maxPoints;
	this.composites = composites;
};

CharacterGeneratorStats.prototype.forEach = function(iterator) {
	_.forEach(this.statNames, function(statName) {
		iterator(statName, this.valueOf(statName));
	}.bind(this));
};

CharacterGeneratorStats.prototype.map = function(iterator) {
	return _.map(this.statNames, function(statName) {
		return iterator(statName, this.valueOf(statName));
	}.bind(this));
};

CharacterGeneratorStats.prototype.sum = function() {
	return _.reduce(this.stats, (acc, stat) => stat + acc, 0);
};

CharacterGeneratorStats.prototype.pointsRemaining = function() {
	return this.maxPoints - this.sum();
};

CharacterGeneratorStats.prototype.valueOf = function(stat) {
	return this.stats[stat];
};

CharacterGeneratorStats.prototype.increment = function(stat) {
	this.stats[stat] += 1;
};

CharacterGeneratorStats.prototype.decrement = function(stat) {
	this.stats[stat] -= 1;
};

CharacterGeneratorStats.prototype.canLower = function(stat) {
	return this.valueOf(stat) > this.minValue;
};

CharacterGeneratorStats.prototype.canRaise = function(stat) {
	return this.valueOf(stat) < this.maxValue && this.pointsRemaining() > 0;
};

CharacterGeneratorStats.prototype.calculateComposites = function() {
	const compositeStatNames = _.keys(this.composites);
	const compositeStats = _.map(compositeStatNames, function(compositeStatName) {
		const baseStats = this.composites[compositeStatName];
		const statValue = _.reduce(baseStats, function(acc, baseStat) {
			const statValue = acc * this.valueOf(baseStat);
			return statValue;
		}.bind(this), 1);

		return { statName: compositeStatName, statValue: statValue };
	}.bind(this));

	return compositeStats;
};

export default CharacterGeneratorStats;
