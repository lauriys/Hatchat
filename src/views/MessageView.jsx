const electron = require('electron')

import React from 'react'
import ResizableBox from 'react-resizable-box'

import AppBar from '../components/AppBar'
import UserList from '../components/UserList'

var MessageView = React.createClass({
	componentDidMount: function() {
		var self = this

		var content = document.querySelector('.messages-content')

		electron.ipcRenderer.on('message', function(event, data) {
			self.setState({
				messages: self.state.messages.concat([data])
			})
			content.scrollTop = content.scrollHeight
		})

	},

	embedResizeStart: function() {
		document.querySelector('.messages-embed-overlay').style.display = 'block'
	},

	embedResizeStop: function() {
		document.querySelector('.messages-embed-overlay').style.display = 'none'
	},

	getInitialState: function() {
		return {
			messages: []
		}
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
								
								<div className="messages-content">
									<For each="message" of={this.state.messages}>
										<div className="message">
											<div className="message-avatar" style={{backgroundColor: message.userstate.color ? message.userstate.color : 'black'}}></div>
											<div className="message-content">
												<b style={{color: message.userstate.color ? message.userstate.color : 'black'}}>{message.userstate['display-name'] ? message.userstate['display-name'] : message.userstate.username}</b>: {message.message}
											</div>
										</div>
									</For> 
								</div>
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