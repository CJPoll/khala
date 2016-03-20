import Reflux from 'reflux';

const GameSessionActions = Reflux.createActions([
	'userJoined',
	'userLeft'
]);

export default GameSessionActions;
