import React from 'react';

import GameSessionActions from 'gameSessionActions';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';


const NewSessionPage = React.createClass({
	createSession() {
		GameSessionActions.createSession();
	},

	joinSession() {
		const sessionId = document.getElementById('session-id').value;
		GameSessionActions.joinSession(sessionId);
	},

	render() {
		return (
			<div>
				<div>
					<TextField hintText="Session ID" id="session-id" />
				</div> <div>
					<RaisedButton label="Join Session" secondary={true} onClick={this.joinSession}/>
				</div>
				<div style={{marginTop: '10px'}}> OR </div>
				<div>
					<RaisedButton label="Start a Session" primary={true} onClick={this.createSession} style={{marginTop: '10px'}}/>
				</div>
			</div>
		);
	}
});

export default NewSessionPage;
