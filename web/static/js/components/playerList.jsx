import React from 'react';
import _ from 'lodash';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const PlayerList = React.createClass({
	renderPlayers(players) {
		return _.map(players, player => <ListItem key={"player_" + player.id}>{player.name}</ListItem>)
	},

	render() {
		const players = this.props.players;
		return (
			<List>
				{this.renderPlayers(players)}
			</List>
		);
	}
});

export default PlayerList;

