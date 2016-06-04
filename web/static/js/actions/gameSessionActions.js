import Reflux from 'reflux';

const GameSessionActions = Reflux.createActions([
	'characterChosen',
	'joinSession',
	'leaveSession',
	'updateState',
	'userJoined',
	'userLeft'
]);

export default GameSessionActions;
