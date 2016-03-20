import Reflux from 'reflux';

const GameSessionActions = Reflux.createActions([
	'userJoined',
	'userLeft',
	'userAck',
	'userAckReceived',
	'joinSession',
	'createSession'
]);

export default GameSessionActions;
