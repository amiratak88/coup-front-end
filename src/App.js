import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Menu from './components/Menu'

class App extends Component {

	state = {
		// id: null
		playerId: 0,
		game: {
			players: [],
			turnId: 0,
			targetId: 0,
			phase: "" /* declare, challenge1, block -> challenge2, resolve */ 
		}

		/* game: {
			players: [
				{id: 24, name: "Amirata", hand:[{...}, {...}], wallet: 2},
				{id: 37, name: "Gabe", hand:[{...}, {...}], wallet: 2},
				{id: 4, name: "Kevin", hand:[{...}, {...}], wallet: 2},
				{id: 89, name: "Nkosi", hand:[{...}, {...}], wallet: 2}
			],
			turnId: 37,
			targetId: 4,
			phase: "declare",
			chosenCard: "Captain"
		} */
	}

	render() {
		return (
			<div> {/* there was className="App" here before */}
				{this.state.playerId ? <Board /> : <Menu />}
			</div>
		)
	}
}

export default App;