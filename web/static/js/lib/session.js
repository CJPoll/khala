import URL from 'url';
import axios from 'axios';

const Session = {
	create(email, password) {
		return axios.post(URL.session.create, {
			user: {
				email: email,
				password: password
			}
		});
	},

	delete(token) {
		return axios.delete(URL.session.delete, {data: {token: token}});
	}
};

export default Session;
