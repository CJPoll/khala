import React from 'react';
import Input from 'input';

const CharacterGeneratorNamePage = React.createClass({
	render() {
		return (
			<div>
				<Input
					type="text"
					floatingLabelText="Character's Full Name"
					hintText="Sir Barrymore Goblinslayer of Mooremouthe" />
				<Input
					type="text"
					floatingLabelText="Character's Nickname"
					hintText="Barry" />
			</div>
		);
	}
});

export default CharacterGeneratorNamePage;

