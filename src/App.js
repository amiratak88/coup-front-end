import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Menu from './Menu'

class App extends Component {

	login() {
		if (true /* some condition */ ) {
			return <Board/>
		} else {
			return <Menu />
		}
	}

	render() {
		return (
			<div> {/* there was className="App" here before */}
				{this.login()}
			</div>
		)
	}
}

export default App;