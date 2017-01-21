// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const isDev = /[\\/]electron[\\/]/.test(process.execPath)
const remote = require('electron').remote
const Menu = remote.Menu
const MenuItem = remote.MenuItem

var rightClickPosition = null

const menu = new Menu()
const menuItem = new MenuItem({
	label: 'Inspect Element',
	click: function() {
		remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
	}
})
menu.append(menuItem)

window.addEventListener('contextmenu', function(event) {
	event.preventDefault()
	rightClickPosition = {
		x: event.x,
		y: event.y
	}
	menu.popup(remote.getCurrentWindow())
}, false)

if(isDev) {
	var electronDevToolsInstaller = require('electron-devtools-installer')
	electronDevToolsInstaller.default(electronDevToolsInstaller.REACT_DEVELOPER_TOOLS).then(function(name) {
		console.log('Loaded something: ', name)
	}).catch(function(err) {
		console.log('Error loading something: ', err)
	})
}
