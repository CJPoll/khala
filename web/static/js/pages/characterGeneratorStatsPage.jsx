import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import Row from 'row';
import NumberSelector from 'numberSelector';
import CharacterGeneratorActions from 'characterGeneratorActions';
import CharacterGeneratorStore from 'characterGeneratorStore';

const CharacterGeneratorStatsPage = React.createClass({

	mixins: [
		Reflux.listenTo(CharacterGeneratorStore, 'onCharacterChange')
	],

	getInitialState() {
		return CharacterGeneratorStore.state;
	},

	onCharacterChange(character) {
		this.setState(character);
	},

	onClickUp(stat) {
		CharacterGeneratorActions.increaseStat(stat);
	},

	onClickDown(stat) {
		CharacterGeneratorActions.decreaseStat(stat);
	},

	renderStats(stats) {
		let statElements = [];

		_.forOwn(stats, (stat, label) => {
			statElements.push (
				<div style={{width: '50%', float: 'left'}}>
					<NumberSelector property={label} label={label} value={stat} onClickUp={this.onClickUp} onClickDown={this.onClickDown} />
				</div>
			);
		});

		return statElements;
	},

	render() {
		const stats = this.state.stats;

		return (
			<div>
				<Row>
					{this.renderStats(stats)}
					</Row>
				<Row>
				</Row>
			</div>
		);
	}
});

export default CharacterGeneratorStatsPage;

