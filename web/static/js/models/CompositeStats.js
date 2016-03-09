import _ from 'lodash';
import CompositeStat from 'compositeStat';

/**
 * @typedef { function }
 * @callback compositeStatsIterator
 * @param { CompositStat } compositeStat
 * @param { String } compositeStatName
 */

const CompositeStats = function(compositeStats, statsDelegate) {
	this.composites = _.mapValues(compositeStats, (baseStatNames) => new CompositeStat(baseStatNames, statsDelegate));
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
 * every composite stat
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

export default CompositeStats;
