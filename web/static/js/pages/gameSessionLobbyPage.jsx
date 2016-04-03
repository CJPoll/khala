import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const GameSessionLobbyPage = React.createClass({
	renderPlayers(userNames) {
		return userNames.map(player => <ListItem> {player} </ListItem>);
	},

	render() {
		return (
			<List>
				{this.renderPlayers(this.props.gameSession.players())}
			</List>
		);
	}
});

export default GameSessionLobbyPage;

