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
				mixpanel.track('Found an update')
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
					status: 'idle'
				})
				console.log('no update available')
			})

			autoUpdater.on('update-downloaded', function(event) {
				self.setState({
					status: 'downloaded'
				})
				mixpanel.track('Downloaded an update')
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

	quitAndInstall: function() {
		mixpanel.track('Quitting and installing update')
		autoUpdater.quitAndInstall()
	},

	render: function() {
		return (
			<Choose>
				<When condition={this.state.status == 'checking'}>
					<FontIcon data-tip="Checking for updates..." data-effect="solid" data-place="bottom" style={{color: '#999'}} className="material-icons fa-spin">autorenew</FontIcon>
				</When>
				<When condition={this.state.status == 'available'}>
					<FontIcon data-tip="Updating..." data-effect="solid" data-place="bottom" data-class="tooltip-orange" style={{color: '#FF9800'}} className="material-icons fa-spin">autorenew</FontIcon>
				</When>
				<When condition={this.state.status == 'downloaded'}>
					<FontIcon data-tip="Update is ready. Click to restart." data-effect="solid" data-place="bottom" data-class="tooltip-green" style={{color: '#64DD17', cursor: 'pointer'}} onClick={this.quitAndInstall} className="material-icons">autorenew</FontIcon>
				</When>

			</Choose>
		)
	}
})

export default Updater
