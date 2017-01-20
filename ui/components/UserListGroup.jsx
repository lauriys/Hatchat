import React from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {ListItem} from 'material-ui/List'
import {Avatar, Subheader} from 'material-ui'

var UserListGroup = React.createClass({

	render: function() {
		if(this.props.users.length) {
			return (
				<ReactCSSTransitionGroup transitionName="fade-height" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<Subheader>{this.props.title} - {this.props.users.length}</Subheader>

					<If condition={!this.props.maxVisible || this.props.maxVisible > this.props.users.length}>

						<For each="username" of={this.props.users.sort()}>
							<ListItem innerDivStyle={this.props.innerDivStyle} leftAvatar={(this.props.avatarSize) ? (<Avatar size={24} />) : ""} primaryText={username} key={username} />
						</For>
					</If>
				</ReactCSSTransitionGroup>
			)
		} else { return null }
	}

})

export default UserListGroup
