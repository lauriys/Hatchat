import React from 'react'
import superagent from 'superagent'

var UserList = React.createClass({

	componentDidMount: function() {
		var self = this
		superagent.get('https://tmi.twitch.tv/group/user/' + this.props.username + '/chatters').end(function(err, res) {
			self.setState({
				chatters: res.body.chatters,
				loading: false
			})
		})
	},

	getInitialState: function() {
		return {
			chatters: {
				admins: [],
				global_mods: [],
				moderators: [],
				staff: [],
				viewers: []
			},
			loading: true
		}
	},

	render: function() {
		return (
			<div className="userlist-wrapper flex-vertical">
				<div className="userlist">
					<If condition={this.state.loading}>
						<small>Loading...</small>
					</If>
					<If condition={!this.state.loading}>
						<If condition={this.state.chatters.moderators.length}>
							<div className="userlist-category">MODERATORS - {this.state.chatters.moderators.length}</div>
						</If>
						<For each="moderator" of={this.state.chatters.moderators}>
							<div className="userlist-user">
								<div className="userlist-user-avatar">

								</div>
								<div className="userlist-user-name">
									{moderator}
								</div>
							</div>
						</For>

						<If condition={this.state.chatters.viewers.length}>
							<div className="userlist-category">VIEWERS - {this.state.chatters.viewers.length}</div>
						</If>
						<For each="viewer" of={this.state.chatters.viewers}>
							<div className="userlist-user">
								<div className="userlist-user-avatar">
									
								</div>
								<div className="userlist-user-name">
									{viewer}
								</div>
							</div>
						</For>
					</If>
				</div>
			</div>
		)
	}
})

export default UserList