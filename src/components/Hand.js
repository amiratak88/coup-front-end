import React, { Component } from 'react'
import Card from './Card'

export default class Hand extends Component {
	
	renderCards = () => this.props.cards.map(c => <Card card={c}/>)
	
	render() {
		// console.log("Hand State:", this.state)
		// console.log("Hand Props:", this.props)
		// console.log("Sample props being sent down", this.props.cards[0])

		return (
			<div>
				{this.renderCards()}
			</div>
		)
	}
}