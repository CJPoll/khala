import Reflux from 'reflux';

const GameSessionActions = Reflux.createActions([
	'userJoined',
	'userLeft',
	'userAck',
	'userAckReceived'
]);

export default GameSessionActions;
