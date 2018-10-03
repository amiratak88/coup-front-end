import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {  ActionCableProvider } from 'react-actioncable-provider'

const APIWS = "ws://coup-server.herokuapp.com/cable"

ReactDOM.render(
	<ActionCableProvider url={APIWS}>
		<App />
	</ActionCableProvider>,
	document.getElementById('root'));
registerServiceWorker();
