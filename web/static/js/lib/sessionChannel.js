import socket from 'socket';
import SessionStore from 'sessionStore';
import GameSessionActions from 'gameSessionActions';

const channel = socket.channel('sessions:lobby', {token: SessionStore.token()});

channel.join();

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

const sessionChannel = channel;

export default sessionChannel;
