import _ from 'lodash';

/**
 * @module CompositeStat
 * @typedef { Number } Sum
 */

/**
 * @constructor
 * @return { CompositeStat } A CompositeStat object
 * @param { Array.StatName } baseStats A list of names of base stats
 * @param { CharacterGeneratorStats } statsObject An object to query for the
 * value of the base stats
 */
function CompositeStat(baseStats, statsObject) {
	this.baseStats = baseStats;
	this.statsObject = statsObject;
}

/**
 * @return { Sum } Result of adding the baseStatValue to the accumulator
 * @param { Sum } sum The sum of values calculated thus far
 * @param { Number } baseStatValue The value of a base stat
 */
function compositeStatReducer(sum, baseStatValue) {
	return sum * baseStatValue;
}

/**
 * @return { Number } Value of the composite stat
 * @param { StatName } statName Name of the composite stat to compute a value
 * for
 * @memberof CompositeStat
 */
function value() {
	const baseStatValues = _.map(this.baseStats, (baseStatName) => this.statsObject.valueOf(baseStatName));
	return _.reduce(baseStatValues, compositeStatReducer, 1);
}

CompositeStat.prototype.value = value;

export default CompositeStat;
