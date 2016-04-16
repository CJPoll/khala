import React from 'react';
import Reflux from 'reflux';

import GameSessionStore from 'gameSessionStore';
import GameSessionActions from 'gameSessionActions';
import ChooseCharacterPage from 'chooseCharacterPage';
import NewSessionPage from 'newSessionPage';
import GameSessionLobbyPage from 'gameSessionLobbyPage';
import NavigationActions from 'navigationActions';
import URL from 'url';

import requireLogin from 'requireLogin';

const SessionPage = React.createClass({
	mixins: [
		requireLogin,
		Reflux.connect(GameSessionStore, 'sessionState')
	],

	render() {
		const session = this.state.sessionState;

		if (session.isUnjoined()) {
			const campaignId = this.props.params.campaignId;
			GameSessionActions.joinSession(campaignId);
			return <NewSessionPage />;
		} else if (session.isChoosingCharacter()) {
			return <ChooseCharacterPage {...this.props} />;
		} else if (session.isInLobby()) {
			return <GameSessionLobbyPage gameSession={session} />;
		}
		return (
			<h1> WTF kind of state are you in right now? </h1>
		);
	}
});

export default SessionPage;
