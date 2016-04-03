import React from 'react';
import Reflux from 'reflux';

import GameSessionStore from 'gameSessionStore';
import ChooseCharacterPage from 'chooseCharacterPage';
import NewSessionPage from 'newSessionPage';

import requireLogin from 'requireLogin';

const SessionPage = React.createClass({
	mixins: [
		requireLogin,
		Reflux.connect(GameSessionStore, 'sessionState')
	],

	render() {
		if (!this.state.sessionState.isUnjoined()) {
			return <ChooseCharacterPage {...this.props} />;
		}
		return <NewSessionPage />;
	}
});

export default SessionPage;
