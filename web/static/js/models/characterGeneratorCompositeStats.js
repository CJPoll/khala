import _ from 'lodash';

const CharacterGeneratorCompositeStats = function(compositeStats) {
	this.statNames = _.keysIn(compositeStats);
	this.stats = compositeStats;
};

export default CharacterGeneratorCompositeStats;
