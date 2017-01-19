const electron = require('electron')

import React from 'react'

import {FontIcon} from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

var AppBar = React.createClass({
	render: function() {
		return (
			<Toolbar>
				<ToolbarGroup firstChild={true}>
					<ToolbarTitle text={this.props.title} style={{paddingLeft: '15px', fontWeight: 400}}/>
				</ToolbarGroup>
				<ToolbarGroup>
					<FontIcon onClick={this.windowMinimize} className="material-icons" style={{paddingLeft: '12px'}}>remove</FontIcon>
					<FontIcon onClick={this.windowMaximize} className="material-icons" style={{paddingLeft: '12px'}}>crop_square</FontIcon>
					<FontIcon onClick={this.windowClose} className="material-icons" style={{paddingLeft: '12px'}}>clear</FontIcon>
				</ToolbarGroup>
			</Toolbar>
		)
	},

	windowClose: function() {
		electron.remote.BrowserWindow.getFocusedWindow().close()
	}, 

	windowMaximize: function() {
		var focusedWindow = electron.remote.BrowserWindow.getFocusedWindow()
		
		if(focusedWindow.isMaximized()) {
			focusedWindow.unmaximize()
		} else {
			focusedWindow.maximize()
		}
	},

	windowMinimize: function() {
		electron.remote.BrowserWindow.getFocusedWindow().minimize()
	}
})

export default AppBar