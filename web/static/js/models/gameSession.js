import SessionStore from 'sessionStore';

/**
 * @typedef { String } SessionId
 * @typedef { String } PlayerName
 * @typedef { Phoenix.Channel } Session
 */

/**
 * @constructor
 */
function GameSession() {
	this._players = [];
	this._characters = {};
	this._session = null;
	this._sessionId = null;
}

function isInSession(sessionId) {
	return this._sessionId == sessionId;
}

GameSession.prototype.isInSession = isInSession;

/**
 * @return { boolean } Whether the client is in the 'unjoined' state
 */
function isUnjoined() {
	return this._session === null;
}

GameSession.prototype.isUnjoined = isUnjoined;

/**
 * @return { boolean } Whether the client is in the 'choose_player' state
 */
function isChoosingCharacter() {
	return this._characters[SessionStore.userName()] === undefined;
}

GameSession.prototype.isChoosingCharacter = isChoosingCharacter;

/**
 * @return { boolean } Whether the client is in the 'lobby' state
 */
function isInLobby() {
	return true;
}

GameSession.prototype.isInLobby = isInLobby;

/**
 * @return { undefined }
 * @param { Session } session The channel represnting a connection to a
 * game session.
 * @param { SessionId } sessionId An identifier for the game session
 */
function joinSession(session, sessionId) {
	if (this._session !== null) {
		this._session.leave();
		this._players = [];
		this._characters = {};
	}

	this._session = session;
	this._sessionId = sessionId;
}

GameSession.prototype.joinSession = joinSession;

/**
 * @return { Array.String } A list of current players' names
 */
function players() {
	return this._players;
}

GameSession.prototype.players = players;

function leaveSession() {
	GameSession.bind(this)();
}

GameSession.prototype.leaveSession = leaveSession;

function update(state) {
	this._players = state.players;
	this._characters = state.characters;
}

GameSession.prototype.update = update;

function characterChosen(character) {
	this._session.push('character:chosen', {character_id: character.id});
}

GameSession.prototype.characterChosen = characterChosen;

export default GameSession;
