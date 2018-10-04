import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './components/Board'
import Login from './components/Login'
import WaitingScreen from './components/WaitingScreen'
import {threePlayers, fourPlayers}  from './playersData'
import Adapter from './adapters/Adapter.js'
import {  ActionCable } from 'react-actioncable-provider'
import ChallengePrompt from './components/ChallengePrompt';


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
		.then(match => this.setState({
			match: match,
			playerId: match.players[match.players.length - 1].id
		}))
	}

	takeAction = (e, {name: action}) => {
		const { match: { players, turnId }, playerId} = this.state
		let newPlayers = [...players]
		const currentPlayer = players.find(p => p.id === turnId)
		switch (action) {
			case "income":
				Adapter.updateWallet(turnId, currentPlayer.wallet + 1)
				.then(() => this.nextTurn()) //////////////// Come back to this
				break
			case "foreign aid":
				Adapter.updateMatch(this.state.match.id, {phase: "challenge", action: "foreign aid", challengedId: turnId})
				break
			case "coup":
				Adapter.updateMatch({phase: "declare target", action: "coup"})
				break
			case "tax":
				Adapter.updateMatch({phase: "declare target", action: "tax"})				
				break
			case "exchange cards":
				Adapter.updateMatch({phase: "challenge", action: "exchange cards", challengedId: turnId})								
				break
			case "assassinate":
				Adapter.updateMatch({phase: "declare target", action: "assassinate"})								
				break
			case "steal":
				Adapter.updateMatch({phase: "declare target", action: "steal"})								
		}
	}

	declareTarget = id => {
		const { match: { phase, turnId }, playerId } = this.state
		if (phase === "declare target" && id !== playerId) {
			Adapter.updateMatch({phase: "challenge", targetId: id, challengedId: turnId})
		}
	}

	handleChallenge() {
		const challengedPlayer = this.state.match.players.find(p  => p.id === challengedId)
		const activeHands = challengedPlayer.hands.filter(h => h.active)
		const wasNotLying = activeHands.some(h => h.deck.card.ability.toLowerCase() === this.state.match.action)
		if (wasNotLying) {
			Adapter.updateMatch(this.state.match.id, {phase: "challenger loses a card"})
		} else {
			Adapter.updateMatch(this.state.match.id, {phase: "challenged loses a card"})
		}
	}

	renderScreen() {
		const { playerId, match } = this.state
		const { match: { phase, challengedId, challengerId }} = this.state

		if (playerId && match.seats === 4) {
			if (!match.turnId) {
				Adapter.setTurnId(match.id, match.players[0].id)
			}
			if (phase === "challenger loses a card" && challengerId === playerId) {
				alert("You lost the challenge! Choose a card to show!")
			} else if (phase === "challenged loses a card" && challengedId === playerId) {
				alert("You lost the challenge! Choose a card to show!")
			}
			return <Board match={match} playerId={playerId} takeAction={this.takeAction} declareTarget={this.declareTarget} handleChallenge={this.handleChallenge} handleLoseCard={this.handleLoseCard}handleBlock={this.handleBlock}/>
		} else if (playerId && match.seats < 4) {
			return <WaitingScreen players={match.players}/>
		} else {
			return <Login handleSubmit={this.handleSubmit}/>
		}
	}

	render() {
		// console.log("APP", this.state)
		return (
			<div> {/* there was className="App" here before */}
				<ActionCable
					channel={{ channel: 'MatchChannel', id: 4}}
					onReceived={this.handleReceivedMatch}
				/>
				{this.renderScreen()}
			</div>
		)
	}

	handleReceivedMatch = res => {
		console.log(res)
		this.setState({match: res})
	}

	nexTurn() {
		const playerIds = this.state.match.players.map(p => p.id)
		const currentTurnIndex = playerIds.indexOf(this.state.turnId)
		const nextTurnId = playerIds[currentTurnIndex % 4] + 1
		Adapter.nextTurn(this.state.match.id, nextTurnId)
	}

	handleLoseCard = (handId, playerId) => {

		const { match: {challengerId, challengerId, turnId} } = this.state
		if (this.state.match.phase === "challenger loses a card") {
			this.state.match.challengerId === playerId && Adapter.updateHands(handId, {active: false})
			if (challengerId === turnId) {
				Adapter.nextTurn()
			} else if (this.checkIfBlockable(this.state.match.action) && challengerId !== turnId) {
				Adapter.updateMatch(this.state.match.id, {phase: "block"})
			} else {
				Adapter.updateMatch(this.state.match.id, {phase: "resolve"})
			}
		} else if (this.state.match.phase === "challenged loses a card") {
			this.state.match.challengedId === playerId && Adapter.updateHands(handId, {active: false})
			if (challengedId === turnId) {
				Adapter.nextTurn()
			} else if (this.checkIfBlockable(this.state.match.action) && challengerId !== turnId) {
				Adapter.updateMatch(this.state.match.id, {phase: "block"})
			} else {
				Adapter.updateMatch(this.state.match.id, {phase: "resolve"})
			}
		}
	}

	checkIfBlockable(action) {
		return ["foreign aid", "steal", "assassinate"].includes(action)
	}

	handleBlock() {
		const { playerId, match: { id: matchId, targetId, turnId } } = this.state
		if (playerId === targetId) {
			Adapter.updateMatch(matchId, {phase: "challenge", challengedId: targetId, challengerId: turnId, action: null})
		}
	}

	resolveAction() {
		switch (action) {
			case "foreign aid":
				Adapter.updateMatch(this.state.match.id, {phase: "challenge", action: "foreign aid", challengedId: turnId})
				break
			case "coup":
				Adapter.updateMatch({phase: "declare target", action: "coup"})
				break
			case "tax":
				Adapter.updateMatch({phase: "declare target", action: "tax"})				
				break
			case "exchange cards":
				Adapter.updateMatch({phase: "challenge", action: "exchange cards", challengedId: turnId})								
				break
			case "assassinate":
				Adapter.updateMatch({phase: "declare target", action: "assassinate"})								
				break
			case "steal":
				Adapter.updateMatch({phase: "declare target", action: "steal"})								
		}
		Adapter.nextTurn()
	}

}

export default App;

// `${this.state.match.id}`