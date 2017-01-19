const electron = require('electron')

var Data = {
	store: {},

	push: function(key, value) {
		var self = this

		if(this.store[key] == undefined) {
			this.store[key] = []
		}

		this.store[key].push(value)

		Hatchat.mainWindow.webContents.send('data:change:' + key, {
			newValue: self.store[key]
		})
		console.log('send data:change:' + key)
	},

	send: function(key) {
		var self = this
		Hatchat.mainWindow.webContents.send('data:change:' + key, {
			newValue: self.store[key]
		})
		console.log('send data:change:' + key)
	},

	set: function(key, value) {
		this.store[key] = value
		this.send(key)
	}

}

module.exports = Data