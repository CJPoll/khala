import React from 'react';

import GameSessionActions from 'gameSessionActions';
import NavigationActions from 'navigationActions';
import RaisedButton from 'material-ui/lib/raised-button';
import URL from 'url';

const JoinSessionButton = React.createClass({
	joinSession(campaign) {
		GameSessionActions.joinSession(campaign.id);
		const sessionUrl = URL.page.sessionFor(campaign.id)
		console.log(sessionUrl);
		NavigationActions.changeUrl(sessionUrl);
	},

	render() {
		const campaign = this.props.campaign;
		return (
			<RaisedButton label="Join Session" primary={true} onClick={this.joinSession.bind(this, campaign)}/>
		);
	}
});

export default JoinSessionButton;

