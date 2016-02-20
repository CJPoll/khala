import React from 'react';

import Layout from 'layout';

const Khala = React.createClass({
	render() {
		return (
			<Layout>
				{this.props.children}
			</Layout>
		);
	}
});

export default Khala;
