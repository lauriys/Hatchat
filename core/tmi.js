const tmi = require('tmi.js')


var TMI = {
	client: null,

	getChatterCategory: function(chatters, username) {
		for(var i = 0; i < Object.keys(chatters).length; i++) {
			var category = Object.keys(chatters)[i]
			if(chatters[category].indexOf(username) > -1) {
				return category
			}
		}
		return null
	},

	isInChatters: function(chatters, username) {
		return this.getChatterCategory(chatters, username) != null
	},

	init: function() {
		var self = this

		Hatchat.Data.set('channels:joined', [])

		client = new tmi.client({
			channels: []
		})

		client.connect()

		client.on('chat', function(channel, userstate, message, myself) {
			Hatchat.Data.push('messages:' + channel.replace('#', ''), {
				userstate: userstate,
				message: message,
				type: 'twitch'
			})
		})

		client.on('connected', function(address, port) {
			console.log(address + ':' + port)
		})

		client.on('join', function(channel, username, myself) {
			var channel = channel.replace('#', '')

			if(myself) {
				Hatchat.Data.push('channels:joined', channel)

				Hatchat.Data.set('chatters:' + channel, {
					admins: [],
					global_mods: [],
					moderators: [],
					staff: [],
					viewers: []
				})
				Hatchat.Data.set('messages:' + channel, [])

				Hatchat.Data.push('messages:' + channel, {
					userstate: {},
					message: 'Joined ' + channel + ' as ' + username + '.',
					type: 'hatchat'
				})

				Hatchat.Twitch.updateChatters(channel)

			} else {
				if(!self.isInChatters(Hatchat.Data.get('chatters:' + channel), username)) {
					Hatchat.Data.push('chatters:' + channel, 'viewers', username)
				}
			}
		})

		client.on('part', function(channel, username, myself) {
			var channel = channel.replace('#', '')

			if(self.isInChatters(Hatchat.Data.get('chatters:' + channel), username)) {
				Hatchat.Data.remove('chatters:' + channel, self.getChatterCategory(Hatchat.Data.get('chatters:' + channel), username), username)
			}
		})		

	},

	join: function(channel) {
		client.join(channel)
	}
}


module.exports = TMI