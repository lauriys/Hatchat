import React from 'react'
import superagent from 'superagent'

import {List, ListItem} from 'material-ui/List'
import {Avatar, RefreshIndicator, Subheader} from 'material-ui'

import ActionGrade from 'material-ui/svg-icons/action/grade'

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
				<If condition={this.state.loading}>
					<RefreshIndicator size={32} left={10} top={10} status="loading" style={{ margin: '0 auto', position: 'relative' }} />
				</If>
				<If condition={!this.state.loading}>
					<List className="userlist">
						<If condition={this.state.chatters.moderators.length}>
							<Subheader>Moderators - {this.state.chatters.moderators.length}</Subheader>
						
							<For each="moderator" of={this.state.chatters.moderators}>
								<ListItem innerDivStyle={{padding: '10px 16px 10px 48px'}} leftAvatar={<Avatar size={24} />} primaryText={moderator} />
							</For>
						</If>

						<If condition={this.state.chatters.viewers.length}>
							<Subheader>Viewers - {this.state.chatters.viewers.length}</Subheader>
						
							<For each="viewer" of={this.state.chatters.viewers}>
								<ListItem innerDivStyle={{padding: '4px 16px 4px 16px'}} primaryText={viewer} />
							</For>
						</If>

					</List>
				</If>

			</div>
		)
	}
})

export default UserList

// <div className="userlist">
// 	<If condition={this.state.loading}>
// 		<small>Loading...</small>
// 	</If>
// 	<If condition={!this.state.loading}>
		// <If condition={this.state.chatters.moderators.length}>
		// 	<div className="userlist-category">MODERATORS - {this.state.chatters.moderators.length}</div>
		// </If>
// 		<For each="moderator" of={this.state.chatters.moderators}>
// 			<div className="userlist-user">
// 				<div className="userlist-user-avatar">

// 				</div>
// 				<div className="userlist-user-name">
// 					{moderator}
// 				</div>
// 			</div>
// 		</For>

// 		<If condition={this.state.chatters.viewers.length}>
// 			<div className="userlist-category">VIEWERS - {this.state.chatters.viewers.length}</div>
// 		</If>

// 		<Choose>
// 			<When condition={this.state.chatters.viewers.length < 1000}>
// 				<For each="viewer" of={this.state.chatters.viewers}>
// 					<div className="userlist-user">
// 						<div className="userlist-user-avatar">
							
// 						</div>
// 						<div className="userlist-user-name">
// 							{viewer}
// 						</div>
// 					</div>
// 				</For>
// 			</When>
// 			<Otherwise>
// 				that's a log of lag by the way
// 			</Otherwise>
// 		</Choose>
// 	</If>
// </div>