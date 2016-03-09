import React from 'react';
import _ from 'lodash';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const AbilityList = React.createClass({
	renderListItems(listItems) {
		return _.map(listItems, (listItem) => <ListItem> {listItem} </ListItem>);
	},

	render() {
		return (
			<div style={{width: '33%'}}>
				<span style={{fontWeight: '150%'}}>{ this.props.label }</span>
				<List>
					{ this.renderListItems(this.props.listItems) }
				</List>
			</div>
		);
	}
});

export default AbilityList;

