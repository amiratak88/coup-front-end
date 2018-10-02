import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Login from './components/Login'
import WaitingScreen from './components/WaitingScreen'
import {threePlayers, fourPlayers}  from './playersData'
import Adapter from './adapters/Adapter.js'
import {  ActionCable } from 'react-actioncable-provider'


const API = "http://localhost:3000/"

class App extends Component {

	state = {
		playerId: null,
		match: {
	// 		id: null,
	// 		seats: 1,
	// 		phase: "challenge", /* take action, declare target, challenge, block -> challenge, resolve */
	// 		turnId: 1,
	// 		action: "steal", // Only challengeable or targetable actions
	// 		targetId: 1,
	// 		challengerId: null,
	// 		challengedId: 1,
	// 		completed: false,
	// 		players: fourPlayers
		}
	}

	handleSubmit = name => {
		Adapter.signUp(name)
		.then(p => this.setState({
			playerId: p.id
		}))
		.then(() => Adapter.joinGame(this.state.playerId))
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

		if (playerId && match.seats === 4) {
			return <Board match={match} playerId={playerId} takeAction={this.takeAction} declareTarget={this.declareTarget}/>
		} else if (playerId && match.seats < 4) {
			return <WaitingScreen players={match.players}/>
		} else {
			return <Login handleSubmit={this.handleSubmit}/>
		}
	}

	render() {
		console.log("APP", this.state)
		return (
			<div> {/* there was className="App" here before */}
				<ActionCable
					channel={{ channel: 'MatchChannel', id: `${this.state.match.id}`}}
					onReceived={this.handleReceivedMatch}
				/>
				{this.renderScreen()}
			</div>
		)
	}

	handleReceivedMatch = res => {
		this.setState({match: res})
	}
}

export default App;