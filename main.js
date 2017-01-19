if(require('electron-squirrel-startup')) return

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let Hatchat = {}
global.Hatchat = Hatchat

if(handleSquirrelEvent()) return

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

app.on('ready', function() {
	createWindow()
})

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

function handleSquirrelEvent() {
	console.log('handleSquirrelEvent')
	console.log(process.argv)

	if(process.argv.length === 1) {
		return false
	}

	const childProcess = require('child_process')
	const path = require('path')

	const appFolder = path.resolve(process.execPath, '..')
	const rootAtomFolder = path.resolve(appFolder, '..')
	const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'))
	const exeName = path.basename(process.execPath)

	const spawn = function(command, args) {
		let spawnedProcess, error

		try {
			spawnedProcess = childProcess.spawn(command, args, {detached: true})
		} catch(error) {}

		return spawnedProcess
	}

	const spawnUpdate = function(args) {
		return spawn(updateDotExe, args)
	}

	const squirrelEvent = process.argv[1]
	console.log('squirrelEvent is ' + squirrelEvent)

	switch(squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':
			spawnUpdate(['--createShortcut', exeName])

			setTimeout(app.quit, 1000)
			return true

		case '--squirrel-uninstall':
			spawnUpdate(['--removeShortcut', exeName])

			setTimeout(app.quit, 1000)
			return true

		case '--squirrel-obsolete':
			app.quit()
			return true
	}

	return false

}