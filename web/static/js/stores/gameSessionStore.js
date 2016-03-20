import Reflux from 'reflux';
import NotificationActions from 'notificationActions';
import GameSessionActions from 'gameSessionActions';

/**
 * @return { undefined }
 */
function init() {
	this.state = {
		users: []
	};
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

const GameSessionStore = Reflux.createStore({
	listenables: GameSessionActions,
	init: init,
	onUserJoined: onUserJoined,
	onUserLeft: onUserLeft
});

export default GameSessionStore;
