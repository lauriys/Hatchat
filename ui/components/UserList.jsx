const electron = require('electron')

import React from 'react'
import superagent from 'superagent'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {List, ListItem} from 'material-ui/List'
import {Avatar, RefreshIndicator, Subheader} from 'material-ui'

var userlistListener = null

var UserList = React.createClass({
	componentDidMount: function() {
		this.initListener(this.props.username)
	},

	componentWillReceiveProps: function(props) {
		console.log('UserList::componentWillReceiveProps (' + this.props.username + ' -> ' + props.username + ')')

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
			console.log('chatters here')
			console.log(data.newValue)
			console.log('chaaatters')
		}

		electron.ipcRenderer.on('data:change:chatters:' + username, userlistListener)

		console.log('data:request chatters:' + username)

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
						<ReactCSSTransitionGroup transitionName="fade-height" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
							<If condition={this.state.chatters.staff.length}>
								<Subheader>Staff - {this.state.chatters.staff.length}</Subheader>
							
								<For each="staff" of={this.state.chatters.staff.sort()}>
									<ListItem innerDivStyle={{padding: '12px 16px 10px 48px'}} leftAvatar={<Avatar size={24} />} primaryText={staff} key={staff} />
								</For>
							</If>

							<If condition={this.state.chatters.admins.length}>
								<Subheader>Admins - {this.state.chatters.admins.length}</Subheader>
							
								<For each="admin" of={this.state.chatters.admins.sort()}>
									<ListItem innerDivStyle={{padding: '12px 16px 10px 48px'}} leftAvatar={<Avatar size={24} />} primaryText={admin} key={admin} />
								</For>
							</If>

							<If condition={this.state.chatters.global_mods.length}>
								<Subheader>Global Moderators - {this.state.chatters.global_mods.length}</Subheader>
							
								<For each="global_mod" of={this.state.chatters.global_mods.sort()}>
									<ListItem innerDivStyle={{padding: '12px 16px 10px 48px'}} leftAvatar={<Avatar size={24} />} primaryText={global_mod} key={global_mod} />
								</For>
							</If>

							<If condition={this.state.chatters.moderators.length}>
								<Subheader>Moderators - {this.state.chatters.moderators.length}</Subheader>
							
								<For each="moderator" of={this.state.chatters.moderators.sort()}>
									<ListItem innerDivStyle={{padding: '12px 16px 10px 48px'}} leftAvatar={<Avatar size={24} />} primaryText={moderator} key={moderator} />
								</For>
							</If>

							<If condition={this.state.chatters.viewers.length}>
								<Subheader>Viewers - {this.state.chatters.viewers.length}</Subheader>
							
								<If condition={this.state.chatters.viewers.length < 1000}>
									<For each="viewer" of={this.state.chatters.viewers.sort()}>
										<ListItem innerDivStyle={{padding: '4px 16px 4px 16px'}} primaryText={viewer} key={viewer} />
									</For>
								</If>
							</If>
						</ReactCSSTransitionGroup>
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