import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import Khala from 'khala';

window.jquery = $;
window.jQuery = $;
window.$ = $;

$(document).ready(() => {
	const appDiv = document.getElementById('application');

	ReactDOM.render(
		React.createElement(Khala),
		appDiv
	);
});
