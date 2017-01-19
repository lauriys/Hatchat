const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let Hatchat = {}
global.Hatchat = Hatchat

function createWindow() {
	Hatchat.mainWindow = new BrowserWindow({width: 800, height: 600, frame: false})

	Hatchat.mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	Hatchat.mainWindow.on('closed', function () {
		mainWindow = null
	})

	require('./core/init')(Hatchat)

	// require('electron-react-devtools').inject()
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