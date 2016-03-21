import Reflux from 'reflux';
import NotificationActions from 'notificationActions';
import SessionActions from 'sessionActions';
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
		session: null
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
	if (!this.state.session) {
		const channel = socket.channel('sessions:' + sessionId, {token: SessionStore.token()});
		channel.join()
		.receive('ok', () => {
			this.state.session = channel;
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
 */
function onLogout() {
	const session = this.state.session;
	if (session) {
		this.state.session = null;
		session.leave();
	}
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
	onUserJoined: onUserJoined,
	onUserLeft: onUserLeft,
	onUserAckReceived: onUserAckReceived,
	onUserAck: onUserAck,
	onJoinSession: onJoinSession,
	onCreateSession: onCreateSession,
	onLogout: onLogout
});

export default GameSessionStore;
