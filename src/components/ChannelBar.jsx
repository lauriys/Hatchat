const electron = require('electron')
const pkg = require('../../package.json')

import React from 'react'

import Modal from 'react-modal'
import {RaisedButton, TextField} from 'material-ui'

import ChannelIcon from './ChannelIcon'
import JoinChannelModal from './JoinChannelModal'

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
						v{pkg.version}
					</div>
					
					<div className="channels-separator"></div>

					<For each="channel" of={this.props.channels}>
						<ChannelIcon key={channel} setActiveChannel={() => {this.props.setActiveChannel(channel)}} channel={channel} />
					</For>


					<div onClick={this.openJoinModal} className="channels-join">
						<i className="fa fa-plus"></i>
					</div>



				</div>

				<JoinChannelModal open={this.state.isJoinModalOpen} closeModal={this.closeJoinModal} />
			</div>
		)
	}
})

export default ChannelBar