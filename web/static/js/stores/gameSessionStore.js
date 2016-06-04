import Reflux from 'reflux';
import NotificationActions from 'notificationActions';
import SessionActions from 'sessionActions';
import GameSessionActions from 'gameSessionActions';
import SessionStore from 'sessionStore';
import NavigationActions from 'navigationActions';
import URL from 'url';

import socket from 'socket';
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
	NotificationActions.notify(userName + ' joined');
}

/**
 * @return { undefined }
 * @param { String } userName The name of a user who just left the game session
 */
function onUserLeft(userName) {
	NotificationActions.notify(userName + ' left');
}

function onCharacterChosen(character) {
	this.state.characterChosen(character);
}

/**
 * @return { undefined }
 * @param { String } sessionId The id of the room to join
 */
function onJoinSession(sessionId) {
	if (!this.state.isInSession(sessionId)) {
		const channel = socket.channel('sessions:' + sessionId, {token: SessionStore.token()});

		channel.join()
		.receive('ok', () => {
			this.state.joinSession(channel, sessionId);
			channelSetup(channel);
		})
		.receive('error', () => {
			NavigationActions.changeUrl(URL.page.campaign.index);
			NotificationActions.notify('Could not join the session');
		});
	}

	this.trigger(this.state);
}

/**
 * @return { undefined }
 * @param { Object } sessionState The new session state from the server
 */
function onUpdateState(newState) {
	this.state.update(newState);
	this.trigger(this.state);
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
	});

	channel.on('user:leave', function(response) {
		GameSessionActions.userLeft(response.user);
	});

	channel.on('state:updated', function(response) {
		console.log('State updated!', response);
		GameSessionActions.updateState(response);
	});
}

const GameSessionStore = Reflux.createStore({
	listenables: [GameSessionActions, SessionActions],
	init: init,
	getInitialState: getInitialState,
	onCharacterChosen: onCharacterChosen,
	onUpdateState: onUpdateState,
	onUserJoined: onUserJoined,
	onUserLeft: onUserLeft,
	onJoinSession: onJoinSession,
	onLogout: onLogout
});

export default GameSessionStore;
