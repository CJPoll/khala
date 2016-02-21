import React from 'react';

import Layout from 'layout';
import GlobalStyles from 'global';

const Khala = React.createClass({
	render() {
		return (
			<Layout style={GlobalStyles}>
				{this.props.children}
			</Layout>
		);
	}
});

export default Khala;
