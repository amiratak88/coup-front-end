import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Menu from './components/Menu'

class App extends Component {

	state = {
		// id: null
		id: 0
	}

	render() {
		return (
			<div> {/* there was className="App" here before */}
				{this.state.id ? <Board /> : <Menu />}
			</div>
		)
	}
}

export default App;