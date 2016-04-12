import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Row from 'row';
import CampaignsActions from 'campaignsActions';

const NewCampaignForm = React.createClass({
	onSubmit() {
		const name = document.getElementById('campaign-name').value;
		CampaignsActions.create(name);
	},

	render() {
		return (
			<div>
				<Row>
					<TextField
						hintText="Campaign Name"
						id="campaign-name"/>
				</Row>
				<Row>
					<RaisedButton
						primary={true}
						onClick={this.onSubmit}
						label="Submit" />
				</Row>
			</div>
		);
	}
});

export default NewCampaignForm;

