import Set from 'set';

// @typedef { String } SessionId
// @typedef { String } PlayerName

const STATES = Object.freeze({
	UNJOINED: 'unjoined',
	CHOOSE_PLAYER: 'choose_player'
});

/**
 * @constructor
 */
function GameSession() {
	this._state = STATES.UNJOINED;
	this._players = new Set();
	this._session = null;
	this._sessionId = null;
}

/**
 * @return { boolean } Whether the client is in the 'unjoined' state
 */
function isUnjoined() {
	return this._state === STATES.UNJOINED;
}

GameSession.prototype.isUnjoined = isUnjoined;

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
	}

	this._session = channel;
	this._sessionId = sessionId;
	this._state = STATES.CHOOSE_PLAYER;
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

export default GameSession;
