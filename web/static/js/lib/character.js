import URL from 'url';
import axios from 'axios';
import _ from 'lodash';
import SessionStore from 'sessionStore';
//import CharacterModel from 'models/character';

const Character = {
	build(fullName, nickname, campaignId, stats) {
		stats = _.mapKeys(stats, function(value, key) {
			return key.toLowerCase();
		});

		const character = {
			full_name: fullName,
			nickname: nickname,
			campaign_id: campaignId
		};

		const token = SessionStore.token();

		return {
			character: _.merge(character, stats),
			token: token
		};
	},

	create(character) {
		return axios.post(URL.character.create, character);
	},

	index() {
		const token = SessionStore.token();
		return axios.get(URL.character.index, {params: {token: token}});
	}
};

export default Character;
