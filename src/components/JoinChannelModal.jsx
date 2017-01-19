const electron = require('electron')

import React from 'react'

import {Dialog, FlatButton, RaisedButton, TextField} from 'material-ui'

var JoinChannelModal = React.createClass({
	getInitialState: function() {
		return {
			joinModalChannelName: null
		}
	},

	handleJoinModalChange: function(event, value) {
		this.setState({
			joinModalChannelName: value
		})
	},

	handleJoinModalKeyPress: function(event) {
		if(event.key == 'Enter') {
			this.joinChannel()
		}
	},

	joinChannel: function() {
		var self = this

		electron.ipcRenderer.send('channel:join', {
			channel: self.state.joinModalChannelName
		})

		this.setState({
			joinModalChannelName: null
		})

		this.props.closeModal()
	},

	render: function() {
		return (
			<Dialog title="Join Channel" modal={true} open={this.props.open} contentStyle={{width: '325px'}} actions={[
				<FlatButton onTouchTap={this.props.closeModal} label="Cancel" />,
				<FlatButton onTouchTap={this.joinChannel} label="Join" primary={true} />
			]}>
				<TextField floatingLabelText="Channel name" onChange={this.handleJoinModalChange} onKeyPress={this.handleJoinModalKeyPress} autoFocus />
			</Dialog>
		)
	}
})

export default JoinChannelModal