import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Row from 'row';
import ButtonStyles from 'buttonStyles';
import UserActions from 'userActions';

const RegistrationForm = React.createClass({
	handleRegistration() {
		const name = document.getElementById('registration_name').value;
		const email = document.getElementById('registration_email').value;
		const password = document.getElementById('registration_password').value;
		const passwordConfirmation = document.getElementById('registration_password_confirmation').value;

		UserActions.register(name, email, password, passwordConfirmation);
	},

	render() {
		return (
			<form>
				<Row>
					<TextField
						id="registration_name"
						floatingLabelText="Screen Name"
						hintText="What you want to be seen as"
						style={{width: '100%'}} />
				</Row>
				<Row>
					<TextField
						id="registration_email"
						floatingLabelText="Email"
						hintText="FluphyKityz@gmail.com"
						style={{width: '100%'}} />
				</Row>
				<Row>
					<TextField
						id="registration_password"
						floatingLabelText="Password"
						type="password"
						style={{width: '100%'}} />
				</Row>
				<Row>
					<TextField
						id="registration_password_confirmation"
						floatingLabelText="Password Confirmation"
						type="password"
						style={{width: '100%'}} />
				</Row>
				<Row>
					<RaisedButton label="Register" primary={true} style={ButtonStyles.submit} onClick={this.handleRegistration}/>
				</Row>
			</form>
		);
	}
});

export default RegistrationForm;

