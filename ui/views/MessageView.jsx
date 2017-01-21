const electron = require('electron')

import React from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ResizableBox from 'react-resizable-box'

import AppBar from '../components/AppBar'
import Message from '../components/Message'
import UserList from '../components/UserList'

var messageListener

var MessageView = React.createClass({
	componentWillReceiveProps: function(props) {
		var self = this
		console.log('MessageView::componentWillReceiveProps')

		console.log('new channel:' + props.activeChannel)

		if(messageListener) {
			electron.ipcRenderer.removeListener('data:change:messages:' + this.props.activeChannel, messageListener)
		}

		messageListener = function(event, data) {
			var content = document.querySelector('.messages-content')

			self.setState({
				messages: data.newValue
			})

			content.scrollTop = content.scrollHeight
		}

		electron.ipcRenderer.on('data:change:messages:' + props.activeChannel, messageListener)

		electron.ipcRenderer.send('data:request', {
			key: 'messages:' + props.activeChannel
		})

	},

	embedResizeStart: function() {
		mixpanel.track('Tweaked the embed height')
		document.querySelector('.messages-embed-overlay').style.display = 'block'
	},

	embedResizeStop: function() {
		document.querySelector('.messages-embed-overlay').style.display = 'none'
	},

	getInitialState: function() {
		return {
			messages: [],
			messageListener: null
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
									<ReactCSSTransitionGroup transitionName="fade-no" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
										<For each="message" of={this.state.messages.slice(this.state.messages.length - 50, this.state.messages.length)}>
											<Message type={message.type} userstate={message.userstate} message={message.message} key={message.userstate.id} />
										</For>
									</ReactCSSTransitionGroup>
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
