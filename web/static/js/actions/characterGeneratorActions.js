import Reflux from 'reflux';

const CharacterGeneratorActions = Reflux.createActions([
	'increaseStat',
	'decreaseStat',
	'changeFullName',
	'changeNickname',
	'submitCharacter',
	'chooseCampaign'
]);

export default CharacterGeneratorActions;
