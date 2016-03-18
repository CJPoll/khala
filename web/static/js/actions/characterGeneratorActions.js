import Reflux from 'reflux';

const CharacterGeneratorActions = Reflux.createActions([
	'increaseStat',
	'decreaseStat',
	'changeFullName',
	'changeNickname',
	'submitCharacter'
]);

export default CharacterGeneratorActions;
