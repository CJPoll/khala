import React from 'react';
import Paper from 'material-ui/lib/paper';
import ArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';

const NumberSelector = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		value: React.PropTypes.number,
		onClickUp: React.PropTypes.func,
		onClickDown: React.PropTypes.func,
		property: React.PropTypes.string
	},

	onClickUp() {
		const func = this.props.onClickUp;
		const args = Array.apply(null, arguments);
		args.unshift(this.props.property);
		if (func) {
			func.apply(null, args);
		}
	},

	onClickDown() {
		const func = this.props.onClickDown;
		const args = Array.apply(null, arguments);
		args.unshift(this.props.property);
		if (func) {
			func.apply(null, args);
		}
	},

	style: {
		padding: '10px',
		overflow: 'auto'
	},

	render() {
		return (
			<div>
				<Paper zDepth={1} style={this.style}>
					<div>
						<div style={{width: '100%', fontSize: '150%', textAlign: 'right'}}>
							{this.props.label}
						</div>
						<div style={{width: '80%', float: 'left', fontSize: '400%'}}>
							<div style={{textAlign: 'center'}}>
								9
							</div>
						</div>
						<div style={{width: '20%', float: 'left', marginTop: '10px'}}>
								<ArrowUp onClick={this.onClickUp} />
								<ArrowDown onClick={this.onClickDown} />
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default NumberSelector;

