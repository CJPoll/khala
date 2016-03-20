import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import GameSessionStore from 'gameSessionStore';

const SessionPage = React.createClass({
	mixins: [Reflux.connect(GameSessionStore, 'players')],

	renderPlayers(userNames) {
		return userNames.map(player => <ListItem> {player} </ListItem>);
	},

	render() {
		return (
			<div>
				<h1> Session! </h1>
				<List>
					{this.renderPlayers(this.state.players.users)}
				</List>
			</div>
		);
	}
});

export default SessionPage;

