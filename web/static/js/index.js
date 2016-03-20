import React from 'react';
import ReactDOM from 'react-dom';

import KhalaRouter from 'router';
import SessionStore from 'sessionStore';
import NotificationStore from 'notificationStore';
import CharacterGeneratorStore from 'characterGeneratorStore';
import CharactersStore from 'charactersStore';
import GameSessionStore from 'gameSessionStore';

import socket from 'socket';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

window.App = {};
window.App.SessionStore = SessionStore;
window.App.NotificationStore = NotificationStore;
window.App.CharacterGeneratorStore = CharacterGeneratorStore;
window.App.CharactersStore = CharactersStore;
window.App.GameSessionStore = GameSessionStore;

window.App.socket = socket;

document.addEventListener('DOMContentLoaded', function() {
	const appDiv = document.getElementById('application');

	ReactDOM.render(
		React.createElement(KhalaRouter),
		appDiv
	);
});
