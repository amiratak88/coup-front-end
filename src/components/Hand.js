import React, { Component } from 'react'
import Card from './Card'

export default class Hand extends Component {
	renderCards() {
		// It's probably gonna map thru an array and create cards
	}
	
	render() {
		// console.log("Hand State:", this.state)
		// console.log("Hand Props:", this.props)
		// console.log("Sample props being sent down", this.props.cards[0])

		return (
			<div>
				<Card card={this.props.cards[0]}/>
				<Card card={this.props.cards[1]}/>
			</div>
		)
	}
}