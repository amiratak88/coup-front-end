import React, { Component } from 'react'
import ChallengePrompt from './ChallengePrompt'
import Hand from './Hand'
import ActionsList from './ActionsList'

export default class Board extends Component {
	state = {
		isItMyTurn: true // Apply Logic

	}

	render() {
		// console.log("Board State:", this.state)
		// console.log("Board Props:", this.props)

		return (
			<div>
				{/* All the other stuff like deck, bank, other players' hands */}
				<ChallengePrompt />
				<Hand cards={this.props.cards.myHand}/>
				<ActionsList />
			</div>
		)
	}
}