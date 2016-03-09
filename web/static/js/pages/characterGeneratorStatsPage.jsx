import React from 'react';
import Reflux from 'reflux';
import Row from 'row';
import NumberSelector from 'numberSelector';
import CharacterGeneratorActions from 'characterGeneratorActions';
import CharacterGeneratorStore from 'characterGeneratorStore';
import PointsRemaining from 'pointsRemaining';
import CompositeStatValue from 'compositeStatValue';
import PointTotal from 'pointTotal';

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
					<NumberSelector property={label} label={label} value={stat} onClickUp={this.onClickUp} onClickDown={this.onClickDown} key={label + '_core'}/>
				</div>
			);
		});

		return statElements;
	},

	renderCompositeStats() {
		const stats = this.state.stats;

		return stats.composites().map((compositeStat, compositeStatName) =>
			<CompositeStatValue statName={compositeStatName} statValue={compositeStat.value()} key={compositeStatName + '_composite'} />);
	},

	render() {
		const stats = this.state.stats;

		return (
			<div>
				<Row>
					<div style={{width: '50%', float: 'left'}}>
						<PointsRemaining value={stats.pointsRemaining()} />
					</div>
					<div style={{width: '50%', float: 'left', textAlign: 'right'}}>
						<PointTotal value={stats.composites().sum()} />
					</div>
				</Row>
				<Row>
					{this.renderStats()}
				</Row>
				<Row style={{marginTop: '10px', overflow: 'auto'}}>
					{this.renderCompositeStats()}
				</Row>
			</div>
		);
	}
});

export default CharacterGeneratorStatsPage;

