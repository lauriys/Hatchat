import React from 'react'

import ResizableBox from 'react-resizable-box'

import AppBar from '../components/AppBar'
import Message from '../components/Message'
import Messages from '../components/Messages'
import UserList from '../components/UserList'

var MessageView = React.createClass({
	embedResizeStart: function() {
		mixpanel.track('Tweaked the embed height')
		document.querySelector('.messages-embed-overlay').style.display = 'block'
	},

	embedResizeStop: function() {
		document.querySelector('.messages-embed-overlay').style.display = 'none'
	},

	render: function() {
		return (
			<Choose>
				<When condition={!this.props.activeChannel}>
					<div className="messages flex-vertical">
						<AppBar title="Hatchat" />
					</div>
				</When>
				<Otherwise>
					<div className="messages flex-vertical">
						<AppBar title={this.props.activeChannel} />

						<div className="flex-horizontal">
							<div className="messages-wrapper flex-vertical">

								<ResizableBox height={400} width="100%" isResizable={{top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false}} customClass="messages-embed" onResizeStart={this.embedResizeStart} onResizeStop={this.embedResizeStop}>
									<div className="messages-embed-overlay" style={{width: "100%", height: "100%", display: "none", position: "absolute", zIndex: 9999}}></div>
									<iframe src={"http://player.twitch.tv/?channel=" + this.props.activeChannel} frameBorder="0" scrolling="no" allowFullScreen="true"></iframe>
								</ResizableBox>

								<Messages username={this.props.activeChannel} />

							</div>
							<UserList username={this.props.activeChannel} />
						</div>
					</div>
				</Otherwise>
			</Choose>
		)
	}
})

export default MessageView
