import React from 'react';
import Reflux from 'reflux';
import RaisedButton from 'material-ui/lib/raised-button';
import CharacterGeneratorStore from 'characterGeneratorStore';
import CharacterGeneratorActions from 'characterGeneratorActions';

const CharacterGeneratorSubmit = React.createClass({
	mixins: [
		Reflux.listenTo(CharacterGeneratorStore, 'onCharacterChange')
	],

	onClick() {
		CharacterGeneratorActions.submitCharacter();
	},

	getInitialState() {
		return CharacterGeneratorStore.state;
	},

	onCharacterChange(state) {
		this.setState(state);
	},

	render() {
		const validCharacter = this.state.validCharacter();

		return (
			<RaisedButton onClick={this.onClick} label="Submit" disabled={!validCharacter} primary={validCharacter} />
		);
	}
});

export default CharacterGeneratorSubmit;

