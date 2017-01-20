import React from 'react'

var Message = React.createClass({
	render: function() {
		return (
			<Choose>
				<When condition={this.props.type == 'twitch'}>
					<div className="message message-twitch">
						<div className="message-avatar" style={{backgroundColor: this.props.userstate.color ? this.props.userstate.color : 'black'}}></div>
						<div className="message-content">
							<b style={{color: this.props.userstate.color ? this.props.userstate.color : 'black'}}>{this.props.userstate['display-name'] ? this.props.userstate['display-name'] : this.props.userstate.username}</b>: {this.props.message}
						</div>
					</div>
				</When>
				<When condition={this.props.type == 'hatchat'}>
					<div className="message message-hatchat">
						<div className="message-content">
							{this.props.message}
						</div>
					</div>
				</When>
			</Choose>
		)
	}
})

export default Message