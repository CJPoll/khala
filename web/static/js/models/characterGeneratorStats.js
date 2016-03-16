import _ from 'lodash';
import CompositeStats from 'CompositeStats';

/**
 * @typedef { String } StatName
 */

/**
 * @constructor
 * @return { undefined }
 * @param { Array.String } statNames Names of stats to generate
 * @param { Object.<StatName, CompositeStat> } composites A mapping from
 * composite stat names to actual composite stats
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
	this.compositeStats = new CompositeStats(composites, this);
}

/**
 * @return { undefined }
 * @param { function } iterator A function to apply to every member. Return
 * value ignored.
 * @memberof CharacterGeneratorStats
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
 * @memberof CharacterGeneratorStats
 */
function map(iterator) {
	return _.map(this.statNames,
		(statName) => iterator(statName, this.valueOf(statName)));
}

CharacterGeneratorStats.prototype.map = map;

/**
 * @return { Number } Sum of all stats
 * @memberof CharacterGeneratorStats
 */
function sum() {
	return _.reduce(this.stats, (acc, stat) => stat + acc, 0);
}

CharacterGeneratorStats.prototype.sum = sum;

/**
 * @return { Integer } The number of points remaining to allocate to stats
 * @memberof CharacterGeneratorStats
 */
function pointsRemaining() {
	return this.maxPoints - this.sum();
}

CharacterGeneratorStats.prototype.pointsRemaining = pointsRemaining;

/**
 * @return { Number } The value of a given stat
 * @param { String } stat The name of a stat
 * @memberof CharacterGeneratorStats
 */
function valueOf(stat) {
	return this.stats[stat];
}

CharacterGeneratorStats.prototype.valueOf = valueOf;

/**
 * @return { undefined }
 * @param { String } stat The name of a stat to increment
 * @memberof CharacterGeneratorStats
 */
function increment(stat) {
	this.stats[stat] += 1;
}

CharacterGeneratorStats.prototype.increment = increment;

/**
 * @return { undefined }
 * @param { String } stat The name of a stat to decrement
 * @memberof CharacterGeneratorStats
 */
function decrement(stat) {
	this.stats[stat] -= 1;
}

CharacterGeneratorStats.prototype.decrement = decrement;

/**
 * @return { boolean } Whether a stat can decrement and still be valid
 * @param { String } stat Name of a stat to validate decrementability
 * @memberof CharacterGeneratorStats
 */
function canLower(stat) {
	return this.valueOf(stat) > this.minValue;
}

CharacterGeneratorStats.prototype.canLower = canLower;

/**
 * @return { boolean } Whether a stat can increment and still be valid
 * @param { String } stat Name of a stat to validate incrementability
 * @memberof CharacterGeneratorStats
 */
function canRaise(stat) {
	return this.valueOf(stat) < this.maxValue && this.pointsRemaining() > 0;
}

CharacterGeneratorStats.prototype.canRaise = canRaise;

/**
 * @return { CompositeStats } A Composite Stats object
 * @memberof CharacterGeneratorStats
 */
function composites() {
	return this.compositeStats;
}

CharacterGeneratorStats.prototype.composites = composites;

/**
 * @return { Number } Value of a given composite stat
 * @param { StatName } compositeStat Name of a composite stat to compute the value for
 * @memberof CharacterGeneratorStats
 */
function valueOfComposite(compositeStat) {
	const baseStats = this.composites[compositeStat];
	return _.reduce(baseStats, (acc, statName) => acc * this.valueOf(statName), 1);
}

CharacterGeneratorStats.prototype.valueOfComposite = valueOfComposite;

/**
 * @return { boolean } Whether the character stats are valid
 */
function validStats() {
	return this.pointsRemaining() === 0;
}

CharacterGeneratorStats.prototype.validStats = validStats;

export default CharacterGeneratorStats;
