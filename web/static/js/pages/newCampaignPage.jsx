import React from 'react';
import NewCampaignForm from 'newCampaignForm';

const NewCampaignPage = React.createClass({
	render() {
		return (
			<div>
				<h1> New Campaign </h1>
				<NewCampaignForm />
			</div>
		);
	}
});

export default NewCampaignPage;

