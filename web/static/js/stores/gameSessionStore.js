import Reflux from 'reflux';
import NotificationActions from 'notificationActions';
import SessionActions from 'sessionActions';
import GameSessionActions from 'gameSessionActions';
import SessionStore from 'sessionStore';

import socket from 'socket';
import uuid from 'uuid';
import GameSession from 'gameSession';

/**
 * @return { undefined }
 */
function init() {
	this.state = new GameSession();
}

/**
 * @return { Object } Initial state for subscribed components
 */
function getInitialState() {
	return this.state;
}

/**
 * @return { undefined }
 * @param { String } userName The name of a user who just joined the game session
 */
function onUserJoined(userName) {
	this.state.addPlayer(userName);
	NotificationActions.notify(userName + ' joined');
	this.trigger(this.state);
}

/**
 * @return { undefined }
 * @param { String } userName The name of a user who just left the game session
 */
function onUserLeft(userName) {
	NotificationActions.notify(userName + ' left');
	this.state.removePlayer(userName);
	this.trigger(this.state);
}

/**
 * @return { undefined }
 * @param { String } userName The name of a user ack-ing a join
 */
function onUserAckReceived(userName) {
	this.state.addPlayer(userName);
	this.trigger(this.state);
}

/**
 * @return { undefined }
 */
function onUserAck() {
}

/**
 * @return { undefined }
 * @param { String } sessionId The id of the room to join
 */
function onJoinSession(sessionId) {
	if (!this.state.session) {
		const channel = socket.channel('sessions:' + sessionId, {token: SessionStore.token()});
		channel.join()
		.receive('ok', () => {
			this.state.joinSession(channel, sessionId);
			channelSetup(channel);
		});
	}
	this.trigger(this.state);
}

/**
 * @return { undefined }
 */
function onCreateSession() {
	const sessionId = uuid();
	GameSessionActions.joinSession(sessionId);
}

/**
 * @return { undefined }
 */
function onLogout() {
	const session = this.state.session;
	if (session) {
		this.state.session = null;
		session.leave();
	}
}

function onCharacterChosen(character) {
	this.state.characterChosen(character);
	this.trigger(this.state);
}

/**
 * @return { undefined }
 * @param { Phoenix.Channel } channel The channel to set up
 */
function channelSetup(channel) {
	channel.on('user:join', function(response) {
		GameSessionActions.userJoined(response.user);
		channel.push('user:ack', {});
	});

	channel.on('user:leave', function(response) {
		GameSessionActions.userLeft(response.user);
	});

	channel.on('user:ack', function(response) {
		GameSessionActions.userAckReceived(response.user);
	});
}

const GameSessionStore = Reflux.createStore({
	listenables: [GameSessionActions, SessionActions],
	init: init,
	getInitialState: getInitialState,
	onCharacterChosen: onCharacterChosen,
	onUserJoined: onUserJoined,
	onUserLeft: onUserLeft,
	onUserAckReceived: onUserAckReceived,
	onUserAck: onUserAck,
	onJoinSession: onJoinSession,
	onCreateSession: onCreateSession,
	onLogout: onLogout
});

export default GameSessionStore;
