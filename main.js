const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const tmi = require('tmi.js')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({width: 800, height: 600, frame: false})

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	mainWindow.on('closed', function () {
		mainWindow = null
	})

	// require('electron-react-devtools').inject()

	console.log('meow')

	var client = new tmi.client({
		channels: []
	})

	client.connect()

	client.on('chat', function(channel, userstate, message, self) {
		mainWindow.webContents.send('message', {
			channel: channel,
			userstate: userstate,
			message: message
		})
	})

	client.on('join', function(channel, username, self) {
		console.log('JOIN ' + channel + ' ' + username)
	})

	client.on('connected', function(address, port) {
		console.log(address + ':' + port)
	})

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}

})