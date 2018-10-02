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
		playerId: 2,
		match: {
			id: null,
			completed: false,
			phase: "take action", /* take action, declare target, challenge1 ,block -> challenge2, resolve */
			players: fourPlayers,
			turnId: 2,
			action: null,
			targetId: null
		}
	}

	renderScreen() {
		const { playerId, match } = this.state

		if (playerId && match.players.length === 4) {
			return <Board match={match} playerId={playerId} takeAction={this.takeAction} declareTarget={this.declareTarget}/>
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

	takeAction = (e, {name: action}) => {
		const { match: { players }, playerId} = this.state
		let newPlayers = [...players]
		switch (action) {
			case "income":
				newPlayers = newPlayers.map(p => {
					return p.id === playerId ? {...p, wallet: p.wallet + 1} : p
				})
				this.setState({match: {...this.state.match, players: newPlayers}}) // this is not necessary we shold just patch the player
				break
			case "foreign aid":

				break
			case "coup":

				break
			case "tax":

				break
			case "exchange cards":

				break
			case "assasinate":

				break
			case "steal":

		}
	}

	declareTarget = id => {
		const { match: { phase }, playerId } = this.state
		if (phase === "declare target" && id !== playerId) {
			console.log("This id is target now:", id)
		}
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