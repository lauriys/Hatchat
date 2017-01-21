const electron = require('electron')

import React from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Message from './Message'

var messageListener

var Messages = React.createClass({
	componentDidMount: function() {
		this.initListener(this.props.username)
	},

	componentWillReceiveProps: function(props) {
		var self = this

		if(this.props.username != props.username) {
			if(messageListener) {
				electron.ipcRenderer.removeListener('data:change:messages:' + this.props.username, messageListener)
			}
			this.initListener(props.username)
		}
	},

	initListener: function(username) {
		var self = this

		messageListener = function(event, data) {
			var content = document.querySelector('.messages-content')

			self.setState({
				messages: data.newValue
			})

			content.scrollTop = content.scrollHeight
		}

		electron.ipcRenderer.on('data:change:messages:' + username, messageListener)

		electron.ipcRenderer.send('data:request', {
			key: 'messages:' + username
		})

	},

	getInitialState: function() {
		return {
			messages: []
		}
	},

	render: function() {
		return (
			<div className="messages-content">
				<ReactCSSTransitionGroup transitionName="fade-no" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<For each="message" of={this.state.messages.slice(this.state.messages.length - 50, this.state.messages.length)}>
						<Message type={message.type} userstate={message.userstate} message={message.message} key={message.userstate.id} />
					</For>
				</ReactCSSTransitionGroup>
			</div>
		)
	}
})

export default Messages
