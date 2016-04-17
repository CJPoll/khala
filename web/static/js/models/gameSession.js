import Set from 'set';

// @typedef { String } SessionId
// @typedef { String } PlayerName

const STATES = Object.freeze({
	UNJOINED: 'unjoined',
	CHOOSE_PLAYER: 'choose_player',
	LOBBY: 'lobby'
});

/**
 * @constructor
 */
function GameSession() {
	this._state = STATES.UNJOINED;
	this._players = new Set();
	this._session = null;
	this._sessionId = null;
	this._character = null;
}

function isInSession(sessionId) {
	return this._sessionId == sessionId;
}

GameSession.prototype.isInSession = isInSession;

/**
 * @return { boolean } Whether the client is in the 'unjoined' state
 */
function isUnjoined() {
	return this._state === STATES.UNJOINED;
}

GameSession.prototype.isUnjoined = isUnjoined;

/**
 * @return { boolean } Whether the client is in the 'choose_player' state
 */
function isChoosingCharacter() {
	return this._state === STATES.CHOOSE_PLAYER;
}

GameSession.prototype.isChoosingCharacter = isChoosingCharacter;

/**
 * @return { boolean } Whether the client is in the 'lobby' state
 */
function isInLobby() {
	return this._state === STATES.LOBBY;
}

GameSession.prototype.isInLobby = isInLobby;

/**
 * @return { undefined }
 * @param { String } userName The name of a user joining the game session
 */
function addPlayer(userName) {
	this._players.add(userName);
}

GameSession.prototype.addPlayer = addPlayer;

/**
 * @return { undefined }
 * @param { Phoenix.Channel } channel The channel represnting a connection to a
 * game session.
 * @param { SessionId } sessionId An identifier for the game session
 */
function joinSession(channel, sessionId) {
	if (this._session !== null) {
		this._session.leave();
		this._players = new Set();
	}

	this._session = channel;
	this._sessionId = sessionId;
	this.setState(STATES.CHOOSE_PLAYER);
}

GameSession.prototype.joinSession = joinSession;

/**
 * @return { Array.String } A list of current players' names
 */
function players() {
	return this._players;
}

GameSession.prototype.players = players;

/**
 * @return { undefined }
 * @param { PlayerName } playerName The display name of a player in a session
 */
function removePlayer(playerName) {
	this._players.remove(playerName);
}

GameSession.prototype.removePlayer = removePlayer;

/**
 * @return { undefined }
 * @param { CharacterModel } character A character chosen for the session
 */
function characterChosen(character) {
	if (this.isChoosingCharacter()) {
		this.setState(STATES.LOBBY);
		this._character = character;
	}
}

GameSession.prototype.characterChosen = characterChosen;

/**
 * @return { undefined }
 * @param { String } state The state the game session should be in for the
 * character
 */
function setState(state) {
	this._state = state;
}

GameSession.prototype.setState = setState;

function leaveSession() {
	GameSession.bind(this)()
}

GameSession.prototype.leaveSession = leaveSession;

export default GameSession;
