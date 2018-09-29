import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Menu from './components/Menu'
import players from './playersData'

class App extends Component {

	state = {
		playerId: 1,
		game: {
			players: players,
			turnId: null,
			targetId: null,
			phase: "declare", /* declare, challenge1, block -> challenge2, resolve */
			chosenCard: "Captain"
		}
	}

	takeAction(e, {name: action}) {
		console.log(action)
	}

	render() {
		return (
			<div> {/* there was className="App" here before */}
				{this.state.playerId ? <Board game={this.state.game} playerId={this.state.playerId} takeAction={this.takeAction}/> : <Menu />}
			</div>
		)
	}
}

export default App;