import _ from 'lodash';

/**
 * @constructor
 * @return { undefined }
 */
function Set(array) {
	this.representation = {};

	if (Array.isArray(array)) {
		array.forEach(function(member) {
			this.representation[member] = member;
		}.bind(this));
	}
}

/**
 * @return { Set } Adds an element to the set, and returns the set
 * @param { * } element Whatever you want to put into the set
 */
function add(element) {
	this.representation[element] = element;
	return this;
}

Set.prototype.add = add;

/**
 * @return { Set } Removes an element from the set, and returns the set
 * @param { * } element Removes the element from the set
 */
function remove(element) {
	delete this.representation[element];
	return this;
}

Set.prototype.remove = remove;

/**
 * @return { bool } Whether or not the element is a member of the set
 * @param { * } element The item to check membership for
 */
function member(element) {
	return this.representation[element] !== undefined;
}

Set.prototype.member = member;

/**
 * @return { Number } The number of elements in the set
 */
function count() {
	return _.keys(this.representation).length;
}

Set.prototype.count = count;

/**
 * @return { undefined }
 * @param { Function } iteratee What you want to do for each element
 */
function forEach(iteratee) {
	const keys = _.keys(this.representation);
	keys.forEach(iteratee);
}

Set.prototype.forEach = forEach;

/**
 * @return { Array<*> } The result of applying iteratee to each element
 * @param { Function } iteratee A function which is applied to each element
 * (only takes <element> as a parameter)
 */
function map(iteratee) {
	const keys = _.keys(this.representation);
	return _.map(keys, iteratee);
}

Set.prototype.map = map;

export default Set;
