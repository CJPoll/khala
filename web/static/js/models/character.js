/**
 * @constructor
 * @param { String } fullName The full name of the character
 * @param { String } nickname A shortened version of the character's name for
 * display
 * @param { CharacterGeneratorStats } stats The character's stat block
 */
function CharacterModel(fullName, nickname, stats) {
	this.fullName = fullName;
	this.nickname = nickname;
	this.stats = stats;
}

export default CharacterModel;
