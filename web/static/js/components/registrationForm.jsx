import React from 'react';
import Input from 'input';
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
					<Input
						type="text"
						id="registration_name"
						floatingLabelText="Screen Name"
						hintText="What you want to be seen as" />
				</Row>
				<Row>
					<Input
						type="text"
						id="registration_email"
						floatingLabelText="Email"
						hintText="FluphyKityz@gmail.com" />
				</Row>
				<Row>
					<Input
						type="password"
						id="registration_password"
						floatingLabelText="Password" />
				</Row>
				<Row>
					<Input
						type="password"
						id="registration_password_confirmation"
						floatingLabelText="Password Confirmation" />
				</Row>
				<Row>
					<RaisedButton label="Register" primary={true} style={ButtonStyles.submit} onClick={this.handleRegistration}/>
				</Row>
			</form>
		);
	}
});

export default RegistrationForm;

