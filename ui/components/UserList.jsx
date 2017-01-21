const electron = require('electron')

import React from 'react'
import superagent from 'superagent'

import {List, ListItem} from 'material-ui/List'
import {RefreshIndicator, Subheader} from 'material-ui'

import UserListGroup from './UserListGroup'

var userlistListener = null

var UserList = React.createClass({
	componentDidMount: function() {
		this.initListener(this.props.username)
	},

	componentWillReceiveProps: function(props) {
		var self = this
		
		if(this.props.username != props.username) {
			if(userlistListener) {
				electron.ipcRenderer.removeListener('data:change:chatters:' + this.props.username, userlistListener)
			}
			this.initListener(props.username)
		}
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

	initListener: function(username) {
		var self = this

		userlistListener = function(event, data) {
			self.setState({
				chatters: data.newValue,
				loading: false
			})
		}

		electron.ipcRenderer.on('data:change:chatters:' + username, userlistListener)
		electron.ipcRenderer.send('data:request', {
			key: 'chatters:' + username
		})
	},

	render: function() {
		return (
			<div className="userlist-wrapper flex-vertical">
				<If condition={this.state.loading}>
					<RefreshIndicator size={32} left={10} top={10} status="loading" style={{ margin: '0 auto', position: 'relative' }} />
				</If>
				<If condition={!this.state.loading}>
					<List className="userlist">

						<UserListGroup title="Staff" users={this.state.chatters.staff} innerDivStyle={{padding: '12px 16px 10px 48px'}} avatarSize={24} />
						<UserListGroup title="Admins" users={this.state.chatters.admins} innerDivStyle={{padding: '12px 16px 10px 48px'}} avatarSize={24} />
						<UserListGroup title="Global Moderators" users={this.state.chatters.global_mods} innerDivStyle={{padding: '12px 16px 10px 48px'}} avatarSize={24} />
						<UserListGroup title="Moderators" users={this.state.chatters.moderators} innerDivStyle={{padding: '12px 16px 10px 48px'}} avatarSize={24} />
						<UserListGroup title="Viewers" users={this.state.chatters.viewers} innerDivStyle={{padding: '4px 16px 4px 16px'}} maxVisible={1000} />

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
