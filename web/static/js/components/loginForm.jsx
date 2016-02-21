import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SessionActions from 'sessionActions';

const LoginForm = React.createClass({
	handleLogin() {
		const email = document.getElementById('login_email').value;
		const password = document.getElementById('login_password').value;

		SessionActions.submitLogin(email, password);
	},

	render() {
		return (
			<form onSubmit={this.handleLogin}>
				<div>
					<TextField
						id="login_email"
						floatingLabelText="Email"
						hintText="your_email@gmail.com"
						style={{width: '100%'}}/>
				</div>
				<div>
					<TextField
						id="login_password"
						hintText="Password"
						floatingLabelText="Password"
						type="password"
						style={{width: '100%'}}/>
				</div>
				<div>
					<RaisedButton label="Login" primary={true} onClick={this.handleLogin} />
				</div>
			</form>
		);
	}
});

export default LoginForm;
