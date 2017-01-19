const electron = require('electron')

var Data = {
	store: {},

	get: function(key) {
		return this.store[key]
	},

	push: function(key, field, value) {
		if(value == undefined) {
			if(this.store[key] == undefined) {
				this.store[key] = []
			}
			this.store[key].push(field)
			console.log('Data.push("' + key + '", "' + field + '")')
		} else {
			if(this.store[key] == undefined) {
				this.store[key] = {}
			}

			if(this.store[key][field] == undefined) {
				this.store[key][field] = []
			}

			this.store[key][field].push(value)
			console.log('Data.push("' + key + '", "' + field + '", "' + value + '")')
		}
		
		this.send(key)
	},

	remove: function(key, field, value) {
		if(value == undefined) {
			this.store[key].splice(this.store[key].indexOf(field), 1)
			console.log('Data.remove("' + key + '", "' + field + '")')
		} else {
			this.store[key][field].splice(this.store[key][field].indexOf(value), 1)
			console.log('Data.remove("' + key + '", "' + field + '", "' + value + '")')
		}
		this.send(key)
	},

	send: function(key) {
		var self = this
		Hatchat.mainWindow.webContents.send('data:change:' + key, {
			newValue: self.store[key]
		})
		console.log('Data.send("' + key + '")')
	},

	set: function(key, value) {
		this.store[key] = value

		console.log('Data.set("' + key + '", "' + value + '")')

		this.send(key)
	}

}

module.exports = Data