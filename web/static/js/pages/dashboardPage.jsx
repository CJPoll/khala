import React from 'react';
import NumberSelector from 'numberSelector';

const DashboardPage = React.createClass({
	onClickUp(property) {
		console.log(property);
	},

	onClickDown(property) {
		console.log(property);
	},

	render() {
		return (
			<div>
				<h2>Dashboard</h2>
				<div style={{width: '50%', float: 'left'}}>
					<NumberSelector property="strength" onClickUp={this.onClickUp} onClickDown={this.onClickDown} label="strength"/>
				</div>
				<div style={{width: '50%', float: 'left'}}>
					<NumberSelector property="dexterity" onClickUp={this.onClickUp} onClickDown={this.onClickDown} label="dexterity"/>
				</div>
			</div>
		);
	}
});

export default DashboardPage;

