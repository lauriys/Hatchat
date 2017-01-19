const electron = require('electron')

var IPC = {

	init: function() {
		electron.ipcMain.on('channel:join', function(event, data) {
			Hatchat.TMI.join(data.channel)
		})

		electron.ipcMain.on('data:request', function(event, data) {
			Hatchat.Data.send(data.key)
		})

		electron.ipcMain.on('renderer:load', function(event, data) {
			Hatchat.Data.send('channels:joined')
		})
	}

}


module.exports = IPC