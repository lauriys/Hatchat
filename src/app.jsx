require('../sass/main.scss')

import React from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'

import {cyan500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppView from './views/AppView'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#7a62d3'
	}, appBar: {
		height: 64
	}
})

console.log(cyan500)


ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<AppView />
	</MuiThemeProvider>
, document.getElementById('app'))