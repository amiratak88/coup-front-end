import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Login from './components/Login'
import WaitingScreen from './components/WaitingScreen'
import {threePlayers, fourPlayers}  from './playersData'

const API = "http://localhost:3000/"

const cards = [
	{name: "Duke", ability: "Bank", block: "Foreign Aid", desc: "This is a good card."},
	{name: "Assassin", ability: "Assassinate", block: "", desc: "This is a good card."},
	{name: "Contessa", ability: "", block: "Assassinate", desc: "This is a good card."},
	{name: "Captain", ability: "Steal", block: "Steal", desc: "This is a good card."},
	{name: "Ambassador", ability: "Draw", block: "Steal", desc: "This is a good card."},
	{name: "Income", ability: "Income", block: "", desc: "This is a good card."},
	{name: "Foreign Aid", ability: "Foreign Aid", block: "", desc: "This is a good card."},
	{name: "Coup", ability: "Coup", block: "", desc: "This is a good card."}
]

class App extends Component {

	state = {
		playerId: 1,
		match: {
			id: null,
			completed: false,
			phase: "declare", /* declare, challenge1, block -> challenge2, resolve */
			players: fourPlayers,
			turnId: 1,
			action: null,
			targetId: null,
			challengerId: null,
			challengeeId: null
		}
	}

	renderScreen() {
		const { playerId, match } = this.state

		if (playerId && match.players.length === 4) {
			return <Board match={match} playerId={playerId} takeAction={this.takeAction} />
		} else if (playerId) {
			return <WaitingScreen players={match.players}/>
		} else {
			return <Login handleSubmit={this.handleSubmit}/>
		}
	}

	handleSubmit = name => {
		fetch(API + "users", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({name: name})
		})
		.then(res => res.json())
		.then(p => this.setState({
			userId: p.id
		}))
		.then(() => fetch(API + this.state.userId + "/join_game/"))
		.then(res => res.json())
		.then(match => this.setState({match}))
	}

	takeAction(e, {name: action}) {
		this.setState({action: action, phase: "challenge"})
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