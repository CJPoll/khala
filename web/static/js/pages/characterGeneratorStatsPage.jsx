import React from 'react';
import Reflux from 'reflux';
import AbilityList from 'abilityList';
import Row from 'row';
import NumberSelector from 'numberSelector';
import CharacterGeneratorActions from 'characterGeneratorActions';
import CharacterGeneratorStore from 'characterGeneratorStore';
import PointsRemaining from 'pointsRemaining';
import PointTotal from 'pointTotal';
import CharacterGeneratorSubmit from 'characterGeneratorSubmit';

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
				<Row>
					<div style={{width: '33%', float: 'left', paddingTop: '20px'}}>
						<AbilityList label="Strong" listItems={stats.compositeStats.strengths()} />
					</div>
					<div style={{width: '33%', float: 'left', paddingTop: '20px'}}>
						<AbilityList label="Mid" listItems={stats.compositeStats.mids()} />
					</div>
					<div style={{width: '33%', float: 'left', paddingTop: '20px'}}>
						<AbilityList label="Weak" listItems={stats.compositeStats.weaknesses()} />
					</div>
				</Row>
				<Row>
					<CharacterGeneratorSubmit />
				</Row>
			</div>
		);
	}
});

export default CharacterGeneratorStatsPage;

