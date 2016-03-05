import axios from 'axios';
import URL from 'url';

const User = {
	create(name, email, password, passwordConfirmation) {
		return axios.post(URL.user.create, {
			user: {
				name: name,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation
			}
		});
	}
};

export default User;
