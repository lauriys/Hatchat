const tmi = require('tmi.js')

var TMI = {
	client: null,
	chattersChanged: {},

	checkChattersChanged: function() {
		var self = this

		for(var i = 0; i < Object.keys(this.chattersChanged).length; i++) {
			var channel = Object.keys(this.chattersChanged)[i]
			var chatters = Hatchat.Data.get('chatters:' + channel)
			var changed = this.chattersChanged[channel]
			var sendChatters = false

			if(changed.joined.length > 0) {
				changed.joined.forEach(function(username) {
					if(!self.isInChatters(chatters, username)) {
						chatters.viewers.push(username)
					}
				})
				sendChatters = true
				changed.joined = []
			}

			if(changed.left.length > 0) {
				changed.left.forEach(function(username) {
					var category = self.getChatterCategory(chatters, username)
					if(category) {
						chatters[category].splice(chatters[category].indexOf(username), 1)
					}
				})
				sendChatters = true
				changed.left = []
			}

			if(sendChatters) Hatchat.Data.send('chatters:' + channel)
		}
	},

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

		this.client = new tmi.client({
			channels: []
		})

		this.client.connect()

		this.client.on('chat', function(channel, userstate, message, myself) {
			Hatchat.Data.push('messages:' + channel.replace('#', ''), {
				userstate: userstate,
				message: message,
				type: 'twitch'
			})
		})

		this.client.on('connected', function(address, port) {
			console.log(address + ':' + port)
			setInterval(self.checkChattersChanged.bind(self), 1000)
		})

		this.client.on('join', function(channel, username, myself) {
			var channel = channel.replace('#', '')

			if(myself) {
				Hatchat.Data.push('channels:joined', channel)

				self.chattersChanged[channel] = {
					joined: [],
					left: []
				}

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
				self.chattersChanged[channel].joined.push(username)
			}
		})

		this.client.on('part', function(channel, username, myself) {
			var channel = channel.replace('#', '')
			self.chattersChanged[channel].left.push(username)
		})

	},

	join: function(channel) {
		this.client.join(channel)
	}
}


module.exports = TMI
