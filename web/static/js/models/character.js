/**
 * @constructor
 * @param { Object } character The parsed JSON representation of the character
 */
function CharacterModel(character) {
	this.id = character.id;
	this.fullName = character.fullName;
	this.nickname = character.nickname;
	this.stats = character.stats;
}

export default CharacterModel;
