import React from 'react';
import ReactDOM from 'react-dom';

import KhalaRouter from 'router';
import SessionStore from 'sessionStore';
import NotificationStore from 'notificationStore';

window.App = {};
window.App.SessionStore = SessionStore;
window.App.NotificationStore = NotificationStore;

document.addEventListener('DOMContentLoaded', function() {
	const appDiv = document.getElementById('application');

	ReactDOM.render(
		React.createElement(KhalaRouter),
		appDiv
	);
});
