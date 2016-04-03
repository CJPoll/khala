import React from 'react';
import Reflux from 'reflux';

import GameSessionStore from 'gameSessionStore';
import GameSessionActions from 'gameSessionActions';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const ChooseCharacterPage = React.createClass({
	mixins: [Reflux.connect(GameSessionStore, 'sessionState')],

	componentWillMount() {
		if (this.state.sessionState.session === null) {
			const sessionId = this.props.params.sessionId;
			GameSessionActions.joinSession(sessionId);
		}
	},

	renderPlayers(userNames) {
		return userNames.map(player => <ListItem> {player} </ListItem>);
	},

	render() {
		return (
			<div>
				<h1> Session! </h1>
				<List>
					{this.renderPlayers(this.state.sessionState.players())}
				</List>
			</div>
		);
	}
});

export default ChooseCharacterPage;
