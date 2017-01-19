const tmi = require('tmi.js')


var TMI = {
	client: null,

	init: function() {

		Hatchat.Data.set('channels:joined', [])

		client = new tmi.client({
			channels: []
		})

		client.connect()

		client.on('chat', function(channel, userstate, message, self) {
			Hatchat.Data.push('messages:' + channel.replace('#', ''), {
				userstate: userstate,
				message: message
			})

			// Hatchat.mainWindow.webContents.send('message', {
			// 	channel: channel,
			// 	userstate: userstate,
			// 	message: message
			// })
		})

		client.on('join', function(channel, username, self) {
			if(self) {
				Hatchat.Data.push('channels:joined', channel.replace('#', ''))
				Hatchat.Data.set('messages:' + channel.replace('#', ''), [])
			}
			console.log('JOIN ' + channel + ' ' + username)
			console.log(self)
		})

		client.on('connected', function(address, port) {
			console.log(address + ':' + port)
		})

	},

	join: function(channel) {
		client.join(channel)
	}
}


module.exports = TMI