import _ from 'lodash';
import CompositeStat from 'compositeStat';

/**
 * @typedef { function }
 * @callback compositeStatsIterator
 * @param { CompositStat } compositeStat
 * @param { String } compositeStatName
 */

const CompositeStats = function(compositeStats, statsDelegate) {
	this.composites = _.mapValues(compositeStats,
		(baseStatNames, compositeStatName) => new CompositeStat(baseStatNames, statsDelegate, compositeStatName));
};

/**
 * @return { Number } Value of composite stat
 * @param { StatName } compositeStatName Name of the stat to get the value of
 * @memberof CompositeStats
 */
function valueOf(compositeStatName) {
	this.composites[compositeStatName].value();
}

CompositeStats.prototype.valueOf = valueOf;

/**
 * @return { Array } The results of applying iterator to every stat
 * @param { compositeStatsIterator } iterator A function which is applied to
 * every composite stat (stat, statName)
 * @memberOf CompositeStats
 */
function map(iterator) {
	const statNames = _.keys(this.composites);

	return _.map(statNames, (statName) => iterator(this.composites[statName], statName));
}

CompositeStats.prototype.map = map;

/**
 * @return { Sum } Total value of composite stats
 */
function sum() {
	const compositeValues = this.map((compositeStat) => compositeStat.value());
	return _.reduce(compositeValues, (sum, compositeStatValue) => sum + compositeStatValue, 0);
}

CompositeStats.prototype.sum = sum;

/**
 * @return { Array.CompositeStat } An array of composite stats
 * @param { number } start The starting index for the slice
 * @param { number } length The number of stats to return
 */
function orderedSlice(start, length) {
	const stats = _.values(this.composites);
	stats.sort(function(a, b) {
		return b.value() - a.value();
	});

	const strengths = stats.slice(start, length);
	return _.map(strengths, (stat) => stat.statName);
}

CompositeStats.prototype.orderedSlice = orderedSlice;

/**
 * @return { Array.CompositeStat } An array of composite stats
 */
function strengths() {
	return this.orderedSlice(0, 3);
}

CompositeStats.prototype.strengths = strengths;

/**
 * @return { Array.CompositeStat } An array of composite stats
 */
function mids() {
	return this.orderedSlice(3, 6);
}

CompositeStats.prototype.mids = mids;

/**
 * @return { Array.CompositeStat } An array of composite stats
 */
function weaknesses() {
	return this.orderedSlice(6, 9);
}

CompositeStats.prototype.weaknesses = weaknesses;

export default CompositeStats;
