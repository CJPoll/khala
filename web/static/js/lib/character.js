import URL from 'url';
import axios from 'axios';
import _ from 'lodash';

const Character = {
	build(fullName, nickname, stats) {
		stats = _.mapKeys(stats, function(value, key) {
			return key.toLowerCase();
		});

		const character = {
			full_name: fullName,
			nickname: nickname
		};

		return {character: _.merge(character, stats)};
	},

	create(character) {
		return axios.post(URL.character.create, character);
	}
};

export default Character;
