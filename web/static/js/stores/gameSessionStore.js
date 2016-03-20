import Reflux from 'reflux';
import NotificationActions from 'notificationActions';
import GameSessionActions from 'gameSessionActions';
import sessionChannel from 'sessionChannel';
import Set from 'set';

/**
 * @return { undefined }
 */
function init() {
	this.state = {
		users: new Set()
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
	sessionChannel.push('user:ack', {});
}

const GameSessionStore = Reflux.createStore({
	listenables: GameSessionActions,
	init: init,
	getInitialState: getInitialState,
	onUserJoined: onUserJoined,
	onUserLeft: onUserLeft,
	onUserAckReceived: onUserAckReceived,
	onUserAck: onUserAck
});

export default GameSessionStore;
