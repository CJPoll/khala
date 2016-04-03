import React from 'react';
import Reflux from 'reflux';

import GameSessionStore from 'gameSessionStore';
import ChooseCharacterPage from 'chooseCharacterPage';
import NewSessionPage from 'newSessionPage';
import GameSessionLobbyPage from 'gameSessionLobbyPage';

import requireLogin from 'requireLogin';

const SessionPage = React.createClass({
	mixins: [
		requireLogin,
		Reflux.connect(GameSessionStore, 'sessionState')
	],

	render() {
		const session = this.state.sessionState;

		if (session.isChoosingCharacter()) {
			return <ChooseCharacterPage {...this.props} />;
		} else if (session.isInLobby()) {
			return <GameSessionLobbyPage gameSession={session} />;
		}
		return <NewSessionPage />;
	}
});

export default SessionPage;
