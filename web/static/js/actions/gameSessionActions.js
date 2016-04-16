import Reflux from 'reflux';

const GameSessionActions = Reflux.createActions([
	'userJoined',
	'userLeft',
	'userAck',
	'userAckReceived',
	'joinSession',
	'createSession',
	'characterChosen',
	'leaveSession'
]);

export default GameSessionActions;
