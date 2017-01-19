const electron = require('electron')
const superagent = require('superagent')

var Twitch = {

	updateChatters: function(channel) {
		superagent.get('https://tmi.twitch.tv/group/user/' + channel + '/chatters').end(function(err, res) {
			Hatchat.Data.set('chatters:' + channel, res.body.chatters)
		})
	}

}

module.exports = Twitch