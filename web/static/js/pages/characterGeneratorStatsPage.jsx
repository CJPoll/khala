import React from 'react';
import Input from 'input';
import _ from 'lodash';
import Row from 'row';

const CharacterGeneratorStatsPage = React.createClass({
	getInitialState() {
		return {
			stats: [
				'Power',
				'Skill',
				'Resilience',
				'Social',
				'Physical',
				'Mental'
			]
		};
	},

	renderStat(stat) {
		return <Input
			type="number"
			style={{width: '33%'}}
			floatingLabelText={stat} />;
	},

	renderStats(stats) {
		return _.map(stats, this.renderStat);
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

