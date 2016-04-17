import React from 'react';
import Input from 'input';
import CharacterGeneratorActions from 'characterGeneratorActions';
import CharacterGeneratorSubmit from 'characterGeneratorSubmit';
import CampaignSelect from 'campaignSelect';
import Row from 'row';

const CharacterGeneratorNamePage = React.createClass({
	changeFullName(event) {
		CharacterGeneratorActions.changeFullName(event.target.value);
	},

	changeNickName(event) {
		CharacterGeneratorActions.changeNickname(event.target.value);
	},

	render() {
		const campaigns = this.props.campaigns;

		return (
			<div>
				<Input
					type="text"
					floatingLabelText="Character's Full Name"
					hintText="Sir Barrymore of Mooremouthe"
					onChange={this.changeFullName} />
				<Input
					type="text"
					floatingLabelText="Character's Nickname"
					hintText="Barry"
					onChange={this.changeNickName} />
				<CampaignSelect campaigns={campaigns} />
				<Row>
					<CharacterGeneratorSubmit />
				</Row>
			</div>
		);
	}
});

export default CharacterGeneratorNamePage;

