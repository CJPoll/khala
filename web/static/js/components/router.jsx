import React from 'react';

import { Router, Route, browserHistory } from 'react-router';
import Khala from 'khala';

const KhalaRouter = React.createClass({
	render() {
		return(
			<Router history={browserHistory}>
				<Route path="/" component={Khala}>
				</Route>
			</Router>
		);
	}
});

export default KhalaRouter;
