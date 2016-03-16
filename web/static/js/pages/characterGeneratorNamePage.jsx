import React from 'react';
import Input from 'input';
import CharacterGeneratorActions from 'characterGeneratorActions';

const CharacterGeneratorNamePage = React.createClass({
	changeFullName(event) {
		CharacterGeneratorActions.changeFullName(event.target.value);
	},

	changeNickName(event) {
		CharacterGeneratorActions.changeNickname(event.target.value);
	},

	render() {
		return (
			<div>
				<Input
					type="text"
					floatingLabelText="Character's Full Name"
					hintText="Sir Barrymore Goblinslayer of Mooremouthe"
					onChange={this.changeFullName} />
				<Input
					type="text"
					floatingLabelText="Character's Nickname"
					hintText="Barry"
					onChange={this.changeNickName} />
			</div>
		);
	}
});

export default CharacterGeneratorNamePage;

