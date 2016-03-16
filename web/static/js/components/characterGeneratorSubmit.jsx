import React from 'react';
import Reflux from 'reflux';
import RaisedButton from 'material-ui/lib/raised-button';
import CharacterGeneratorStore from 'characterGeneratorStore';

const CharacterGeneratorSubmit = React.createClass({
	mixins: [
		Reflux.listenTo(CharacterGeneratorStore, 'onCharacterChange')
	],

	getInitialState() {
		return CharacterGeneratorStore.state;
	},

	onCharacterChange(state) {
		this.setState(state);
	},

	render() {
		const validCharacter = this.state.validCharacter();

		return (
			<RaisedButton label="Submit" disabled={!validCharacter} primary={validCharacter} />
		);
	}
});

export default CharacterGeneratorSubmit;

