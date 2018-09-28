import React, { Component } from 'react'
import ChallengePrompt from './ChallengePrompt'
import Hand from './Hand'
import ActionsList from './ActionsList'
import cards from './../cardsData'

export default class Board extends Component {

	state = {
		game: {
			id: null,
			isItMyTurn: true // apply logic
		},
		cards: {
			myHand: [],
			deck: []
		}
	}

	componentDidMount() {
		this.setState({
			cards: {
				myHand: [cards[1], cards[4]],
				deck: []
			}
		})
	}

	render() {
		// console.log("Board State:", this.state)
		// console.log("Board Props:", this.props)

		return (
			<div>
				{/* All the other stuff like deck, bank, other players' hands */}
				<ChallengePrompt />
				<Hand cards={this.state.cards.myHand}/>
				<ActionsList />
			</div>
		)
	}
}