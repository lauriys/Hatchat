import React from 'react'

var ChannelIcon = React.createClass({
	render: function() {
		return (
			<div onClick={this.props.setActiveChannel} className="channels-channel"></div>
		)
	}
})

export default ChannelIcon