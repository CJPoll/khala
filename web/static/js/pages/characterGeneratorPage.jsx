import React from 'react';
import CharacterGeneratorSteps from 'characterGeneratorSteps';
import requireLogin from 'requireLogin';

const CharacterGeneratorPage = React.createClass({
	mixins: [requireLogin],

	render() {
		return (
			<div>
				<CharacterGeneratorSteps />
			</div>
		);
	}
});

export default CharacterGeneratorPage;

