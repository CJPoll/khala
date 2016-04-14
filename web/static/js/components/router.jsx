import React from 'react';

import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Khala from 'khala';

import RegistrationPage from 'registrationPage';
import DashboardPage from 'dashboardPage';
import CharacterGeneratorPage from 'characterGeneratorPage';
import CharacterIndexPage from 'characterIndexPage';
import SessionPage from 'sessionPage';
import NewCampaignPage from 'newCampaignPage';
import CampaignIndexPage from 'campaignIndexPage';
import ShowCampaignPage from 'showCampaignPage';

const KhalaRouter = React.createClass({
	render() {
		return(
			<Router history={browserHistory}>
				<Route path="/" component={Khala}>
					<IndexRoute component={RegistrationPage} />
					<Route path="/dashboard" component={DashboardPage} />
					<Route path="/chargen" component={CharacterGeneratorPage} />
					<Route path="/characters" component={CharacterIndexPage} />
					<Route path="/campaigns/:campaignId/session" component={SessionPage} />
					<Route path="/campaigns" component={CampaignIndexPage} />
					<Route path="/campaigns/new" component={NewCampaignPage} />
					<Route path="/campaigns/:campaignId" component={ShowCampaignPage} />
				</Route>
			</Router>
		);
	}
});

export default KhalaRouter;
