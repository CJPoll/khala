import React from 'react';
import MaterialTextField from 'material-ui/lib/text-field';
import _ from 'lodash';

const TextField = React.createClass({
	propTypes: {
		style: React.PropTypes.object
	},

	render() {
		const styles = _.merge({width: '100%'}, this.props.style || {});

		return (
			<MaterialTextField style={styles} {...this.props} />
		);
	}
});

export default TextField;
