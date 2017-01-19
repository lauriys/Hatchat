const electron = require('electron')

import React from 'react'

import Modal from 'react-modal'

import ChannelIcon from './ChannelIcon'

var ChannelBar = React.createClass({

	closeJoinModal: function() {
		this.setState({
			isJoinModalOpen: false
		})
	},

	getInitialState: function() {
		return {
			isJoinModalOpen: false
		}		
	},

	handleJoinModalKeyPress: function(event) {
		if(event.key == 'Enter') {
			this.joinChannel()
		}
	},

	joinChannel: function() {
		electron.ipcRenderer.send('channel:join', {
			channel: document.querySelector('#modal-join-channel').value
		})

		this.closeJoinModal()
	},

	openJoinModal: function() {
		this.setState({
			isJoinModalOpen: true
		})
	},

	render: function() {
		return (
			<div className="channels-wrapper flex-vertical">
				<div className="channels">
					<div className="channels-whispers">
						<i className="fa fa-comments fa-2x"></i>
					</div>
					<div className="channels-text">
						AYY LMAO
					</div>
					
					<div className="channels-separator"></div>

					<For each="channel" of={this.props.channels}>
						<ChannelIcon key={channel} setActiveChannel={() => {this.props.setActiveChannel(channel)}} channel={channel} />
					</For>


					<div onClick={this.openJoinModal} className="channels-join">
						<i className="fa fa-plus"></i>
					</div>



				</div>
				<Modal isOpen={this.state.isJoinModalOpen} style={{content: { height: '200px', width: '400px'}}} closeTimeoutMS={500} contentLabel="Test Modal" className="modal-content" overlayClassName="modal-overlay">
					<div className="modal-title">
						Join Channel
					</div>

					<div className="modal-padding">

						<label htmlFor="channel">Channel name:</label>
						<input id="modal-join-channel" name="channel" type="text" onKeyPress={this.handleJoinModalKeyPress} autoFocus></input>

						<div className="modal-buttons">
							<a className="button" onClick={this.closeJoinModal}>Cancel</a>
							<a className="button button-primary" onClick={this.joinChannel}>Join</a>
						</div>
					</div>

				</Modal>
			</div>
		)
	}
})

export default ChannelBar