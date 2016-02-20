import React from 'react';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle';

import SessionActions from 'sessionActions';
import LoginForm from 'loginForm';

const LoginButton = React.createClass({
	propTypes: {
		loggingIn: React.PropTypes.bool.isRequired
	},

	getInitialState() {
		return {
			popoverAnchor: null
		};
	},

	handleClick(event) {
		this.setState({
			popoverAnchor: event.currentTarget
		});

		SessionActions.clickLogin();
	},

	render() {
		return (
			<div>
				<RaisedButton onClick={this.handleClick} label="Log In" style={{margin: 6}} icon={ <ActionAccountCircle /> } />
				<Popover
					open={this.props.loggingIn}
					anchorEl={this.state.popoverAnchor}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={SessionActions.cancelLogin}
					style={{width: '500px', maxWidth: '100%', padding: '20px'}}>
						<LoginForm/>
					</Popover>
			</div>
		);
	}
});

export default LoginButton;
