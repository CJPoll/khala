import React from 'react';

import socket from 'socket';
import SessionStore from 'sessionStore';
import GameSessionActions from 'gameSessionActions';

const SessionPage = React.createClass({
	getInitialState() {
		const channel = socket.channel('sessions:lobby', {token: SessionStore.token()});
		channel.join();
		channel.on('user_joined', function(response) {
			GameSessionActions.userJoined(response.user);
		});

		channel.on('user_left', function(response) {
			GameSessionActions.userLeft(response.user);
		});

		return {
			channel: channel
		};
	},

	render() {
		return (
			<h1> Session! </h1>
		);
	}
});

export default SessionPage;

