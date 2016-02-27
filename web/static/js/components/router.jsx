import React from 'react';

import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Khala from 'khala';

import RegistrationPage from 'registrationPage';
import DashboardPage from 'dashboardPage';
import CharacterGeneratorPage from 'characterGeneratorPage';

const KhalaRouter = React.createClass({
	render() {
		return(
			<Router history={browserHistory}>
				<Route path="/" component={Khala}>
					<IndexRoute component={RegistrationPage} />
					<Route path="/dashboard" component={DashboardPage} />
					<Route path="/chargen" component={CharacterGeneratorPage} />
				</Route>
			</Router>
		);
	}
});

export default KhalaRouter;
