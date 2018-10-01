import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Login from './components/Login'
import WaitingScreen from './components/WaitingScreen'
import {fourPlayers, threePlayers}  from './playersData'

const API = "http://localhost:3000/"

class App extends Component {

	state = {
		playerId: 1,
		match: {
			players: fourPlayers,
			turnId: null,
			targetId: null,
			phase: "declare", /* declare, challenge1, block -> challenge2, resolve */
			chosenCard: "Captain"
		}
	}

	renderScreen() {
		if (this.state.playerId && this.state.match.players.length === 4) {
			return <Board match={this.state.match} playerId={this.state.playerId} takeAction={this.takeAction} />
		} else if (this.state.playerId) {
			return <WaitingScreen players={threePlayers}/>
		} else {
			return <Login handleSubmit={this.handleSubmit}/>
		}
	}

	handleSubmit = name =>  {
		fetch(API + "users", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({name: name})
		})
		.then(res => res.json())
		.then(p => this.setState({
			playerId: p.id
		}))
		.then(() => fetch(API + this.state.playerId + "/join_game/"))
	}

	takeAction(e, {name: action}) {
		console.log(action)
	}

	render() {
		console.log("APP", this.state)
		return (
			<div> {/* there was className="App" here before */}	
				{this.renderScreen()}
			</div>
		)
	}
}

export default App;