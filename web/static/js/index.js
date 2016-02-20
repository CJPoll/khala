import React from 'react';
import ReactDOM from 'react-dom';

import KhalaRouter from 'router';
import SessionStore from 'sessionStore';

document.addEventListener("DOMContentLoaded", function() {
	const appDiv = document.getElementById('application');

	ReactDOM.render(
		React.createElement(KhalaRouter),
		appDiv
	);
});
