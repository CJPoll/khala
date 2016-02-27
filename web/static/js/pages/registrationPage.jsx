import React from 'react';
import Reflux from 'reflux';
import RegistrationForm from 'registrationForm';
import HeadingStyles from 'headings';
import NavigationActions from 'navigationActions';

import SessionStore from 'sessionStore';

const RegistrationPage = React.createClass({

	mixins: [
		Reflux.listenTo(SessionStore, 'onSessionChange')
	],

	getInitialState() {
		return {
			loggedIn: SessionStore.isLoggedIn()
		};
	},

	onSessionChange(sessionState) {
		this.setState({
			loggedIn: sessionState.token !== ''
		});
	},

	render() {
		if (this.state.loggedIn) {
			NavigationActions.changeUrl('/dashboard');
		}

		return (
			<div>
				<h2 style={HeadingStyles}> Register </h2>
				<RegistrationForm />
			</div>
		);
	}
});

export default RegistrationPage;

