const electron = require('electron')
const pkg = require('../../package.json')

import React from 'react'
import Tooltip from 'react-tooltip'

import ChannelBar from '../components/ChannelBar'
import MessageView from '../views/MessageView'

import {Paper} from 'material-ui'

var AppView = React.createClass({

	componentDidMount: function() {
		var self = this

		electron.ipcRenderer.send('renderer:load', {})
		mixpanel.register({
			version: pkg.version
		})
		mixpanel.track('Launched the app')

		electron.ipcRenderer.on('data:change:channels:joined', function(event, data) {
			self.setState({
				channelsJoined: data.newValue
			})
		})
	},

	getInitialState: function() {
		return {
			activeChannel: null,
			channelsJoined: []
		}
	},

	render: function() {
		return (
			<div>
				<div className="titlebar"></div>
				<div className="app flex-horizontal">
					<ChannelBar channels={this.state.channelsJoined} setActiveChannel={this.setActiveChannel} />
					<MessageView activeChannel={this.state.activeChannel} />
					<Tooltip />
				</div>
			</div>
		)
	},

	setActiveChannel: function(channel) {
		if(this.state.activeChannel != channel) {
			mixpanel.track('Switched active channel', {
				channel: channel
			})
			this.setState({
				activeChannel: channel
			})
		}
	}
})

export default AppView
