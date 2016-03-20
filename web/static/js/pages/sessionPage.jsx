import React from 'react';
import Reflux from 'reflux';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import GameSessionStore from 'gameSessionStore';
import GameSessionActions from 'gameSessionActions';

import RaisedButton from 'material-ui/lib/raised-button';

/**
 * @return { boolean } Whether the current URL has a sessionId. This function
 * must be bound using `.bind(this)`
 */
function urlHasSessionId() {
	return this.props.params && this.props.params.sessionId;
}

const NewSessionPage = React.createClass({
	onClick() {
		GameSessionActions.createSession();
	},

	render() {
		return <RaisedButton label="Start a Session" fullWidth={true} onClick={this.onClick}/>;
	}
});

const Session = React.createClass({
	mixins: [Reflux.connect(GameSessionStore, 'sessionState')],

	componentWillMount() {
		if (!this.state.sessionState.sessions.count() > 0) {
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
					{this.renderPlayers(this.state.sessionState.users)}
				</List>
			</div>
		);
	}
});

const SessionPage = React.createClass({
	mixins: [Reflux.connect(GameSessionStore, 'sessionState')],

	render() {
		if ((urlHasSessionId.bind(this))() || this.state.sessionState.sessions.count() > 0) {
			return <Session {...this.props} />;
		}
		return <NewSessionPage />;
	}
});

export default SessionPage;
