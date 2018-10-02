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
			phase: "challenge", /* take action, declare target, challenge ,block -> challenge, resolve */
			players: fourPlayers,
			turnId: 1,
			action: "steal", // Only challengeable or targetable actions
			targetId: 1,
			challengerId: null,
			challengedId: 1
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
				this.setState({match: {...this.state.match, players: newPlayers}}) // Substitute for fetch (patch 'players/:id/')
				break
			case "foreign aid":
				this.setState({match: {...this.state.match, phase: "challenge1", action: "foreign aid"}}) // Substitute for fetch
				break
			case "coup":
				this.setState({match: {...this.state.match, phase: "declare target", action: "coup"}})
				break
			case "tax":
				this.setState({match: {...this.state.match, phase: "challenge1", action: "tax"}}) // Substitute for fetch
				break
			case "exchange cards":
				this.setState({match: {...this.state.match, phase: "challenge1", action: "exchange cards"}}) // Substitute for fetch
				break
			case "assassinate":
				this.setState({match: {...this.state.match, phase: "declare target", action: "assassinate"}})
				break
			case "steal":
				this.setState({match: {...this.state.match, phase: "declare target", action: "steal"}})
		}
	}

	declareTarget = id => {
		const { match: { phase }, playerId } = this.state
		if (phase === "declare target" && id !== playerId) {
			this.setState({match: {...this.state.match, phase: "challenge1", targetId: id}}) // Substitute for fetch
		}
	}

	handleChallenge() {
		this.setState({})
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