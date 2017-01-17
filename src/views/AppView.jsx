import React from 'react'

import ChannelBar from '../components/ChannelBar'
import MessageView from '../views/MessageView'

var AppView = React.createClass({
	render: function() {
		return (
			<div>
				<div className="titlebar"></div>
				<div className="app flex-horizontal">
					<ChannelBar />
					<MessageView />
				</div>
			</div>
		)
	}
})

export default AppView