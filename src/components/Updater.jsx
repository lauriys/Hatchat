const pkg = require('../../package.json')
const remote = require('electron').remote

const autoUpdater = remote.autoUpdater

import React from 'react'

import {FontIcon} from 'material-ui'

var Updater = React.createClass({
	componentDidMount: function() {
		var self = this

		const isDev = /[\\/]electron[\\/]/.test(process.execPath)

		if(!isDev) {
			autoUpdater.on('update-available', function() {
				self.setState({
					status: 'available'
				})
				console.log('update available')
			})

			autoUpdater.on('checking-for-update', function() {
				self.setState({
					status: 'checking'
				})
				console.log('checking for update')
			})

			autoUpdater.on('update-not-available', function() {
				self.setState({
					status: 'nothing'
				})
				console.log('no update available')
			})

			autoUpdater.on('update-downloaded', function(event) {
				self.setState({
					status: 'downloaded'
				})
				console.log(event)
			})

			autoUpdater.setFeedURL('http://hatchat.hatsu.live/update/win32/' + pkg.version)
			setTimeout(autoUpdater.checkForUpdates, 20 * 1000)
			setInterval(autoUpdater.checkForUpdates, 60 * 1000)
		}
	},

	getInitialState: function() {
		return {
			status: 'idle'
		}
	},

	render: function() {
		return (
			<Choose>
				<When condition={this.state.status == 'checking'}>
					<FontIcon style={{color: '#999'}} className="material-icons fa-spin">autorenew</FontIcon>
				</When>
				<When condition={this.state.status == 'available'}>
					<FontIcon style={{color: 'orange'}} className="material-icons fa-spin">autorenew</FontIcon>
				</When>
				<When condition={this.state.status == 'downloaded'}>
					<FontIcon style={{color: 'green'}} onClick={autoUpdater.quitAndInstall} className="material-icons">autorenew</FontIcon>
				</When>
				<When condition={this.state.status == 'nothing'}>
					<FontIcon style={{color: 'red'}} className="material-icons">autorenew</FontIcon>
				</When>
			</Choose>
		)
	}
})

export default Updater