import React from 'react';
import _ from 'lodash';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import CharacterGeneratorActions from 'characterGeneratorActions';

const CampaignSelect = React.createClass({
	getInitialState() {
		return { value: null }
	},

	renderCampaigns(campaigns) {
		return _.map(campaigns, campaign => <MenuItem value={campaign.id} primaryText={campaign.name} />)
	},

	onSelectCampaign(e, index, value) {
		CharacterGeneratorActions.chooseCampaign(value);
		this.setState({value: value});
	},

	render() {
	const campaigns = this.props.campaigns;

		return (
			<SelectField
					value={this.state.value}
					onChange={this.onSelectCampaign}
					floatingLabelText="Choose A Campaign">
				{this.renderCampaigns(campaigns)}
			</SelectField>
		);
	}
});

export default CampaignSelect;

