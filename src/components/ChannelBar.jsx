import React from 'react'

import Modal from 'react-modal'

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
						AYY LMAO
					</div>
					
					<div className="channels-separator"></div>


					<div className="channels-channel" style={{backgroundImage: "url('https://static-cdn.jtvnw.net/jtv_user_pictures/chaway-profile_image-46d2ea8ecd80ef36-300x300.png')", backgroundSize: '48px'}}></div>

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
						<input name="channel" type="text" autoFocus></input>

						<div className="modal-buttons">
							<a className="button" onClick={this.closeJoinModal}>Cancel</a>
							<a className="button button-primary" onClick={this.closeJoinModal}>Join</a>
						</div>
					</div>

				</Modal>
			</div>
		)
	}
})

export default ChannelBar