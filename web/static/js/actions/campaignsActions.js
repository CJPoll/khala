import Reflux from 'reflux';
import Campaign from 'campaign';

const CampaignsActions = Reflux.createActions({
	index: {},
	create: {},
	show: {},
	invite: {children: ['completed', 'failed']}
});

CampaignsActions.invite.listen(function(email, campaign) {
	Campaign.invite(email, campaign)
		.then(this.completed)
		.catch(this.failed);
})

export default CampaignsActions;
