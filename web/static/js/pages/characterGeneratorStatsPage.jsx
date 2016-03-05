import React from 'react';
import Reflux from 'reflux';
import Row from 'row';
import NumberSelector from 'numberSelector';
import CharacterGeneratorActions from 'characterGeneratorActions';
import CharacterGeneratorStore from 'characterGeneratorStore';
import PointsRemaining from 'pointsRemaining';

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

	renderStats() {
		const statElements = [];
		const stats = this.state.stats;

		stats.forEach((label, stat) => {
			statElements.push (
				<div style={{width: '50%', float: 'left'}}>
					<NumberSelector property={label} label={label} value={stat} onClickUp={this.onClickUp} onClickDown={this.onClickDown} />
				</div>
			);
		});

		return statElements;
	},

	render() {
		return (
			<div>
				<Row>
					<PointsRemaining value={this.state.stats.pointsRemaining()} />
				</Row>
				<Row>
					{this.renderStats()}
					</Row>
				<Row>
				</Row>
			</div>
		);
	}
});

export default CharacterGeneratorStatsPage;

