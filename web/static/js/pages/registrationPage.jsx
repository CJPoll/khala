import React from 'react';
import RegistrationForm from 'registrationForm';
import HeadingStyles from 'headings';

const RegistrationPage = React.createClass({
	render() {
		return (
			<div>
				<h2 style={HeadingStyles}> Register </h2>
				<RegistrationForm />
			</div>
		);
	}
});

export default RegistrationPage;

