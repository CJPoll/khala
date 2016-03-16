import Reflux from 'reflux';

const CharacterGeneratorActions = Reflux.createActions([
	'increaseStat',
	'decreaseStat',
	'changeFullName',
	'changeNickname'
]);

export default CharacterGeneratorActions;
