import Reflux from 'reflux';
import NotificationActions from 'notificationActions';
import NavigationActions from 'navigationActions';
import GameSessionActions from 'gameSessionActions';
import SessionStore from 'sessionStore';
import URL from 'url';

import Set from 'set';
import socket from 'socket';
import uuid from 'uuid';

/**
 * @return { undefined }
 */
function init() {
	this.state = {
		users: new Set(),
		sessions: new Set()
	};
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
	this.state.users.add(userName);
	NotificationActions.notify(userName + ' joined');
	this.trigger(this.state);
}

/**
 * @return { undefined }
 * @param { String } userName The name of a user who just left the game session
 */
function onUserLeft(userName) {
	NotificationActions.notify(userName + ' left');
	this.state.users.remove(userName);
	this.trigger(this.state);
}

/**
 * @return { undefined }
 * @param { String } userName The name of a user ack-ing a join
 */
function onUserAckReceived(userName) {
	this.state.users.add(userName);
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
	const sessions = this.state.sessions;
	if (!sessions.member(sessionId)) {
		const channel = socket.channel('sessions:' + sessionId, {token: SessionStore.token()});
		channel.join()
		.receive('ok', () => {
			sessions.add(sessionId);

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
	GameSessionActions.joinSession('sessions:' + sessionId);
	NavigationActions.changeUrl(URL.page.sessionFor(sessionId));
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
	listenables: GameSessionActions,
	init: init,
	getInitialState: getInitialState,
	onUserJoined: onUserJoined,
	onUserLeft: onUserLeft,
	onUserAckReceived: onUserAckReceived,
	onUserAck: onUserAck,
	onJoinSession: onJoinSession,
	onCreateSession: onCreateSession
});

export default GameSessionStore;
