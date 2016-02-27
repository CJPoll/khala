import React from 'react';
import Input from 'input';
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
					<Input
						type="text"
						id="login_email"
						floatingLabelText="Email"
						hintText="your_email@gmail.com" />
				</div>
				<div>
					<Input
						type="password"
						floatingLabelText="Password"
						id="login_password"
						hintText="Password" />
				</div>
				<div>
					<RaisedButton label="Login" primary={true} onClick={this.handleLogin} />
				</div>
			</form>
		);
	}
});

export default LoginForm;
