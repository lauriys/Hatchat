var Init = function(Hatchat) {

	Hatchat.channelsJoined = {}

	Hatchat.Data = require('./data')
	Hatchat.IPC = require('./ipc')
	Hatchat.TMI = require('./tmi')

	Hatchat.IPC.init()
	Hatchat.TMI.init()

}

module.exports = Init