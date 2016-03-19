import URL from 'url';
import axios from 'axios';
import _ from 'lodash';
import SessionStore from 'sessionStore';

const Character = {
	build(fullName, nickname, stats) {
		stats = _.mapKeys(stats, function(value, key) {
			return key.toLowerCase();
		});

		const character = {
			full_name: fullName,
			nickname: nickname
		};

		const token = SessionStore.token();

		return {
			character: _.merge(character, stats),
			token: token
		};
	},

	create(character) {
		return axios.post(URL.character.create, character);
	}
};

export default Character;
