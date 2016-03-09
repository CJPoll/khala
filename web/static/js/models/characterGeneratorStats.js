import _ from 'lodash';

/**
 * @typedef { String } StatName
 */

/**
 * @constructor
 * @return { undefined }
 * @param { Array.String } statNames Names of stats to generate
 * @param { Object.<StatName, Array.StatName> } composites An object
 * describing how to calculate a composite stat
 * @param { Number } startingValue The default point value assigned to a stat
 * @param { Number } maxValue The highest point value that can be assigned to a
 * stat
 * @param { Number } maxPoints The maximum number of points that can be
 * distributed across all base stats.
 */
function CharacterGeneratorStats(statNames, composites, startingValue, maxValue, maxPoints) {
	this.statNames = statNames;
	this.stats = {};
	_.each(statNames, (statName) => this.stats[statName] = startingValue);
	this.maxValue = maxValue;
	this.minValue = startingValue;
	this.maxPoints = maxPoints;
	this.composites = composites;
}

/**
 * @return { undefined }
 * @param { function } iterator A function to apply to every member. Return
 * value ignored.
 */
function forEach(iterator) {
	_.forEach(this.statNames, function(statName) {
		iterator(statName, this.valueOf(statName));
	}.bind(this));
}

CharacterGeneratorStats.prototype.forEach = forEach;

/**
 * @return { Array } Results of applying iterator to every stat name
 * @param { function } iterator A function to apply to every stat name
 */
function map(iterator) {
	return _.map(this.statNames,
		(statName) => iterator(statName, this.valueOf(statName)));
}

CharacterGeneratorStats.prototype.map = map;

/**
 * @return { Number } Sum of all stats
 */
function sum() {
	return _.reduce(this.stats, (acc, stat) => stat + acc, 0);
}

CharacterGeneratorStats.prototype.sum = sum;

/**
 * @return { Integer } The number of points remaining to allocate to stats
 */
function pointsRemaining() {
	return this.maxPoints - this.sum();
}

CharacterGeneratorStats.prototype.pointsRemaining = pointsRemaining;

/**
 * @return { Number } The value of a given stat
 * @param { String } stat The name of a stat
 */
function valueOf(stat) {
	return this.stats[stat];
}

CharacterGeneratorStats.prototype.valueOf = valueOf;

/**
 * @return { undefined }
 * @param { String } stat The name of a stat to increment
 */
function increment(stat) {
	this.stats[stat] += 1;
}

CharacterGeneratorStats.prototype.increment = increment;

/**
 * @return { undefined }
 * @param { String } stat The name of a stat to decrement
 */
function decrement(stat) {
	this.stats[stat] -= 1;
}

CharacterGeneratorStats.prototype.decrement = decrement;

/**
 * @return { boolean } Whether a stat can decrement and still be valid
 * @param { String } stat Name of a stat to validate decrementability
 */
function canLower(stat) {
	return this.valueOf(stat) > this.minValue;
}

CharacterGeneratorStats.prototype.canLower = canLower;

/**
 * @return { boolean } Whether a stat can increment and still be valid
 * @param { String } stat Name of a stat to validate incrementability
 */
function canRaise(stat) {
	return this.valueOf(stat) < this.maxValue && this.pointsRemaining() > 0;
}

CharacterGeneratorStats.prototype.canRaise = canRaise;

/**
 * @return { CharacterGeneratorCompositeStats } A Composite Stats
 */
function compositeStats() {
	const compositeStatNames = _.keys(this.composites);
	const compositeStats = _.map(compositeStatNames, function(compositeStatName) {
		const statValue = this.valueOfComposite(compositeStatName);
		return { statName: compositeStatName, statValue: statValue };
	}.bind(this));

	return compositeStats;
}

CharacterGeneratorStats.prototype.calculateComposites = compositeStats;

/**
 * @return { Number } Value of a given composite stat
 * @param { String } compositeStat Name of a composite stat to compute the value for
 */
function valueOfComposite(compositeStat) {
	const baseStats = this.composites[compositeStat];
	return _.reduce(baseStats, (acc, statName) => acc * this.valueOf(statName), 1);
}

CharacterGeneratorStats.prototype.valueOfComposite = valueOfComposite;

export default CharacterGeneratorStats;
